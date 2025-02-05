const modKingdomCome = require('./src/index')

const gameDir = 'C:\\Games\\Steam\\SteamApps\\common\\KingdomComeDeliverance'

const plugins = [
  // modKingdomCome.plugins['more-hares'],
  modKingdomCome.plugins['alternate-food-spoil'],
  // modKingdomCome.plugins['biancas-ring'],
  modKingdomCome.plugins['bow-charge-duration'],
  modKingdomCome.plugins['capon-bow'],
  modKingdomCome.plugins['max-perk-points'],
  modKingdomCome.plugins['more-random-events'],
  modKingdomCome.plugins['pebbles'],
  modKingdomCome.plugins['rpg-param'],
  modKingdomCome.plugins['super-buff'],
  modKingdomCome.plugins['unleveled-perks'],
  // modKingdomCome.plugins['unlimited-saving'],
  // modKingdomCome.plugins['miller-more-money'],
  modKingdomCome.plugins['easy-reputation'],
  modKingdomCome.plugins['no-master-strikes'],
  // modKingdomCome.plugins['check-buffs'],
]

modKingdomCome(gameDir, plugins).catch(error => console.error('KCD Modder Error', error))
