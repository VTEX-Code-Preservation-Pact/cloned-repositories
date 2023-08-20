import { Workspaces } from '@vtex/api'
import chalk from 'chalk'
import { contains, flatten, tail } from 'ramda'
import { createWorkspacesClient, SessionManager, logger, promptConfirm, workspaceUse } from 'vtex'

const promptWorkspaceDeletion = (names: string[]) =>
  promptConfirm(
    `Are you sure you want to delete workspace${names.length > 1 ? 's' : ''} ${chalk.green(names.join(', '))}?`,
    true
  )

export const deleteWorkspaces = async (
  workspacesClient: Workspaces,
  account: string,
  names: string[] = []
): Promise<string[]> => {
  if (names.length === 0) {
    return []
  }

  const [name] = names
  const decNames = tail(names)

  logger.debug('Starting to delete workspace', name)
  try {
    await workspacesClient.delete(account, name)
    logger.info(`Workspace ${chalk.green(name)} deleted ${chalk.green('successfully')}`)

    return flatten([name, await deleteWorkspaces(workspacesClient, account, decNames)])
  } catch (err) {
    logger.warn(`Workspace ${chalk.green(name)} was ${chalk.red('not')} deleted`)
    logger.error(`Error ${err.response.status}: ${err.response.statusText}. ${err.response.data.message}`)

    return deleteWorkspaces(workspacesClient, account, decNames)
  }
}

export default async (names: string[], options: WorkspacesDeleteOptions) => {
  const preConfirm = options.yes
  const { force } = options
  const { account, workspace } = SessionManager.getSingleton()

  logger.debug(`Deleting workspace${names.length > 1 ? 's' : ''}:`, names.join(', '))

  if (!force && contains(workspace, names)) {
    return logger.error(
      `You are currently using the workspace ${chalk.green(workspace)}, please change your workspace before deleting`
    )
  }

  if (!preConfirm && !(await promptWorkspaceDeletion(names))) {
    return
  }

  const workspacesClient = createWorkspacesClient()
  const deleted = await deleteWorkspaces(workspacesClient, account, names)

  if (contains(workspace, deleted)) {
    logger.warn(`The workspace you were using was deleted`)

    return workspaceUse('master')
  }
}
