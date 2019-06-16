module.exports = {
  name: 'alternate-food-spoil',
  files: [
    {
      file: 'Libs/Tables/item/food.xml',
      pakFile: null,
      modifyFile: async (doc, { findDeep, setAttr }) => {
        const rows = findDeep(doc.documentElement, { name: 'row', attr: { decay_time_hours: '' } })
        if (!rows.length) throw new Error(`[alternate-food-spoil][Libs/Tables/item/food.xml] Error: rows with attribute decay_time_hours not found`)

        for (const row of rows) {
          setAttr(row, 'decay_time_hours', '0')
        }
      }
    }
  ]
}
