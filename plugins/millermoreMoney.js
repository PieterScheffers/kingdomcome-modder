module.exports = {
  name: 'miller-more-money',
  files: [
    {
      file: 'Libs/Tables/shop/shop_type2item.xml',
      pakFile: null,
      modifyFile: async (doc, { findDeep, setAttr }) => {
        // const rows = findOneDeep(doc.documentElement, { name: 'rows' })
        // if (!rows) throw new Error(`[rpg-param][Libs/Tables/shop/shop_type2item.xml] Error: rows not found`)

        // <row amount="10000" default_on="False" item_id="5ef63059-322e-4e1b-abe8-926e100c770e" shop_type_id="52" />

        // addOrSetElement(rows, { name: 'row', attr: { item_id: '5ef63059-322e-4e1b-abe8-926e100c770e' } }, { amount: '60000' })

        const rows = findDeep(doc.documentElement, { name: 'row', attr: { item_id: '5ef63059-322e-4e1b-abe8-926e100c770e' } })
        if (!rows.length) throw new Error(`[rpg-param][Libs/Tables/shop/shop_type2item.xml] Error: rows with attribute item_id not found`)

        for (const row of rows) {
          setAttr(row, 'amount', '600000')
        }
      }
    }
  ]
}
