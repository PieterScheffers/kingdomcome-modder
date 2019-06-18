module.exports = {
  name: 'more-hares',
  files: [
    {
      file: 'Libs/AI/final/dynamic.xml',
      pakFile: null,
      modifyFile: async (doc, { findOneDeep, setAttr }) => {
        const behaviorTree = findOneDeep(doc.documentElement, { name: 'BehaviorTree', attr: { name: 'dynamic_on_update' } })
        if (!behaviorTree) throw new Error('[more-hares][Libs/AI/final/dynamic.xml] Error: BehaviorTree with attribute name="dynamic_on_update" not found')

        const variable = findOneDeep(behaviorTree, { name: 'Variable', attr: { name: 'haresMax', values: '' } })
        if (!variable) throw new Error('[more-hares][Libs/AI/final/dynamic.xml] Error: Variable with attribute name="haresMax" not found')

        setAttr(variable, 'values', 80)

        // const behaviorTrees = Object.values(doc.getElementsByTagName('BehaviorTree'))
        // // const dynamicOnUpdate = behaviorTrees.find(n => n.attributes && Object.values(n.attributes).find(a => a.name === 'name' && a.value === 'dynamic_on_update'))
        // const dynamicOnUpdate = behaviorTrees.find(n => n.attributes && Object.values(n.attributes).find(a => a.name === 'name' && a.value === 'dynamic_on_update'))

        // const variables = Object.values(dynamicOnUpdate.childNodes).find(e => e.nodeName === 'Variables')
        // const haresMax = Object.values(variables.childNodes).find(e => e.nodeName === 'Variable' && Object.values(e.attributes).find(a => a.name === 'name' && a.value === 'haresMax'))
        // const values = Object.values(haresMax.attributes).find(e => e.name === 'values')
        // values.nodeValue = values.value = '80'
      }
    }
  ]
}
