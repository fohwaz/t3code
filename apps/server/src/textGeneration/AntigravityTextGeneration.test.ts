import * as NodeServices from "@effect/platform-node/NodeServices";
import { describe, expect, it } from "@effect/vitest";
import { AntigravitySettings, ProviderInstanceId } from "@t3tools/contracts";
import { createModelSelection } from "@t3tools/shared/model";
import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Layer from "effect/Layer";
import * as Path from "effect/Path";
import * as Schema from "effect/Schema";

import * as ServerConfig from "../config.ts";
import { makeAntigravityTextGeneration } from "./AntigravityTextGeneration.ts";

const decodeAntigravitySettings = Schema.decodeSync(AntigravitySettings);

const AntigravityTextGenerationTestLayer = ServerConfig.ServerConfig.layerTest(process.cwd(), {
  prefix: "t3code-antigravity-text-generation-test-",
}).pipe(Layer.provideMerge(NodeServices.layer));

function makeFakeAgyBinary(dir: string) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const binDir = path.join(dir, "bin");
    const stubPath = path.join(binDir, "agy-stub.mjs");
    yield* fs.makeDirectory(binDir, { recursive: true });

    yield* fs.writeFileString(
      stubPath,
      [
        'const output = process.env.T3_FAKE_AGY_OUTPUT ?? "{}";',
        'process.stdout.write(output + "\\n");',
        "process.exit(Number(process.env.T3_FAKE_AGY_EXIT_CODE ?? 0));",
        "",
      ].join("\n"),
    );

    const agyPath = path.join(binDir, "agy");
    yield* fs.writeFileString(
      agyPath,
      ["#!/bin/sh", 'exec node "$(dirname "$0")/agy-stub.mjs" "$@"', ""].join("\n"),
    );
    yield* fs.chmod(agyPath, 0o755);

    return agyPath;
  });
}

it.layer(AntigravityTextGenerationTestLayer)("AntigravityTextGeneration", (it) => {
  it.effect("generates structured commit message via agy output", () =>
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      const dir = yield* fs.makeTempDirectoryScoped({ prefix: "t3code-agy-tg-" });
      const agyPath = yield* makeFakeAgyBinary(dir);

      const fakeOutput = JSON.stringify({
        subject: "feat: add antigravity support",
        body: "Added native first-party support for Antigravity CLI",
      });

      const env: NodeJS.ProcessEnv = {
        ...process.env,
        T3_FAKE_AGY_OUTPUT: fakeOutput,
      };

      const tg = yield* makeAntigravityTextGeneration(
        decodeAntigravitySettings({ enabled: true, binaryPath: agyPath }),
        env,
      );

      const result = yield* tg.generateCommitMessage({
        cwd: dir,
        branch: "main",
        stagedSummary: "modified foo.ts",
        stagedPatch: "diff --git a/foo b/foo",
        modelSelection: createModelSelection(
          ProviderInstanceId.make("antigravity"),
          "gemini-3.7-flash",
        ),
      });

      expect(result.subject).toBe("feat: add antigravity support");
      expect(result.body).toBe("Added native first-party support for Antigravity CLI");
    }),
  );

  it.effect("generates branch name via agy output", () =>
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      const dir = yield* fs.makeTempDirectoryScoped({ prefix: "t3code-agy-tg-" });
      const agyPath = yield* makeFakeAgyBinary(dir);

      const fakeOutput = JSON.stringify({
        branch: "feat/add-antigravity",
      });

      const env: NodeJS.ProcessEnv = {
        ...process.env,
        T3_FAKE_AGY_OUTPUT: fakeOutput,
      };

      const tg = yield* makeAntigravityTextGeneration(
        decodeAntigravitySettings({ enabled: true, binaryPath: agyPath }),
        env,
      );

      const result = yield* tg.generateBranchName({
        cwd: dir,
        message: "Add antigravity support",
        modelSelection: createModelSelection(
          ProviderInstanceId.make("antigravity"),
          "gemini-3.7-flash",
        ),
      });

      expect(result.branch).toBe("feat/add-antigravity");
    }),
  );

  it.effect("generates thread title via agy output", () =>
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      const dir = yield* fs.makeTempDirectoryScoped({ prefix: "t3code-agy-tg-" });
      const agyPath = yield* makeFakeAgyBinary(dir);

      const fakeOutput = JSON.stringify({
        title: "Add Antigravity Support",
      });

      const env: NodeJS.ProcessEnv = {
        ...process.env,
        T3_FAKE_AGY_OUTPUT: fakeOutput,
      };

      const tg = yield* makeAntigravityTextGeneration(
        decodeAntigravitySettings({ enabled: true, binaryPath: agyPath }),
        env,
      );

      const result = yield* tg.generateThreadTitle({
        cwd: dir,
        message: "Add antigravity provider",
        modelSelection: createModelSelection(
          ProviderInstanceId.make("antigravity"),
          "gemini-3.7-flash",
        ),
      });

      expect(result.title).toBe("Add Antigravity Support");
    }),
  );
});
