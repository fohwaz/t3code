import * as NodeServices from "@effect/platform-node/NodeServices";
import { assert, describe, expect, it } from "@effect/vitest";
import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Path from "effect/Path";
import * as Schema from "effect/Schema";
import * as Stream from "effect/Stream";
import * as Fiber from "effect/Fiber";

import {
  AntigravitySettings,
  ApprovalRequestId,
  ProviderDriverKind,
  ThreadId,
  type ProviderRuntimeEvent,
} from "@t3tools/contracts";

import {
  expandAntigravityPrompt,
  extractAntigravityAskQuestions,
  makeAntigravityAdapter,
  resolveAntigravityModelAndEffort,
} from "./AntigravityAdapter.ts";

const decodeAntigravitySettings = Schema.decodeSync(AntigravitySettings);

describe("expandAntigravityPrompt", () => {
  it("expands /grill-me with explicit turn-by-turn interview rules", () => {
    const res = expandAntigravityPrompt("/grill-me");
    expect(res).toContain("Ask exactly ONE focused question per turn");
    expect(res).toContain("CRITICAL INTERVIEW RULES");
  });

  it("expands /grill-me with extra context", () => {
    const res = expandAntigravityPrompt("/grill-me on my auth plan");
    expect(res).toContain("Ask exactly ONE focused question per turn");
    expect(res).toContain("Context:\non my auth plan");
  });

  it("expands natural phrasing 'grill me'", () => {
    const res = expandAntigravityPrompt("Please grill me on this database architecture");
    expect(res).toContain("Ask exactly ONE focused question per turn");
    expect(res).toContain("User request:\nPlease grill me on this database architecture");
  });

  it("passes standard prompts through unchanged", () => {
    const res = expandAntigravityPrompt("Refactor the login page");
    expect(res).toBe("Refactor the login page");
  });

  it("handles plan mode interaction without prompt", () => {
    const res = expandAntigravityPrompt("", "plan");
    expect(res).toContain("Plan Mode");
    expect(res).toContain("<proposed_plan>");
  });
});

describe("extractAntigravityAskQuestions", () => {
  it("extracts and normalizes questions and string options", () => {
    const input = {
      questions: [
        {
          question: "Which database do you want to use?",
          options: ["PostgreSQL", "SQLite"],
          is_multi_select: false,
        },
      ],
    };
    const questions = extractAntigravityAskQuestions(input);
    expect(questions.length).toBe(1);
    expect(questions[0]?.question).toBe("Which database do you want to use?");
    expect(questions[0]?.id).toBe("Which database do you want to use?");
    expect(questions[0]?.multiSelect).toBe(false);
    expect(questions[0]?.options).toEqual([
      { label: "PostgreSQL", description: "PostgreSQL" },
      { label: "SQLite", description: "SQLite" },
    ]);
  });

  it("handles object options and multi-select", () => {
    const input = {
      questions: [
        {
          id: "custom-q1",
          header: "Architecture",
          question: "Select components",
          options: [{ label: "API", description: "REST API backend" }, { label: "Worker" }],
          allowMultiple: true,
        },
      ],
    };
    const questions = extractAntigravityAskQuestions(input);
    expect(questions.length).toBe(1);
    expect(questions[0]?.id).toBe("custom-q1");
    expect(questions[0]?.header).toBe("Architecture");
    expect(questions[0]?.multiSelect).toBe(true);
    expect(questions[0]?.options).toEqual([
      { label: "API", description: "REST API backend" },
      { label: "Worker", description: "Worker" },
    ]);
  });
});

describe("resolveAntigravityModelAndEffort", () => {
  it("resolves standard model with explicitly selected effort", () => {
    const res = resolveAntigravityModelAndEffort("gemini-3.7-flash", "low");
    expect(res.model).toBe("gemini-3.7-flash");
    expect(res.effort).toBe("low");
  });

  it("handles Claude Sonnet 4.6 thinking model fixed high effort", () => {
    const res = resolveAntigravityModelAndEffort("claude-sonnet-4-6", undefined);
    expect(res.model).toBe("claude-sonnet-4-6");
    expect(res.effort).toBe("high");
  });

  it("handles GPT-OSS 120B fixed medium effort", () => {
    const res = resolveAntigravityModelAndEffort("gpt-oss-120b-medium", undefined);
    expect(res.model).toBe("gpt-oss-120b-medium");
    expect(res.effort).toBe("medium");
  });
});

it.layer(NodeServices.layer)("AntigravityAdapter", (it) => {
  it.effect("manages session lifecycle (start, list, has, stop)", () =>
    Effect.gen(function* () {
      const adapter = yield* makeAntigravityAdapter(decodeAntigravitySettings({ enabled: true }));
      const threadId = ThreadId.make("thread-test-1");

      expect(yield* adapter.hasSession(threadId)).toBe(false);

      const session = yield* adapter.startSession({
        threadId,
        provider: ProviderDriverKind.make("antigravity"),
        cwd: "/tmp",
        runtimeMode: "full-access",
      });

      expect(session.threadId).toBe(threadId);
      expect(session.status).toBe("ready");
      expect(yield* adapter.hasSession(threadId)).toBe(true);

      const sessions = yield* adapter.listSessions();
      expect(sessions.length).toBe(1);
      expect(sessions[0]?.threadId).toBe(threadId);

      yield* adapter.stopSession(threadId);
      expect(yield* adapter.hasSession(threadId)).toBe(false);
    }),
  );

  it.effect("handles respondToUserInput validation on active session", () =>
    Effect.gen(function* () {
      const adapter = yield* makeAntigravityAdapter(decodeAntigravitySettings({ enabled: true }));
      const threadId = ThreadId.make("thread-test-2");

      yield* adapter.startSession({
        threadId,
        provider: ProviderDriverKind.make("antigravity"),
        cwd: "/tmp",
        runtimeMode: "full-access",
      });

      const exit = yield* Effect.exit(
        adapter.respondToUserInput(threadId, ApprovalRequestId.make("unknown-req"), {
          q1: "answer",
        }),
      );
      expect(exit._tag).toBe("Failure");

      yield* adapter.stopSession(threadId);
    }),
  );
});
