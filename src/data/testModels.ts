import { Model, WeaponStats } from '../types/gameTypes';

// Waffen-Definitionen
const brutalWarhammer: WeaponStats = {
  name: "Brutal Warhammer",
  RNG: 1,    // 1"
  ATK: 2,    // 2 Würfel
  HTV: 3,    // 3+
  DMG: 2,    // 2 Schaden
  CRT: 4,    // 4 kritischer Schaden
  WR: ["Two-handed", "Armor Shatter", "Strike Last", "Stun", "Brutal"]
};

const greataxe: WeaponStats = {
  name: "Greataxe",
  RNG: 1,    // 1"
  ATK: 4,    // 4 Würfel
  HTV: 4,    // 4+
  DMG: 2,    // 2 Schaden
  CRT: 4,    // 4 kritischer Schaden
  WR: ["Two-handed", "Strike Last", "Rending"]
};

// Testmodelle
export const fighter: Model = {
  id: "fighter_1",
  name: "Fighter",
  faction: "Test Faction",
  bodyType: "Humanoid",
  tier: "normal",
  armor: "none",
  class: "Fighter",
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
  bodyType: "Humanoid",
  tier: "normal",
  armor: "medium",
  class: "Brute",
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

export const bruteWithGreataxe: Model = {
  id: "brute_greataxe_1",
  name: "Brute with Greataxe",
  faction: "Test Faction",
  bodyType: "Humanoid",
  tier: "normal",
  armor: "medium",
  class: "Brute",
  stats: {
    AP: 2,
    PT: 132,
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