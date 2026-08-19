/**
 * AntigravitySkills — filesystem discovery of Antigravity (AGY) skills for the `$` picker.
 *
 * Antigravity loads skills from:
 * 1. Built-in skills in `<GEMINI_HOME>/antigravity-cli/builtin/skills` (user scope)
 * 2. Plugin skills in `<GEMINI_CONFIG_DIR>/plugins/<plugin>/skills` (user scope)
 * 3. User config skills in `<GEMINI_CONFIG_DIR>/skills` (user scope)
 * 4. Workspace skills in `<cwd>/.agent/skills` and `<cwd>/.agents/skills` (project scope)
 *
 * Each directory contains a `SKILL.md` carrying YAML frontmatter. Later roots
 * win on name collisions, so project-scoped skills override user/plugin/builtin skills.
 *
 * @module provider/Drivers/AntigravitySkills
 */
import * as NodeOS from "node:os";

import type { AntigravitySettings, ServerProviderSkill } from "@t3tools/contracts";
import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Path from "effect/Path";
import { parse as parseYamlDocument } from "yaml";

type AntigravitySkillScope = "user" | "project";

const FRONTMATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/;

function parseSkillFrontmatter(
  contents: string,
): { readonly name?: string; readonly description?: string } | null {
  const match = FRONTMATTER_PATTERN.exec(contents);
  if (!match) return {};
  try {
    const parsed = parseYamlDocument(match[1] ?? "");
    if (typeof parsed !== "object" || parsed === null) return null;
    const record = parsed as Record<string, unknown>;
    const name = typeof record.name === "string" ? record.name.trim() : undefined;
    const description =
      typeof record.description === "string" ? record.description.trim() : undefined;
    return { name: name || undefined, description: description || undefined };
  } catch {
    return null;
  }
}

export const discoverAntigravitySkills = Effect.fn("discoverAntigravitySkills")(function* (
  _config: Pick<AntigravitySettings, "binaryPath">,
  cwd?: string,
  environment?: NodeJS.ProcessEnv,
): Effect.fn.Return<ReadonlyArray<ServerProviderSkill>, never, FileSystem.FileSystem | Path.Path> {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const resolvedEnv = environment ?? process.env;

  const configEnv = resolvedEnv.GEMINI_CONFIG_DIR?.trim();
  const configDirPath = configEnv
    ? cwd
      ? path.resolve(cwd, configEnv)
      : path.resolve(configEnv)
    : path.join(NodeOS.homedir(), ".gemini", "config");

  const builtinEnv =
    resolvedEnv.GEMINI_BUILTIN_SKILLS_DIR?.trim() ??
    resolvedEnv.ANTIGRAVITY_BUILTIN_SKILLS_DIR?.trim();
  const builtinDirPath = builtinEnv
    ? cwd
      ? path.resolve(cwd, builtinEnv)
      : path.resolve(builtinEnv)
    : path.join(NodeOS.homedir(), ".gemini", "antigravity-cli", "builtin", "skills");

  const roots: { directory: string; scope: AntigravitySkillScope }[] = [
    { directory: builtinDirPath, scope: "user" },
  ];

  // Plugin skills under <configDir>/plugins/<plugin-name>/skills
  const pluginsDir = path.join(configDirPath, "plugins");
  const pluginEntries = yield* fileSystem
    .readDirectory(pluginsDir)
    .pipe(Effect.orElseSucceed((): ReadonlyArray<string> => []));

  for (const plugin of [...pluginEntries].sort()) {
    roots.push({
      directory: path.join(pluginsDir, plugin, "skills"),
      scope: "user",
    });
  }

  // User-scoped skills under <configDir>/skills
  roots.push({
    directory: path.join(configDirPath, "skills"),
    scope: "user",
  });

  // Project-scoped skills under workspace
  if (cwd) {
    roots.push({
      directory: path.join(cwd, ".agent", "skills"),
      scope: "project",
    });
    roots.push({
      directory: path.join(cwd, ".agents", "skills"),
      scope: "project",
    });
  }

  const skillsByName = new Map<string, ServerProviderSkill>();
  for (const root of roots) {
    const entries = yield* fileSystem
      .readDirectory(root.directory)
      .pipe(Effect.orElseSucceed((): ReadonlyArray<string> => []));

    for (const entry of [...entries].sort()) {
      const skillPath = path.join(root.directory, entry, "SKILL.md");
      const contents = yield* fileSystem
        .readFileString(skillPath)
        .pipe(Effect.orElseSucceed(() => undefined));
      if (contents === undefined) {
        continue;
      }

      const frontmatter = parseSkillFrontmatter(contents);
      if (frontmatter === null) {
        continue;
      }

      const name = frontmatter.name ?? entry.trim();
      if (!name) {
        continue;
      }

      skillsByName.set(name, {
        name,
        path: skillPath,
        enabled: true,
        scope: root.scope,
        ...(frontmatter.description ? { description: frontmatter.description } : {}),
      });
    }
  }

  return [...skillsByName.values()].sort((left, right) => left.name.localeCompare(right.name));
});
