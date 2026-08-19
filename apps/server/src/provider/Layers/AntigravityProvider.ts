import {
  type AntigravitySettings,
  type ModelCapabilities,
  type ServerProviderModel,
  type ServerProviderSlashCommand,
} from "@t3tools/contracts";
import * as DateTime from "effect/DateTime";
import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Option from "effect/Option";
import * as Path from "effect/Path";
import * as Result from "effect/Result";
import { ChildProcess, ChildProcessSpawner } from "effect/unstable/process";
import { createModelCapabilities } from "@t3tools/shared/model";
import { resolveSpawnCommand } from "@t3tools/shared/shell";

import { discoverAntigravitySkills } from "../Drivers/AntigravitySkills.ts";
import {
  buildSelectOptionDescriptor,
  buildServerProvider,
  isCommandMissingCause,
  parseGenericCliVersion,
  providerModelsFromSettings,
  spawnAndCollect,
  type ServerProviderDraft,
} from "../providerSnapshot.ts";

export const ANTIGRAVITY_SLASH_COMMANDS: ReadonlyArray<ServerProviderSlashCommand> = [
  {
    name: "plan",
    description: "Structured implementation planning mode for complex tasks",
  },
  {
    name: "grill-me",
    description: "Interactive architecture and technical design interview",
  },
  {
    name: "goal",
    description: "Autonomous goal-driven execution until fully achieved",
  },
  {
    name: "learn",
    description: "Persist lessons, patterns, and workspace rules for future turns",
  },
  {
    name: "schedule",
    description: "Schedule a one-shot timer or recurring cron job",
  },
  {
    name: "teamwork-preview",
    description: "Coordinate a team of autonomous subagents working together",
  },
];

const ANTIGRAVITY_PRESENTATION = {
  displayName: "Antigravity",
  showInteractionModeToggle: true,
  requiresNewThreadForModelChange: false,
} as const;

const GEMINI_CAPABILITIES: ModelCapabilities = createModelCapabilities({
  optionDescriptors: [
    buildSelectOptionDescriptor({
      id: "effort",
      label: "Reasoning",
      options: [
        { value: "low", label: "Low" },
        { value: "medium", label: "Medium" },
        { value: "high", label: "High", isDefault: true },
      ],
    }),
    buildSelectOptionDescriptor({
      id: "contextWindow",
      label: "Context Window",
      options: [
        { value: "200k", label: "200k" },
        { value: "1m", label: "1M", isDefault: true },
        { value: "2m", label: "2M" },
      ],
    }),
  ],
});

const CLAUDE_THINKING_CAPABILITIES: ModelCapabilities = createModelCapabilities({
  optionDescriptors: [
    buildSelectOptionDescriptor({
      id: "effort",
      label: "Reasoning",
      options: [{ value: "high", label: "High", isDefault: true }],
    }),
    buildSelectOptionDescriptor({
      id: "contextWindow",
      label: "Context Window",
      options: [{ value: "200k", label: "200k", isDefault: true }],
    }),
  ],
});

const GPT_OSS_CAPABILITIES: ModelCapabilities = createModelCapabilities({
  optionDescriptors: [
    buildSelectOptionDescriptor({
      id: "effort",
      label: "Reasoning",
      options: [{ value: "medium", label: "Medium", isDefault: true }],
    }),
    buildSelectOptionDescriptor({
      id: "contextWindow",
      label: "Context Window",
      options: [{ value: "200k", label: "200k", isDefault: true }],
    }),
  ],
});

const VERSION_PROBE_TIMEOUT_MS = 5_000;

export const ANTIGRAVITY_BUILT_IN_MODELS: ReadonlyArray<ServerProviderModel> = [
  {
    slug: "gemini-3.7-flash",
    name: "Gemini 3.7 Flash",
    isCustom: false,
    capabilities: GEMINI_CAPABILITIES,
  },
  {
    slug: "gemini-3.6-flash",
    name: "Gemini 3.6 Flash",
    isCustom: false,
    capabilities: GEMINI_CAPABILITIES,
  },
  {
    slug: "gemini-3.5-flash",
    name: "Gemini 3.5 Flash",
    isCustom: false,
    capabilities: GEMINI_CAPABILITIES,
  },
  {
    slug: "gemini-3.1-pro",
    name: "Gemini 3.1 Pro",
    isCustom: false,
    capabilities: GEMINI_CAPABILITIES,
  },
  {
    slug: "claude-sonnet-4-6",
    name: "Claude Sonnet 4.6",
    isCustom: false,
    capabilities: CLAUDE_THINKING_CAPABILITIES,
  },
  {
    slug: "claude-opus-4-6",
    name: "Claude Opus 4.6",
    isCustom: false,
    capabilities: CLAUDE_THINKING_CAPABILITIES,
  },
  {
    slug: "gpt-oss-120b",
    name: "GPT-OSS 120B",
    isCustom: false,
    capabilities: GPT_OSS_CAPABILITIES,
  },
];

