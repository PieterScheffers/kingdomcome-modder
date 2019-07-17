const CAPON_BOW_ITEM_ID = 'f2c83abc-2252-49f6-bbb7-dc8bc02979b2'

module.exports = {
  name: 'capon-bow',
  files: [
    {
      file: 'Libs/Tables/item/missile_weapon.xml',
      pakFile: null,
      modifyFile: async (doc, { findOneDeep, setAttr }) => {
        const row = findOneDeep(doc.documentElement, { name: 'row', attr: { item_id: CAPON_BOW_ITEM_ID } })
        if (!row) throw new Error(`[capon-bow][Libs/Tables/item/missile_weapon.xml] Error: row with attribute item_id="${CAPON_BOW_ITEM_ID}" not found`)

        setAttr(row, 'power', '85')
      }
    }
  ]
}
