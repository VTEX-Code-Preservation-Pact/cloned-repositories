import chalk from 'chalk'
import enquirer from 'enquirer'
import { map, prop, filter } from 'ramda'

import { logger, promptConfirm, SessionManager } from 'vtex'

import { default as abTestStatus } from './status'
import { abtester, checkABTester } from './utils'

const { account } = SessionManager.getSingleton()

const promptContinue = (workspace: string) => {
  return promptConfirm(
    `You are about to finish A/B testing in workspace \
${chalk.blue(workspace)}, account ${chalk.green(account)}. Are you sure?`,
    false
  )
}

const promptWorkspaceToFinishABTest = () =>
  abtester
    .status()
    .then(filter(({ WorkspaceB }) => WorkspaceB !== undefined))
    .then(map(({ WorkspaceB }) => WorkspaceB))
    .then((workspaces: string[]) =>
      enquirer.prompt<{ workspace: string }>({
        name: 'workspace',
        message: 'Choose which workspace to finish A/B testing:',
        type: 'select',
        choices: workspaces,
      })
    )
    .then(prop('workspace'))

export default async () => {
  await checkABTester()
  const workspace = await promptWorkspaceToFinishABTest()
  const promptAnswer = await promptContinue(workspace)

  if (!promptAnswer) {
    return
  }

  logger.info('Finishing A/B tests')
  logger.info(`Latest results:`)
  await abTestStatus()
  await abtester.finish(workspace)
  logger.info(`A/B testing with workspace ${chalk.blue(workspace)} is now finished`)
  logger.info(`No traffic currently directed to ${chalk.blue(workspace)}`)
}
