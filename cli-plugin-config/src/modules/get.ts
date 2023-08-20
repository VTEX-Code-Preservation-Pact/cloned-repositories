import chalk from 'chalk'

import { createFlowIssueError, getEnvironment, getCluster } from 'vtex'

export default (name: string) => {
  switch (name) {
    case 'env':
      console.log(getEnvironment() || '')
      break

    case 'cluster':
      console.log(getCluster())
      break

    default:
      throw createFlowIssueError(`The supported configurations are: ${chalk.blue('env')}, ${chalk.blue('cluster')}`)
  }
}
