/**
 * AntigravityAdapterLive — Scoped live implementation for the Antigravity provider adapter.
 *
 * Spawns and interacts with `agy` CLI processes in stream-json mode, translating
 * structured NDJSON stream events into canonical T3 Code runtime events.
 *
 * @module AntigravityAdapterLive
 */
import {
  ApprovalRequestId,
  type CanonicalItemType,
  type AntigravitySettings,
  EventId,
  type ProviderApprovalDecision,
  ProviderDriverKind,
  ProviderInstanceId,
  type ProviderRuntimeEvent,
  type ProviderSendTurnInput,
  type ProviderSession,
  type ProviderSessionStartInput,
  type ProviderTurnStartResult,
  type ProviderUserInputAnswers,
  RuntimeItemId,
  RuntimeRequestId,
  RuntimeTaskId,
  ThreadId,
  TurnId,
} from "@t3tools/contracts";
import * as Crypto from "effect/Crypto";
import * as Deferred from "effect/Deferred";
import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
import * as Fiber from "effect/Fiber";
import * as PubSub from "effect/PubSub";
import * as Ref from "effect/Ref";
import * as Scope from "effect/Scope";
import * as Stream from "effect/Stream";
import { ChildProcess, ChildProcessSpawner } from "effect/unstable/process";
import { getModelSelectionStringOptionValue } from "@t3tools/shared/model";
import { resolveSpawnCommand } from "@t3tools/shared/shell";

import {
  ProviderAdapterProcessError,
  ProviderAdapterRequestError,
  ProviderAdapterSessionClosedError,
  ProviderAdapterSessionNotFoundError,
  type ProviderAdapterError,
} from "../Errors.ts";
import { type AntigravityAdapterShape } from "../Services/AntigravityAdapter.ts";
import { type EventNdjsonLogger, makeEventNdjsonLogger } from "./EventNdjsonLogger.ts";

const PROVIDER = ProviderDriverKind.make("antigravity");
const ANTIGRAVITY_RESUME_VERSION = 1 as const;

type SpawnedProcess = Effect.Success<
  ReturnType<ChildProcessSpawner.ChildProcessSpawner["Service"]["spawn"]>
>;

export interface AntigravityAdapterLiveOptions {
  readonly environment?: NodeJS.ProcessEnv;
  readonly nativeEventLogPath?: string;
  readonly nativeEventLogger?: EventNdjsonLogger;
  readonly instanceId?: ProviderInstanceId;
}

interface AntigravityResumeCursor {
  readonly schemaVersion: number;
  readonly conversationId: string;
}

function parseAntigravityResume(raw: unknown): AntigravityResumeCursor | undefined {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
    return undefined;
  }
  const record = raw as Record<string, unknown>;
  if (record.schemaVersion !== ANTIGRAVITY_RESUME_VERSION) {
    return undefined;
  }
  if (typeof record.conversationId !== "string" || record.conversationId.trim().length === 0) {
    return undefined;
  }
  return {
    schemaVersion: ANTIGRAVITY_RESUME_VERSION,
    conversationId: record.conversationId.trim(),
  };
}

interface AntigravitySessionContext {
  session: ProviderSession;
  conversationId?: string | undefined;
  activeTurnId?: TurnId | undefined;
  activeProcess?:
    | {
        readonly process: SpawnedProcess;
        readonly fiber: Fiber.Fiber<void, never>;
      }
    | undefined;
  readonly scope: Scope.Closeable;
  readonly stopped: Ref.Ref<boolean>;
}

function mapToolNameToItemType(toolName: string): CanonicalItemType {
  switch (toolName) {
    case "run_command":
      return "command_execution";
    case "write_to_file":
    case "replace_file_content":
    case "multi_replace_file_content":
    case "sed_file":
    case "notebook_edit":
      return "file_change";
    case "view_file":
    case "list_dir":
    case "find_by_name":
    case "grep_search":
      return "dynamic_tool_call";
    case "search_web":
    case "read_url_content":
      return "web_search";
    case "invoke_subagent":
    case "manage_subagents":
    case "send_message":
      return "collab_agent_tool_call";
    case "call_mcp_tool":
      return "mcp_tool_call";
    default:
      return "mcp_tool_call";
  }
}

