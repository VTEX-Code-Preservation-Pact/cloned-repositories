# VTEX CLI Plugin Config

Extend the `vtex` toolbelt!

## Developing

1. Clone `vtex/toolbelt` and follow the steps on the Contributing section.
2. Clone/Create a plugin with this template.
3. Change the template name under this project's `package.json`.
2. Run `yarn link` on this project.
3. Now run `vtex link @vtex/cli-plugin-config` (or the new name) on the `vtex/toolbelt` project.
4. Run `yarn watch` on the `vtex/toolbelt`
5. Test the command on a VTEX IO app with `vtex-test hello`

For more information, read [Ocliff Docs](https://oclif.io/docs/introduction).

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
![npm](https://img.shields.io/npm/v/@vtex/cli-plugin-config)

<!-- toc -->
* [VTEX CLI Plugin Config](#vtex-cli-plugin-config)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @vtex/cli-plugin-config
$ vtex COMMAND
running command...
$ vtex (-v|--version|version)
@vtex/cli-plugin-config/0.1.2 linux-x64 node-v12.22.1
$ vtex --help [COMMAND]
USAGE
  $ vtex COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`vtex config:get CONFIGNAME`](#vtex-configget-configname)
* [`vtex config:reset CONFIGNAME`](#vtex-configreset-configname)
* [`vtex config:set CONFIGNAME VALUE`](#vtex-configset-configname-value)

## `vtex config:get CONFIGNAME`

Prints the value of the requested configuration key.

```
USAGE
  $ vtex config:get CONFIGNAME

ARGUMENTS
  CONFIGNAME  (env|cluster) Configuration to retrieve the value from.

OPTIONS
  -h, --help     show CLI help
  -v, --verbose  Show debug level logs
  --trace        Ensure all requests to VTEX IO are traced

EXAMPLES
  vtex config get env
  vtex config get cluster
```

_See code: [build/commands/config/get.ts](https://github.com/vtex/cli-plugin-config/blob/v0.1.2/build/commands/config/get.ts)_

## `vtex config:reset CONFIGNAME`

Resets the specified configuration to its default value.

```
USAGE
  $ vtex config:reset CONFIGNAME

ARGUMENTS
  CONFIGNAME  (env|cluster) Name of the configuration to reset.

OPTIONS
  -h, --help     show CLI help
  -v, --verbose  Show debug level logs
  --trace        Ensure all requests to VTEX IO are traced

EXAMPLES
  vtex config reset env
  vtex config reset cluster
```

_See code: [build/commands/config/reset.ts](https://github.com/vtex/cli-plugin-config/blob/v0.1.2/build/commands/config/reset.ts)_

## `vtex config:set CONFIGNAME VALUE`

Sets the value of a configuration key.

```
USAGE
  $ vtex config:set CONFIGNAME VALUE

ARGUMENTS
  CONFIGNAME  (env|cluster) Name of the configuration.
  VALUE       New value of the specified configuration.

OPTIONS
  -h, --help     show CLI help
  -v, --verbose  Show debug level logs
  --trace        Ensure all requests to VTEX IO are traced

EXAMPLES
  vtex config set env envValue
  vtex config set cluster clusterValue
```

_See code: [build/commands/config/set.ts](https://github.com/vtex/cli-plugin-config/blob/v0.1.2/build/commands/config/set.ts)_
<!-- commandsstop -->
