let buffId = null
let perkId = null

module.exports = {
  name: 'super-buff',
  files: [
    {
      file: 'Libs/Tables/rpg/buff.xml',
      pakFile: null,
      modifyFile: async (doc, { findOneDeep, findDeep, addChildElement, generateUniqueId }) => {
        const rowsElement = findOneDeep(doc.documentElement, { name: 'rows' })
        if (!rowsElement) throw new Error('[super-buff][Libs/Tables/rpg/buffs.xml] Error: Rows not found')

        if (buffId === null) {
          const rowElements = findDeep(rowsElement, { name: 'row' })
          buffId = generateUniqueId(rowElements, 'buff_id')
        }

        // <row
        // buff_ai_tag_id=""
        // buff_class_id="4"
        // buff_desc=""
        // buff_exclusivity_id="1"
        // buff_id="91614c4f-b442-4dd4-bbcd-ae9f568c2b9a"
        // buff_lifetime_id="1"
        // buff_name="perk_headcracker3"
        // buff_ui_name=""
        // buff_ui_order=""
        // buff_ui_type_id="4"
        // buff_ui_visibility_id=""
        // duration="-1"
        // icon_id="0"
        // implementation="Cpp:Constant"
        // is_persistent="True"
        // params="hko+0.1"
        // slot_buff_ui_name=""
        // slot_icon_id=""
        // visual_effect=""
        // />

        const params = [
          'xpm*3.00', // 3x the experience gain
          'vis*2.0', // 2x better vision
          'owl+1', // Nightowl
          'Sprint+1.5', // Faster sprinting speed
          'StaminaSprint*0.1', // Less stamina used when sprinting
          'Run+1.5', // Faster running speed
          'Walk+1.5', // Faster walking speed
          'bma+1', // Double herb selling price
          'fsm=0', // No noise of footsteps
          'rml+10', // More money when looting
          'srg*2', // Faster stamina regeneration
          'rms*1.2' // Faster horse
        ].join(',')

        addChildElement(rowsElement, {
          name: 'row',
          attr: {
            buff_ai_tag_id: '',
            buff_class_id: '4',
            buff_desc: '',
            buff_exclusivity_id: '1',
            buff_id: buffId,
            buff_lifetime_id: '1',
            buff_name: 'perk_super_buff',
            buff_ui_name: '',
            buff_ui_order: '',
            buff_ui_type_id: '4',
            buff_ui_visibility_id: '',
            duration: '-1',
            icon_id: '0',
            implementation: 'Cpp:Constant',
            is_persistent: 'True',
            params,
            slot_buff_ui_name: '',
            slot_icon_id: '',
            visual_effect: ''
          }
        })
      }
    },
    {
      file: 'Libs/Tables/rpg/perk.xml',
      pakFile: null,
      modifyFile: async (doc, { findOneDeep, findDeep, addChildElement, generateUniqueId }) => {
        const rowsElement = findOneDeep(doc.documentElement, { name: 'rows' })
        if (!rowsElement) throw new Error('[super-buff][Libs/Tables/rpg/perk.xml] Error: Rows not found')

        if (perkId === null) {
          const rowElements = findDeep(rowsElement, { name: 'row' })
          perkId = generateUniqueId(rowElements, 'perk_id')
        }

        // <row
        // autolearnable="False"
        // exclude_in_game_mode=""
        // icon_id="headcrakcer"
        // level="16"
        // metaperk_id=""
        // parent_id="a9dce193-4a21-4874-9995-cf89d8d77e05"
        // perk_id="6a29492e-34e2-4d0a-a66b-85997ed6515a"
        // perk_name="Headcracker3"
        // perk_ui_desc="perk_headcrakcer3_desc"
        // perk_ui_name="perk_headcrakcer3_name"
        // skill_selector=""
        // stat_selector="0"
        // ui_priority="0"
        // visibility="2"
        // />

        addChildElement(rowsElement, {
          name: 'row',
          attr: {
            autolearnable: 'False',
            exclude_in_game_mode: '',
            icon_id: 'headcrakcer',
            level: '1',
            metaperk_id: '',
            parent_id: '',
            perk_id: perkId,
            perk_name: 'SuperBuff',
            perk_ui_desc: '',
            perk_ui_name: 'ui_codex_name_dobyvani_KH',
            skill_selector: '25',
            stat_selector: '',
            ui_priority: '0',
            visibility: '2'
          }
        })
      }
    },
    {
      file: 'Libs/Tables/rpg/perk_buff.xml',
      pakFile: null,
      modifyFile: async (doc, { findOneDeep, addChildElement }) => {
        const rowsElement = findOneDeep(doc.documentElement, { name: 'rows' })
        if (!rowsElement) throw new Error('[super-buff][Libs/Tables/rpg/perk_buff.xml] Error: Rows not found')

        if (buffId === null || perkId === null) {
          throw new Error('[super-buff][Libs/Tables/rpg/perk_buff.xml] buffId and perkId should have been set!')
        }

        // <row
        // buff_id="91614c4f-b442-4dd4-bbcd-ae9f568c2b9a"
        // perk_id="6a29492e-34e2-4d0a-a66b-85997ed6515a"
        // />

        addChildElement(rowsElement, {
          name: 'row',
          attr: {
            buff_id: buffId,
            perk_id: perkId
          }
        })
      }
    }
  ]
}
