module.exports = {
  name: 'kcd2-check-buffs',
  files: [
    {
      file: 'Libs/Tables/rpg/buff__perk.xml',
      pakFile: null,
      modifyFile: async (doc, { findDeep, findAttr, getAttributes }) => {
        const rows = findDeep(doc.documentElement, { name: 'buff' })
        if (!rows.length) throw new Error(`[check-buffs][Libs/Tables/rpg/buff.xml] Error: buff not found`)

        const paramTypes = {}

        for (const row of rows) {
          // console.log(getAttributes(row))
          const buffParamsattr = findAttr(row, 'buff_params')
          if (!buffParamsattr || !buffParamsattr.value) continue

          const params = buffParamsattr.value
          const implementation = findAttr(row, 'implementation').value
          const buffName = findAttr(row, 'buff_name').value
          const buffId = findAttr(row, 'buff_id').value

          // console.log(buffId, buffName, implementation, params)

          const paramsFound = [...params.matchAll(/[a-z_A-Z]{3,}/g)].map(([p]) => p)

          for (const paramFound of paramsFound) {
            paramTypes[paramFound] = [...(paramTypes[paramFound] ?? []), { buffId, buffName, implementation, params }]
          }
        }

        // console.log(JSON.stringify(Object.keys(paramTypes)))

        console.log(JSON.stringify(paramTypes, null, 2))
      }
    }
  ]
}
