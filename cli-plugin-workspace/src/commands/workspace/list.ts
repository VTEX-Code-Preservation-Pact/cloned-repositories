import { CustomCommand, ColorifyConstants } from 'vtex'
import workspaceList from '../../modules/list'

export default class WorkspaceList extends CustomCommand {
  static description = `Lists all ${ColorifyConstants.ID('workspaces')} of the current ${ColorifyConstants.ID(
    'account'
  )}.`

  static aliases = ['workspace:ls']

  static examples = [
    `${ColorifyConstants.COMMAND_OR_VTEX_REF('vtex workspace list')}`,
    `${ColorifyConstants.COMMAND_OR_VTEX_REF('vtex workspace ls')}`,
  ]

  static flags = {
    ...CustomCommand.globalFlags,
  }

  static args = []

  async run() {
    this.parse(WorkspaceList)

    workspaceList()
  }
}
