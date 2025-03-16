import { Model, WeaponStats, WeaponType } from '../types/gameTypes';

// Weapon Definitions
export const fists: WeaponStats = {
  name: "Unarmed",
  RNG: 1,    // 1"
  ATK: 2,    // 2 dice
  HTV: 5,    // 5+
  DMG: 1,    // 1 damage
  CRT: 1,    // 1 critical damage
  rules: "",
  weaponType: "close"
};

export const brutalWarhammer: WeaponStats = {
  name: "Brutal Warhammer",
  RNG: 1,    // 1"
  ATK: 2,    // 2 dice
  HTV: 3,    // 3+
  DMG: 2,    // 2 damage
  CRT: 4,    // 4 critical damage
  rules: "Two-handed, Armor Shatter, Strike Last, Stun, Brutal",
  weaponType: "close"
};

export const fangs: WeaponStats = {
  name: "Fangs",
  RNG: 1,    // 1"
  ATK: 3,    // 3 dice
  HTV: 5,    // 5+
  DMG: 2,    // 2 damage
  CRT: 3,    // 3 critical damage
  rules: "",
  weaponType: "close"
};

export const greataxe: WeaponStats = {
  name: "Greataxe",
  RNG: 1,    // 1"
  ATK: 4,    // 4 dice
  HTV: 4,    // 4+
  DMG: 2,    // 2 damage
  CRT: 4,    // 4 critical damage
  rules: "Two-handed, Strike Last, Rending",
  weaponType: "close"
};

export const pistol: WeaponStats = {
  name: "Pistol",
  RNG: 10,   // 10"
  ATK: 2,    // 2 dice
  HTV: 3,    // 3+
  DMG: 2,    // 2 damage
  CRT: 4,    // 4 critical damage
  rules: "Armor Piercing",
  weaponType: "range"
};

export const axe: WeaponStats = {
  name: "Axe",
  RNG: 1,    // 1"
  ATK: 3,    // 3 dice
  HTV: 4,    // 4+
  DMG: 2,    // 2 damage
  CRT: 3,    // 3 critical damage
  rules: "Armor Piercing",
  weaponType: "close"
};

export const crossbow: WeaponStats = {
  name: "Crossbow",
  RNG: 12,   // 12"
  ATK: 2,    // 2 dice
  HTV: 3,    // 3+
  DMG: 2,    // 2 damage
  CRT: 4,    // 4 critical damage
  rules: "Armor Piercing",
  weaponType: "range"
};

export const knife: WeaponStats = {
  name: "Knife",
  RNG: 1,    // 1"
  ATK: 3,    // 3 dice
  HTV: 5,    // 5+
  DMG: 2,    // 2 damage
  CRT: 3,    // 3 critical damage
  rules: "",
  weaponType: "close"
};

export const duelingSword: WeaponStats = {
  name: "Duelling Sword",
  RNG: 1,    // 1"
  ATK: 3,    // 3 dice
  HTV: 4,    // 4+
  DMG: 2,    // 2 damage
  CRT: 3,    // 3 critical damage
  rules: "Parry",
  weaponType: "close"
};

export const torch: WeaponStats = {
  name: "Torch",
  RNG: 1,    // 1"
  ATK: 0,    // 0 dice
  HTV: 4,    // 4+
  DMG: 1,    // 1 damage
  CRT: 2,    // 2 critical damage
  rules: "Reveal",
  weaponType: "close"
};

export const gnarledStaff: WeaponStats = {
  name: "Gnarled Staff",
  RNG: 8,    // 8"
  ATK: 2,    // 2 dice
  HTV: 4,    // 4+
  DMG: 3,    // 3 damage
  CRT: 6,    // 6 critical damage
  rules: "Blighted",
  weaponType: "range"
};

export const brutalSpear: WeaponStats = {
  name: "Brutal Spear",
  RNG: 2,    // 2"
  ATK: 3,    // 3 dice
  HTV: 4,    // 4+
  DMG: 2,    // 2 damage
  CRT: 3,    // 3 critical damage
  rules: "Reach, Brutal",
  weaponType: "close"
};

