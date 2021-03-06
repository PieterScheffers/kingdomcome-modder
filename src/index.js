const path = require('path')
const os = require('os')
const util = require('util')
const fs = require('fs').promises
const fsSync = require('fs')
const rimraf = util.promisify(require('rimraf'))
const { getZipFileListing, getZipFileContents, findFileInZipFiles, zipFolder } = require('./zip')
const { xmlStringToDocument, documentToXmlString } = require('./xml')
const modifyMethods = require('./xmlMethods')

module.exports = async function modKingdomCome (gameDir, plugins = []) {
  // if (!plugins.length) throw new Error('No plugins defined')

  // Group plugins by file to get all plugins that should be in the same mod
  // { [modFile]: pluginName[] }
  const pluginsGroupedByFile = plugins.reduce((acc, plugin) => {
    return plugin.files.reduce((accum, obj) => {
      return { ...accum, [obj.file]: [ ...(accum[obj.file] || []), plugin.name ] }
    }, acc)
  }, {})
  console.log('pluginsGroupedByFile', JSON.stringify(pluginsGroupedByFile, null, 2))

  // Group all plugins by mod
  // [ { plugins: pluginName[], files: modFile[] } ]
  const mods = Object.keys(pluginsGroupedByFile).reduce((acc, file) => {
    const pluginNames = pluginsGroupedByFile[file]

    const newMod = { plugins: pluginNames, files: [ file ] }

    // get all mods where one of the plugins is already in
    const conflictMods = acc.filter(m => m.plugins.find(p => pluginNames.includes(p)))

    // no conflict: create new mod
    if (!conflictMods.length) return [ ...acc, newMod ]

    // get all mods not conflicting with new mod
    const noConflictMods = acc.filter(m => !m.plugins.find(p => pluginNames.includes(p)))

    // conflicting mods: merge all conflicting mods
    const mergedMod = [ ...conflictMods, newMod ].reduce((acc, mod) => ({
      plugins: [ ...new Set([ ...acc.plugins, ...mod.plugins ]) ],
      files: [ ...new Set([ ...acc.files, ...mod.files ]) ]
    }), { plugins: [], files: [] })

    return [ ...noConflictMods, mergedMod ]
  }, [])
  console.log('mods', JSON.stringify(mods, null, 2))

  const dataDir = path.join(gameDir, 'data')
  console.log('dataDir', dataDir)

  const kcdModderDir = path.join(os.tmpdir(), 'kcd-modder')

  // Remove old temporary folder for Kingdom Come modder
  await rimraf(kcdModderDir)

  // Create temporary folder for Kingdom Come modder
  await fs.mkdir(kcdModderDir, { recursive: true })

  for (const mod of mods) {
    const modName = mod.plugins.join('_').replace(' ', '').substring(0, 100)
    console.log('mod:', modName)

    // Create directory for mod
    const modDir = path.join(kcdModderDir, modName)
    const modDataDir = path.join(modDir, 'data')
    await fs.mkdir(modDataDir, { recursive: true })

    // Get the contents of all XMLs in mod
    // { [modFile]: { modFile, doc, zipFile } }
    const xmls = await mod.files.reduce(async (promise, modFile) => {
      const acc = await promise

      // Create directory for file
      const fileDir = path.join(modDataDir, path.dirname(modFile))
      await fs.mkdir(fileDir, { recursive: true })

      // Get the .pak file where the XML file exists
      const zipFiles = await findFileInZipFiles(dataDir, modFile)
      if (!zipFiles.length) {
        throw new Error(`${modFile} could not be found in any of the .pak files`)
      }

      if (zipFiles.length > 1) {
        throw new Error(`${modFile} found in multiple .pak files. This modder assumes a file is only present in one .pak file.`)
      }

      // Get XML file
      const zipFile = zipFiles[0]
      const fileContents = await getZipFileContents(zipFile, modFile)

      const doc = xmlStringToDocument(fileContents)

      const entry = { modFile, doc, zipFile }
      return { ...acc, [modFile]: entry }
    }, {})

    // Sort plugins on plugin.order (default: 500)
    mod.plugins.sort((p1, p2) => {
      const plugin1 = plugins.find(p => p.name === p1)
      const plugin2 = plugins.find(p => p.name === p2)

      const order1 = (plugin1 && plugin1.order) || 500
      const order2 = (plugin2 && plugin2.order) || 500

      return order1 - order2
    })

    // Run all plugins over the files
    // The files of a plugin are run in the order of the plugin.files array
    for (const pluginName of mod.plugins) {
      const plugin = plugins.find(p => p.name === pluginName)

      for (const fileObj of plugin.files) {
        const doc = xmls[fileObj.file].doc
        await fileObj.modifyFile(doc, modifyMethods)
      }
    }

    for (const { modFile, doc, zipFile } of Object.values(xmls)) {
      // Re-create XML and write to file
      const xml = documentToXmlString(doc)
      const xmlPath = path.join(modDataDir, modFile)
      await fs.writeFile(xmlPath, xml)

      // Check if .xml has a .tbl file
      const filesInZip = Object.keys(await getZipFileListing(zipFile))
      const tblFile = modFile.replace(/(.*)\.xml$/, '$1.tbl')

      // if a .tbl file exists, write an empty .tbl file next to the .xml file
      if (filesInZip.includes(tblFile)) {
        const tblPath = path.join(modDataDir, tblFile)
        await fs.writeFile(tblPath, '')
      }
    }

    // zip the contents of the mod 'data' folder
    const zipFile = path.join(modDataDir, `${modName}.pak`)
    await zipFolder(modDataDir, zipFile)

    console.log(kcdModderDir)

    // TODO: Backup current Mods folder of Kingdom Come
    // TODO: Install new mods in folder
  }
}

module.exports.plugins = fsSync.readdirSync(path.join(__dirname, '../plugins'))
  .map(f => path.join(__dirname, '../plugins', f))
  .map(p => require(p))
  .reduce((acc, plugin) => ({ ...acc, [plugin.name]: plugin }), {})
