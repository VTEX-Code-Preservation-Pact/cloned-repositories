import { CustomCommand, ColorifyConstants } from 'vtex'
import redirectsExport from '../../modules/rewriter/export'

export default class RedirectsExport extends CustomCommand {
  static description = `Exports all redirects defined in the current ${ColorifyConstants.ID(
    'account'
  )} and ${ColorifyConstants.ID('workspace')} to a CSV file.`

  static examples = [`${ColorifyConstants.COMMAND_OR_VTEX_REF('vtex redirects export')} csvPath`]

  static flags = {
    ...CustomCommand.globalFlags,
  }

  static args = [{ name: 'csvPath', required: true, description: 'Name of the CSV file.' }]

  async run() {
    const {
      args: { csvPath },
    } = this.parse(RedirectsExport)

    await redirectsExport(csvPath)
  }
}
