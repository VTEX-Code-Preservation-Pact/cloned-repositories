import chalk from 'chalk'
import ora from 'ora'
import { curry, path } from 'ramda'
import semver from 'semver'
import { Region, createRouterClient, logger, promptConfirm } from 'vtex'

import { diffVersions, getTag } from './utils'

const router = createRouterClient()
const { getAvailableVersions, listInstalledServices, installService } = router

const promptInstall = () => Promise.resolve(promptConfirm('Continue with the installation?'))

const findVersion = (pool: string[], predicate: (version: string) => boolean): string =>
  // @ts-ignore
  pool
    .filter((v) => semver.valid(v))
    .filter(predicate)
    .sort(semver.rcompare)
    .shift()

// @ts-ignore
const getNewVersion = curry<string, string, string[], [string, string]>(
  (suffix: string, installedVersion: string, availableVersions: string[]): [string, string] => {
    const tag = getTag(installedVersion)
    const hasValidSuffix = semver.valid(suffix)
    const hasSuffixAndValidSuffix = suffix && hasValidSuffix
    const hasSuffixOnAvailable = availableVersions.find((v) => v === suffix)

    if (hasSuffixAndValidSuffix && hasSuffixOnAvailable) {
      // @ts-ignore
      return [installedVersion, suffix]
    }

    if (hasSuffixAndValidSuffix && !hasSuffixOnAvailable) {
      // @ts-ignore
      return [installedVersion, null]
    }

    const hasValidRange = semver.validRange(suffix, true)
    const hasTagOrInstalledVersion = !tag || !installedVersion
    const fn = hasValidRange
      ? // @ts-ignore
        (v) => semver.satisfies(v, suffix, true)
      : suffix && !hasValidSuffix
      ? // @ts-ignore
        (v) => getTag(v) === null
      : hasTagOrInstalledVersion
      ? // @ts-ignore
        (v) => semver.prerelease(v) === null
      : // @ts-ignore
        (v) => getTag(v) === tag

    const newVersion = findVersion(availableVersions, fn)

    return [installedVersion, newVersion]
  }
)

// @ts-ignore
const logInstall = curry<string, [string, string], void>(
  (name: string, [installedVersion, newVersion]: [string, string]): void => {
    if (!newVersion) {
      logger.error(`No suitable version for ${name}`)

      return
    }

    if (newVersion === installedVersion) {
      console.log(`${name}  ${chalk.yellow(installedVersion)}`)
      logger.info('Service is up to date.')

      return
    }

    if (installedVersion) {
      const [from, to] = diffVersions(installedVersion, newVersion)

      return console.log(`${name}  ${from} ${chalk.gray('->')} ${to}`)
    }

    return console.log(`${name}  ${chalk.green(newVersion)}`)
  }
)

const hasNewVersion = ([installedVersion, newVersion]: [string, string]): boolean =>
  !!(newVersion && newVersion !== installedVersion)

const getInstalledVersion = (service: string) =>
  listInstalledServices()
    .then((data) => data.find(({ name }) => name === service))
    .then((s) => s?.version)

export default async (name: string) => {
  const [service, suffix] = name.split('@')
  const spinner = ora('Getting versions').start()

  // We force getting versions from the Production region as currently all
  // regions use the same ECR on us-east-1 region. This API is old and weird,
  // as it shouldn't return the regions in the response if I'm already querying
  // a single region. Only change to use `env.region()` when router fixed.
  try {
    // @ts-ignore
    const allVersions = (await Promise.all([
      getInstalledVersion(service),
      getAvailableVersions(service).then(path(['versions', Region.Production])),
    ])) as [string, string[]]

    spinner.stop()
    // @ts-ignore
    const newVersions: [string, string] = getNewVersion(suffix)(...allVersions)

    // @ts-ignore
    logInstall(service)(newVersions)
    if (!hasNewVersion(newVersions)) {
      return null
    }

    await Promise.resolve(console.log(''))
      .then(promptInstall)
      .then((confirm) => {
        if (!confirm) {
          return
        }

        spinner.text = 'Installing'
        spinner.start()

        return installService(service, newVersions[1])
      })
      .then(() => {
        spinner.stop()
        logger.info('Installation complete')
      })
  } catch (err) {
    spinner.stop()
    throw err
  }
}
