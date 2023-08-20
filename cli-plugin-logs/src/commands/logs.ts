import { flags as oclifFlags } from '@oclif/command'

import { CustomCommand, ColorifyConstants } from 'vtex'
import appsLogs from '../modules/logs'

export default class Logs extends CustomCommand {
  static description = 'Shows logs of an app. (Only apps in production.)'

  static examples = [
    `${ColorifyConstants.COMMAND_OR_VTEX_REF('vtex logs')}`,
    `${ColorifyConstants.COMMAND_OR_VTEX_REF('vtex logs')} appName`,
    `${ColorifyConstants.COMMAND_OR_VTEX_REF('vtex logs')} --all`,
    `${ColorifyConstants.COMMAND_OR_VTEX_REF('vtex logs')} appName --past`,
  ]

  static flags = {
    ...CustomCommand.globalFlags,
    all: oclifFlags.boolean({
      char: 'a',
      description: `Shows logs of every app installed on the current ${ColorifyConstants.ID('account')}.`,
      default: false,
    }),
    past: oclifFlags.boolean({
      char: 'p',
      description: `Shows previous logs of the specified app.`,
      default: false,
    }),
  }

  static args = [{ name: 'app', required: false, description: `Name of the app to show logs.` }]

  async run() {
    const {
      args: { app },
      flags,
    } = this.parse(Logs)

    await appsLogs(app, flags)
  }
}
