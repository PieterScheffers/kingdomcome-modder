module.exports = {
  name: 'faster-experience',
  files: [
    {
      file: 'Libs/Tables/rpg/rpg_param.xml',
      pakFile: null,
      modifyFile: async (doc, { findOneDeep, addOrSetElement }) => {
        const rows = findOneDeep(doc.documentElement, { name: 'rows' })
        if (!rows) throw new Error(`[faster-experience][Libs/Tables/rpg/rpg_param.xml] Error: rows not found`)

        throw new Error('[faster-experience] Error plugin unfinished. Use SuperBuff instead (with xpm modifier)')

        // const levelBaseDiff = {
        //   AgilityXPLevelBase: '20',
        //   AgilityXPLevelDiff: '30',
        //   SkillXPLevelBase: '20',
        //   SkillXPLevelDiff: '30',
        //   StrengthXPLevelBase: '20',
        //   StrengthXPLevelDiff: '30',
        //   VitalityXPLevelBase: '20',
        //   VitalityXPLevelDiff: '30',
        //   SpeechXPLevelBase: '20',
        //   SpeechXPLevelDiff: '30',
        //   StoryProgressXPLevelBase: '20',
        //   StoryProgressXPLevelDiff: '30'
        // }

        // const xpActions = {
        //   AlchemyXPPerAutocookBrewingRelative: '0.1',
        //   AlchemyXPPerSuccessfullBrewing: '40',
        //   AthleticXPAwardDistance: '500',
        //   CombatAutoTrickInvalidBlockAttackMaxProb: '0.5',
        //   CombatAutoTrickMaxProb: '0.5',
        //   FactionAngrinessDecayExp: '2',
        //   HerbGatherXP: '7',
        //   HorseRidingXPPerDistance: '12.5',
        //   HunterXPKill: '15',
        //   HunterXPLoot: '10',
        //   ItemOwnerDescFadeToSuspiciencyExp: '0.25',
        //   ItemOwnerFadeCoefToSuspiciencyExp: '3',
        //   LockPickingFailRelativeXPMulCoef: '0.101563',
        //   LockPickingStealthXP: '8',
        //   LockPickingSuccessXPDivCoef: '0.046875',
        //   LockPickingSuccessXPMulCoef: '18',
        //   MaxPedalCost: '2',
        //   MaxPerfectBlockSlotModifier: '0.85',
        //   NonSkillBookXP: '30',
        //   PickpocketingFailXPMod: '0.3',
        //   PickpocketingStealthXP: '12',
        //   PickpocketingTreasurePriceXP: '100',
        //   PickpocketingXP: '15',
        //   ReadingXpPerHour: '20',
        //   SecondaryStatXPRatio: '0.5',
        //   SharpeningFullNegativeHealthXP: '20',
        //   SharpeningFullPositiveHealthXP: '100',
        //   SkillXPBlock: '2',
        //   SkillXPComboHit: '4',
        //   SkillXPDrinkAlcohol: '1',
        //   SkillXPHit: '2',
        //   SkillXPKill: '12',
        //   SkillXPPerfectBlock: '8',
        //   SkillXPRiposte: '8',
        //   SkillXPUseRepairKit: '5',
        //   StatXPAgilityPerDodge: '2',
        //   StatXPComboHit: '4',
        //   StatXPHit: '2',
        //   StatXPKill: '8',
        //   StatXPSpeechPerSequence: '1',
        //   StatXPSpeechPersuadeSuccessMax: '10',
        //   StatXPVitalityPerDistance: '8',
        //   StatXPVitalityPerJump: '0.5',
        //   StatXPVitalityPerKill: '15',
        //   StatXPVitalityPerVault: '0.7',
        //   StealthAttackFailXp: '10',
        //   StealthAttackMaxXp: '50',
        //   StealthAttackMinXp: '25',
        //   StealthSneakBaseXp: '1',
        //   StealthSneakXpSumCoefA: '5',
        //   StealthSneakXpSumCoefB: '4'
        // }

        // addOrSetElement(rows, { name: 'row', attr: { rpg_param_key: 'MaxPerkPoints' } }, { rpg_param_value: '100' })
        // addOrSetElement(rows, { name: 'row', attr: { rpg_param_key: 'MinPerkPoints' } }, { rpg_param_value: '0' })
        // addOrSetElement(rows, { name: 'row', attr: { rpg_param_key: 'MinLeftoverPerks' } }, { rpg_param_value: '0' })
      }
    }
  ]
}
