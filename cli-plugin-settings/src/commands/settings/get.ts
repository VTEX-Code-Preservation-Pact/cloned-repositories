import { CustomCommand, ColorifyConstants } from 'vtex'
import appsSettingsGet from '../../modules/get'

export default class SettingsGet extends CustomCommand {
  static description = 'Prints the settings of an app.'

  static aliases = ['settings']

  static examples = [`${ColorifyConstants.COMMAND_OR_VTEX_REF('vtex settings get')} vtex.service-example`]

  static flags = {
    ...CustomCommand.globalFlags,
  }

  static args = [
    { name: 'appName', required: true, description: 'Name of the app to check the available settings.' },
    { name: 'field', description: 'Name of the setting.' },
  ]

  async run() {
    const {
      args: { appName, field },
    } = this.parse(SettingsGet)

    await appsSettingsGet(appName, field ? [field] : null)
  }
}