export const twoHandaxes: WeaponStats = {
  name: "Two Handaxes",
  RNG: 1,    // 1"
  ATK: 4,    // 3 dice
  HTV: 4,    // 4+
  DMG: 2,    // 2 damage
  CRT: 3,    // 3 critical damage
  rules: "Armor Piercing",
  weaponType: "close"
};

export const halberd: WeaponStats = {
  name: "Halberd",
  RNG: 2,    // 2"
  ATK: 3,    // 3 dice
  HTV: 4,    // 4+
  DMG: 2,    // 2 damage
  CRT: 3,    // 3 critical damage
  rules: "Reach",
  weaponType: "close"
};

export const shockGrasp: WeaponStats = {
  name: "Shock Grasp",
  RNG: 1,    // 1"
  ATK: 2,    // 2 dice
  HTV: 5,    // 5+
  DMG: 2,    // 2 damage
  CRT: 2,    // 2 critical damage
  rules: "Stun",
  weaponType: "close"
};

export const electroCoil: WeaponStats = {
  name: "Electro Coil",
  RNG: 6,    // 6"
  ATK: 3,    // 3 dice
  HTV: 4,    // 4+
  DMG: 2,    // 2 damage
  CRT: 3,    // 3 critical damage
  rules: "Stun",
  weaponType: "range"
};

export const club: WeaponStats = {
  name: "Club",
  RNG: 1,    // 1"
  ATK: 3,    // 3 dice
  HTV: 5,    // 5+
  DMG: 2,    // 2 damage
  CRT: 3,    // 3 critical damage
  rules: "",
  weaponType: "close"
};

export const deathGrip: WeaponStats = {
  name: "Death Grip",
  RNG: 1,    // 1"
  ATK: 1,    // 1 dice
  HTV: 3,    // 3+
  DMG: 2,    // 2 damage
  CRT: 3,    // 3 critical damage
  rules: "Blighted, Necrotic",
  weaponType: "close"
};

