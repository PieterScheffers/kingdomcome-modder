/*
<row rpg_param_key="CombatAutoDodgeWeight" rpg_param_value="1.475" />
<row rpg_param_key="CombatAutoNoDefenseWeight" rpg_param_value="0.775" />
<row rpg_param_key="CombatAutoNormalBWeight" rpg_param_value="3.175" />
<row rpg_param_key="CombatAutoPBWeight" rpg_param_value="2.875" />
<row rpg_param_key="CombatAutoSPBWeight" rpg_param_value="0" />
*/

module.exports = {
  name: 'no-master-strikes',
  files: [
    {
      file: 'Libs/Tables/rpg/rpg_param.xml',
      pakFile: null,
      modifyFile: async (doc, { findOneDeep, addOrSetElement }) => {
        const rows = findOneDeep(doc.documentElement, { name: 'rows' })
        if (!rows) throw new Error(`[rpg-param][Libs/Tables/rpg/rpg_param.xml] Error: rows not found`)

        // No NPC master strikes
        addOrSetElement(rows, { name: 'row', attr: { rpg_param_key: 'CombatAutoDodgeWeight' } }, { rpg_param_value: '1.475' })
        addOrSetElement(rows, { name: 'row', attr: { rpg_param_key: 'CombatAutoNoDefenseWeight' } }, { rpg_param_value: '0.775' })
        addOrSetElement(rows, { name: 'row', attr: { rpg_param_key: 'CombatAutoNormalBWeight' } }, { rpg_param_value: '3.175' })
        addOrSetElement(rows, { name: 'row', attr: { rpg_param_key: 'CombatAutoPBWeight' } }, { rpg_param_value: '2.875' })
        addOrSetElement(rows, { name: 'row', attr: { rpg_param_key: 'CombatAutoSPBWeight' } }, { rpg_param_value: '0' })
      }
    },
    {
      file: 'Libs/Tables/rpg/perk_rpg_param_override.xml',
      pakFile: null,
      modifyFile: async (doc, { findOneDeep, setElement }) => {
        const rows = findOneDeep(doc.documentElement, { name: 'rows' })
        if (!rows) throw new Error(`[rpg-param][Libs/Tables/rpg/perk_rpg_param_override.xml] Error: rows not found`)

        const row = findOneDeep(rows, { name: 'row' })
        if (!row) throw new Error(`[rpg-param][Libs/Tables/rpg/perk_rpg_param_override.xml] Error: row not found`)

        const perkIdAttr = Object.values(row.attributes).find(a => a.name === 'perk_id')
        if (!perkIdAttr) throw new Error(`[rpg-param][Libs/Tables/rpg/perk_rpg_param_override.xml] Error: row attribute 'perk_id' not found`)

        const perkId = perkIdAttr.value

        // No NPC master strikes
        setElement(rows, { name: 'row', attr: { rpg_param_key: 'CombatAutoDodgeWeight' } }, { rpg_param_value: '1.475', perk_id: perkId })
        setElement(rows, { name: 'row', attr: { rpg_param_key: 'CombatAutoNoDefenseWeight' } }, { rpg_param_value: '0.775', perk_id: perkId })
        setElement(rows, { name: 'row', attr: { rpg_param_key: 'CombatAutoNormalBWeight' } }, { rpg_param_value: '3.175', perk_id: perkId })
        setElement(rows, { name: 'row', attr: { rpg_param_key: 'CombatAutoPBWeight' } }, { rpg_param_value: '2.875', perk_id: perkId })
        setElement(rows, { name: 'row', attr: { rpg_param_key: 'CombatAutoSPBWeight' } }, { rpg_param_value: '0', perk_id: perkId })
      }
    }
  ]
}
