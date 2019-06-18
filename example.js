const modKingdomCome = require('./src')

const gameDir = 'C:\\Games\\Steam\\SteamApps\\common\\KingdomComeDeliverance'

const plugins = [
  require('./plugins/superBuff'),
  require('./plugins/unleveledPerks'),
  require('./plugins/maxSkillAndPerkPoints'),
  require('./plugins/moreHares'),
  require('./plugins/pebbles'),
  require('./plugins/unlimitedSaving'),
  require('./plugins/alternateFoodSpoil'),
  require('./plugins/moreRandomEvents'),
  require('./plugins/biancasRing')
]

modKingdomCome(gameDir, plugins).catch(error => console.error('KCD Modder Error', error))
