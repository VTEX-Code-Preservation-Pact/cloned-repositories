# VTEX CLI Plugin Deps

Extend the `vtex` toolbelt!

## Developing

1. Clone `vtex/toolbelt` and follow the steps on the Contributing section.
2. Clone/Create a plugin with this template.
3. Change the template name under this project's `package.json`.
2. Run `yarn link` on this project.
3. Now run `vtex link @vtex/cli-plugin-template` (or the new name) on the `vtex/toolbelt` project.
4. Run `yarn watch` on the `vtex/toolbelt`
5. Test the command on a VTEX IO app with `vtex-test hello`

For more information, read [Ocliff Docs](https://oclif.io/docs/introduction).

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
![npm](https://img.shields.io/npm/v/@vtex/cli-plugin-deps)

<!-- toc -->
* [VTEX CLI Plugin Deps](#vtex-cli-plugin-deps)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @vtex/cli-plugin-deps
$ oclif-example COMMAND
running command...
$ oclif-example (-v|--version|version)
@vtex/cli-plugin-deps/0.1.1 linux-x64 node-v12.21.0
$ oclif-example --help [COMMAND]
USAGE
  $ oclif-example COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`oclif-example deps:diff [WORKSPACE1] [WORKSPACE2]`](#oclif-example-depsdiff-workspace1-workspace2)
* [`oclif-example deps:list`](#oclif-example-depslist)
* [`oclif-example deps:update [APPID] [ITHAPPID]`](#oclif-example-depsupdate-appid-ithappid)

## `oclif-example deps:diff [WORKSPACE1] [WORKSPACE2]`

Displays the differences between the dependencies of two distinct workspaces. If a single parameter is passed, the specified workspace's dependencies are compared with the master's. If no parameter is passed, the diff is made between the current workspace and master.

```
USAGE
  $ oclif-example deps:diff [WORKSPACE1] [WORKSPACE2]

ARGUMENTS
  WORKSPACE1  First workspace for comparison.
  WORKSPACE2  [default: master] Second workspace for comparison.

OPTIONS
  -h, --help     show CLI help
  -v, --verbose  Show debug level logs
  --trace        Ensure all requests to VTEX IO are traced

EXAMPLE
  vtex deps diff workspace1 workspace2
```

_See code: [build/commands/deps/diff.ts](https://github.com/vtex/cli-plugin-deps/blob/v0.1.1/build/commands/deps/diff.ts)_

## `oclif-example deps:list`

Displays the complete dependency tree of the current workspace.

```
USAGE
  $ oclif-example deps:list

OPTIONS
  -h, --help     show CLI help
  -k, --keys     Shows only key dependencies.
  -n, --npm      Includes dependencies from npm registry.
  -v, --verbose  Show debug level logs
  --trace        Ensure all requests to VTEX IO are traced

ALIASES
  $ oclif-example deps:ls

EXAMPLES
  vtex deps list
  vtex deps ls
```

_See code: [build/commands/deps/list.ts](https://github.com/vtex/cli-plugin-deps/blob/v0.1.1/build/commands/deps/list.ts)_

## `oclif-example deps:update [APPID] [ITHAPPID]`

Updates a dependency of the current workspace. If not specified which dependency, it updates all of them.

```
USAGE
  $ oclif-example deps:update [APPID] [ITHAPPID]

ARGUMENTS
  APPID     Name and version of the app ({vendor}.{appname}@{x.x.x}) to update.
  ITHAPPID  Names and versions of the multiple apps ({vendor}.{appname}@{x.x.x}) to update.

OPTIONS
  -h, --help     show CLI help
  -v, --verbose  Show debug level logs
  --trace        Ensure all requests to VTEX IO are traced

EXAMPLES
  vtex deps update
  vtex deps update vtex.service-example@0.0.1
```

_See code: [build/commands/deps/update.ts](https://github.com/vtex/cli-plugin-deps/blob/v0.1.1/build/commands/deps/update.ts)_
<!-- commandsstop -->
