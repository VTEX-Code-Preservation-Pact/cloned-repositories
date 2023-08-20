import { CustomCommand, ColorifyConstants } from 'vtex'
import workspaceReset from '../../modules/reset'

export default class ConfigReset extends CustomCommand {
  static description = 'Resets the specified configuration to its default value.'

  static aliases = []

  static examples = [
    `${ColorifyConstants.COMMAND_OR_VTEX_REF('vtex config reset')} env`,
    `${ColorifyConstants.COMMAND_OR_VTEX_REF('vtex config reset')} cluster`,
  ]

  static flags = {
    ...CustomCommand.globalFlags,
  }

  static args = [
    {
      name: 'configName',
      required: true,
      options: ['env', 'cluster'],
      description: 'Name of the configuration to reset.',
    },
  ]

  async run() {
    const {
      args: { configName },
    } = this.parse(ConfigReset)

    workspaceReset(configName)
  }
}
