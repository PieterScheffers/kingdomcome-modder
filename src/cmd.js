const program = require('commander')
const packageJson = require('../package.json')

program
  .version(packageJson.version)
  .option('-g, --gamedir [value]', 'Path to Kingdom Come Deliverance game directory')
  .parse(process.argv)

throw new Error('kcdmod command not working yet!')
