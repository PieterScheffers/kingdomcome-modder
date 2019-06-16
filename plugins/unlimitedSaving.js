module.exports = {
  name: 'unlimited-saving',
  files: [
    {
      file: 'Libs/UI/UIActions/MM_SaveGame.xml',
      pakFile: null,
      modifyFile: async (doc, { findDeep, setAttr }) => {
        const inputs = findDeep(doc.documentElement, { name: 'Inputs', attr: { UsePotion: '1' } })
        if (!inputs.length) throw new Error('[unlimited-saving][Libs/UI/UIActions/MM_SaveGame.xml] Error: No Inputs with attribute UsePotion="1" found')

        for (const input of inputs) {
          setAttr(input, 'UsePotion', '0')
        }
      }
    }
  ]
}
