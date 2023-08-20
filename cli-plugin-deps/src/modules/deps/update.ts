import chalk from 'chalk'
import { diffJson, Change } from 'diff'
import { map, path } from 'ramda'
import { createAppsClient, logger, parseLocator } from 'vtex'
import { cleanDeps } from './utils'
import { Messages } from '../../lib/constants/Messages'

const { getDependencies, updateDependencies, updateDependency } = createAppsClient()

export default async (optionalApps: string[]) => {
  const appsList = optionalApps.filter((arg) => arg && arg !== '')

  try {
    logger.debug(Messages.DEPS_UPDATE_INIT_PROCESS)
    const previousDeps = await getDependencies()
    let currentDeps

    if (appsList.length === 0) {
      currentDeps = await updateDependencies()
    } else {
      for (const locator of appsList) {
        const { vendor, name, version } = parseLocator(locator)

        if (!name || !version) {
          logger.error(Messages.DEPS_UPDATE_INVALID_FORMAT_ERROR(locator))
        } else {
          try {
            logger.debug(Messages.DEPS_UPDATE_INIT(locator))
            // eslint-disable-next-line no-await-in-loop
            await updateDependency(`${vendor}.${name}`, version, vendor)
          } catch (e) {
            logger.error(e.message)
            if (path(['response', 'data', 'message'], e)) {
              logger.error(e.response.data.message)
            }
          }
        }
      }

      currentDeps = await getDependencies()
    }

    const [cleanPrevDeps, cleanCurrDeps] = map(cleanDeps, [previousDeps, currentDeps])
    const diff = diffJson(cleanPrevDeps, cleanCurrDeps)
    let nAdded = 0
    let nRemoved = 0

    diff.forEach(({ count = 0, value, added, removed }: Change) => {
      const color = added ? chalk.green : removed ? chalk.red : chalk.gray

      if (added) {
        nAdded += count
      } else if (removed) {
        nRemoved += count
      }

      process.stdout.write(color(value))
    })
    if (nAdded === 0 && nRemoved === 0) {
      logger.info(Messages.DEPS_UPDATE_EMPTY)
    } else {
      if (nAdded > 0) {
        logger.info('', nAdded, nAdded > 1 ? ' dependencies ' : ' dependency ', chalk.green('added'), ' successfully')
      }

      if (nRemoved > 0) {
        logger.info(
          '',
          nRemoved,
          nRemoved > 1 ? ' dependencies ' : 'dependency ',
          chalk.red('removed'),
          ' successfully'
        )
      }
    }
  } catch (e) {
    logger.error(e.message)
    if (path(['response', 'data', 'message'], e)) {
      logger.error(e.response.data.message)
    }
  }
}
