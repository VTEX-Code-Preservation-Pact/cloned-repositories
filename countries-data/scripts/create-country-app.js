#!/usr/bin/env node

/* eslint-disable no-console */

const fsp = require('fs').promises
const path = require('path')

const packagesDir = path.resolve(__dirname, '..', 'packages')

const SERVICE_APP_NAME = 'vtex.country-data-settings'

const CHANGELOG_TEMPLATE = `
# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
`.trim()

/**
 * @param {string} [country] - Country
 */
const getManifestTemplate = (country) =>
  `
{
  "vendor": "vtex",
  "name": "country-data-${country}",
  "version": "0.0.0",
  "builders": {
    ${JSON.stringify(SERVICE_APP_NAME)}: "0.x"
  },
  "$schema": "https://raw.githubusercontent.com/vtex/node-vtex-api/master/gen/manifest.schema"
}
`.trim()

const printHelp = () => {
  const [, scriptName] = process.argv
  const formattedAppName = path.relative(process.cwd(), scriptName)

  console.log(
    `
Usage: ./${formattedAppName} [...countries]

This script creates the boilerplate for a country configuration app inside packages/[country]/.

Examples:

  The command:

    ./${formattedAppName} bra

  Creates the "bra" directory in "packages/"

  The command:

    ./${formattedAppName} usa bol arg

  Creates the "usa", "bol" and "arg" directories in "packages/"
`
  )
}

const main = async () => {
  const [, , ...countries] = process.argv

  if (!countries.length) {
    printHelp()
    return
  }

  await Promise.all(
    countries.map(async (country) => {
      try {
        const manifest = getManifestTemplate(country)

        const appDir = path.join(packagesDir, country)

        try {
          await fsp.access(path.join(appDir, 'manifest.json'))

          console.log(`App for country "${country}" already exists.`)

          return
        } catch {
          // ignored
        }

        await fsp.mkdir(appDir)

        // create manifest.json file
        await fsp.writeFile(path.join(appDir, 'manifest.json'), manifest)

        await fsp.mkdir(path.join(appDir, SERVICE_APP_NAME))

        // create basic configuration.json file
        await fsp.writeFile(
          path.join(appDir, SERVICE_APP_NAME, 'configuration.json'),
          '{}'
        )

        // create CHANGELOG.md file
        await fsp.writeFile(
          path.join(appDir, 'CHANGELOG.md'),
          CHANGELOG_TEMPLATE
        )

        console.log(`Successfully bootstrapped app for country "${country}"`)
      } catch (err) {
        console.error(
          `An unexpected error occured when bootstrapping app for country "${country}"`
        )
        console.error(err)
      }
    })
  )
}

main()
