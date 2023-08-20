cli-plugin-lighthouse
===================

vtex plugin template

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
![npm](https://img.shields.io/npm/v/@vtex/cli-plugin-lighthouse)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @vtex/cli-plugin-lighthouse
$ oclif-example COMMAND
running command...
$ oclif-example (-v|--version|version)
@vtex/cli-plugin-lighthouse/1.0.0 linux-x64 node-v12.22.1
$ oclif-example --help [COMMAND]
USAGE
  $ oclif-example COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`oclif-example lighthouse:audit URL`](#oclif-example-lighthouseaudit-url)
* [`oclif-example lighthouse:show`](#oclif-example-lighthouseshow)

## `oclif-example lighthouse:audit URL`

Runs a Lighthouse audit over the specified URL.

```
USAGE
  $ oclif-example lighthouse audit URL

ARGUMENTS
  URL  URL to audit.

OPTIONS
  -h, --help     show CLI help
  -j, --json     Returns the report as a json on stdout.
  -v, --verbose  Show debug level logs
  --trace        Ensure all requests to VTEX IO are traced

ALIASES
  $ oclif-example lh audit

EXAMPLES
  vtex lighthouse audit my.url.com
  vtex lh audit my.url.com
```

_See code: [build/commands/lighthouse/audit.ts](https://github.com/vtex/cli-plugin-lighthouse/blob/v1.0.0/build/commands/lighthouse/audit.ts)_

## `oclif-example lighthouse:show`

Shows a previous audit report, filtering by app and/or URL.

```
USAGE
  $ oclif-example lighthouse show

OPTIONS
  -a, --app=app  Filters by the specified app.
  -h, --help     show CLI help
  -u, --url=url  Filters by the specified URL.
  -v, --verbose  Show debug level logs
  --trace        Ensure all requests to VTEX IO are traced

ALIASES
  $ oclif-example lh show

EXAMPLES
  vtex lighthouse show --app=vtex.awesome-app
  vtex lighthouse show -u https://awesome.store.com
  vtex lighthouse show -a vtex.awesome-app --url=https://awesome.store.com
  vtex lh show --app=vtex.awesome-app
  vtex lh show -u https://awesome.store.com
  vtex lh show -a vtex.awesome-app --url=https://awesome.store.com
```

_See code: [build/commands/lighthouse/show.ts](https://github.com/vtex/cli-plugin-lighthouse/blob/v1.0.0/build/commands/lighthouse/show.ts)_
<!-- commandsstop -->
