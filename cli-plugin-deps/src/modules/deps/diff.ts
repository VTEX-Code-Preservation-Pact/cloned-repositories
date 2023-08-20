import { SessionManager, matchedDepsDiffTable } from 'vtex'
import { getCleanDependencies } from './utils'
import { Messages } from '../../lib/constants/Messages'

export default async (workspace1 = 'master', workspace2?: string) => {
  workspace2 = workspace2 ?? SessionManager.getSingleton().workspace

  const deps1 = await getCleanDependencies(workspace1)
  const deps2 = await getCleanDependencies(workspace2)
  const diffTable = matchedDepsDiffTable(workspace1, workspace2, deps1, deps2)

  if (diffTable.length === 1) {
    return console.log(Messages.DEPS_DIFF_EMPTY(workspace1, workspace2))
  }

  console.log(Messages.DEPS_DIFF_INIT(workspace1, workspace2))
  console.log(diffTable.toString())
}
