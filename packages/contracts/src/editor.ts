import * as Schema from "effect/Schema";
import { TrimmedNonEmptyString } from "./baseSchemas.ts";

export const EditorLaunchStyle = Schema.Literals(["direct-path", "goto", "line-column"]);
export type EditorLaunchStyle = typeof EditorLaunchStyle.Type;

type EditorDefinition = {
  readonly id: string;
  readonly label: string;
  readonly commands: readonly [string, ...string[]] | null;
  readonly macApp?: string;
  readonly baseArgs?: readonly string[];
  readonly launchStyle: EditorLaunchStyle;
  /**
   * URL scheme for editors that support VS Code's remote deep links
   * (`<scheme>://vscode-remote/ssh-remote+<host><path>`). Only set for VS Code
   * and forks that ship the Remote-SSH machinery.
   */
  readonly remoteScheme?: string;
};

export const EDITORS = [
  {
    id: "cursor",
    label: "Cursor",
    commands: ["cursor"],
    macApp: "Cursor",
    launchStyle: "goto",
    remoteScheme: "cursor",
  },
  {
    id: "trae",
    label: "Trae",
    commands: ["trae"],
    macApp: "Trae",
    launchStyle: "goto",
  },
  {
    id: "kiro",
    label: "Kiro",
    commands: ["kiro"],
    macApp: "Kiro",
    baseArgs: ["ide"],
    launchStyle: "goto",
  },
  {
    id: "vscode",
    label: "VS Code",
    commands: ["code"],
    macApp: "Visual Studio Code",
    launchStyle: "goto",
    remoteScheme: "vscode",
  },
  {
    id: "vscode-insiders",
    label: "VS Code Insiders",
    commands: ["code-insiders"],
    macApp: "Visual Studio Code - Insiders",
    launchStyle: "goto",
    remoteScheme: "vscode-insiders",
  },
  {
    id: "vscodium",
    label: "VSCodium",
    commands: ["codium"],
    macApp: "VSCodium",
    launchStyle: "goto",
    remoteScheme: "vscodium",
  },
  {
    id: "zed",
    label: "Zed",
    commands: ["zed", "zeditor"],
    macApp: "Zed",
    launchStyle: "direct-path",
  },
  {
    id: "antigravity",
    label: "Antigravity",
    commands: ["antigravity"],
    macApp: "Antigravity",
    launchStyle: "direct-path",
    remoteScheme: "antigravity",
  },
  {
    id: "idea",
    label: "IntelliJ IDEA",
    commands: ["idea"],
    macApp: "IntelliJ IDEA",
    launchStyle: "line-column",
  },
  {
    id: "aqua",
    label: "Aqua",
    commands: ["aqua"],
    macApp: "Aqua",
    launchStyle: "line-column",
  },
  {
    id: "clion",
    label: "CLion",
    commands: ["clion"],
    macApp: "CLion",
    launchStyle: "line-column",
  },
  {
    id: "datagrip",
    label: "DataGrip",
    commands: ["datagrip"],
    macApp: "DataGrip",
    launchStyle: "line-column",
  },
  {
    id: "dataspell",
    label: "DataSpell",
    commands: ["dataspell"],
    macApp: "DataSpell",
    launchStyle: "line-column",
  },
  {
    id: "goland",
    label: "GoLand",
    commands: ["goland"],
    macApp: "GoLand",
    launchStyle: "line-column",
  },
  {
    id: "phpstorm",
    label: "PhpStorm",
    commands: ["phpstorm"],
    macApp: "PhpStorm",
    launchStyle: "line-column",
  },
  {
    id: "pycharm",
    label: "PyCharm",
    commands: ["pycharm"],
    macApp: "PyCharm",
    launchStyle: "line-column",
  },
  {
    id: "rider",
    label: "Rider",
    commands: ["rider"],
    macApp: "Rider",
    launchStyle: "line-column",
  },
  {
    id: "rubymine",
    label: "RubyMine",
    commands: ["rubymine"],
    macApp: "RubyMine",
    launchStyle: "line-column",
  },
  {
    id: "rustrover",
    label: "RustRover",
    commands: ["rustrover"],
    macApp: "RustRover",
    launchStyle: "line-column",
  },
  {
    id: "webstorm",
    label: "WebStorm",
    commands: ["webstorm"],
    macApp: "WebStorm",
    launchStyle: "line-column",
  },
  {
    id: "file-manager",
    label: "File Manager",
    commands: null,
    launchStyle: "direct-path",
  },
] as const satisfies ReadonlyArray<EditorDefinition>;

export const EditorId = Schema.Literals(EDITORS.map((e) => e.id));
export type EditorId = typeof EditorId.Type;

export const LaunchEditorInput = Schema.Struct({
  cwd: TrimmedNonEmptyString,
  editor: EditorId,
});
export type LaunchEditorInput = typeof LaunchEditorInput.Type;

