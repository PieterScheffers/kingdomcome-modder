module.exports = {
  name: 'pebbles',
  files: [
    {
      file: 'Libs/Tables/rpg/soul.xml',
      pakFile: null,
      modifyFile: async (doc, { findOneDeep, setAttr }) => {
        const row = findOneDeep(doc.documentElement, { name: 'row', attr: { soul_name: 'horse_sedivka' } })
        if (!row) throw new Error('[pebbles] Error: row with attribute soul_name="horse_sedivka" not found')

        setAttr(row, 'agi', 100)
        setAttr(row, 'charisma', 100)
        setAttr(row, 'courage', 100)
        setAttr(row, 'str', 100)
        setAttr(row, 'vit', 100)

        const row1 = findOneDeep(doc.documentElement, { name: 'row', attr: { soul_name: 'horse_stablesAus_01' } })
        if (!row1) throw new Error('[pebbles] Error: row with attribute soul_name="horse_stablesAus_01" not found')

        setAttr(row1, 'agi', 100)
        setAttr(row1, 'charisma', 100)
        setAttr(row1, 'courage', 100)
        setAttr(row1, 'str', 100)
        setAttr(row1, 'vit', 100)

        const row2 = findOneDeep(doc.documentElement, { name: 'row', attr: { soul_name: 'horse_stablesAus_02' } })
        if (!row2) throw new Error('[pebbles] Error: row with attribute soul_name="horse_stablesAus_02" not found')

        setAttr(row2, 'agi', 100)
        setAttr(row2, 'charisma', 100)
        setAttr(row2, 'courage', 100)
        setAttr(row2, 'str', 100)
        setAttr(row2, 'vit', 100)

        const row3 = findOneDeep(doc.documentElement, { name: 'row', attr: { soul_name: 'horse_stablesAus_03' } })
        if (!row3) throw new Error('[pebbles] Error: row with attribute soul_name="horse_stablesAus_03" not found')

        setAttr(row3, 'agi', 100)
        setAttr(row3, 'charisma', 100)
        setAttr(row3, 'courage', 100)
        setAttr(row3, 'str', 100)
        setAttr(row3, 'vit', 100)
      }
    }
  ]
}
