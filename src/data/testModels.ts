import { Model, WeaponStats } from '../types/gameTypes';

// Weapon Definitions
const brutalWarhammer: WeaponStats = {
  name: "Brutal Warhammer",
  RNG: 1,    // 1"
  ATK: 2,    // 2 dice
  HTV: 3,    // 3+
  DMG: 2,    // 2 damage
  CRT: 4,    // 4 critical damage
  rules: "Two-handed, Armor Shatter, Strike Last, Stun, Brutal"
};

const fangs: WeaponStats = {
  name: "Fangs",
  RNG: 1,    // 1"
  ATK: 3,    // 3 dice
  HTV: 5,    // 5+
  DMG: 2,    // 2 damage
  CRT: 3,    // 3 critical damage
  rules: ""
};

const greataxe: WeaponStats = {
  name: "Greataxe",
  RNG: 1,    // 1"
  ATK: 4,    // 4 dice
  HTV: 4,    // 4+
  DMG: 2,    // 2 damage
  CRT: 4,    // 4 critical damage
  rules: "Two-handed, Strike Last, Rending"
};

const pistol: WeaponStats = {
  name: "Pistol",
  RNG: 10,   // 10"
  ATK: 2,    // 2 dice
  HTV: 3,    // 3+
  DMG: 2,    // 2 damage
  CRT: 4,    // 4 critical damage
  rules: "Armor Piercing"
};

const axe: WeaponStats = {
  name: "Axe",
  RNG: 1,    // 1"
  ATK: 3,    // 3 dice
  HTV: 4,    // 4+
  DMG: 2,    // 2 damage
  CRT: 3,    // 3 critical damage
  rules: "Armor Piercing"
};

const crossbow: WeaponStats = {
  name: "Crossbow",
  RNG: 12,   // 12"
  ATK: 2,    // 2 dice
  HTV: 3,    // 3+
  DMG: 2,    // 2 damage
  CRT: 4,    // 4 critical damage
  rules: "Armor Piercing"
};

const knife: WeaponStats = {
  name: "Knife",
  RNG: 1,    // 1"
  ATK: 3,    // 3 dice
  HTV: 5,    // 5+
  DMG: 2,    // 2 damage
  CRT: 3,    // 3 critical damage
  rules: ""
};

const duelingSword: WeaponStats = {
  name: "Duelling Sword",
  RNG: 1,    // 1"
  ATK: 3,    // 3 dice
  HTV: 4,    // 4+
  DMG: 2,    // 2 damage
  CRT: 3,    // 3 critical damage
  rules: "Parry"
};

const torch: WeaponStats = {
  name: "Torch",
  RNG: 1,    // 1"
  ATK: 0,    // 0 dice
  HTV: 4,    // 4+
  DMG: 1,    // 1 damage
  CRT: 2,    // 2 critical damage
  rules: "Reveal"
};

// Test Models
export const fighter: Model = {
  id: "fighter_1",
  name: "Fighter",
  faction: "Test Faction",
  bodyType: "",
  tier: "normal",
  armor: "none",
  class: "",
  stats: {
    AP: 2,
    PT: 67,
    MOV: 4,
    DEF: 3,
    SAV: 5,
    WND: 10,
    SR: []
  },
  weapons: [],
  gear: [],
  currentWounds: 10,
  statusEffects: [],
  injuries: [],
  isReady: true,
  isHidden: false,
  position: { x: 0, y: 0 }
};

export const savageBrute: Model = {
  id: "savage_brute_1",
  name: "Savage Brute with Warhammer",
  faction: "Test Faction",
  bodyType: "",
  tier: "normal",
  armor: "medium",
  class: "",
  stats: {
    AP: 2,
    PT: 165,
    MOV: 4,
    DEF: 4,
    SAV: 4,
    WND: 16,
    SR: ["Tank", "Medium Armor", "Tougher"]
  },
  weapons: [brutalWarhammer],
  gear: [],
  currentWounds: 16,
  statusEffects: [],
  injuries: [],
  isReady: true,
  isHidden: false,
  position: { x: 0, y: 0 }
};

// Imperial Models
export const warhound: Model = {
  id: "warhound_1",
  name: "Warhound",
  faction: "Imperial",
  bodyType: "",
  tier: "normal",
  armor: "none",
  class: "",
  stats: {
    AP: 2,
    PT: 52,
    MOV: 5,
    DEF: 2,
    SAV: 6,
    WND: 8,
    SR: ["Group", "Furious"]
  },
  weapons: [fangs],
  gear: [],
  currentWounds: 8,
  statusEffects: [],
  injuries: [],
  isReady: true,
  isHidden: false,
  position: { x: 0, y: 0 }
};

export const bruteWithGreataxe: Model = {
  id: "brute_greataxe_1",
  name: "Brute with Greataxe",
  faction: "Imperial",
  bodyType: "",
  tier: "normal",
  armor: "medium",
  class: "",
  stats: {
    AP: 2,
    PT: 117,
    MOV: 4,
    DEF: 4,
    SAV: 4,
    WND: 12,
    SR: ["Tank", "Medium Armor", "Tough"]
  },
  weapons: [greataxe],
  gear: [],
  currentWounds: 12,
  statusEffects: [],
  injuries: [],
  isReady: true,
  isHidden: false,
  position: { x: 0, y: 0 }
};

export const gunslingerWithPistol: Model = {
  id: "gunslinger_1",
  name: "Gunslinger with Pistol",
  faction: "Imperial",
  bodyType: "",
  tier: "normal",
  armor: "none",
  class: "",
  stats: {
    AP: 2,
    PT: 111,
    MOV: 4,
    DEF: 3,
    SAV: 5,
    WND: 10,
    SR: ["Gunslinger"]
  },
  weapons: [pistol, axe],
  gear: [],
  currentWounds: 10,
  statusEffects: [],
  injuries: [],
  isReady: true,
  isHidden: false,
  position: { x: 0, y: 0 }
};

export const marksmanWithCrossbow: Model = {
  id: "marksman_1",
  name: "Marksman with Crossbow",
  faction: "Imperial",
  bodyType: "",
  tier: "normal",
  armor: "medium",
  class: "",
  stats: {
    AP: 2,
    PT: 119,
    MOV: 4,
    DEF: 3,
    SAV: 4,
    WND: 10,
    SR: ["Hunter", "Versatile Quiver", "Medium Armor"]
  },
  weapons: [crossbow, knife],
  gear: [],
  currentWounds: 10,
  statusEffects: [],
  injuries: [],
  isReady: true,
  isHidden: false,
  position: { x: 0, y: 0 }
};

export const witchhunter: Model = {
  id: "witchhunter_1",
  name: "Witchhunter",
  faction: "Imperial",
  bodyType: "",
  tier: "leader",
  armor: "none",
  class: "",
  stats: {
    AP: 4,
    PT: 191,
    MOV: 4,
    DEF: 3,
    SAV: 5,
    WND: 25,
    SR: ["Fearless", "Leader", "Hero"]
  },
  weapons: [duelingSword, pistol, torch],
  gear: [],
  currentWounds: 25,
  statusEffects: [],
  injuries: [],
  isReady: true,
  isHidden: false,
  position: { x: 0, y: 0 }
};