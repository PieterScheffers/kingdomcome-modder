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

          const newReputationChange = reputationChange < 0 ? reputationChange / 2 : (reputationChange > 0 ? reputationChange * 2 : reputationChange)

          setAttr(row, 'change', newReputationChange.toFixed(6))
        }
      }
    }
  ]
}
