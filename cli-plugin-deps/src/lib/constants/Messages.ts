import chalk from 'chalk'
import { ColorifyConstants } from 'vtex'

export const Messages = {
  DEPS_DIFF_INIT: (workspace1: string, workspace2: string) =>
    `${chalk.bold('Dependency diff')} between ${ColorifyConstants.ID(workspace1)} and ${ColorifyConstants.ID(
      workspace2
    )}`,
  DEPS_DIFF_EMPTY: (workspace1: string, workspace2: string) =>
    `${Messages.DEPS_DIFF_INIT(workspace1, workspace2)} is empty\n`,
  DEPS_LIST_INIT: 'Starting to list dependencies',
  DEPS_UPDATE_INIT: (locator: string) => `Starting to update ${locator}`,
  DEPS_UPDATE_INIT_PROCESS: 'Starting update process',
  DEPS_UPDATE_INVALID_FORMAT_ERROR: (locator: string) =>
    `App ${locator} has an invalid app format, please use <vendor>.<name>@<version>`,
  DEPS_UPDATE_EMPTY: 'No dependencies updated',
}
