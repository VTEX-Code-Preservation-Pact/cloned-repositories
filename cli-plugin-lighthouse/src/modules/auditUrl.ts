import ora from 'ora'
import chalk from 'chalk'
import { Lighthouse } from '../client/Lighthouse'
import { createWorkspacesClient, ErrorReport, SessionManager, logger } from 'vtex'

import { TableGenerator } from './TableGenerator'

async function isProdutionWorkspace(account: string, workspace: string): Promise<boolean> {
  const workspaces = createWorkspacesClient()
  const meta = await workspaces.get(account, workspace)

  return meta.production
}

export default async (url: string, option: any) => {
  const { workspace, account } = SessionManager.getSingleton()

  if (await isProdutionWorkspace(account, workspace)) {
    logger.error(`You cannot run lighthouse audits on production workspaces.`)

    return
  }

  const spinner = ora(`Running Lighthouse on url: ${chalk.blue(url)}`).start()

  try {
    const lighthouse = Lighthouse.createClient()
    const report = await lighthouse.runAudit(url)

    spinner.stop()

    if (option.json) {
      console.log(JSON.stringify(report, null, 1))
    } else {
      const table = new TableGenerator()

      table.addReportScores(report)
      table.show()
    }
  } catch (error) {
    spinner.stop()

    ErrorReport.createAndMaybeRegisterOnTelemetry({ originalError: error })
    logger.error(error)
  }
}
