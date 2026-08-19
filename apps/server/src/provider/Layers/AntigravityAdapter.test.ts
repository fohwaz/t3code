import * as NodeServices from "@effect/platform-node/NodeServices";
import { describe, expect, it } from "@effect/vitest";
import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Path from "effect/Path";
import * as Schema from "effect/Schema";
import * as Stream from "effect/Stream";
import * as Fiber from "effect/Fiber";

import {
  AntigravitySettings,
  ProviderDriverKind,
  ThreadId,
  type ProviderRuntimeEvent,
} from "@t3tools/contracts";

import { makeAntigravityAdapter } from "./AntigravityAdapter.ts";

const decodeAntigravitySettings = Schema.decodeSync(AntigravitySettings);

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

  it.effect("executes a turn with installed agy CLI", () =>
    Effect.gen(function* () {
      const adapter = yield* makeAntigravityAdapter(
        decodeAntigravitySettings({
          enabled: true,
          binaryPath: "/Users/fohwaz/.local/bin/agy",
        }),
      );

      const threadId = ThreadId.make("thread-test-real");
      yield* adapter.startSession({
        threadId,
        provider: ProviderDriverKind.make("antigravity"),
        cwd: process.cwd(),
        runtimeMode: "full-access",
      });

      const eventsFiber = yield* Stream.runCollect(Stream.take(adapter.streamEvents, 4)).pipe(
        Effect.forkChild,
      );

      const turnResult = yield* adapter.sendTurn({
        threadId,
        input: "Reply with the single word pong",
      });

      expect(turnResult.threadId).toBe(threadId);
      expect(turnResult.turnId).toBeDefined();

      const events = Array.from(yield* Fiber.join(eventsFiber));
      const eventTypes = events.map((e) => e.type);

      expect(eventTypes).toContain("item.started");
      expect(eventTypes).toContain("content.delta");

      yield* adapter.stopSession(threadId);
    }),
  );
});
