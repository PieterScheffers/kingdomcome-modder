const modKingdomCome = require('./src/index')

const gameDir = 'C:\\Games\\Steam\\SteamApps\\common\\KingdomComeDeliverance2'

const plugins = [
  modKingdomCome.plugins['kcd2-noFoodSpoil'],
  modKingdomCome.plugins['kcd2-rpgparam'],
  modKingdomCome.plugins['kcd2-super-buff'],
  // modKingdomCome.plugins['kcd2-check-buffs'],
]

modKingdomCome(gameDir, plugins).catch(error => console.error('KCD Modder Error', error))
