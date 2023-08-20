import { CustomCommand, ColorifyConstants } from 'vtex'
import workspaceDepsUpdate from '../../modules/deps/update'

export default class DepsUpdate extends CustomCommand {
  static description = `Updates a dependency of the current workspace. If not specified which dependency, it updates all of them.`

  static examples = [
    `${ColorifyConstants.COMMAND_OR_VTEX_REF('vtex deps update')}`,
    `${ColorifyConstants.COMMAND_OR_VTEX_REF('vtex deps update')} vtex.service-example@0.0.1`,
  ]

  static flags = {
    ...CustomCommand.globalFlags,
  }

  static strict = false

  static args = [
    {
      name: 'appId',
      required: false,
      description: `Name and version of the app ${ColorifyConstants.ID('({vendor}.{appname}@{x.x.x})')} to update.`,
    },
    {
      name: 'ithAppId',
      required: false,
      multiple: true,
      description: `Names and versions of the multiple apps ${ColorifyConstants.ID(
        '({vendor}.{appname}@{x.x.x})'
      )} to update.`,
    },
  ]

  async run() {
    const { raw } = this.parse(DepsUpdate)

    const allArgs = this.getAllArgs(raw)

    await workspaceDepsUpdate(allArgs)
  }
}
