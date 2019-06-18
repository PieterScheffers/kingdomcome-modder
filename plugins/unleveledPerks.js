module.exports = {
  name: 'unleveled-perks',
  files: [
    {
      file: 'Libs/Tables/rpg/perk.xml',
      pakFile: null,
      modifyFile: async (doc, { findDeep, setAttr }) => {
        const rows = findDeep(doc.documentElement, { name: 'row' })
        if (!rows.length) throw new Error('[unleveled-perks][Libs/Tables/rpg/perk.xml] Error: row elements not found')

        for (const row of rows) {
          const level = row.getAttribute('level')
          const visibility = row.getAttribute('visibility')

          if (level && visibility === '2') {
            setAttr(row, 'level', 1)
          }
        }
      }
    }
  ]
}
