import { CustomCommand, ColorifyConstants } from 'vtex'
import appsSettingsUnset from '../../modules/unset'

export default class SettingsUnset extends CustomCommand {
  static description = 'Disables the specified app setting.'

  static examples = [`${ColorifyConstants.COMMAND_OR_VTEX_REF('vtex settings unset')} vtex.service-example fieldName`]

  static flags = {
    ...CustomCommand.globalFlags,
  }

  static args = [
    { name: 'appName', required: true, description: `Name of the app.` },
    { name: 'field', required: true, description: `Name of the setting.` },
  ]

  async run() {
    const {
      args: { appName, field },
    } = this.parse(SettingsUnset)

    await appsSettingsUnset(appName, field)
  }
}
