# VTEX CLI Plugin Debug

Extend the `vtex` toolbelt!

## Developing

1. Clone `vtex/toolbelt` and follow the steps on the Contributing section.
2. Clone/Create a plugin with this template.
3. Change the template name under this project's `package.json`.
2. Run `yarn link` on this project.
3. Now run `vtex link @vtex/cli-plugin-debug` (or the new name) on the `vtex/toolbelt` project.
4. Run `yarn watch` on the `vtex/toolbelt`
5. Test the command on a VTEX IO app with `vtex-test hello`

For more information, read [Ocliff Docs](https://oclif.io/docs/introduction).

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
![npm](https://img.shields.io/npm/v/@vtex/cli-plugin-debug)

<!-- toc -->
* [VTEX CLI Plugin Debug](#vtex-cli-plugin-debug)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @vtex/cli-plugin-debug
$ vtex COMMAND
running command...
$ vtex (-v|--version|version)
@vtex/cli-plugin-debug/0.0.1 linux-x64 node-v12.20.1
$ vtex --help [COMMAND]
USAGE
  $ vtex COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`vtex debug:dotnet DEBUGINST`](#vtex-debugdotnet-debuginst)

## `vtex debug:dotnet DEBUGINST`

Debug .NET applications (IDEs only)

```
USAGE
  $ vtex debug:dotnet DEBUGINST

OPTIONS
  -h, --help     show CLI help
  -v, --verbose  Show debug level logs
  --trace        Ensure all requests to VTEX IO are traced
```

_See code: [build/commands/debug/dotnet.ts](https://github.com/vtex/cli-plugin-debug/blob/v0.0.1/build/commands/debug/dotnet.ts)_
<!-- commandsstop -->
