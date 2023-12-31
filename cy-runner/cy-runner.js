const cfg = require('./node/config')
const system = require('./node/system')
const logger = require('./node/logger')
const cypress = require('./node/cypress')
const workspace = require('./node/workspace')
const { deprecated } = require('./node/deprecated')
const { report } = require('./node/report')
const { runTests } = require('./node/test')
const { issue } = require('./node/jira')

// Controls test state
const control = {
  start: system.tick(),
  timing: {},
  specsFailed: [],
  specsSkipped: [],
  specsDisabled: [],
  specsPassed: [],
  runUrl: null,
}

async function main() {
  // Init logger
  logger.init()

  // Welcome message
  logger.msgSection('Cypress Runner')

  // Read cy-runner.yml configuration
  const config = await cfg.getConfig('cy-runner.yml')

  // Init workspace set up
  control.timing.initWorkspace = await workspace.init(config)

  // Install apps
  control.timing.installApps = await workspace.installApps(config)

  // Uninstall apps
  control.timing.uninstallApps = await workspace.uninstallApps(config)

  // Link app
  const link = await workspace.linkApp(config)

  control.timing.linkApp = link.time

  if (link.success) {
    if (config.base.cypress.devMode) {
      logger.msgWarn('Please, wait the flow when you finish')
      logger.msgPad('This will ensure the release and teardown will run')
      await cypress.open()
    } else {
      const call = await runTests(config)

      control.timing.strategy = call.time
      control.specsFailed = call.specsFailed
      control.specsSkipped = call.specsSkipped
      control.specsDisabled = call.specsDisabled
      control.specsPassed = call.specsPassed
      control.runUrl = call.runUrl

      // Jira automation
      if (config.base.jira.enabled && control.specsFailed?.length) {
        await issue(config, control.specsFailed, control.runUrl)
      }
    }
  }

  // Teardown
  if (link.subprocess) link.subprocess.kill('SIGHUP')
  control.timing.teardown = await workspace.teardown(config, link.success)

  // Report deprecated flags
  await deprecated(config)

  // Final Report
  control.timing.total = system.tack(control.start)
  await report(control, config)
}

main().then((r) => r)
