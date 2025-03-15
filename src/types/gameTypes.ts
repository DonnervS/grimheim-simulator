export interface Model {
  name: string;
  maxWounds: number;
  currentWounds: number;
  weapons: WeaponStats[];
}

export interface WeaponStats {
  name: string;
  ATK: number;
  HTV: number;
  DMG: number;
  CRT: number;
  rules?: string[];
}