// Basis-Aktionen (1 AP)
export const BASIC_ACTIONS = {
  MOVE: 'MOVE',
  SHOOT: 'SHOOT',
  CHARGE: 'CHARGE',
  FIGHT: 'FIGHT',
  HIDE: 'HIDE',
  PASS: 'PASS',
  INTERACT: 'INTERACT',
  LOOT: 'LOOT',
  RECOVER: 'RECOVER'
} as const

// Erweiterte Aktionen (2 AP)
export const EXTENDED_ACTIONS = {
  FALL_BACK: 'FALL_BACK',
  RUN: 'RUN'
} as const

// Spezial-Aktionen (1 AP, benötigen spezielle Regeln)
export const SPECIAL_ACTIONS = {
  OVERWATCH: 'OVERWATCH',
  GUARD: 'GUARD',
  CAST_SPELL: 'CAST_SPELL',
  PRAYER: 'PRAYER',
  OVEREXERTION: 'OVEREXERTION',
  RUN_AND_GUN: 'RUN_AND_GUN',
  TAKE_AIM: 'TAKE_AIM',
  HEAL: 'HEAL',
  COUNTERSPELL: 'COUNTERSPELL',
  COMMAND: 'COMMAND',
  RELOAD: 'RELOAD',
  CLEANSE: 'CLEANSE'
} as const

// Kostenlose Aktionen (0 AP, nur bei Unterzahl)
export const FREE_ACTIONS = {
  REPOSITION: 'REPOSITION',
  AGAINST_ALL_ODDS: 'AGAINST_ALL_ODDS'
} as const

// Aktionskosten
export const ACTION_COSTS = {
  [BASIC_ACTIONS.MOVE]: 1,
  [BASIC_ACTIONS.SHOOT]: 1,
  [BASIC_ACTIONS.CHARGE]: 1,
  [BASIC_ACTIONS.FIGHT]: 1,
  [BASIC_ACTIONS.HIDE]: 1,
  [BASIC_ACTIONS.PASS]: 1,
  [BASIC_ACTIONS.INTERACT]: 1,
  [BASIC_ACTIONS.LOOT]: 1,
  [BASIC_ACTIONS.RECOVER]: 1,
  [EXTENDED_ACTIONS.FALL_BACK]: 2,
  [EXTENDED_ACTIONS.RUN]: 2,
  [SPECIAL_ACTIONS.OVERWATCH]: 1,
  [SPECIAL_ACTIONS.GUARD]: 1,
  [SPECIAL_ACTIONS.CAST_SPELL]: 1,
  [SPECIAL_ACTIONS.PRAYER]: 1,
  [SPECIAL_ACTIONS.OVEREXERTION]: 1,
  [SPECIAL_ACTIONS.RUN_AND_GUN]: 1,
  [SPECIAL_ACTIONS.TAKE_AIM]: 2,
  [SPECIAL_ACTIONS.HEAL]: 1,
  [SPECIAL_ACTIONS.COUNTERSPELL]: 1,
  [SPECIAL_ACTIONS.COMMAND]: 1,
  [SPECIAL_ACTIONS.RELOAD]: 1,
  [SPECIAL_ACTIONS.CLEANSE]: 1,
  [FREE_ACTIONS.REPOSITION]: 0,
  [FREE_ACTIONS.AGAINST_ALL_ODDS]: 0
} as const

// Aktionseinschränkungen
export const ACTION_RESTRICTIONS = {
  [BASIC_ACTIONS.MOVE]: {
    cannotBeUsedInMelee: true,
    cannotBeUsedWithCharge: true,
    cannotBeUsedWithFallBack: true
  },
  [BASIC_ACTIONS.SHOOT]: {
    cannotBeUsedInMelee: true,
    cannotBeUsedWithHide: true
  },
  [BASIC_ACTIONS.CHARGE]: {
    cannotBeUsedInMelee: true,
    cannotBeUsedWithMove: true,
    cannotBeUsedWithFallBack: true,
    cannotBeUsedWithHide: true
  },
  [BASIC_ACTIONS.FIGHT]: {
    mustBeInMelee: true
  },
  [BASIC_ACTIONS.HIDE]: {
    cannotBeUsedInMelee: true,
    cannotBeUsedWithShoot: true,
    cannotBeUsedWithCharge: true,
    cannotBeUsedWithOverwatch: true
  },
  [EXTENDED_ACTIONS.FALL_BACK]: {
    mustBeInMelee: true,
    cannotBeUsedWithMove: true,
    cannotBeUsedWithCharge: true
  },
  [EXTENDED_ACTIONS.RUN]: {
    cannotBeUsedInMelee: true,
    cannotBeUsedWithCharge: true,
    cannotBeUsedWithFallBack: true
  },
  [SPECIAL_ACTIONS.OVERWATCH]: {
    cannotBeUsedInMelee: true,
    cannotBeUsedWithHide: true
  },
  [SPECIAL_ACTIONS.RUN_AND_GUN]: {
    cannotBeUsedInMelee: true,
    cannotBeUsedWithHide: true
  },
  [SPECIAL_ACTIONS.TAKE_AIM]: {
    cannotBeUsedInMelee: true,
    cannotBeUsedWithHide: true,
    cannotBeUsedWithRun: true
  }
} as const