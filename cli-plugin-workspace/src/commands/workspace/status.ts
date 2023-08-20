import { CustomCommand, ColorifyConstants } from 'vtex'
import workspaceStatus from '../../modules/status'

export default class WorkspaceStatus extends CustomCommand {
  static description = `Displays information about the specified ${ColorifyConstants.ID('workspace')}.`

  static examples = [`${ColorifyConstants.ID('vtex workspace status')}`]

  static flags = {
    ...CustomCommand.globalFlags,
  }

  static args = [
    { name: 'workspaceName', required: false, description: `Name of the ${ColorifyConstants.ID('workspace')}.` },
  ]

  async run() {
    const {
      args: { workspaceName },
    } = this.parse(WorkspaceStatus)

    await workspaceStatus(workspaceName)
  }
}
