let buffId = 'a909f2c5-7aca-8e7d-917c-d6734cd64549'
let perkId = '4338e5be-2522-6b5d-6b9a-24359a40d71c'
const theresaPlayerSoulId = '43430cfa-9d81-0432-ab95-43f66f3c04a3'
const henriPlayerSoulId = '43144483-f3bb-fab8-9ceb-f77e3020598a'

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

        // const params = [
        //   'xpm*4.00', // 4x the experience gain
        //   'vis*2.0', // 2x better vision
        //   'owl+1', // Nightowl
        //   'Sprint+2.5', // Faster sprinting speed
        //   'StaminaSprint*0.1', // Less stamina used when sprinting
        //   'Run+1.5', // Faster running speed
        //   'Walk+1.5', // Faster walking speed
        //   'bma+3', // Double herb selling price
        //   'fsm=0', // No noise of footsteps
        //   'rml+20', // More money when looting
        //   'srg*4', // Faster stamina regeneration
        //   'rms*1.9' // Faster horse
        // ].join(',')

        const params = [
          'xpm*2.00', // 2x the experience gain
          'vis*4.0', // 2x better vision
          'owl+1', // Nightowl
          'Sprint+1.5', // Faster sprinting speed
          'StaminaSprint*0.01', // Less stamina used when sprinting
          'Run+1.0', // Faster running speed
          'Walk+1.0', // Faster walking speed
          'bma+20.0', // Double herb selling price
          'fsm*0.01', // No noise of footsteps
          'rml+200', // More money when looting
          'srg*10', // Faster stamina regeneration
          'rms*2.9', // Faster horse
          'fdm*0.01', // lower fall damage
          'hko+0.5', // head cracker
          'noi*0.01', // noise
          'pds*0.01', // how fast lockpicks break
          'lpb*0.1', // lockpicking
          'lpn*0.1', // lockpicking noise
          'hml=0', // Rider throw off
          'pdp*1.15', // strong thighs
          'health+0.125/s', // health regeneration
          'con=-10', // conspictiones
          'evi-1', // visibilty
          'edm*0.01', // wear and tear to clothing
          'vib=-10', // stand out
          'cap+99999', // inventory capacity
          'pos+20', // see items when pickpocketing
          'iex+3', // reveals stats when pickpocketing
          'cha=20', // charisma
          'hgs+1', // train strength when picking flowers
          'lfu=1', // chance that lock opens when lockpick breaks
          'was*0.2', // bow shakes
          'lcs*0.2', // bow shakes
          'dsl*10', // how easy it is to evade attacks
          'pt1+0.5', // throwing dice
          'pt5+0.5', // throwing dice
          'dtf+0.75', // throwing dice
          'dbf+0.25', // throwing dice
          'cli+1', // clinch win
          'bso+0.5', // buy stolen goods
          'hac+10', // final offer
          'defense+3',
          // hgs
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
    },
    {
      file: 'Libs/Tables/rpg/soul2perk.xml',
      pakFile: null,
      modifyFile: async (doc, { findOneDeep, addChildElement }) => {
        const rowsElement = findOneDeep(doc.documentElement, { name: 'rows' })
        if (!rowsElement) throw new Error('[super-buff][Libs/Tables/rpg/soul2perk.xml] Error: Rows not found')

        if (buffId === null || perkId === null) {
          throw new Error('[super-buff][Libs/Tables/rpg/soul2perk.xml] buffId and perkId should have been set!')
        }

        // <row perk_id="099599c2-6118-4a60-b944-74efb72facd2" soul_id="00d2d228-b63c-4aa7-8f18-dc9cf74ec97e" />

        addChildElement(rowsElement, {
          name: 'row',
          attr: {
            perk_id: perkId,
            soul_id: theresaPlayerSoulId,
          }
        })

        addChildElement(rowsElement, {
          name: 'row',
          attr: {
            perk_id: perkId,
            soul_id: henriPlayerSoulId,
          }
        })
      }
    }
  ]
}
