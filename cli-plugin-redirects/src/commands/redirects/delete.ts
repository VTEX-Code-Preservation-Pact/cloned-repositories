import redirectsDelete from '../../modules/rewriter/delete'
import { CustomCommand, ColorifyConstants } from 'vtex'

export default class RedirectsDelete extends CustomCommand {
  static description = `Deletes redirects from the current ${ColorifyConstants.ID(
    'account'
  )} and ${ColorifyConstants.ID('workspace')}.`

  static examples = [`${ColorifyConstants.COMMAND_OR_VTEX_REF('vtex redirects delete')} csvPath`]

  static flags = {
    ...CustomCommand.globalFlags,
  }

  static args = [{ name: 'csvPath', required: true, description: `CSV file containing the URL paths to delete.` }]

  async run() {
    const {
      args: { csvPath },
    } = this.parse(RedirectsDelete)

    await redirectsDelete(csvPath)
  }
}
