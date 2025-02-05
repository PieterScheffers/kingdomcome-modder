module.exports = {
  name: 'kcd2-noFoodSpoil',
  files: [
    {
      file: 'Libs/Tables/item/item.xml',
      pakFile: null,
      modifyFile: async (doc, { findDeep, setAttr }) => {
        const itemClasses = findDeep(doc.documentElement, { name: 'ItemClasses' })
        if (!itemClasses.length) throw new Error(`[kcd2-noFoodSpoil][Libs/Tables/item/item.xml] Error: ItemClasses not found`)

        const foods = findDeep(itemClasses, { name: 'Food', attr: { DecayTime: '' } })
        if (!foods.length) throw new Error(`[kcd2-noFoodSpoil][Libs/Tables/item/item.xml] Error: Food rows with attribute DecayTime not found`)

        for (const food of foods) {
          setAttr(food, 'DecayTime', '0')
        }

        const herbs = findDeep(itemClasses, { name: 'Herb', attr: { DecayTime: '' } })
        if (!herbs.length) throw new Error(`[kcd2-noFoodSpoil][Libs/Tables/item/item.xml] Error: Herb rows with attribute DecayTime not found`)

        for (const herb of herbs) {
          setAttr(herb, 'DecayTime', '0')
        }
      }
    }
  ]
}
