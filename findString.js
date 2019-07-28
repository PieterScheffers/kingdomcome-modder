const status = require('node-status')
const path = require('path')
const { findStringInZipFiles } = require('./src/zip')

const gameDir = 'C:\\Games\\Steam\\SteamApps\\common\\KingdomComeDeliverance'
const dataDir = path.join(gameDir, 'Data')

const console = status.console()

async function main () {
  const zipFiles = status.addItem('zipFiles')
  const lines = status.addItem('lines')
  const found = status.addItem('found')
  const zipFileFiles = status.addItem('zipFileFiles')

  status.start({
    interval: 200,
    pattern: '{uptime.green} {spinner.cyan} | {zipFiles} {zipFiles.bar} | {zipFileFiles} {zipFileFiles.bar} | {lines} {lines.bar} | Found: {found} {found.custom.magenta}'
  })

  const foundItems = await findStringInZipFiles(
    dataDir,
    line => line.includes('4cea28a0-0814-405a-bf24-4fd711f7eb63'), // torch item_id
    zipFileFile => String(zipFileFile).endsWith('.xml'),
    p => {
      const zipFile = path.relative(dataDir, p.zipFile)

      zipFiles.max = p.totalZipFiles
      zipFiles.count = p.zipFileNumber

      zipFileFiles.max = p.zipFileFilesLength
      zipFileFiles.count = p.zipFileFilesNumber

      lines.max = p.linesLength
      lines.count = p.line

      found.count = p.foundLength

      found.custom = () => `${zipFile} - ${p.file}`

      if (p.currentFind) {
        const zipFile = path.relative(dataDir, p.currentFind.zipFile)
        console.log(`${zipFile} - ${p.currentFind.file}:${p.currentFind.line}`)
      }
    }
  )

  console.log(JSON.stringify(foundItems, null, 2))
}

main().catch(error => console.error('ERROR', error))
