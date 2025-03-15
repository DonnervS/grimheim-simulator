// Basis-Statistiken für ein Modell
export interface ModelStats {
  AP: number;    // Action Points
  PT: number;    // Points Cost
  MOV: number;   // Movement in inches
  DEF: number;   // Defense Dice
  SAV: number;   // Save Value
  WND: number;   // Wounds
  SR: string[];  // Special Rules
}

// Waffen-Statistiken
export interface WeaponStats {
  name: string;   // Name der Waffe
  RNG: number;   // Range in inches
  ATK: number;   // Attack Dice
  HTV: number;   // Hit Value
  DMG: number;   // Normal Damage
  CRT: number;   // Critical Damage
  WR: string[];  // Weapon Rules
}

// Status-Effekte
export type StatusEffect = 
  | 'Stunned'
  | 'Burning'
  | 'Frozen'
  | 'Fearful'
  | 'Poisoned'
  | 'Cursed';

// Verletzungen
export type Injury = 
  | 'Head'    // HTV +1
  | 'Arm'     // ATK -1
  | 'Leg'     // MOV -1
  | 'None';   // Just a Scratch

// Ein komplettes Modell
export interface Model {
  id: string;
  name: string;
  faction: string;
  bodyType: string;
  tier: 'normal' | 'exceptional' | 'leader';
  armor: 'none' | 'light' | 'medium' | 'heavy';
  class: string;
  stats: ModelStats;
  weapons: WeaponStats[];
  gear: string[];
  currentWounds: number;
  statusEffects: StatusEffect[];
  injuries: Injury[];
  isReady: boolean;
  isHidden: boolean;
  position: {
    x: number;
    y: number;
  };
}

// Eine komplette Warband
export interface Warband {
  id: string;
  name: string;
  faction: string;
  models: Model[];
  totalPoints: number;
  victoryPoints: number;
  fateDice: number[];
}

// Spielzustand
export interface GameState {
  turn: number;
  phase: 'initiative' | 'fate' | 'action';
  activePlayer: 'player1' | 'player2';
  player1: {
    warband: Warband;
    fateDice: number[];
  };
  player2: {
    warband: Warband;
    fateDice: number[];
  };
  missionObjectives: {
    id: string;
    description: string;
    victoryPoints: number;
    position?: {
      x: number;
      y: number;
    };
  }[];
}