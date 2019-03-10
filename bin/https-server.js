#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
var ansi = require('ansi-escape-sequences')
const httpsServer = require('../index.js')

function displayDeprecationWarning() {
  const deprecationNotice = `\n${clr(' WARNING: This module is deprecated. Do not use.', ['red', 'bg-white'])}\n${clr(httpsServer.deprecationNotice(), 'yellow')}`
  console.log(deprecationNotice)
}

const arguments = require('minimist')(process.argv.slice(2))

if (arguments._.length > 2 || arguments.help === true) {

  const usageFolderToServe = clr('folder-to-serve', 'green')
  const usagePortOption = `${clr('--port', 'yellow')} ${clr('N', 'cyan')}`
  const usageGlobalOption = `${clr('--global', 'yellow')}`
  const usageVersionOption = `${clr('--version', 'yellow')}`

  const usage = `
  ${clr('Usage:', 'underline')}

  ${clr('https-server', 'bold')} [${usageFolderToServe}] [${usagePortOption}] [${usageGlobalOption}] [${usageVersionOption}]

  • ${usageFolderToServe}\t\tPath to the folder to serve (defaults to current folder).
  • ${usagePortOption}\t\t\tThe port to start the server on (defaults to 443).
  • ${usageGlobalOption}\tUse globally-trusted certificates.
  • ${usageVersionOption}\t\t\tDisplay the version.
  `.replace(/\n$/, '').replace(/^\n/, '')

  displayDeprecationWarning()
  console.log(usage)
  process.exit()
}

if (arguments.version !== undefined) {
  const version = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8')).version

  displayDeprecationWarning()

  console.log(`  https-server v${version}\n`)
  process.exit()
}

// If no path is passed, serve the current folder.
// If there is a path, serve that.
let pathToServe = '.'
if (arguments._.length === 1) {
  pathToServe = arguments._[0]
}

// If a port is specified, use it. Otherwise use the default port (443).
let port = 443
if (arguments.port !== undefined) {
  port = parseInt(arguments.port)
}

// If global is specified, use it.
let global = false
if (arguments.global !== undefined) {
  global = arguments.global === true
}

if (!fs.existsSync(pathToServe)) {
  displayDeprecationWarning()

  console.log(` 🤔 Error: could not find path ${pathToServe}\n`)
  process.exit(1)
}

displayDeprecationWarning()

// Start the server.
httpsServer.serve({
  path: pathToServe,
  port,
  global
})

// Helpers.

// Format ansi strings.
// Courtesy Bankai (https://github.com/choojs/bankai/blob/master/bin.js#L142)
function clr (text, color) {
  return process.stdout.isTTY ? ansi.format(text, color) : text
}
