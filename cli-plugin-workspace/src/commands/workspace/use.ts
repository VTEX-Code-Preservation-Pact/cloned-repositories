import { flags as oclifFlags } from '@oclif/command'

import { CustomCommand, workspaceUse, ColorifyConstants } from 'vtex'

export default class WorkspaceUse extends CustomCommand {
  static description = `Creates and switches to a new ${ColorifyConstants.ID(
    'workspace'
  )} or simply switches to an existing one.`

  static examples = [
    `${ColorifyConstants.COMMAND_OR_VTEX_REF('vtex workspace use')} workspaceName`,
    `${ColorifyConstants.COMMAND_OR_VTEX_REF('vtex use')} workspaceName`,
  ]

  static aliases = ['use']

  static flags = {
    ...CustomCommand.globalFlags,
    production: oclifFlags.boolean({
      char: 'p',
      description: `Creates and/or switches to a ${ColorifyConstants.ID('production workspace')}.`,
      default: false,
    }),
    reset: oclifFlags.boolean({
      char: 'r',
      description: `Resets the ${ColorifyConstants.ID('workspace')} before switching to it.`,
      default: false,
    }),
  }

  static args = [{ name: 'workspace', required: true, description: `Name of the ${ColorifyConstants.ID('workspace')}` }]

  async run() {
    const {
      args: { workspace },
      flags: { production, reset },
    } = this.parse(WorkspaceUse)

    await workspaceUse(workspace, { production, reset })
  }
}
