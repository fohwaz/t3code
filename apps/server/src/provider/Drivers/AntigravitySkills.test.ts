import * as NodeServices from "@effect/platform-node/NodeServices";
import { assert, it } from "@effect/vitest";
import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Path from "effect/Path";

import { discoverAntigravitySkills } from "./AntigravitySkills.ts";

const writeSkill = Effect.fn(function* (
  skillsDir: string,
  directoryName: string,
  contents: string,
) {
  const fs = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const skillDir = path.join(skillsDir, directoryName);
  yield* fs.makeDirectory(skillDir, { recursive: true });
  yield* fs.writeFileString(path.join(skillDir, "SKILL.md"), contents);
});

it.layer(NodeServices.layer)("discoverAntigravitySkills", (it) => {
  it.effect("discovers builtin, plugin, user, and project skills with frontmatter metadata", () =>
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const tempDir = yield* fs.makeTempDirectoryScoped({ prefix: "t3-agy-skills-" });
      const builtinDir = path.join(tempDir, "builtin", "skills");
      const configDir = path.join(tempDir, "config");
      const workspace = path.join(tempDir, "workspace");

      yield* writeSkill(
        builtinDir,
        "builtin-skill",
        ["---", "name: builtin-skill", "description: Builtin guide.", "---"].join("\n"),
      );
      yield* writeSkill(
        path.join(configDir, "plugins", "test-plugin", "skills"),
        "plugin-skill",
        ["---", "name: plugin-skill", "description: Plugin skill.", "---"].join("\n"),
      );
      yield* writeSkill(
        path.join(configDir, "skills"),
        "user-skill",
        ["---", "name: user-skill", "description: User skill.", "---"].join("\n"),
      );
      yield* writeSkill(
        path.join(workspace, ".agents", "skills"),
        "workspace-skill",
        ["---", "name: workspace-skill", "description: Workspace skill.", "---"].join("\n"),
      );

      const skills = yield* discoverAntigravitySkills({ binaryPath: "agy" }, workspace, {
        GEMINI_CONFIG_DIR: configDir,
        GEMINI_BUILTIN_SKILLS_DIR: builtinDir,
      });

      assert.deepEqual(skills, [
        {
          name: "builtin-skill",
          path: path.join(builtinDir, "builtin-skill", "SKILL.md"),
          enabled: true,
          scope: "user",
          description: "Builtin guide.",
        },
        {
          name: "plugin-skill",
          path: path.join(
            configDir,
            "plugins",
            "test-plugin",
            "skills",
            "plugin-skill",
            "SKILL.md",
          ),
          enabled: true,
          scope: "user",
          description: "Plugin skill.",
        },
        {
          name: "user-skill",
          path: path.join(configDir, "skills", "user-skill", "SKILL.md"),
          enabled: true,
          scope: "user",
          description: "User skill.",
        },
        {
          name: "workspace-skill",
          path: path.join(workspace, ".agents", "skills", "workspace-skill", "SKILL.md"),
          enabled: true,
          scope: "project",
          description: "Workspace skill.",
        },
      ]);
    }),
  );

  it.effect("prefers workspace .agents skills over builtin and user skills on name collision", () =>
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const tempDir = yield* fs.makeTempDirectoryScoped({ prefix: "t3-agy-skills-" });
      const builtinDir = path.join(tempDir, "builtin", "skills");
      const configDir = path.join(tempDir, "config");
      const workspace = path.join(tempDir, "workspace");

      yield* writeSkill(
        builtinDir,
        "review",
        ["---", "name: review", "description: Builtin review.", "---"].join("\n"),
      );
      yield* writeSkill(
        path.join(configDir, "skills"),
        "review",
        ["---", "name: review", "description: User review.", "---"].join("\n"),
      );
      yield* writeSkill(
        path.join(workspace, ".agent", "skills"),
        "review",
        ["---", "name: review", "description: .agent review.", "---"].join("\n"),
      );
      yield* writeSkill(
        path.join(workspace, ".agents", "skills"),
        "review",
        ["---", "name: review", "description: .agents review.", "---"].join("\n"),
      );

      const skills = yield* discoverAntigravitySkills({ binaryPath: "agy" }, workspace, {
        GEMINI_CONFIG_DIR: configDir,
        GEMINI_BUILTIN_SKILLS_DIR: builtinDir,
      });

      assert.deepEqual(skills, [
        {
          name: "review",
          path: path.join(workspace, ".agents", "skills", "review", "SKILL.md"),
          enabled: true,
          scope: "project",
          description: ".agents review.",
        },
      ]);
    }),
  );

  it.effect("falls back to directory name and ignores malformed frontmatter", () =>
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const tempDir = yield* fs.makeTempDirectoryScoped({ prefix: "t3-agy-skills-" });
      const configDir = path.join(tempDir, "config");
      const skillsDir = path.join(configDir, "skills");

      yield* writeSkill(skillsDir, "no-frontmatter", "# Just markdown heading");
      yield* writeSkill(skillsDir, "broken-yaml", "---\nname: [unclosed\n---\n");

      const skills = yield* discoverAntigravitySkills({ binaryPath: "agy" }, undefined, {
        GEMINI_CONFIG_DIR: configDir,
        GEMINI_BUILTIN_SKILLS_DIR: path.join(tempDir, "nonexistent"),
      });

      assert.deepEqual(
        skills.map((s) => s.name),
        ["no-frontmatter"],
      );
      assert.equal(skills[0]?.description, undefined);
    }),
  );

  it.effect("returns empty list when no skill roots exist", () =>
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const tempDir = yield* fs.makeTempDirectoryScoped({ prefix: "t3-agy-skills-" });

      const skills = yield* discoverAntigravitySkills(
        { binaryPath: "agy" },
        path.join(tempDir, "nonexistent-workspace"),
        {
          GEMINI_CONFIG_DIR: path.join(tempDir, "nonexistent-config"),
          GEMINI_BUILTIN_SKILLS_DIR: path.join(tempDir, "nonexistent-builtin"),
        },
      );

      assert.deepEqual(skills, []);
    }),
  );
});
