import { CustomCommand, ColorifyConstants } from 'vtex'
import configSet from '../../modules/set'

export default class ConfigSet extends CustomCommand {
  static description = 'Sets the value of a configuration key.'

  static aliases = []

  static examples = [
    `${ColorifyConstants.COMMAND_OR_VTEX_REF('vtex config set')} env envValue`,
    `${ColorifyConstants.COMMAND_OR_VTEX_REF('vtex config set')} cluster clusterValue`,
  ]

  static flags = {
    ...CustomCommand.globalFlags,
  }

  static args = [
    { name: 'configName', required: true, options: ['env', 'cluster'], description: 'Name of the configuration.' },
    { name: 'value', required: true, description: 'New value of the specified configuration.' },
  ]

  async run() {
    const {
      args: { configName, value },
    } = this.parse(ConfigSet)

    configSet(configName, value)
  }
}
