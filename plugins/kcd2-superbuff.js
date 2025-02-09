let buffId = 'a909f2c5-7aca-8e7d-917c-d6734cd64549'
let perkId = '4338e5be-2522-6b5d-6b9a-24359a40d71c'
const henriPlayerSoulId = '4c2dcffb-dea1-6263-72d7-b39f4db2d8b5'

const BUFF_CLASS_PERK = '4'
const BUFF_EXCLUSIVITY_SINGLETON = '1'
const BUFF_LIFETIME_LONGTERM = '1'
const BUFF_UI_TYPE_PERK = '4'
const BUFF_IMPLEMENTATION_CONSTANT = 'Cpp:Constant'

const PERK_VISIBILITY_FROM_BEGINNING = '2'

module.exports = {
  name: 'kcd2-super-buff',
  files: [
    {
      file: 'Libs/Tables/rpg/buff__perk.xml',
      pakFile: null,
      modifyFile: async (doc, { findOneDeep, findDeep, addChildElement, generateUniqueId }) => {
        const rowsElement = findOneDeep(doc.documentElement, { name: 'buffs' })
        if (!rowsElement) throw new Error('[kcd2-super-buff][Libs/Tables/rpg/buff__perk.xml] Error: buffs not found')

        // <buff
        //   buff_class_id="4"
        //   buff_exclusivity_id="1"
        //   buff_id="0026238d-f360-4c93-a8a2-304fad73f039"
        //   buff_lifetime_id="1"
        //   buff_name="perk_art_of_preservation"
        //   buff_params="itd*0.5"
        //   buff_ui_type_id="4"
        //   duration="-1"
        //   icon_id="replaceme"
        //   implementation="Cpp:Constant"
        //   is_persistent="true"
        // />

        const params = [
          'Sprint+0.5',        // sprinting speed
          'StaminaSprint*0.3', // stamina used when sprinting
          "srg*3",             // stamina regeneration
          "noi*0.3",           // noise
          'pds*0.01',          // how fast lockpicks break
          'ifc*0.5',           // time it takes for items to remove stolen tag
          'ala+20',            // Number of potions to create at a time
          'rkm*0.1',           // cobbler repairkit efficiency (lower=more efficiency)
        ].join(',')

        addChildElement(rowsElement, {
          name: 'buff',
          attr: {
            buff_class_id: BUFF_CLASS_PERK,
            buff_exclusivity_id: BUFF_EXCLUSIVITY_SINGLETON,
            buff_id: buffId,
            buff_lifetime_id: BUFF_LIFETIME_LONGTERM,
            buff_name: "perk_super_buff",
            buff_params: params,
            buff_ui_type_id: BUFF_UI_TYPE_PERK,
            duration: "-1",
            implementation: BUFF_IMPLEMENTATION_CONSTANT,
            is_persistent: "true",
            icon_id: "perk_contemplative",
          }
        })
      }
    },
    {
      file: 'Libs/Tables/rpg/perk__kcd2.xml',
      pakFile: null,
      modifyFile: async (doc, { findOneDeep, findDeep, addChildElement, generateUniqueId }) => {
        const rowsElement = findOneDeep(doc.documentElement, { name: 'perks' })
        if (!rowsElement) throw new Error('[kcd2-super-buff][Libs/Tables/rpg/perk__kcd2.xml] Error: perks not found')

        // <perk
        //   autolearnable="false"
        //   icon_id="perk_locksmith"
        //   level="1"
        //   perk_id="20b0715b-9b83-4d26-839f-f39dfe209ed0"
        //   perk_name="Locksmith"
        //   perk_ui_desc="perk_locksmith_desc"
        //   perk_ui_lore_desc="perk_locksmith_lore_desc"
        //   perk_ui_name="perk_locksmith_name"
        //   skill_selector="8"
        //   visibility="2"
        // />

        addChildElement(rowsElement, {
          name: 'perk',
          attr: {
            autolearnable: "false",
            icon_id: "perk_locksmith",
            level: "1",
            perk_id: perkId,
            perk_name: "SuperBuff",
            perk_ui_desc: "perk_locksmith_desc",
            perk_ui_lore_desc: "perk_locksmith_lore_desc",
            perk_ui_name: "perk_locksmith_name",
            skill_selector: "14",
            visibility: PERK_VISIBILITY_FROM_BEGINNING,
          }
        })
      }
    },
    {
      file: 'Libs/Tables/rpg/perk_buff.xml',
      pakFile: null,
      modifyFile: async (doc, { findOneDeep, addChildElement }) => {
        const rowsElement = findOneDeep(doc.documentElement, { name: 'perk_buffs' })
        if (!rowsElement) throw new Error('[kcd2-super-buff][Libs/Tables/rpg/perk_buff.xml] Error: perk_buffs not found')

        // <row
        // buff_id="91614c4f-b442-4dd4-bbcd-ae9f568c2b9a"
        // perk_id="6a294 92e-34e2-4d0a-a66b-85997ed6515a"
        // />

        addChildElement(rowsElement, {
          name: 'perk_buff',
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
        const rowsElement = findOneDeep(doc.documentElement, { name: 'soul2perks' })
        if (!rowsElement) throw new Error('[kcd2-super-buff][Libs/Tables/rpg/soul2perk.xml] Error: soul2perks not found')

        if (buffId === null || perkId === null) {
          throw new Error('[kcd2-super-buff][Libs/Tables/rpg/soul2perk.xml] buffId and perkId should have been set!')
        }

        // <soul2perk perk_id="1627a1b6-64c5-422f-ac2d-3a6abc071690" soul_id="449022cc-0fbf-ffa4-021b-2b4b13e113be" />

        addChildElement(rowsElement, {
          name: 'soul2perk',
          attr: {
            perk_id: perkId,
            soul_id: henriPlayerSoulId,
          }
        })
      }
    }
  ]
}
