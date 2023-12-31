const logger = require('./logger')
const cypress = require('./cypress')
const test = require('./test')

module.exports.wipe = async (config) => {
  const { wipe } = config.workspace

  // eslint-disable-next-line vtex/prefer-early-return
  if (wipe.enabled) {
    logger.msgOk('Wiping data')

    // Disable parallelism for wipe and increase verbosity
    logger.msgPad('Disabling parallelism')
    config.base.cypress.maxJobs = 0

    // Remove data
    logger.msgPad('Running wipe')
    const xvfb = await test.startXvfb()
    const results = await cypress.run(wipe, config)

    await test.stopXvfb(xvfb)
    let success = false

    results.forEach((result) => {
      if (result.success) if (!result.specsFailed?.length) success = true
    })

    success
      ? logger.msgOk('Data wiped successfully')
      : logger.msgError('Failed to wipe data')
  }
}
