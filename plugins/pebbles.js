module.exports = {
  name: 'pebbles',
  files: [
    {
      file: 'Libs/Tables/rpg/soul.xml',
      pakFile: null,
      modifyFile: async (doc, { findOneDeep, setAttr }) => {
        const row = findOneDeep(doc.documentElement, { name: 'row', attr: { soul_name: 'horse_sedivka' } })
        if (!row) throw new Error('[pebbles] Error: row with attribute soul_name="horse_sedivka" not found')

        setAttr(row, 'agi', 40)
        setAttr(row, 'charisma', 40)
        setAttr(row, 'courage', 40)
        setAttr(row, 'str', 40)
        setAttr(row, 'vit', 40)
      }
    }
  ]
}
