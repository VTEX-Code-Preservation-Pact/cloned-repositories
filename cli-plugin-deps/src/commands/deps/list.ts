import { flags as oclifFlags } from '@oclif/command'

import { CustomCommand, ColorifyConstants } from 'vtex'
import workspaceDepsList from '../../modules/deps/list'

export default class DepsList extends CustomCommand {
  static aliases = ['deps:ls']

  static description = `Displays the complete dependency tree of the current workspace.`

  static examples = [
    `${ColorifyConstants.COMMAND_OR_VTEX_REF('vtex deps list')}`,
    `${ColorifyConstants.COMMAND_OR_VTEX_REF('vtex deps ls')}`,
  ]

  static flags = {
    ...CustomCommand.globalFlags,
    keys: oclifFlags.boolean({ char: 'k', description: 'Shows only key dependencies.', default: false }),
    npm: oclifFlags.boolean({ char: 'n', description: 'Includes dependencies from npm registry.', default: false }),
  }

  static args = []

  async run() {
    const { flags } = this.parse(DepsList)

    await workspaceDepsList(flags)
  }
}
