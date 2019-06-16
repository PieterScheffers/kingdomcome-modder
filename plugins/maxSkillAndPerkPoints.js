// https://forums.nexusmods.com/index.php?/topic/6409661-tutorial-tweaking-rpg-parameters/
/**
<row rpg_param_key="MaxPerkPoints" rpg_param_value="10" />
<row rpg_param_key="MinPerkPoints" rpg_param_value="5" />
<row rpg_param_key="MinLeftoverPerks" rpg_param_value="1" />
 */

module.exports = {
  name: 'max-skill-and-perk-points',
  files: [
    {
      file: 'Libs/Tables/rpg/rpg_param.xml',
      pakFile: null,
      modifyFile: async (doc, { findOneDeep, setAttr, addChildElement }) => {
        const rows = findOneDeep(doc.documentElement, { name: 'rows' })
        if (!rows) throw new Error(`[max-skill-and-perk-points][Libs/Tables/rpg/rpg_param.xml] Error: rows not found`)

        const maxPerkPointsRow = findOneDeep(rows, { name: 'row', attr: { rpg_param_key: 'MaxPerkPoints' } })
        if (!maxPerkPointsRow) {
          addChildElement(rows, {
            name: 'row',
            attributes: {
              rpg_param_key: 'MaxPerkPoints',
              rpg_param_value: '100'
            }
          })
        } else {
          setAttr(maxPerkPointsRow, 'rpg_param_value', '100')
        }

        const minPerkPointsRow = findOneDeep(rows, { name: 'row', attr: { rpg_param_key: 'MinPerkPoints' } })
        if (!minPerkPointsRow) {
          addChildElement(rows, {
            name: 'row',
            attributes: {
              rpg_param_key: 'MinPerkPoints',
              rpg_param_value: '0'
            }
          })
        } else {
          setAttr(minPerkPointsRow, 'rpg_param_value', '0')
        }

        const minLeftoverPerksRow = findOneDeep(rows, { name: 'row', attr: { rpg_param_key: 'MinLeftoverPerks' } })
        if (!minLeftoverPerksRow) {
          addChildElement(rows, {
            name: 'row',
            attributes: {
              rpg_param_key: 'MinLeftoverPerks',
              rpg_param_value: '0'
            }
          })
        } else {
          setAttr(minLeftoverPerksRow, 'rpg_param_value', '0')
        }
      }
    }
  ]
}
