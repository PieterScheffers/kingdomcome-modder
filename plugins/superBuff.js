module.exports = {
  name: 'super-buff',
  files: [
    {
      file: 'Libs/Tables/rpg/buff.xml',
      pakFile: null,
      modifyFile: async (doc, { findOneDeep, addChildElement, generateUniqueId }) => {
        const rowsElement = findOneDeep(doc.documentElement, { name: 'rows' })
        if (!rowsElement) throw new Error('[super-buff][Libs/Tables/rpg/buffs.xml] Error: Rows not found')

        const buffId = generateUniqueId(rowsElement.childNodes, 'buff_id')

        addChildElement(rowsElement, {
          name: 'row',
          attributes: {
            buff_ai_tag_id: '',
            buff_class_id: '0',
            buff_desc: 'buff_jockey_desc',
            buff_exclusivity_id: '1',
            buff_id: buffId,
            buff_lifetime_id: '1',
            buff_name: 'super_buff',
            buff_ui_name: '',
            buff_ui_order: '',
            buff_ui_type_id: '0',
            buff_ui_visibility_id: '3',
            duration: '-1',
            icon_id: '0',
            implementation: 'Cpp:Constant',
            is_persistent: 'True',
            params: 'weapon_bow+100,xpm*3.00',
            slot_buff_ui_name: '',
            slot_icon_id: '',
            visual_effect: ''
          }
        })
      }
    }
  ]
}
