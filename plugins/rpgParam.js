module.exports = {
  name: 'rpg-param',
  files: [
    {
      file: 'Libs/Tables/rpg/rpg_param.xml',
      pakFile: null,
      modifyFile: async (doc, { findOneDeep, addOrSetElement }) => {
        const rows = findOneDeep(doc.documentElement, { name: 'rows' })
        if (!rows) throw new Error(`[rpg-param][Libs/Tables/rpg/rpg_param.xml] Error: rows not found`)

        // Repair kits never break
        addOrSetElement(rows, { name: 'row', attr: { rpg_param_key: 'RepairKitCapacity' } }, { rpg_param_value: '99999' })
        addOrSetElement(rows, { name: 'row', attr: { rpg_param_key: 'RepairKitMaxSkillCapacityCoef' } }, { rpg_param_value: '99999' })

        // Allow totally broken items to be repaired
        addOrSetElement(rows, { name: 'row', attr: { rpg_param_key: 'RepairKitItemHealthDefaultLimit' } }, { rpg_param_value: '' })
        addOrSetElement(rows, { name: 'row', attr: { rpg_param_key: 'RepairKitItemHealthBestLimit' } }, { rpg_param_value: '' })

        // Set repairprice to low value
        addOrSetElement(rows, { name: 'row', attr: { rpg_param_key: 'RepairPriceModif' } }, { rpg_param_value: '0.10' })

        // Base inventory capacity
        addOrSetElement(rows, { name: 'row', attr: { rpg_param_key: 'BaseInventoryCapacity' } }, { rpg_param_value: '99999' })

        // Radius of herb gathering and number of herbs gathered increased
        addOrSetElement(rows, { name: 'row', attr: { rpg_param_key: 'HerbGatherSkillToRadius' } }, { rpg_param_value: '0.95' })
        addOrSetElement(rows, { name: 'row', attr: { rpg_param_key: 'HerbGatherSkillToCount' } }, { rpg_param_value: '0.9' })
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

        // Repair kits never break
        setElement(rows, { name: 'row', attr: { rpg_param_key: 'RepairKitCapacity' } }, { rpg_param_value: '99999', perk_id: perkId })
        setElement(rows, { name: 'row', attr: { rpg_param_key: 'RepairKitMaxSkillCapacityCoef' } }, { rpg_param_value: '99999', perk_id: perkId })

        // Allow totally broken items to be repaired
        setElement(rows, { name: 'row', attr: { rpg_param_key: 'RepairKitItemHealthDefaultLimit' } }, { rpg_param_value: '', perk_id: perkId })
        setElement(rows, { name: 'row', attr: { rpg_param_key: 'RepairKitItemHealthBestLimit' } }, { rpg_param_value: '', perk_id: perkId })

        // Set repairprice to low value
        setElement(rows, { name: 'row', attr: { rpg_param_key: 'RepairPriceModif' } }, { rpg_param_value: '0.10', perk_id: perkId })

        // Base inventory capacity
        setElement(rows, { name: 'row', attr: { rpg_param_key: 'BaseInventoryCapacity' } }, { rpg_param_value: '99999', perk_id: perkId })

        // Radius of herb gathering and number of herbs gathered increased
        setElement(rows, { name: 'row', attr: { rpg_param_key: 'HerbGatherSkillToRadius' } }, { rpg_param_value: '0.95', perk_id: perkId })
        setElement(rows, { name: 'row', attr: { rpg_param_key: 'HerbGatherSkillToCount' } }, { rpg_param_value: '0.9', perk_id: perkId })
      }
    }
  ]
}
