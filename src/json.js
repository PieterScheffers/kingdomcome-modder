function removeCircular () {
  const cache = []

  return function circularReplacer (key, value) {
    if (typeof value === 'object' && value !== null) {
      // Duplicate reference found, discard key
      if (cache.includes(value)) return

      // Store value in our collection
      cache.push(value)
    }

    return value
  }
}

module.exports = {
  removeCircular
}
