# VTEX CLI Plugin Template

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
![npm](https://img.shields.io/npm/v/@vtex/cli-plugin-infra)

<!-- toc -->
* [VTEX CLI Plugin Template](#vtex-cli-plugin-template)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @vtex/cli-plugin-infra
$ vtex COMMAND
running command...
$ vtex (-v|--version|version)
@vtex/cli-plugin-infra/1.0.0 linux-x64 node-v12.22.1
$ vtex --help [COMMAND]
USAGE
  $ vtex COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`vtex infra:install SERVICEID`](#vtex-infrainstall-serviceid)
* [`vtex infra:list [NAME]`](#vtex-infralist-name)
* [`vtex infra:update`](#vtex-infraupdate)

## `vtex infra:install SERVICEID`

Installs an infra service.

```
USAGE
  $ vtex infra:install SERVICEID

ARGUMENTS
  SERVICEID  Name and version of the service ({vendor}.{servicename}@{x.x.x}) to install.

OPTIONS
  -h, --help     show CLI help
  -v, --verbose  Show debug level logs
  --trace        Ensure all requests to VTEX IO are traced

EXAMPLES
  vtex infra install infra-service
  vtex infra install infra-service@0.0.1
```

_See code: [build/commands/infra/install.ts](https://github.com/vtex/cli-plugin-infra/blob/v1.0.0/build/commands/infra/install.ts)_

## `vtex infra:list [NAME]`

Lists installed infra services.

```
USAGE
  $ vtex infra:list [NAME]

ARGUMENTS
  NAME  Service name.

OPTIONS
  -a, --available      Lists services that are available to install.
  -f, --filter=filter  Lists services that contain the specified word.
  -h, --help           show CLI help
  -v, --verbose        Show debug level logs
  --trace              Ensure all requests to VTEX IO are traced

ALIASES
  $ vtex infra:ls

EXAMPLES
  vtex infra list
  vtex infra ls
```

_See code: [build/commands/infra/list.ts](https://github.com/vtex/cli-plugin-infra/blob/v1.0.0/build/commands/infra/list.ts)_

## `vtex infra:update`

Updates all installed infra services.

```
USAGE
  $ vtex infra:update

OPTIONS
  -h, --help     show CLI help
  -v, --verbose  Show debug level logs
  --trace        Ensure all requests to VTEX IO are traced

EXAMPLE
  vtex infra update
```

_See code: [build/commands/infra/update.ts](https://github.com/vtex/cli-plugin-infra/blob/v1.0.0/build/commands/infra/update.ts)_
<!-- commandsstop -->
