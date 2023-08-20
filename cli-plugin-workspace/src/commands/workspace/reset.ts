import { flags as oclifFlags } from '@oclif/command'

import { CustomCommand, workspaceReset, ColorifyConstants } from 'vtex'

export default class WorkspaceReset extends CustomCommand {
  static description = `Cleans all configurations of a ${ColorifyConstants.ID(
    'workspace'
  )} and recreates it with the configurations from master. If not specified which ${ColorifyConstants.ID(
    'workspace'
  )}, it defaults to the current one.`

  static examples = [
    `${ColorifyConstants.COMMAND_OR_VTEX_REF('vtex workspace reset')}`,
    `${ColorifyConstants.COMMAND_OR_VTEX_REF('vtex workspace reset')} workspaceName`,
  ]

  static flags = {
    ...CustomCommand.globalFlags,
    production: oclifFlags.boolean({
      char: 'p',
      description: `Recreates the ${ColorifyConstants.ID('workspace')} as a production one.`,
      default: false,
    }),
    yes: oclifFlags.boolean({ char: 'y', description: 'Answers yes to all prompts.' }),
  }

  static args = [
    {
      name: 'workspaceName',
      required: false,
      description: `Name of the ${ColorifyConstants.ID('workspace')} to reset.`,
    },
  ]

  async run() {
    const {
      args: { workspaceName },
      flags: { yes, production },
    } = this.parse(WorkspaceReset)

    await workspaceReset(workspaceName, { yes, production })
  }
}
