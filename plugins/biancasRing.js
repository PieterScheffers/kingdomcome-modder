const BIANCAS_RING_ITEM_ID = 'aac0794c-8fb7-41f5-ba6a-90c313c286b2'

module.exports = {
  name: 'biancas-ring',
  files: [
    {
      file: 'Libs/Tables/item/armor.xml',
      pakFile: null,
      modifyFile: async (doc, { findOneDeep, setAttr }) => {
        const row = findOneDeep(doc.documentElement, { name: 'row', attr: { item_id: BIANCAS_RING_ITEM_ID } })
        if (!row) throw new Error(`[biancas-ring][Libs/Tables/item/armor.xml] Error: row with attribute item_id="${BIANCAS_RING_ITEM_ID}" not found`)

        setAttr(row, 'max_status', '100')
        setAttr(row, 'noise', '-500.0')
        setAttr(row, 'slash_def', '2.2')
        setAttr(row, 'smash_def', '2.2')
        setAttr(row, 'stab_def', '2.2')
      }
    },
    {
      file: 'Libs/Tables/item/equippable_item.xml',
      pakFile: null,
      modifyFile: async (doc, { findOneDeep, setAttr }) => {
        const row = findOneDeep(doc.documentElement, { name: 'row', attr: { item_id: BIANCAS_RING_ITEM_ID } })
        if (!row) throw new Error(`[biancas-ring][Libs/Tables/item/equippable_item.xml] Error: row with attribute item_id="${BIANCAS_RING_ITEM_ID}" not found`)

        setAttr(row, 'charisma', '1000')
        setAttr(row, 'conspicuousness', '-101.0')
        setAttr(row, 'visibility', '-101.0')
        setAttr(row, 'wealth_level', '3')
      }
    },
    {
      file: 'Libs/Tables/item/pickable_item.xml',
      pakFile: null,
      modifyFile: async (doc, { findOneDeep, setAttr }) => {
        const row = findOneDeep(doc.documentElement, { name: 'row', attr: { item_id: BIANCAS_RING_ITEM_ID } })
        if (!row) throw new Error(`[biancas-ring][Libs/Tables/item/pickable_item.xml] Error: row with attribute item_id="${BIANCAS_RING_ITEM_ID}" not found`)

        setAttr(row, 'price', '100000')
        setAttr(row, 'visibility_coef', '-100')
        setAttr(row, 'weight', '-100000')
      }
    }
  ]
}
