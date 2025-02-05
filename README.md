# Kingdom Come Deliverance modder [![npm version](https://badge.fury.io/js/kcd-modder.svg)](https://badge.fury.io/js/kcd-modder)
After every update of Kingdom Come Deliverance all mods would have to be updated.
This program describes the mods as changes to the XML files and executes these changes.
So if Kingdom Come ever updates, just run this program again and all mods are updated.

The plugins are small js files with the modifications to the XML files. This modder applies those modifications and creates the mods.
When multiple plugins use the same file, this modder automatically puts all those plugins in the same mod.

Update 2025: This modder works also for Kingdom come Deliverance 2!

## Install
```bash
npm install kcd-modder
```

## Usage
```js
const modKingdomCome = require('kcd-modder')

const gameDir = 'C:\\Program Files\\Steam\\SteamApps\\common\\KingdomComeDeliverance'

const plugins = [
  modKingdomCome.plugins['more-hares'],
  {
    name: 'alternate-food-spoil',
    order: 600, // Used for plugin ordering. A plugin that should always run last should have a high order number
    files: [ // Array with all files that should be modified. The files are modified in the order of this array
      {
        file: 'Libs/Tables/item/food.xml', // file to modify
        modifyFile: async (doc, { findDeep, setAttr }) => { // async function that modifies the XML DomDocument
          const rows = findDeep(doc.documentElement, { name: 'row', attr: { decay_time_hours: '' } })
          if (!rows.length) throw new Error(`[alternate-food-spoil][Libs/Tables/item/food.xml] Error: rows with attribute decay_time_hours not found`)

          for (const row of rows) {
            setAttr(row, 'decay_time_hours', '0')
          }
        }
      }
    ]
  }
]

modKingdomCome(gameDir, plugins).catch(error => console.error('KCD Modder Error', error))

```

## Assumptions and limitations
- Every data file is in 1 .pak file, a file cannot be in multiple pak files
- This modder only works for XML files
- The modder tries to output XML files that are the same as the original files. This means that when using a diff-tool, only the lines that are actually changed appear as changed in the diff-tool. This makes is it easier to check if all went well.

## Done
- Read KingDom Come Deliverance data folder .pak files
- Bundle plugins in the same mod when the plugins modify the same file
- Write mods to a temporary folder
- Read XML into a DomDocument model and write it back to XML
- Create some methods to easily modify DomDocument model
- Modify files in the order of the plugin.files array
- Apply plugins in the order of plugin.order (higher is later) (default: 500)

## Roadmap (TODO)
- Backup old mods in Kingdom Come Mods folder and install new ones
- Create commandline tool

## Linter
This repository uses StandardJS for linting the .js files
