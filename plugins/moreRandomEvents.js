/**
 * TODO: Check single quotes escaping
 */
module.exports = {
  name: 'more-random-events',
  files: [
    {
      file: 'Libs/Tables/random_event.xml',
      pakFile: null,
      modifyFile: async (doc, { findDeep, setAttr, findAttr }) => {
        const rows = findDeep(doc.documentElement, { name: 'row', attr: { condition_expression: "gvar('fast_travel_suppress_events') == 0" } })
        if (!rows.length) throw new Error(`[more-random-events][Libs/Tables/random_event.xml] Error: rows with attribute condition_expression="gvar('fast_travel_suppress_events') == 0" not found`)

        for (const row of rows) {
          const attr = findAttr(row, 'cooldown')
          const [ , number, unit ] = attr.value.match(/([0-9]*)(.*)/)
          const cooldown = Math.max(1, Math.floor(number / 6))

          setAttr(row, 'cooldown', `${cooldown}${unit}`)
        }
      }
    }
  ]
}
