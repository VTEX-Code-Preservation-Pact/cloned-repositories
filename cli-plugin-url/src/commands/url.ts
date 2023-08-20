import { CustomCommand, ColorifyConstants } from 'vtex'
import authUrl from '../modules/url'

export default class URL extends CustomCommand {
  static description = `Prints the base URL for the current ${ColorifyConstants.ID('account')}, ${ColorifyConstants.ID(
    'workspace'
  )} and ${ColorifyConstants.ID('environment')}`

  static examples = [`${ColorifyConstants.COMMAND_OR_VTEX_REF('vtex url')}`]

  static flags = {
    ...CustomCommand.globalFlags,
  }

  async run() {
    this.parse(URL)

    console.log(authUrl())
  }
}
