const crypto = require('crypto')

/**
 * Returns a matcher function to use in .find or .filter methods
 * @param {object|function} options Options object of matcher function
 * @param {string} options.name Name of element to find
 * @param {object} options.attr Attributes to find (leave value empty to just find attribute key)
 * @returns {function} Function to check an element if it matches
 */
function makeElementMatcher (options) {
  if (typeof options === 'function') return options
  const { name = '', attr = {} } = options

  return function matchElement (element) {
    const elementAttr = Object.values(element.attributes || {})

    const hasAllAttributes = Object.entries(attr).every(([ key, value ]) => {
      return elementAttr.find(a => a.name === key && (!value || a.value === value))
    })

    return (!name || element.nodeName === name) && hasAllAttributes
  }
}

/**
 * Make sure elements is an array
 * @param {Element|Element[]|object} elements Elements
 * @returns {Element[]} Array of elements
 */
function elementsToArray (elements) {
  if (Array.isArray(elements)) return elements
  if (elements == null) return []
  if (
    (typeof elements !== 'object') ||
    (elements.constructor && elements.constructor.name !== 'Object')
  ) return [ elements ]
  return Object.values(elements)
}

/**
 * Find one element in an array of elements
 * @param {Element[]} elements Array of XML-dom XML Elements
 * @param {object} options Options object of matcher function
 * @param {string} options.name Name of element to find
 * @param {object} options.attr Attributes to find (leave value empty to just find attribute key)
 * @returns {object} Element found
 */
function findOne (elements, options) {
  return elementsToArray(elements).find(makeElementMatcher(options))
}

/**
 * Find one direct child of Element
 * @param {Element} element XML-dom XML Element
 * @param {object} options Options object of matcher function
 * @param {string} options.name Name of element to find
 * @param {object} options.attr Attributes to find (leave value empty to just find attribute key)
 * @returns {object} Element found
 */
function findOneChild (element, options) {
  return findOne(element.childNodes, options)
}

/**
 * Find elements in an array of elements
 * @param {Element} element XML-dom XML Element
 * @param {object} options Options object of matcher function
 * @param {string} options.name Name of element to find
 * @param {object} options.attr Attributes to find (leave value empty to just find attribute key)
 * @returns {object[]} Array of Elements found
 */
function find (elements, options) {
  return elementsToArray(elements).filter(makeElementMatcher(options))
}

/**
 * Find one direct children of element
 * @param {Element} element XML-dom XML Element
 * @param {object} options Options object of matcher function
 * @param {string} options.name Name of element to find
 * @param {object} options.attr Attributes to find (leave value empty to just find attribute key)
 * @returns {object[]} Array of Elements found
 */
function findChildren (element, options) {
  return find(element.childNodes, options)
}

/**
 * Find children in tree
 * @param {Element[]} elements XML-dom XML Elements
 * @param {object} options Options object of matcher function
 * @param {string} options.name Name of element to find
 * @param {object} options.attr Attributes to find (leave value empty to just find attribute key)
 * @returns {object[]} Array of Elements found
 */
function findDeep (elements, options) {
  elements = elementsToArray(elements)

  const matchElement = makeElementMatcher(options)

  return elements.reduce((acc, element) => {
    let children = element.childNodes ? findDeep(element.childNodes, options) : []
    const elemArr = matchElement(element) ? [ element ] : []
    return [ ...acc, ...children, ...elemArr ]
  }, [])
}

/**
 * Find child in tree
 * @param {Element[]} elements XML-dom XML Elements
 * @param {object} options Options object of matcher function
 * @param {string} options.name Name of element to find
 * @param {object} options.attr Attributes to find (leave value empty to just find attribute key)
 * @returns {object} Element found
 */
function findOneDeep (elements, options) {
  elements = elementsToArray(elements)

  const matchElement = makeElementMatcher(options)

  const found = elements.reduce((acc, element) => {
    if (acc.length) return acc
    let children = element.childNodes ? findDeep(element.childNodes, options) : []
    const elemArr = matchElement(element) ? [ element ] : []
    return [ ...acc, ...children, ...elemArr ]
  }, [])

  return found.length ? found[0] : null
}

