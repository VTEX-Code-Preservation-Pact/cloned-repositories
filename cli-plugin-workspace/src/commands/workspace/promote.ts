import { flags } from '@oclif/command'

import workspacePromote from '../../modules/promote'
import { CustomCommand, ColorifyConstants } from 'vtex'

const conflictFlagMapping: { [flag: string]: string } = {
  master: 'MasterWins',
  mine: 'MineWins',
  abort: 'Abort',
}

const conflictFlagDescription = [
  `Defines how to handle data conflict between ${ColorifyConstants.ID('workspaces')}.`,
  `- master: Discards the ${ColorifyConstants.ID(
    `workspace's`
  )} conflicting data, keeping the data from master unchanged.`,
  `- mine: Overrides the master with the specified ${ColorifyConstants.ID(
    'workspace'
  )}. Any conflicting data on the master is lost.`,
  `- abort: Aborts the ${ColorifyConstants.ID('workspace')} promotion in case of data conflict.`,
].join('\n')

const conflictResolutionFlag = flags.string({
  description: conflictFlagDescription,
  options: ['master', 'mine', 'abort'],
  default: 'master',
})

export default class WorkspacePromote extends CustomCommand {
  static description = `Promotes the current ${ColorifyConstants.ID(
    'workspace'
  )} to master. (Only works for ${ColorifyConstants.ID(
    'production workspaces'
  )}.) Run ${ColorifyConstants.COMMAND_OR_VTEX_REF('vtex promote --help')} to see how to deal with data conflicts.`

  static aliases = ['promote']

  static examples = [
    `${ColorifyConstants.COMMAND_OR_VTEX_REF('vtex workspace promote')}`,
    `${ColorifyConstants.COMMAND_OR_VTEX_REF('vtex promote')}`,
  ]

  static flags = {
    ...CustomCommand.globalFlags,
    conflict: conflictResolutionFlag,
  }

  static args = []

  async run() {
    const {
      flags: { conflict },
    } = this.parse(WorkspacePromote)

    await workspacePromote(conflictFlagMapping[conflict])
  }
}
