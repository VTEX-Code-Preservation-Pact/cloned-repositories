import { CustomCommand, ColorifyConstants } from 'vtex'
import appsSettingsSet from '../../modules/set'

export default class SettingsSet extends CustomCommand {
  static description = 'Sets value to an app setting.'

  static examples = [
    `${ColorifyConstants.COMMAND_OR_VTEX_REF('vtex settings set')} vtex.service-example fieldName fieldValue`,
    `${ColorifyConstants.COMMAND_OR_VTEX_REF('vtex settings set')} vtex.store enableCriticalCSS true`,
  ]

  static flags = {
    ...CustomCommand.globalFlags,
  }

  static args = [
    { name: 'appName', required: true, description: `Name of the app.` },
    { name: 'field', required: true, description: `Name of the setting.` },
    { name: 'value', required: true, description: `Value of the setting.` },
  ]

  async run() {
    const {
      args: { appName, field, value },
    } = this.parse(SettingsSet)

    await appsSettingsSet(appName, field, value)
  }
}
