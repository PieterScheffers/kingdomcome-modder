module.exports = {
  name: 'easy-reputation',
  files: [
    {
      file: 'Libs/Tables/rpg/reputation_change.xml',
      pakFile: null,
      modifyFile: async (doc, { findDeep, setAttr, findAttr }) => {
        const rows = findDeep(doc.documentElement, { name: 'row', attr: { change: '' } })
        if (!rows.length) throw new Error(`[easy-reputation][Libs/Tables/rpg/reputation_change.xml] Error: rows with attribute change not found`)

        for (const row of rows) {
          const attr = findAttr(row, 'change')
          const reputationChange = parseFloat(attr.value)

          const newReputationChange = Math.max(Math.min(reputationChange < 0 ? reputationChange / 100 : (reputationChange > 0 ? reputationChange * 200 : reputationChange), 100), -100)

          setAttr(row, 'change', newReputationChange.toFixed(6).replace(/0+$/, ''))
        }
      }
    }
  ]
}
