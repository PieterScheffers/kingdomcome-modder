const fs = require('fs')
const path = require('path')
const util = require('util')

const readdir = util.promisify(fs.readdir)
const stat = util.promisify(fs.stat)

/**
 * Get files in directory and subdirectories
 * @param {string} dir Full path to directory
 * @returns {Promise<array>} Array of files in directory
 */
async function readdirRecursively (dir) {
  const filesInDir = await readdir(dir)
  const paths = filesInDir.map(f => path.join(dir, f))

  return paths.reduce(async (promise, filepath) => {
    const files = await promise
    const stats = await stat(filepath)

    return [
      ...files,
      ...(stats.isDirectory() ? await readdirRecursively(filepath) : [ filepath ])
    ]
  }, [])
}

module.exports = {
  readdir,
  stat,
  readdirRecursively
}
