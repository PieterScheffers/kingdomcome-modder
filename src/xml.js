const DOMParser = require('xmldom-fork').DOMParser
const XMLSerializer = require('xmldom-fork').XMLSerializer

/**
 * Replace all substrings in a string
 * @param {string} str String to replace substring in
 * @param {string} search Substring to search for
 * @param {string} replacement String to put in place of searches
 * @returns {string} String with replaced values
 */
function replaceAll (str, search, replacement) { // eslint-disable-line no-unused-vars
  return str.split(search).join(replacement)
}

/**
 * Get the document encoding of an xml document
 * @param {string} xml XML document string
 * @returns {string} encoding
 */
function getXmlEncoding (xml) {
  let lines = xml.split('\r\n')

  if (lines.length < 2) {
    lines = xml.split('\n')
  }

  const firstLine = lines[0]
  const match = firstLine.match(/encoding="([a-zA-Z0-9-]*)"/)

  return match ? match[1] : 'us-ascii'
}

function xmlStringToDocument (xml) {
  const domParser = new DOMParser()
  return domParser.parseFromString(xml, 'application/xml')
}

function documentToXmlString (doc) {
  const xmlSerializer = new XMLSerializer()
  const isHtml = false

  const xml = xmlSerializer.serializeToString(doc, isHtml, null, (nodeType, value) => {
    const xmlEncoder = e => {
      const value = String(e)

      switch (value) {
        case '<': return '&lt;'
        case '>': return '&gt;'
        case '&': return '&amp;'
        case '"': return '&quot;'
        // case "'": return '&apos;'
        default:
          return '&#' + String(value.charCodeAt()).padStart(2, '0') + ';'
      }
    }

    switch (nodeType) {
      case NodeType.ATTRIBUTE_NODE:
        return value.replace(/[\t\n\r"&<>]/g, xmlEncoder) // /[\t\n\r'"&<>]/g
      case NodeType.TEXT_NODE:
        return value.replace(/[&<>]/g, xmlEncoder)
      default:
        return value
    }
  })

  // Kingdom Come Deliverance XMLs have an extra space before closing tag and ends with a line-ending
  return xml
    .replace(/([^ ])\/>/g, '$1 />')
}

const NodeType = {
  ELEMENT_NODE: 1,
  ATTRIBUTE_NODE: 2,
  TEXT_NODE: 3,
  CDATA_SECTION_NODE: 4,
  ENTITY_REFERENCE_NODE: 5,
  ENTITY_NODE: 6,
  PROCESSING_INSTRUCTION_NODE: 7,
  COMMENT_NODE: 8,
  DOCUMENT_NODE: 9,
  DOCUMENT_TYPE_NODE: 10,
  DOCUMENT_FRAGMENT_NODE: 11,
  NOTATION_NODE: 12
}

module.exports = {
  getXmlEncoding,
  xmlStringToDocument,
  documentToXmlString
}
