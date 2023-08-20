import { CustomCommand, ColorifyConstants } from 'vtex'
import workspaceInfraUpdate from '../../modules/update'

export default class InfraUpdateCommand extends CustomCommand {
  static description = 'Updates all installed infra services.'

  static examples = [`${ColorifyConstants.COMMAND_OR_VTEX_REF('vtex infra update')}`]

  static flags = {
    ...CustomCommand.globalFlags,
  }

  static args = []

  async run() {
    this.parse(InfraUpdateCommand)

    await workspaceInfraUpdate()
  }
}
