const modKingdomCome = require('./src/index')

const gameDir = 'C:\\Games\\Steam\\SteamApps\\common\\KingdomComeDeliverance2'

const plugins = [
  modKingdomCome.plugins['kcd2-noFoodSpoil'],
]

modKingdomCome(gameDir, plugins).catch(error => console.error('KCD Modder Error', error))