/**
 * @param {Element} element XML-dom XML Element
 * @param {string} key Key of attribute
 * @param {string} value Value of attribute
 * @returns {object} Attribute object
 */
function findAttr (element, key, value = '') {
  const elementAttr = Object.values(element.attributes || {})
  return elementAttr.find(a => a.name === key && (!value || a.value === value))
}

/**
 * Set an attribute of an element
 * @param {Element} element XML-dom XML Element
 * @param {string} key Key of attribute
 * @param {string} value Value of attribute
 * @returns {object} Attribute object
 */
// function setAttr (element, key, value) {
//   const attr = findAttr(element, key)
//   if (!attr) throw new Error(`Couldn't find attribute ${key} in ${element.nodeName}`)

//   attr.nodeValue = attr.value = String(value)

//   return attr
// }

function setAttr (element, key, value) {
  const attr = element.getAttributeNode(key)

  if (element.hasAttribute(key)) {
    attr.nodeValue = attr.value = String(value)
  } else {
    element.setAttribute(key, value)
  }

  return attr
}

/**
 * Append a new child Element to an Element
 * @param {Element} element Element node
 * @param {object} options
 * @param {string} options.name Name of new Element
 * @param {object} options.attributes Attributes of new Element
 */
function addChildElement (element, { name, attr = {} }) {
  if (!name) throw new Error('Name of new Element should be set')

  // Get the last Textnode with a newline
  const lastChild = element.lastChild

  // Create a new Textnode with 2 extra spaces as the lastChild Textnode
  const newLine = lastChild && lastChild.constructor.name === 'Text' ? lastChild.data : '/r/n'
  const newTextNode = element.ownerDocument.createTextNode(newLine + '  ')
  lastChild ? element.insertBefore(newTextNode, lastChild) : element.appendChild(newTextNode)

  // Append the new Element
  const newElement = element.ownerDocument.createElement(name)
  lastChild ? element.insertBefore(newElement, lastChild) : element.appendChild(newTextNode)

  // Add attributes to the new Element
  for (const [ key, value ] of Object.entries(attr)) {
    setAttr(newElement, key, value)
  }

  return newElement
}

/**
 * Append or edit attributes on a child Element
 * @param {Element} parent Parent Element node
 * @param {object} options
 * @param {string} options.name Name of the Element to find
 * @param {object} options.attr Attributes of the Element to find
 * @param {object} attributes Attributes to set on Element
 */
function addOrSetElement (parent, findOptions, attributes) {
  const element = findOneChild(parent, findOptions)

  if (!element) {
    addChildElement(parent, {
      name: findOptions.name,
      attr: {
        ...findOptions.attr,
        ...attributes
      }
    })
  } else {
    // Modify attributes on the Element
    for (const [ key, value ] of Object.entries(attributes)) {
      setAttr(element, key, value)
    }
  }
}

/**
 * Generate an ID for an object
 * Example: 030c1c68-d6e8-4677-86e9-bea7648ffc20
 */
function generateId () {
  return [
    crypto.randomBytes(8).toString('hex').substring(0, 8),
    crypto.randomBytes(4).toString('hex').substring(0, 4),
    crypto.randomBytes(4).toString('hex').substring(0, 4),
    crypto.randomBytes(4).toString('hex').substring(0, 4),
    crypto.randomBytes(12).toString('hex').substring(0, 12)
  ].join('-')
}

/**
 * Generate a unique ID
 * @param {Element[]} elements Array of Elements
 * @param {string} key Attribute of the ID's
 * @returns {string} Unique ID
 */
function generateUniqueId (elements, key) {
  const ids = elementsToArray(elements).map(element => {
    return element.getAttribute(key)
  })

  let id = null
  do {
    id = generateId()
  } while (ids.includes(id))

  return id
}

module.exports = {
  makeElementMatcher,
  elementsToArray,
  find,
  findChildren,
  findOne,
  findOneChild,
  findOneDeep,
  findDeep,
  findAttr,
  setAttr,
  addChildElement,
  addOrSetElement,
  generateId,
  generateUniqueId
}