export function resolveAntigravityModelAndEffort(
  modelSelectionModel: string | undefined,
  selectedEffort: string | undefined,
): { readonly model: string | undefined; readonly effort: string | undefined } {
  if (!modelSelectionModel) {
    return { model: undefined, effort: selectedEffort };
  }

  const trimmed = modelSelectionModel.trim();
  if (trimmed === "gpt-oss-120b" || trimmed === "gpt-oss-120b-medium") {
    return { model: "gpt-oss-120b-medium", effort: "medium" };
  }
  if (trimmed === "claude-opus-4-6" || trimmed === "claude-opus-4-6-thinking") {
    return { model: "claude-opus-4-6-thinking", effort: "high" };
  }
  if (trimmed === "claude-sonnet-4-6") {
    return { model: "claude-sonnet-4-6", effort: "high" };
  }

  const baseMatch = /^(gemini-[\w.]+(?:-flash|-pro)?)-(low|medium|high)$/i.exec(trimmed);
  if (baseMatch && baseMatch[1]) {
    return { model: baseMatch[1], effort: selectedEffort ?? baseMatch[2]?.toLowerCase() };
  }

  return { model: trimmed, effort: selectedEffort };
}

export const makeAntigravityAdapter = Effect.fn("makeAntigravityAdapter")(function* (
  antigravitySettings: AntigravitySettings,
  options?: AntigravityAdapterLiveOptions,
): Effect.fn.Return<
  AntigravityAdapterShape,
  never,
  ChildProcessSpawner.ChildProcessSpawner | Crypto.Crypto | Scope.Scope
> {
  const crypto = yield* Crypto.Crypto;
  const commandSpawner = yield* ChildProcessSpawner.ChildProcessSpawner;
  const environment = options?.environment ?? process.env;
  const instanceId = options?.instanceId ?? ProviderInstanceId.make(PROVIDER);

  const eventLogger =
    options?.nativeEventLogger ??
    (options?.nativeEventLogPath !== undefined
      ? yield* makeEventNdjsonLogger(options.nativeEventLogPath, { stream: "native" })
      : undefined);

  const runtimeEventPubSub = yield* PubSub.unbounded<ProviderRuntimeEvent>();
  const sessions = new Map<ThreadId, AntigravitySessionContext>();

  const publishEvent = (event: ProviderRuntimeEvent): Effect.Effect<void> =>
    Effect.gen(function* () {
      if (eventLogger) {
        yield* eventLogger.write(event, event.threadId);
      }
      yield* PubSub.publish(runtimeEventPubSub, event);
    });

  const makeEventBase = (
    threadId: ThreadId,
    turnId?: TurnId,
    itemId?: RuntimeItemId,
    requestId?: RuntimeRequestId,
  ) => ({
    eventId: EventId.make(globalThis.crypto.randomUUID()),
    provider: PROVIDER,
    providerInstanceId: instanceId,
    threadId,
    createdAt: new Date().toISOString(),
    ...(turnId !== undefined ? { turnId } : {}),
    ...(itemId !== undefined ? { itemId } : {}),
    ...(requestId !== undefined ? { requestId } : {}),
  });

  const getSession = (threadId: ThreadId): AntigravitySessionContext | undefined =>
    sessions.get(threadId);

  const requireSession = (
    threadId: ThreadId,
  ): Effect.Effect<AntigravitySessionContext, ProviderAdapterSessionNotFoundError> =>
    Effect.gen(function* () {
      const ctx = getSession(threadId);
      if (!ctx) {
        return yield* new ProviderAdapterSessionNotFoundError({
          provider: PROVIDER,
          threadId,
        });
      }
      const isStopped = yield* Ref.get(ctx.stopped);
      if (isStopped) {
        return yield* new ProviderAdapterSessionNotFoundError({
          provider: PROVIDER,
          threadId,
        });
      }
      return ctx;
    });

  const startSession: AntigravityAdapterShape["startSession"] = (
    input: ProviderSessionStartInput,
  ) =>
    Effect.gen(function* () {
      const now = new Date().toISOString();
      const parsedResume = parseAntigravityResume(input.resumeCursor);

      const session: ProviderSession = {
        provider: PROVIDER,
        providerInstanceId: instanceId,
        threadId: input.threadId,
        status: "ready",
        runtimeMode: input.runtimeMode,
        cwd: input.cwd,
        createdAt: now,
        updatedAt: now,
        ...(parsedResume ? { resumeCursor: parsedResume } : {}),
      };

      const stoppedRef = yield* Ref.make(false);
      const sessionScope = yield* Scope.make();
      const ctx: AntigravitySessionContext = {
        session,
        conversationId: parsedResume?.conversationId,
        scope: sessionScope,
        stopped: stoppedRef,
      };
      sessions.set(input.threadId, ctx);

      yield* publishEvent({
        ...makeEventBase(input.threadId),
        type: "session.started",
        payload: {
          message: "Antigravity session ready",
          ...(parsedResume ? { resume: parsedResume } : {}),
        },
      });

      yield* publishEvent({
        ...makeEventBase(input.threadId),
        type: "thread.started",
        payload: {
          providerThreadId: parsedResume?.conversationId,
        },
      });

      return session;
    });

  const sendTurn: AntigravityAdapterShape["sendTurn"] = (input: ProviderSendTurnInput) =>
    Effect.gen(function* () {
      const ctx = yield* requireSession(input.threadId);
      const turnId = TurnId.make(globalThis.crypto.randomUUID());
      ctx.activeTurnId = turnId;

      const binaryPath = antigravitySettings.binaryPath.trim() || "agy";
      const rawModel = input.modelSelection?.model;
      const rawEffort = input.modelSelection
        ? getModelSelectionStringOptionValue(input.modelSelection, "effort")
        : undefined;
      const { model, effort } = resolveAntigravityModelAndEffort(rawModel, rawEffort);

      const isFullAccess =
        input.interactionMode !== "plan" && ctx.session.runtimeMode === "full-access";

      const args: string[] = ["--output-format", "stream-json"];
      if (isFullAccess) {
        args.push("--dangerously-skip-permissions");
      }

      if (ctx.conversationId) {
        args.push("--conversation", ctx.conversationId);
      }
      if (model && model.length > 0) {
        args.push("--model", model);
      }
      if (effort) {
        args.push("--effort", effort);
      }
      if (antigravitySettings.launchArgs && antigravitySettings.launchArgs.trim().length > 0) {
        const extra = antigravitySettings.launchArgs.trim().split(/\s+/);
        args.push(...extra);
      }

      args.push("-p", input.input ?? "");

      yield* publishEvent({
        ...makeEventBase(input.threadId, turnId),
        type: "turn.started",
        payload: {
          model,
          effort,
        },
      });

      const cwd = ctx.session.cwd ?? process.cwd();
      const spawnCommand = yield* resolveSpawnCommand(binaryPath, args, { env: environment });
      const proc = yield* commandSpawner
        .spawn(
          ChildProcess.make(spawnCommand.command, spawnCommand.args, {
            cwd,
            env: environment,
            shell: spawnCommand.shell,
          }),
        )
        .pipe(
          Effect.provideService(Scope.Scope, ctx.scope),
          Effect.mapError(
            (cause) =>
              new ProviderAdapterProcessError({
                provider: PROVIDER,
                threadId: input.threadId,
                detail: `Failed to spawn Antigravity CLI process: ${cause.message}`,
                cause,
              }),
          ),
        );

      const turnCompletedDeferred = yield* Deferred.make<void, ProviderAdapterError>();
      const currentItemMap = new Map<number, RuntimeItemId>();
      const stdoutRemainderRef = yield* Ref.make("");

      const handleLine = (line: string) =>
        Effect.gen(function* () {
          const trimmed = line.trim();
          if (!trimmed) return;
          let parsed: unknown;
          try {
            parsed = JSON.parse(trimmed);
          } catch {
            return;
          }

          if (typeof parsed !== "object" || parsed === null) {
            return;
          }

          const msg = parsed as Record<string, unknown>;
          const eventType = msg.event;

          if (eventType === "init") {
            const convId = msg.conversation_id as string | undefined;
            if (convId) {
              ctx.conversationId = convId;
              ctx.session = {
                ...ctx.session,
                resumeCursor: {
                  schemaVersion: ANTIGRAVITY_RESUME_VERSION,
                  conversationId: convId,
                },
              };
            }
            return;
          }

          if (eventType === "step_update") {
            const stepUpdate = msg.step_update as Record<string, unknown> | undefined;
            if (!stepUpdate) return;

            const stepIndex = stepUpdate.step_index as number | undefined;
            const stepType = stepUpdate.step_type as string | undefined;
            const state = stepUpdate.state as string | undefined;
            const textDelta = stepUpdate.text_delta as string | undefined;
            const usage = stepUpdate.usage as Record<string, unknown> | undefined;
            const toolName = stepUpdate.tool_name as string | undefined;
            const toolInfo = stepUpdate.tool_info as Record<string, unknown> | undefined;

            if (usage) {
              const inputTokens = typeof usage.input_tokens === "number" ? usage.input_tokens : 0;
              const outputTokens =
                typeof usage.output_tokens === "number" ? usage.output_tokens : 0;
              const reasoningTokens =
                typeof usage.thinking_tokens === "number" ? usage.thinking_tokens : 0;
              const cachedTokens =
                typeof usage.cache_read_tokens === "number" ? usage.cache_read_tokens : 0;
              const totalTokens =
                typeof usage.total_tokens === "number"
                  ? usage.total_tokens
                  : inputTokens + outputTokens;

              yield* publishEvent({
                ...makeEventBase(input.threadId, turnId),
                type: "thread.token-usage.updated",
                payload: {
                  usage: {
                    usedTokens: totalTokens,
                    inputTokens,
                    outputTokens,
                    reasoningOutputTokens: reasoningTokens,
                    cachedInputTokens: cachedTokens,
                  },
                },
              });
            }

            if (stepType === "agent_response") {
              let itemId: RuntimeItemId;
              if (stepIndex !== undefined && currentItemMap.has(stepIndex)) {
                itemId = currentItemMap.get(stepIndex)!;
              } else {
                itemId = RuntimeItemId.make(globalThis.crypto.randomUUID());
                if (stepIndex !== undefined) {
                  currentItemMap.set(stepIndex, itemId);
                }
                yield* publishEvent({
                  ...makeEventBase(input.threadId, turnId, itemId),
                  type: "item.started",
                  payload: {
                    itemType: "assistant_message",
                    status: "inProgress",
                  },
                });
              }

              if (textDelta && textDelta.length > 0) {
                yield* publishEvent({
                  ...makeEventBase(input.threadId, turnId, itemId),
                  type: "content.delta",
                  payload: {
                    streamKind: "assistant_text",
                    delta: textDelta,
                  },
                });
              }

              if (state === "DONE") {
                yield* publishEvent({
                  ...makeEventBase(input.threadId, turnId, itemId),
                  type: "item.completed",
                  payload: {
                    itemType: "assistant_message",
                    status: "completed",
                  },
                });
              }
              return;
            }

            if (stepType === "tool" && toolName) {
              let itemId: RuntimeItemId;
              if (stepIndex !== undefined && currentItemMap.has(stepIndex)) {
                itemId = currentItemMap.get(stepIndex)!;
              } else {
                itemId = RuntimeItemId.make(globalThis.crypto.randomUUID());
                if (stepIndex !== undefined) {
                  currentItemMap.set(stepIndex, itemId);
                }
              }

              const canonicalType = mapToolNameToItemType(toolName);

              if (state === "ACTIVE") {
                yield* publishEvent({
                  ...makeEventBase(input.threadId, turnId, itemId),
                  type: "item.started",
                  payload: {
                    itemType: canonicalType,
                    title: toolName,
                    status: "inProgress",
                    data: toolInfo?.parameters,
                  },
                });
              } else if (state === "DONE") {
                const toolOutput = toolInfo?.output ?? toolInfo?.result;
                if (toolOutput !== undefined && toolOutput !== null) {
                  const outputStr =
                    typeof toolOutput === "string" ? toolOutput : JSON.stringify(toolOutput);
                  if (outputStr.length > 0) {
                    const streamKind =
                      canonicalType === "command_execution"
                        ? "command_output"
                        : canonicalType === "file_change"
                          ? "file_change_output"
                          : "assistant_text";
                    yield* publishEvent({
                      ...makeEventBase(input.threadId, turnId, itemId),
                      type: "content.delta",
                      payload: {
                        streamKind,
                        delta: outputStr,
                      },
                    });
                  }
                }
                yield* publishEvent({
                  ...makeEventBase(input.threadId, turnId, itemId),
                  type: "item.completed",
                  payload: {
                    itemType: canonicalType,
                    title: toolName,
                    status: "completed",
                    data: toolInfo?.parameters,
                  },
                });
              } else if (state === "ERROR") {
                yield* publishEvent({
                  ...makeEventBase(input.threadId, turnId, itemId),
                  type: "item.completed",
                  payload: {
                    itemType: canonicalType,
                    title: toolName,
                    status: "failed",
                    detail:
                      typeof toolInfo?.error === "object"
                        ? JSON.stringify(toolInfo.error)
                        : typeof toolInfo?.error === "string"
                          ? toolInfo.error
                          : undefined,
                    data: toolInfo?.parameters,
                  },
                });
              }
              return;
            }

            if (stepType === "checkpoint") {
              yield* publishEvent({
                ...makeEventBase(input.threadId, turnId),
                type: "task.progress",
                payload: {
                  taskId: RuntimeTaskId.make("checkpoint"),
                  description: "Checkpoint captured",
                },
              });
            }
            return;
          }

          if (eventType === "result") {
            const result = msg.result as Record<string, unknown> | undefined;
            const status = result?.status;
            const isSuccess = status === "SUCCESS";
            const error = result?.error as string | undefined;

            yield* publishEvent({
              ...makeEventBase(input.threadId, turnId),
              type: "turn.completed",
              payload: {
                state: isSuccess ? "completed" : "failed",
                ...(error ? { errorMessage: error } : {}),
              },
            });

            ctx.activeTurnId = undefined;
            yield* Deferred.succeed(turnCompletedDeferred, void 0);
          }
        });

      const eventProcessingFiber = yield* proc.stdout.pipe(
        Stream.decodeText(),
        Stream.runForEach((chunk) =>
          Ref.modify(stdoutRemainderRef, (current) => {
            const combined = current + chunk;
            const lines = combined.split("\n");
            const remainder = lines.pop() ?? "";
            return [lines.map((l) => l.replace(/\r$/, "")), remainder] as const;
          }).pipe(Effect.flatMap((lines) => Effect.forEach(lines, handleLine, { discard: true }))),
        ),
        Effect.flatMap(() =>
          Ref.get(stdoutRemainderRef).pipe(
            Effect.flatMap((remainder) =>
              remainder.trim().length > 0 ? handleLine(remainder) : Effect.void,
            ),
          ),
        ),
        Effect.catch((err) =>
          Effect.gen(function* () {
            yield* publishEvent({
              ...makeEventBase(input.threadId, turnId),
              type: "turn.completed",
              payload: {
                state: "failed",
                errorMessage: String(err),
              },
            });
            ctx.activeTurnId = undefined;
            yield* Deferred.fail(
              turnCompletedDeferred,
              new ProviderAdapterProcessError({
                provider: PROVIDER,
                threadId: input.threadId,
                detail: `Antigravity event pump failed: ${String(err)}`,
                cause: err,
              }),
            );
          }),
        ),
        Effect.forkIn(ctx.scope),
      );

      yield* proc.stderr.pipe(
        Stream.decodeText(),
        Stream.runForEach(() => Effect.void),
        Effect.ignore,
        Effect.forkIn(ctx.scope),
      );

      yield* proc.exitCode.pipe(
        Effect.flatMap((code) =>
          Effect.gen(function* () {
            ctx.activeProcess = undefined;
            if (code !== 0) {
              yield* publishEvent({
                ...makeEventBase(input.threadId, turnId),
                type: "turn.completed",
                payload: {
                  state: "failed",
                  errorMessage: `Antigravity CLI exited with code ${code}`,
                },
              });
              ctx.activeTurnId = undefined;
              yield* Deferred.succeed(turnCompletedDeferred, void 0);
            }
          }),
        ),
        Effect.ignore,
        Effect.forkIn(ctx.scope),
      );

      ctx.activeProcess = {
        process: proc,
        fiber: eventProcessingFiber,
      };

      const result: ProviderTurnStartResult = {
        threadId: input.threadId,
        turnId,
        resumeCursor: {
          schemaVersion: ANTIGRAVITY_RESUME_VERSION,
          conversationId: ctx.conversationId ?? "",
        },
      };

      return result;
    });

  const interruptTurn: AntigravityAdapterShape["interruptTurn"] = (
    threadId: ThreadId,
    turnId?: TurnId,
  ) =>
    Effect.gen(function* () {
      const ctx = yield* requireSession(threadId);
      const activeTurn = turnId ?? ctx.activeTurnId;

      const activeProcess = ctx.activeProcess;
      if (activeProcess) {
        ctx.activeProcess = undefined;
        const isRunning = yield* activeProcess.process.isRunning.pipe(
          Effect.orElseSucceed(() => false),
        );
        if (isRunning) {
          yield* activeProcess.process.kill().pipe(
            Effect.asVoid,
            Effect.catch(() => Effect.void),
          );
        }
        yield* Fiber.interrupt(activeProcess.fiber);
      }

      if (activeTurn) {
        yield* publishEvent({
          ...makeEventBase(threadId, activeTurn),
          type: "turn.completed",
          payload: {
            state: "interrupted",
          },
        });
        ctx.activeTurnId = undefined;
      }
    });

  const stopSession: AntigravityAdapterShape["stopSession"] = (threadId: ThreadId) =>
    Effect.gen(function* () {
      const ctx = getSession(threadId);
      if (!ctx) {
        return;
      }
      yield* Ref.set(ctx.stopped, true);
      const activeProcess = ctx.activeProcess;
      if (activeProcess) {
        ctx.activeProcess = undefined;
        const isRunning = yield* activeProcess.process.isRunning.pipe(
          Effect.orElseSucceed(() => false),
        );
        if (isRunning) {
          yield* activeProcess.process.kill().pipe(
            Effect.asVoid,
            Effect.catch(() => Effect.void),
          );
        }
        yield* Fiber.interrupt(activeProcess.fiber);
      }
      yield* Scope.close(ctx.scope, Exit.void);
      sessions.delete(threadId);

      yield* publishEvent({
        ...makeEventBase(threadId),
        type: "session.state.changed",
        payload: {
          state: "stopped",
        },
      });
    });

  const listSessions: AntigravityAdapterShape["listSessions"] = () =>
    Effect.sync(() => Array.from(sessions.values()).map((ctx) => ctx.session));

  const hasSession: AntigravityAdapterShape["hasSession"] = (threadId: ThreadId) =>
    Effect.sync(() => sessions.has(threadId));

  const readThread: AntigravityAdapterShape["readThread"] = (threadId: ThreadId) =>
    Effect.gen(function* () {
      yield* requireSession(threadId);
      return {
        threadId,
        turns: [],
      };
    });

  const rollbackThread: AntigravityAdapterShape["rollbackThread"] = (
    threadId: ThreadId,
    _numTurns: number,
  ) =>
    Effect.gen(function* () {
      yield* requireSession(threadId);
      return {
        threadId,
        turns: [],
      };
    });

  const stopAll: AntigravityAdapterShape["stopAll"] = () =>
    Effect.forEach(Array.from(sessions.keys()), (threadId) => stopSession(threadId), {
      discard: true,
    });

  yield* Effect.addFinalizer(() =>
    Effect.ignore(stopAll()).pipe(
      Effect.tap(() => PubSub.shutdown(runtimeEventPubSub)),
      Effect.tap(() => (eventLogger ? eventLogger.close() : Effect.void)),
    ),
  );

  const respondToRequest: AntigravityAdapterShape["respondToRequest"] = (
    _threadId: ThreadId,
    _requestId: ApprovalRequestId,
    _decision: ProviderApprovalDecision,
  ) => Effect.void;

  const respondToUserInput: AntigravityAdapterShape["respondToUserInput"] = (
    _threadId: ThreadId,
    _requestId: ApprovalRequestId,
    _answers: ProviderUserInputAnswers,
  ) => Effect.void;

  return {
    provider: PROVIDER,
    capabilities: {
      sessionModelSwitch: "in-session",
    },
    startSession,
    sendTurn,
    interruptTurn,
    respondToRequest,
    respondToUserInput,
    stopSession,
    listSessions,
    hasSession,
    readThread,
    rollbackThread,
    stopAll,
    streamEvents: Stream.fromPubSub(runtimeEventPubSub),
  } satisfies AntigravityAdapterShape;
});
