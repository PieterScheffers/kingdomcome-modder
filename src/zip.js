const getStream = require('get-stream')
const StreamZip = require('node-stream-zip')
const JSZip = require('jszip')
const path = require('path')
const fs = require('fs')
const { readdirRecursively } = require('./fs')

/**
 * @param {string} zipfile Path to zip-archive
 * @returns {Promise<object>} Object of zipfile contents
 */
function getZipFileListing (zipfile) {
  return new Promise((resolve, reject) => {
    const zip = new StreamZip({
      file: zipfile,
      storeEntries: true
    })

    zip.once('error', reject)

    zip.once('ready', () => {
      const entries = zip.entries()
      zip.close()

      resolve(entries)
    })
  })
}

/**
 * Get the file contents of a file in a zip-archive
 * @param {string} zipfile Path to zip-archive
 * @param {string} filepathInZip Path in zip-archive of file
 * @returns {Promise<string>} Contents of file
 */
function getZipFileContents (zipfile, filepathInZip) {
  return new Promise((resolve, reject) => {
    const zip = new StreamZip({
      file: zipfile,
      storeEntries: true
    })

    zip.once('error', reject)

    zip.once('ready', () => {
      zip.stream(filepathInZip, (err, stream) => {
        if (err) return reject(err)

        getStream(stream)
          .then(data => {
            zip.close()
            resolve(data)
          })
          .catch(error => reject(error))
      })
    })
  })
}

/**
 * Find a file in all zipfiles in a directory
 * @param {string} dir Full path to directory
 * @param {string} file File to find in zip files
 * @returns {Promise<string[]>} Array of zip file paths with file in it
 */
async function findFileInZipFiles (dir, file) {
  const zipFiles = await readdirRecursively(dir)

  const foundZipFiles = []

  for (const zipFile of zipFiles) {
    const entries = await getZipFileListing(zipFile).catch(() => ({}))
    const zipFileFiles = Object.keys(entries)

    if (zipFileFiles.includes(file)) {
      foundZipFiles.push(zipFile)
    }
  }

  return foundZipFiles
}

/**
 * Find a string in a datafile in a zipfile
 * @param {string} dir Path to data folder of Kingdom Come Deliverance
 * @param {function} find Function to check if something has been found
 * @param {function} fileFilter Filter files from zipfiles
 * @param {function} reportProgress Function to report progress
 */
async function findStringInZipFiles (dir, find, fileFilter = () => {}, reportProgress = () => {}) {
  const zipFiles = await readdirRecursively(dir)
  const totalZipFiles = zipFiles.length

  const found = []

  for (let j = 0; j < zipFiles.length; j++) {
    const zipFile = zipFiles[j]
    const zipFileNumber = j + 1

    const entries = await getZipFileListing(zipFile).catch(() => ({}))
    const zipFileFiles = Object.keys(entries)
    const zipFileFilesLength = zipFileFiles.length

    for (let k = 0; k < zipFileFilesLength; k++) {
      const zipFileFile = zipFileFiles[k]

      // filter files
      if (fileFilter && !fileFilter(zipFileFile)) continue

      const content = await getZipFileContents(zipFile, zipFileFile)
      const lines = content.split(/\r\n|\n|\r/)
      const linesLength = lines.length

      for (let i = 0; i < linesLength; i++) {
        const line = lines[i]
        const lineNumber = i + 1
        let currentFind = null

        if (find && find(line)) {
          currentFind = {
            line: lineNumber,
            zipFile,
            file: zipFileFile
          }

          found.push(currentFind)
        }

        reportProgress && reportProgress({
          line: lineNumber,
          linesLength,
          zipFile,
          file: zipFileFile,
          totalZipFiles,
          zipFileNumber,
          foundLength: found.length,
          zipFileFilesLength,
          zipFileFilesNumber: k + 1,
          currentFind
        })
      }
    }
  }

  return found
}

async function findAllFilesInZip (dir) {
  const zipFiles = await readdirRecursively(dir)

  return zipFiles.reduce(async (promise, zipFile) => {
    const files = await promise
    const entries = await getZipFileListing(zipFile).catch(() => ({}))
    console.log('entries', Object.keys(entries))

    const zipFileRelative = path.relative(dir, zipFile)

    const a = Object.keys(entries).reduce((acc, file) => {
      return { ...acc, [file]: [ ...(acc[file] || []), zipFileRelative ] }
    }, files)
    console.log('a', a)
    return a
  }, {})
}

/**
 * Write a js-zip object to a file
 * @param {object} zip JS-zip object
 * @param {string} zipFile Full path to zip file to create
 * @returns {Promise<string>} Full path to created zip file
 */
async function writeJsZip (zip, zipFile) {
  return new Promise((resolve, reject) => {
    const writeStream = fs.createWriteStream(zipFile)
    writeStream.once('error', reject)

    zip
      .generateNodeStream({ type: 'nodebuffer', streamFiles: true })
      .pipe(writeStream)
      .on('finish', function () {
        console.log(`${zipFile} written.`)
        resolve(zipFile)
      })
      .once('error', reject)
  })
}

/**
 * Create a zipfile from all files in folder
 * @param {string} dir Folder to zip
 * @param {string} zipFile Zip file to create
 */
async function zipFolder (dir, zipFile) {
  const files = await readdirRecursively(dir)
  const zip = new JSZip()

  for (const file of files) {
    const relative = path.relative(dir, file)
    const contents = await fs.promises.readFile(file)
    zip.file(relative, contents)
  }

  await writeJsZip(zip, zipFile)
}

module.exports = {
  getZipFileListing,
  getZipFileContents,
  findFileInZipFiles,
  findAllFilesInZip,
  writeJsZip,
  zipFolder,
  findStringInZipFiles
}