export function buildInitialAntigravityProviderSnapshot(
  antigravitySettings: AntigravitySettings,
  cwd?: string,
  environment?: NodeJS.ProcessEnv,
): Effect.Effect<ServerProviderDraft, never, FileSystem.FileSystem | Path.Path> {
  return Effect.gen(function* () {
    const checkedAt = yield* Effect.map(DateTime.now, DateTime.formatIso);
    const models = antigravityModelsFromSettings(antigravitySettings.customModels);
    const skills = yield* discoverAntigravitySkills(antigravitySettings, cwd, environment);

    if (!antigravitySettings.enabled) {
      return buildServerProvider({
        presentation: ANTIGRAVITY_PRESENTATION,
        enabled: false,
        checkedAt,
        models,
        skills,
        slashCommands: ANTIGRAVITY_SLASH_COMMANDS,
        probe: {
          installed: false,
          version: null,
          status: "warning",
          auth: { status: "unknown" },
          message: "Antigravity CLI is disabled in T3 Code settings.",
        },
      });
    }

    return buildServerProvider({
      presentation: ANTIGRAVITY_PRESENTATION,
      enabled: true,
      checkedAt,
      models,
      skills,
      slashCommands: ANTIGRAVITY_SLASH_COMMANDS,
      probe: {
        installed: true,
        version: null,
        status: "ready",
        auth: { status: "authenticated" },
        message: "Checking Antigravity CLI availability...",
      },
    });
  });
}

export function antigravityModelsFromSettings(
  customModels: ReadonlyArray<string> | undefined,
  builtInModels: ReadonlyArray<ServerProviderModel> = ANTIGRAVITY_BUILT_IN_MODELS,
): ReadonlyArray<ServerProviderModel> {
  const sanitizedCustomModels = (customModels ?? []).filter(
    (slug) => !/-(?:low|medium|high|thinking)$/i.test(slug),
  );
  return providerModelsFromSettings(builtInModels, sanitizedCustomModels, GEMINI_CAPABILITIES);
}

export const checkAntigravityProviderStatus = Effect.fn("checkAntigravityProviderStatus")(
  function* (
    antigravitySettings: AntigravitySettings,
    environment: NodeJS.ProcessEnv = process.env,
    cwd?: string,
  ) {
    const checkedAt = yield* Effect.map(DateTime.now, DateTime.formatIso);
    const models = antigravityModelsFromSettings(antigravitySettings.customModels);
    const skills = yield* discoverAntigravitySkills(antigravitySettings, cwd, environment);

    if (!antigravitySettings.enabled) {
      return buildServerProvider({
        presentation: ANTIGRAVITY_PRESENTATION,
        enabled: false,
        checkedAt,
        models,
        skills,
        slashCommands: ANTIGRAVITY_SLASH_COMMANDS,
        probe: {
          installed: false,
          version: null,
          status: "warning",
          auth: { status: "unknown" },
          message: "Antigravity CLI is disabled in T3 Code settings.",
        },
      });
    }

    const binaryPath = antigravitySettings.binaryPath.trim() || "agy";
    const spawnCommand = yield* resolveSpawnCommand(binaryPath, ["--version"], {
      env: environment,
    });
    const command = ChildProcess.make(spawnCommand.command, spawnCommand.args, {
      cwd: cwd ?? process.cwd(),
      env: environment,
      shell: spawnCommand.shell,
    });
    const versionProbe = yield* spawnAndCollect(binaryPath, command).pipe(
      Effect.timeoutOption(VERSION_PROBE_TIMEOUT_MS),
      Effect.result,
    );

    if (Result.isFailure(versionProbe)) {
      const error = versionProbe.failure;
      return buildServerProvider({
        presentation: ANTIGRAVITY_PRESENTATION,
        enabled: true,
        checkedAt,
        models,
        skills,
        slashCommands: ANTIGRAVITY_SLASH_COMMANDS,
        probe: {
          installed: !isCommandMissingCause(error),
          version: null,
          status: "error",
          auth: { status: "unknown" },
          message: isCommandMissingCause(error)
            ? `Antigravity CLI command \`${binaryPath}\` was not found or not on PATH.`
            : "Failed to execute Antigravity CLI health check.",
        },
      });
    }

    if (Option.isNone(versionProbe.success)) {
      return buildServerProvider({
        presentation: ANTIGRAVITY_PRESENTATION,
        enabled: true,
        checkedAt,
        models,
        skills,
        slashCommands: ANTIGRAVITY_SLASH_COMMANDS,
        probe: {
          installed: true,
          version: null,
          status: "error",
          auth: { status: "unknown" },
          message: "Antigravity CLI timed out while running health check.",
        },
      });
    }

    const versionResult = versionProbe.success.value;
    const parsedVersion =
      parseGenericCliVersion(`${versionResult.stdout}\n${versionResult.stderr}`) ??
      versionResult.stdout.trim() ??
      "1.0.0";

    if (versionResult.code !== 0) {
      return buildServerProvider({
        presentation: ANTIGRAVITY_PRESENTATION,
        enabled: true,
        checkedAt,
        models,
        skills,
        slashCommands: ANTIGRAVITY_SLASH_COMMANDS,
        probe: {
          installed: true,
          version: parsedVersion,
          status: "error",
          auth: { status: "unknown" },
          message: `Antigravity CLI returned exit code ${versionResult.code}: ${(versionResult.stderr || versionResult.stdout).trim()}`,
        },
      });
    }

    return buildServerProvider({
      presentation: ANTIGRAVITY_PRESENTATION,
      enabled: true,
      checkedAt,
      models,
      skills,
      slashCommands: ANTIGRAVITY_SLASH_COMMANDS,
      probe: {
        installed: true,
        version: parsedVersion,
        status: "ready",
        auth: { status: "authenticated" },
        message: `Antigravity CLI v${parsedVersion} ready.`,
      },
    });
  },
);
