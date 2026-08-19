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
  ProviderDriverKind,
  ThreadId,
  type ProviderRuntimeEvent,
} from "@t3tools/contracts";

import { makeAntigravityAdapter, resolveAntigravityModelAndEffort } from "./AntigravityAdapter.ts";

const decodeAntigravitySettings = Schema.decodeSync(AntigravitySettings);

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
});
