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
        addOrSetElement(rows, { name: 'row', attr: { rpg_param_key: 'RepairKitCapacity' } }, { rpg_param_value: '999999999' })
        addOrSetElement(rows, { name: 'row', attr: { rpg_param_key: 'RepairKitMaxSkillCapacityCoef' } }, { rpg_param_value: '999999999' })

        // Allow totally broken items to be repaired
        addOrSetElement(rows, { name: 'row', attr: { rpg_param_key: 'RepairKitItemHealthDefaultLimit' } }, { rpg_param_value: '0' })
        addOrSetElement(rows, { name: 'row', attr: { rpg_param_key: 'RepairKitItemHealthBestLimit' } }, { rpg_param_value: '0' })

        // Set repairprice to low value
        addOrSetElement(rows, { name: 'row', attr: { rpg_param_key: 'RepairPriceModif' } }, { rpg_param_value: '0.10' })

        // Base inventory capacity
        addOrSetElement(rows, { name: 'row', attr: { rpg_param_key: 'BaseInventoryCapacity' } }, { rpg_param_value: '999999999' })

        // Radius of herb gathering and number of herbs gathered increased
        addOrSetElement(rows, { name: 'row', attr: { rpg_param_key: 'HerbGatherSkillToRadius' } }, { rpg_param_value: '0.75' })
        addOrSetElement(rows, { name: 'row', attr: { rpg_param_key: 'HerbGatherSkillToCount' } }, { rpg_param_value: '0.6' })
      }
    }
  ]
}
