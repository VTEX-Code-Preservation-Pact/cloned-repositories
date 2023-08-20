import { flags as oclifFlags } from '@oclif/command'

import { CustomCommand, ColorifyConstants } from 'vtex'
import redirectsImport from '../../modules/rewriter/import'

export default class RedirectsImport extends CustomCommand {
  static description = `Imports redirects from a CSV file to the current ${ColorifyConstants.ID(
    'account'
  )} and ${ColorifyConstants.ID('workspace')}.`

  static examples = [`${ColorifyConstants.COMMAND_OR_VTEX_REF('vtex redirects import')} csvPath`]

  static flags = {
    ...CustomCommand.globalFlags,
    reset: oclifFlags.boolean({ char: 'r', description: 'Removes all redirects previously defined.', default: false }),
  }

  static args = [{ name: 'csvPath', required: true, description: 'Name of the CSV file.' }]

  async run() {
    const {
      args: { csvPath },
      flags: { reset },
    } = this.parse(RedirectsImport)

    await redirectsImport(csvPath, { reset })
  }
}
