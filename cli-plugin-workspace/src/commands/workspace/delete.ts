import { flags as oclifFlags } from '@oclif/command'

import workspaceDelete from '../../modules/delete'
import { CustomCommand, ColorifyConstants } from 'vtex'

export default class WorkspaceDelete extends CustomCommand {
  static description = `Deletes one or many ${ColorifyConstants.ID(
    'workspaces'
  )} from the current ${ColorifyConstants.ID('account')}.`

  static examples = [
    `${ColorifyConstants.COMMAND_OR_VTEX_REF('vtex workspace delete')} workspaceName`,
    `${ColorifyConstants.COMMAND_OR_VTEX_REF('vtex workspace delete')} workspaceName1 workspaceName2`,
  ]

  static flags = {
    ...CustomCommand.globalFlags,
    force: oclifFlags.boolean({
      char: 'f',
      description: `Deletes the specified ${ColorifyConstants.ID('workspace')} even if it is currently in use.`,
    }),
    yes: oclifFlags.boolean({ char: 'y', description: 'Answers yes to all prompts.' }),
  }

  static strict = false

  static args = [
    { name: 'workspace1', required: true, description: `Name of the ${ColorifyConstants.ID('workspace')} to delete.` },
    {
      name: 'ithWorkspace',
      required: false,
      multiple: true,
      description: `Name of the multiple ${ColorifyConstants.ID('workspaces')} to delete.`,
    },
  ]

  async run() {
    const {
      raw,
      flags: { force, yes },
    } = this.parse(WorkspaceDelete)

    const names = this.getAllArgs(raw)

    await workspaceDelete(names, { yes, force })
  }
}
