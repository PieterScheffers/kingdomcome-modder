// https://forums.nexusmods.com/index.php?/topic/6409661-tutorial-tweaking-rpg-parameters/
/**
<row rpg_param_key="MaxPerkPoints" rpg_param_value="10" />
<row rpg_param_key="MinPerkPoints" rpg_param_value="5" />
<row rpg_param_key="MinLeftoverPerks" rpg_param_value="1" />
 */

module.exports = {
  name: 'max-perk-points',
  files: [
    {
      file: 'Libs/Tables/rpg/rpg_param.xml',
      pakFile: null,
      modifyFile: async (doc, { findOneDeep, addOrSetElement }) => {
        const rows = findOneDeep(doc.documentElement, { name: 'rows' })
        if (!rows) throw new Error(`[max-perk-points][Libs/Tables/rpg/rpg_param.xml] Error: rows not found`)

        addOrSetElement(rows, { name: 'row', attr: { rpg_param_key: 'MaxPerkPoints' } }, { rpg_param_value: '100' })
        addOrSetElement(rows, { name: 'row', attr: { rpg_param_key: 'MinPerkPoints' } }, { rpg_param_value: '0' })
        addOrSetElement(rows, { name: 'row', attr: { rpg_param_key: 'MinLeftoverPerks' } }, { rpg_param_value: '0' })
      }
    }
  ]
}
