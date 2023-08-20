import { CustomCommand, ColorifyConstants } from 'vtex'
import configGet from '../../modules/get'

export default class ConfigGet extends CustomCommand {
  static description = 'Prints the value of the requested configuration key.'

  static aliases = []

  static examples = [
    `${ColorifyConstants.COMMAND_OR_VTEX_REF('vtex config get')} env`,
    `${ColorifyConstants.COMMAND_OR_VTEX_REF('vtex config get')} cluster`,
  ]

  static flags = {
    ...CustomCommand.globalFlags,
  }

  static args = [
    {
      name: 'configName',
      required: true,
      options: ['env', 'cluster'],
      description: 'Configuration to retrieve the value from.',
    },
  ]

  async run() {
    const {
      args: { configName },
    } = this.parse(ConfigGet)

    configGet(configName)
  }
}
