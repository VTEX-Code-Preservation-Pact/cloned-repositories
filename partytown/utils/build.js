/* eslint-disable no-await-in-loop */
const fs = require('fs')

const Mustache = require('mustache')
const { minify } = require('html-minifier')

function writeFile() {
  const headBuffer = fs.readFileSync('./src/head.html')
  const partytowBuffer = fs.readFileSync('./public/~partytown/partytown.js')
  const manifest = JSON.parse(fs.readFileSync('./manifest.json'))

  fs.writeFileSync(
    './pixel/head.html',
    `${Mustache.render(headBuffer.toString(), {
      version: manifest.version,
    })}<script>${partytowBuffer.toString()}</script>`
  )
}

function minifyFile() {
  const headBuffer = fs.readFileSync('./pixel/head.html')

  fs.writeFileSync(
    './pixel/head.html',
    minify(headBuffer.toString(), { minifyJS: true, collapseWhitespace: false })
  )
}

async function build() {
  writeFile()
  minifyFile()
}

build()