// Test Models
export const fighter: Model = {
  id: "fighter_1",
  name: "Fighter",
  faction: "Beasts",
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
  faction: "Primordial",
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
    SR: ["Tank", "Medium Armor", "Tough"]
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

// Bloodforged Models
export const savageSorcererLord: Model = {
  id: "savage_sorcerer_lord_1",
  name: "Savage Sorcerer Lord",
  faction: "Primordial",
  bodyType: "",
  tier: "leader",
  armor: "medium",
  class: "",
  stats: {
    AP: 4,
    PT: 218,
    MOV: 6,
    DEF: 3,
    SAV: 4,
    WND: 25,
    SR: ["Leader", "Hero", "Arcane", "Fly", "Medium Armor"]
  },
  weapons: [gnarledStaff],
  gear: [],
  currentWounds: 25,
  statusEffects: [],
  injuries: [],
  isReady: true,
  isHidden: false,
  position: { x: 0, y: 0 }
};

export const savageFighterWithSpear: Model = {
  id: "savage_fighter_spear_1",
  name: "Savage Fighter with Spear",
  faction: "Primordial",
  bodyType: "",
  tier: "normal",
  armor: "medium",
  class: "",
  stats: {
    AP: 2,
    PT: 126,
    MOV: 4,
    DEF: 3,
    SAV: 4,
    WND: 13,
    SR: ["Medium Armor", "Furious", "Relentless"]
  },
  weapons: [brutalSpear],
  gear: [],
  currentWounds: 13,
  statusEffects: [],
  injuries: [],
  isReady: true,
  isHidden: false,
  position: { x: 0, y: 0 }
};

export const savageFighterWithAxes: Model = {
  id: "savage_fighter_axes_1",
  name: "Savage Fighter with two Axes",
  faction: "Primordial",
  bodyType: "",
  tier: "normal",
  armor: "medium",
  class: "",
  stats: {
    AP: 2,
    PT: 125,
    MOV: 4,
    DEF: 3,
    SAV: 4,
    WND: 13,
    SR: ["Medium Armor", "Furious", "Relentless"]
  },
  weapons: [twoHandaxes],
  gear: [],
  currentWounds: 13,
  statusEffects: [],
  injuries: [],
  isReady: true,
  isHidden: false,
  position: { x: 0, y: 0 }
};

// Undying Models
export const zombieWithKnife: Model = {
  id: "zombie_knife_1",
  name: "Zombie with Knife",
  faction: "Undead",
  bodyType: "",
  tier: "normal",
  armor: "none",
  class: "",
  stats: {
    AP: 2,
    PT: 61,
    MOV: 3,
    DEF: 3,
    SAV: 6,
    WND: 8,
    SR: ["Resilient", "Group", "Necrotic Hunger", "Ambush"]
  },
  weapons: [knife],
  gear: [],
  currentWounds: 8,
  statusEffects: [],
  injuries: [],
  isReady: true,
  isHidden: false,
  position: { x: 0, y: 0 }
};

export const zombieWithHalberd: Model = {
  id: "zombie_halberd_1",
  name: "Zombie with Halberd and Shield",
  faction: "Undead",
  bodyType: "",
  tier: "normal",
  armor: "none",
  class: "",
  stats: {
    AP: 2,
    PT: 85,
    MOV: 3,
    DEF: 3,
    SAV: 5,
    WND: 8,
    SR: ["Resilient", "Slow", "Necrotic Hunger", "Shield"]
  },
  weapons: [halberd],
  gear: [],
  currentWounds: 8,
  statusEffects: [],
  injuries: [],
  isReady: true,
  isHidden: false,
  position: { x: 0, y: 0 }
};

export const zombieWithElectroCoil: Model = {
  id: "zombie_electrocoil_1",
  name: "Zombie with Electro Coil",
  faction: "Undead",
  bodyType: "",
  tier: "normal",
  armor: "none",
  class: "",
  stats: {
    AP: 2,
    PT: 65,
    MOV: 3,
    DEF: 3,
    SAV: 6,
    WND: 8,
    SR: ["Resilient", "Group", "Slow", "Necrotic Hunger"]
  },
  weapons: [shockGrasp, electroCoil],
  gear: [],
  currentWounds: 8,
  statusEffects: [],
  injuries: [],
  isReady: true,
  isHidden: false,
  position: { x: 0, y: 0 }
};

export const zombieWithKnifeAndElectroCoil: Model = {
  id: "zombie_knife_electrocoil_1",
  name: "Zombie with Knife and Electro Coil",
  faction: "Undead",
  bodyType: "",
  tier: "normal",
  armor: "none",
  class: "",
  stats: {
    AP: 2,
    PT: 72,
    MOV: 3,
    DEF: 3,
    SAV: 6,
    WND: 8,
    SR: ["Resilient", "Group", "Slow", "Necrotic Hunger"]
  },
  weapons: [shockGrasp, electroCoil, knife],
  gear: [],
  currentWounds: 8,
  statusEffects: [],
  injuries: [],
  isReady: true,
  isHidden: false,
  position: { x: 0, y: 0 }
};

export const zombieWithClubAndElectroCoil: Model = {
  id: "zombie_club_electrocoil_1",
  name: "Zombie with Club and Electro Coil",
  faction: "Undead",
  bodyType: "",
  tier: "normal",
  armor: "none",
  class: "",
  stats: {
    AP: 2,
    PT: 72,
    MOV: 3,
    DEF: 3,
    SAV: 6,
    WND: 8,
    SR: ["Resilient", "Group", "Slow", "Necrotic Hunger"]
  },
  weapons: [shockGrasp, electroCoil, club],
  gear: [],
  currentWounds: 8,
  statusEffects: [],
  injuries: [],
  isReady: true,
  isHidden: false,
  position: { x: 0, y: 0 }
};

export const necromancerWithStaff: Model = {
  id: "necromancer_staff_1",
  name: "Necromancer with Staff",
  faction: "Undead",
  bodyType: "",
  tier: "leader",
  armor: "none",
  class: "",
  stats: {
    AP: 4,
    PT: 189,
    MOV: 4,
    DEF: 3,
    SAV: 5,
    WND: 20,
    SR: ["Leader", "Arcane", "Archmage", "Fear"]
  },
  weapons: [gnarledStaff, deathGrip],
  gear: [],
  currentWounds: 20,
  statusEffects: [],
  injuries: [],
  isReady: true,
  isHidden: false,
  position: { x: 0, y: 0 }
};