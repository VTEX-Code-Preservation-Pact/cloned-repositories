import { flags as oclifFlags } from '@oclif/command'

import { CustomCommand, ColorifyConstants, COLORS } from 'vtex'
import chalk from 'chalk'
import { showReports } from '../../modules/showReports'

export default class ShowReports extends CustomCommand {
  static description = 'Shows a previous audit report, filtering by app and/or URL.'

  static examples = [
    `${ColorifyConstants.COMMAND_OR_VTEX_REF('vtex lighthouse show')} --app=vtex.awesome-app`,
    `${ColorifyConstants.COMMAND_OR_VTEX_REF('vtex lighthouse show')} -u ${chalk.hex(COLORS.BLUE)(
      'https://awesome.store.com'
    )}`,
    `${ColorifyConstants.COMMAND_OR_VTEX_REF('vtex lighthouse show')} -a vtex.awesome-app --url=${chalk.hex(
      COLORS.BLUE
    )('https://awesome.store.com')}`,
    `${ColorifyConstants.COMMAND_OR_VTEX_REF('vtex lh show')} --app=vtex.awesome-app`,
    `${ColorifyConstants.COMMAND_OR_VTEX_REF('vtex lh show')} -u ${chalk.hex(COLORS.BLUE)(
      'https://awesome.store.com'
    )}`,
    `${ColorifyConstants.COMMAND_OR_VTEX_REF('vtex lh show')} -a vtex.awesome-app --url=${chalk.hex(COLORS.BLUE)(
      'https://awesome.store.com'
    )}`,
  ]

  static aliases = ['lh:show']

  static flags = {
    ...CustomCommand.globalFlags,
    app: oclifFlags.string({ char: 'a', description: 'Filters by the specified app.' }),
    url: oclifFlags.string({ char: 'u', description: 'Filters by the specified URL.' }),
  }

  async run() {
    const {
      flags: { app, url },
    } = this.parse(ShowReports)

    await showReports(app, url)
  }
}
