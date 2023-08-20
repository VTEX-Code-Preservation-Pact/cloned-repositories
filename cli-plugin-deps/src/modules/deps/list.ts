import { createAppsClient, logger } from 'vtex'
import { removeNpm } from './utils'
import { Messages } from '../../lib/constants/Messages'

const { getDependencies } = createAppsClient()

export default async (flags: { keys: boolean; npm: boolean }) => {
  logger.debug(Messages.DEPS_LIST_INIT)
  const deps = await getDependencies()
  const keysOnly = flags.keys

  if (!flags.npm) {
    removeNpm(deps)(!keysOnly)
  }

  const result = keysOnly ? Object.keys(deps) : deps

  console.log(JSON.stringify(result, null, 2))
}
