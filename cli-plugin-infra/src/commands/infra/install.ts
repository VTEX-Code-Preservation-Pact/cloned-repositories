import { CustomCommand, ColorifyConstants } from 'vtex'
import appsInfraInstall from '../../modules/install'

export default class InfraInstall extends CustomCommand {
  static description = 'Installs an infra service.'

  static examples = [
    `${ColorifyConstants.COMMAND_OR_VTEX_REF('vtex infra install')} infra-service`,
    `${ColorifyConstants.COMMAND_OR_VTEX_REF('vtex infra install')} infra-service@0.0.1`,
  ]

  static flags = { ...CustomCommand.globalFlags }

  static args = [
    {
      name: 'serviceId',
      required: true,
      description: `Name and version of the service ${ColorifyConstants.ID(
        '({vendor}.{servicename}@{x.x.x})'
      )} to install.`,
    },
  ]

  async run() {
    const { args } = this.parse(InfraInstall)
    const name = args.serviceId

    await appsInfraInstall(name)
  }
}
