# VTEX CLI Plugin Template

This repository is a template containing all the essential boilerplates to help you create new Toolbelt plugins. With this template, you'll be able to develop and locally test your new plugin commands on any VTEX IO app.

> ℹ️ *[Toolbelt](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-toolbelt) is a command-line interface that provides all the necessary features to start developing apps with VTEX IO. To see which commands the Toolbelt natively includes, check [our docs](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-vtex-io-cli-installation-and-command-reference) or run `vtex` in your terminal.*

In the following sections, you'll learn how to make better use of this template and all the necessary steps to create any Toolbelt plugin you want.

## Prerequisites

Before proceeding any further, we recommend you to:

1. Clone the [Toolbelt repository](https://github.com/vtex/toolbelt) into your local files.

2. Check if you have the Toolbelt correctly installed in your machine.

>⚠️ *We highly recommend that you install the Toolbelt using `yarn`. Follow [these instructions](https://github.com/vtex/toolbelt/#getting-started-installing-the-vtex-toolbelt) for more information on why.*

3. Install the [`releasy`](https://github.com/vtex/releasy) package by running `yarn global add releasy`.

4. Check our [Toolbelt design guidelines](https://github.com/vtex/ux-writing/blob/new-content/docs/text-patterns/toolbelt-cli.md) for keeping up with the **best practices** when developing your plugin.

5. Check [oclif](https://oclif.io/) basic concepts.

>ℹ️ Toolbelt is built with [oclif](https://oclif.io/docs/introduction), a framework for building extensible CLIs in Node.

### Setting up the local development environment

To locally test your plugins as you code, you'll need to use the `yarn watch` command, which is responsible for creating a [symlink](https://en.wikipedia.org/wiki/Symbolic_link) named `vtex-test`.

To use the `yarn watch` command, you must add `$HOME/.vtex/dev/bin` to your `PATH` environment variable. Take the following steps:

>⚠️ ***Keep in mind:** these steps may vary depending on your operating system.*

1. Open the `~/.bashrc` file (or the corresponding shell configuration file).
2. At the end of this file, add the line: `export PATH=$PATH:$HOME/.vtex/dev/bin`.
3. Save it.
4. Run the command `source ~/.bashrc` (or corresponding file).

## Creating a new plugin

### Step 1: Creating and organizing your repository

1. [Create a new repository from this template](https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template) inside the [`vtex` organization.](https://github.com/vtex)
2. Open the `package.json` and update the `name` and `description` fields, according to your scenario.

>⚠️ *Please keep the standard `@vtex/cli-plugin-{name}` when naming your plugin.*

3. Check if `vtex` under `devdependecies` in the `package.json` file is referring to the [last version of the Toolbelt](https://github.com/vtex/toolbelt/releases) and update it if necessary.

4. Open the `readme.md` file and update it, ensuring that you replace `template` with the name of your plugin and removing any unnecessary content.

>⚠️ *You don't need to worry about updating the [usage](#usage) and [command](#command) references, since these sections will be automatically updated.*

### Step 2: Developing your plugin

Develop your plugin commands inside the `/src/commands/` folder, referring to the [oclif API reference](https://oclif.io/docs/commands) and `/src/commands/hello.ts` example file.

Also, if necessary, feel free to create libraries, clients, and [modules](https://oclif.io/docs/running_programmatically#sharing-code-with-modules) inside your `src` folder.

>ℹ️ *Please refer to our [Toolbelt design guidelines](https://github.com/vtex/ux-writing/blob/new-content/docs/text-patterns/toolbelt-cli.md) for keeping up with the **best practices** when developing your plugin.*

### Step 3: Testing your plugin

#### Testing your plugin alone
At project root, run: `./bin/run`

#### Linking and testing with Toolbelt

Before the steps to link, you need to ensure that your plugin already is in the two places on the Toolbelt package.json: The "dependencies" and "plugins". If aren't, run:

`yarn add ./{path-do-plugin}/cli-plugin-{name}`

And manually add your plugin to "plugins" at toolbelt/package.json.

Now, let's link:

1. Run `yarn link` in your plugin project.
2. Now, in the **cloned** Toolbelt directory, run `yarn link @vtex/cli-plugin-{name}`.
3. Run `yarn watch` in both the cloned `vtex/toolbelt` and in the `plugin repo`. 

A symlink named `vtex-test` will be created and you'll be able to locally test your plugin as you develop it. That means, for example, that you can test your plugin commands on any VTEX IO app by locally running `vtex-test {command-name}`.

### Step 4: Standardizing and deploying your plugin

If you're satisfied with the tests performed and the developed plugin:

1. Access your profile on [npm](https://www.npmjs.com/). As a part of the `vtex` organization, you'll have access to [generate a new **publish** token.](https://docs.npmjs.com/creating-and-viewing-access-tokens)
2. Copy the generated token.
3. Open your plugin repository on GitHub.
4. Go to *Settings > Secrets* and [create a new repository secret](https://docs.github.com/en/free-pro-team@latest/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository) with the name `NPM_TOKEN` and paste the value of the previously generated token.

>⚠️ *Please use capital letters for `NPM_TOKEN`.*

5. Now, go to *Settings > Manage access* and include the [IO DevTools](https://github.com/orgs/vtex/teams/io-devtools) and [IO Framework](https://github.com/orgs/vtex/teams/io-framework) teams as admins.

>⚠️ *If you're already part of one of those teams, please consider removing your single access.*

6. In the *Settings > Branches* section, [add a new rule](https://docs.github.com/en/free-pro-team@latest/github/administering-a-repository/configuring-protected-branches) to the master branch, making sure you check the following options:

- Require pull request reviews before merging (Required approving reviews: 1).
- Require status checks to pass before merging.
    - Require branches to be up to date before merging.

7. Open a pull request containing the changes in your plugin repository. 
8. Wait for comments from reviewers, discuss and fix any related issues. Once you receive an LGTM, deploy your plugin using the [releasy](https://github.com/vtex/releasy#usage) package.

Once the CI tests are completed, your package will be automatically available on [`npm`](https://www.npmjs.com/) as part of the `vtex` organization.

### [OPTIONAL] Step 5: Adding your new plugin to the Toolbelt

The [Toolbelt](https://github.com/vtex/toolbelt) project adheres to a strict pull request review workflow.

To request including your plugin in the Toolbelt, update the [Toolbelt `dependencies`](https://github.com/vtex/toolbelt/blob/master/package.json#L52) and the [`CHANGELOG.md`](https://github.com/vtex/toolbelt/blob/master/CHANGELOG.md) file. Open a pull request, explaining what your plugin does, wait for comments from reviewers, discuss and fix any related issues. Once you receive an LGTM, you'll be able to merge it to the master branch.

>⚠️ ***Keep in mind:** If your plugin is not accepted in the [Toolbelt](https://github.com/vtex/toolbelt) project, you can still use it **locally**. For that, you need to go inside de cloned toolbelt repo and fire the command `yarn add PLUGIN_NAME`, then add plugin name in `package.json` in `oclif:plugins` section - [example](https://github.com/vtex/toolbelt/blob/2e8924bddb95d7f308d448584ac63ec8b121f877/package.json#L170) -. Run `yarn watch` and use `vtex-test` to use it. In these cases, however, VTEX does not support, neither takes any responsibility for any damages caused by the developed plugin.*

# README.md plugin template

Please refer to the following sections as a template for your plugin README.md file. 

## Usage
<!-- usage -->
```sh-session
$ npm install -g @vtex/cli-plugin-template
$ vtex COMMAND
running command...
$ vtex (-v|--version|version)
@vtex/cli-plugin-template/0.0.0 linux-x64 node-v12.22.7
$ vtex --help [COMMAND]
USAGE
  $ vtex COMMAND
...
```
<!-- usagestop -->
## Commands
<!-- commands -->
* [`vtex hello [FILE]`](#vtex-hello-file)

## `vtex hello [FILE]`

describe the command here

```
USAGE
  $ vtex hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
  -v, --verbose    Show debug level logs
  --trace          Ensure all requests to VTEX IO are traced

EXAMPLE
  $ oclif-example hello
  hello world from ./src/hello.ts!
```

_See code: [build/commands/hello.ts](https://github.com/vtex/cli-plugin-template/blob/v0.0.0/build/commands/hello.ts)_
<!-- commandsstop -->
