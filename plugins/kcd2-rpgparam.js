module.exports = {
  name: 'kcd2-rpgparam',
  files: [
    {
      file: 'Libs/Tables/rpg/rpg_param.xml',
      pakFile: null,
      modifyFile: async (doc, { findOneDeep, addOrSetElement }) => {
        const rows = findOneDeep(doc.documentElement, { name: 'rpg_params' })
        if (!rows) throw new Error(`[kcd2-rpgparam][Libs/Tables/rpg/rpg_param.xml] Error: rows not found`)

        // Repair kits never break
        addOrSetElement(rows, { name: 'rpg_param', attr: { rpg_param_key: 'RepairKitCapacity' } }, { rpg_param_value: '99999' })

        // Allow totally broken items to be repaired
        addOrSetElement(rows, { name: 'rpg_param', attr: { rpg_param_key: 'RepairKitItemHealthDefaultLimit' } }, { rpg_param_value: '0' })
        addOrSetElement(rows, { name: 'rpg_param', attr: { rpg_param_key: 'RepairKitItemHealthBestLimit' } }, { rpg_param_value: '0' })

        // Base inventory capacity
        addOrSetElement(rows, { name: 'rpg_param', attr: { rpg_param_key: 'BaseInventoryCapacity' } }, { rpg_param_value: '1000000' })
        addOrSetElement(rows, { name: 'rpg_param', attr: { rpg_param_key: 'MaxBaseInventoryCapacity' } }, { rpg_param_value: '1000000' })
      }
    },
    {
      file: 'Libs/Tables/rpg/perk_rpg_param_override.xml',
      pakFile: null,
      modifyFile: async (doc, { findOneDeep, setElement }) => {
        const rows = findOneDeep(doc.documentElement, { name: 'perk_rpg_param_overrides' })
        if (!rows) throw new Error(`[kcd2-rpgparam][Libs/Tables/rpg/perk_rpg_param_override.xml] Error: rows not found`)

        const row = findOneDeep(rows, { name: 'perk_rpg_param_override' })
        if (!row) throw new Error(`[kcd2-rpgparam][Libs/Tables/rpg/perk_rpg_param_override.xml] Error: row not found`)

        const perkIdAttr = Object.values(row.attributes).find(a => a.name === 'perk_id')
        if (!perkIdAttr) throw new Error(`[kcd2-rpgparam][Libs/Tables/rpg/perk_rpg_param_override.xml] Error: row attribute 'perk_id' not found`)

        const perkId = perkIdAttr.value

        // Repair kits never break
        setElement(rows, { name: 'perk_rpg_param_override', attr: { rpg_param_key: 'RepairKitCapacity' } }, { rpg_param_value: '99999', perk_id: perkId })

        // Allow totally broken items to be repaired
        setElement(rows, { name: 'perk_rpg_param_override', attr: { rpg_param_key: 'RepairKitItemHealthDefaultLimit' } }, { rpg_param_value: '0', perk_id: perkId })
        setElement(rows, { name: 'perk_rpg_param_override', attr: { rpg_param_key: 'RepairKitItemHealthBestLimit' } }, { rpg_param_value: '0', perk_id: perkId })

        // Base inventory capacity
        setElement(rows, { name: 'perk_rpg_param_override', attr: { rpg_param_key: 'BaseInventoryCapacity' } }, { rpg_param_value: '1000000', perk_id: perkId })
        setElement(rows, { name: 'perk_rpg_param_override', attr: { rpg_param_key: 'MaxBaseInventoryCapacity' } }, { rpg_param_value: '1000000', perk_id: perkId })
      }
    }
  ]
}
