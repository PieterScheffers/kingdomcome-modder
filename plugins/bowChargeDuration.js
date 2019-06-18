module.exports = {
  name: 'bow-charge-duration',
  files: [
    {
      file: 'Libs/Tables/rpg/rpg_param.xml',
      pakFile: null,
      modifyFile: async (doc, { findOneDeep, addOrSetElement }) => {
        const rows = findOneDeep(doc.documentElement, { name: 'rows' })
        if (!rows) throw new Error(`[bow-charge-duration][Libs/Tables/rpg/rpg_param.xml] Error: rows not found`)

        addOrSetElement(rows, { name: 'row', attr: { rpg_param_key: 'BowChargeDurationMax' } }, { rpg_param_value: '2' })
        // addOrSetElement(rows, { name: 'row', attr: { rpg_param_key: 'BowChargeDurationMin' } }, { rpg_param_value: '1.35' })
        // addOrSetElement(rows, { name: 'row', attr: { rpg_param_key: 'BowPowerToChargeDuration' } }, { rpg_param_value: '0.1' })
      }
    }
  ]
}