const remoteSchemeOf = (editor: EditorDefinition): string | undefined => editor.remoteScheme;

/** Editors that can open a remote workspace via `vscode-remote` deep links. */
export const REMOTE_CAPABLE_EDITOR_IDS: ReadonlyArray<EditorId> = EDITORS.flatMap((editor) =>
  remoteSchemeOf(editor) !== undefined ? [editor.id] : [],
);

export const remoteSchemeForEditor = (id: EditorId): string | undefined => {
  const editor = EDITORS.find((candidate) => candidate.id === id);
  return editor === undefined ? undefined : remoteSchemeOf(editor);
};

/**
 * Builds a `<scheme>://vscode-remote/ssh-remote+<host><path>` deep link that
 * opens `absolutePath` on `host` in the local editor over SSH. Returns
 * undefined for editors without remote deep-link support.
 */
export const buildRemoteOpenUrl = (input: {
  readonly editor: EditorId;
  readonly host: string;
  readonly absolutePath: string;
}): string | undefined => {
  const scheme = remoteSchemeForEditor(input.editor);
  if (scheme === undefined) {
    return undefined;
  }
  // Windows server paths (`C:\...`) appear as `/C:/...` in vscode-remote URIs.
  const posixPath = input.absolutePath.replaceAll("\\", "/");
  const rootedPath = posixPath.startsWith("/") ? posixPath : `/${posixPath}`;
  const encodedPath = rootedPath.split("/").map(encodeURIComponent).join("/");
  return `${scheme}://vscode-remote/ssh-remote+${encodeURIComponent(input.host)}${encodedPath}`;
};

/**
 * SSH hostnames an environment advertises for remote open links. Reachability
 * is client-side; the server only advertises names that resolve to itself and
 * gates them on a local sshd listen check. Ordered most-reachable first
 * (tailnet MagicDNS name, then mDNS `<hostname>.local`).
 */
export const RemoteOpenTargetKind = Schema.Literals(["tailscale", "mdns"]);
export type RemoteOpenTargetKind = typeof RemoteOpenTargetKind.Type;

export const RemoteOpenTarget = Schema.Struct({
  kind: RemoteOpenTargetKind,
  host: TrimmedNonEmptyString,
});
export type RemoteOpenTarget = typeof RemoteOpenTarget.Type;

export class ExternalLauncherUnknownEditorError extends Schema.TaggedErrorClass<ExternalLauncherUnknownEditorError>()(
  "ExternalLauncherUnknownEditorError",
  {
    editor: Schema.String,
  },
) {
  override get message(): string {
    return `Unknown editor: ${this.editor}`;
  }
}

export class ExternalLauncherUnsupportedEditorError extends Schema.TaggedErrorClass<ExternalLauncherUnsupportedEditorError>()(
  "ExternalLauncherUnsupportedEditorError",
  {
    editor: EditorId,
  },
) {
  override get message(): string {
    return `Unsupported editor: ${this.editor}`;
  }
}

export class ExternalLauncherCommandNotFoundError extends Schema.TaggedErrorClass<ExternalLauncherCommandNotFoundError>()(
  "ExternalLauncherCommandNotFoundError",
  {
    editor: EditorId,
    command: Schema.String,
  },
) {
  override get message(): string {
    return `Editor command not found: ${this.command}`;
  }
}

const ExternalLauncherSpawnFields = {
  command: Schema.String,
  args: Schema.Array(Schema.String),
  cause: Schema.Defect(),
};

export class ExternalLauncherBrowserSpawnError extends Schema.TaggedErrorClass<ExternalLauncherBrowserSpawnError>()(
  "ExternalLauncherBrowserSpawnError",
  {
    ...ExternalLauncherSpawnFields,
    target: Schema.String,
  },
) {
  override get message(): string {
    return `Failed to launch browser target '${this.target}' with '${[this.command, ...this.args].join(" ")}'`;
  }
}

export class ExternalLauncherEditorSpawnError extends Schema.TaggedErrorClass<ExternalLauncherEditorSpawnError>()(
  "ExternalLauncherEditorSpawnError",
  {
    ...ExternalLauncherSpawnFields,
    editor: EditorId,
    target: Schema.String,
  },
) {
  override get message(): string {
    return `Failed to launch '${this.target}' in ${this.editor} with '${[this.command, ...this.args].join(" ")}'`;
  }
}

export const ExternalLauncherError = Schema.Union([
  ExternalLauncherUnknownEditorError,
  ExternalLauncherUnsupportedEditorError,
  ExternalLauncherCommandNotFoundError,
  ExternalLauncherBrowserSpawnError,
  ExternalLauncherEditorSpawnError,
]);
export type ExternalLauncherError = typeof ExternalLauncherError.Type;

export const isExternalLauncherError = Schema.is(ExternalLauncherError);
