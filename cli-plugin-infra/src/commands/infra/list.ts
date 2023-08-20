import { CustomCommand, ColorifyConstants } from 'vtex'
import { flags as oclifFlags } from '@oclif/command'
import appsInfraList from '../../modules/list'

export default class InfraList extends CustomCommand {
  static description = 'Lists installed infra services.'

  static aliases = ['infra:ls']

  static examples = [
    `${ColorifyConstants.COMMAND_OR_VTEX_REF('vtex infra list')}`,
    `${ColorifyConstants.COMMAND_OR_VTEX_REF('vtex infra ls')}`,
  ]

  static flags = {
    ...CustomCommand.globalFlags,
    filter: oclifFlags.string({ char: 'f', description: 'Lists services that contain the specified word.' }),
    available: oclifFlags.boolean({ char: 'a', description: 'Lists services that are available to install.' }),
  }

  static args = [{ name: 'name', required: false, description: `Service name.` }]

  async run() {
    const {
      args: { name },
      flags: { filter, available },
    } = this.parse(InfraList)

    return appsInfraList(name, { filter, available })
  }
}
