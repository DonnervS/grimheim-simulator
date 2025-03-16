# Grimheim Game Rules Reference

## Introduction
Grimheim is a fast-paced miniature-agnostic skirmish game set in a grimdark fantasy setting. The game focuses on creating a fun and fair experience for all players, with rules designed for easy gameplay and strategic decision-making.

### General Principle
When encountering situations not covered by rules:
1. Use common sense
2. Find mutually agreeable solutions
3. If no agreement possible, perform a roll-off (each player rolls D6, highest decides, re-roll ties)

### Required Materials
- Table or game mat
- Miniatures for your warband
- Terrain pieces
- Six-sided dice (D6)
- Inch ruler
- Character Cards or Grimheim App
- Rule Cards or Grimheim App

Optional:
- Tokens or D10/D12/D20 for wound tracking
- Different colored dice

## Game Setup

### Setup Process
1. Choose mission (default: Encounter Mission)
2. Roll-off for setup roles:
   - Winner chooses between:
     * Setting up terrain (defender)
     * Picking Deployment Area (attacker)
3. Other player takes remaining role

### Victory Conditions
- Victory Points (VP) determine the winner
- VP sources defined by mission (e.g., objectives, eliminations)
- VP counted at end of each turn

## Warband Creation

### Point System
1. Agree on point limit
2. Select models from pre-made factions or create custom ones
3. Calculate total cost:
   - Faction cost
   - Body Type cost
   - Armor cost
   - Class cost
   - Weapon cost
   - Gear cost

### Model Components
1. **Faction**
   - Determines Fate modifiers
   - Same faction = special Fate modifiers
   - Mixed = general Fate modifiers

2. **Body Type**
   - Sets base stats

3. **Tier**
   - Normal or exceptional
   - One leader per warband

4. **Armor**
   - None to Heavy
   - Determines SAV value

5. **Class**
   - Modifies base stats
   - Provides Special Rules

6. **Weapons**
   - One or more per model

7. **Gear**
   - Optional equipment
   - Provides Special Rules

## Core Game Mechanics

### Dice System
```typescript
interface DiceSystem {
  D6: 1-6,    // Standard six-sided die
  D3: 1-3,    // D6 divided by 2, rounded up
  D2: 1-2,    // D6 divided by 3, rounded up
  D1: 0-1,    // D6 divided by 6, rounded up
  D6Plus1: 2-7,// D6 + 1
  D66: 11-66  // Two D6, first as tens, second as ones
}
```

### Model Statistics
```typescript
interface ModelStats {
  AP: number;   // Action Points
  PT: number;   // Points Cost
  MOV: number;  // Movement in inches
  DEF: number;  // Defense dice
  SAV: number;  // Save value
  WND: number;  // Current wounds
  maxWND: number; // Maximum wounds
  SR: string[]; // Special Rules
}
```

### Weapon Statistics
```typescript
interface WeaponStats {
  RNG: number;  // Range in inches
  ATK: number;  // Attack dice
  HTV: number;  // Hit value needed
  DMG: number;  // Normal damage
  CRT: number;  // Critical damage (on 6)
  WR: string[]; // Weapon Rules
}
```

## Turn Structure

### Turn Sequence
1. **Initiative Phase**
   - Both players roll D6
   - Highest has initiative
   - Re-roll ties

2. **Fate Phase**
   - Roll faction-based Fate dice
   - Store for use during Action Phase
   - Extra die if Underdog (20+ points less than opponent)

3. **Action Phase**
   - Alternate activating ready models
   - Spend Action Points (AP)
   - Models with Group/Large Group can activate together
   - Pass action available
   - Turn ends when no ready models remain

### Overtime Rule
- 5th round possible if player has 5+ VP less than opponent

## Combat System

### Ranged Combat
```typescript
interface RangedAttack {
  steps: [
    "Select weapon",
    "Choose target in Line of Sight",
    "Roll ATK dice vs HTV",
    "Roll defense dice vs SAV",
    "Resolve saves",
    "Apply damage"
  ];
  criticalHit: "Always on 6";
  criticalSave: "Always on 6";
  coverRule: "One automatic normal save";
}
```

### Melee Combat
```typescript
interface MeleeCombat {
  steps: [
    "Select target in Melee Range",
    "Both select weapons",
    "Both roll ATK dice vs HTV",
    "Alternate resolving hits",
    "choose strike to deal DMG/CRT(on 6) or block to remove one hit of enemy",
    "Apply damage"
  ];
  assist: "Additional friendly model in combat range gives -1 HTV";
  armorBonus: {
    "SAV 4+": "+1 block die",
    "SAV 3+": "+2 block dice"
  }
}
```

## Magic System

### Spellcasting
```typescript
interface MagicSystem {
  magicalEnergy: "2D6 per Cast action";
  failureRule: "1s deal 2 damage to caster";
  counterspell: {
    preparation: "Once per turn",
    effect: "Reduces required energy"
  }
}
```

## Status Effects and Injuries

### Status Effects
```typescript
interface StatusEffects {
  Stunned: "No actions except RECOVER/PASS",
  Burning: "1D3 Fatal Damage per turn start",
  Frozen: "MOV -2",
  Fearful: "-1 to hit rolls",
  Poisoned: "1 Fatal Damage per turn end",
  Cursed: "1s deal Fatal Damage",
  HeadInjury: "HTV +1",
  ArmInjury: "ATK -1",
  LegInjury: "MOV -1"
}
```

### Permanent Injuries
```typescript
interface InjuryTable {
  1: "Head: HTV +1",
  2: "Arm: ATK -1",
  3: "Arm: ATK -1",
  4: "Leg: MOV -1",
  5: "Leg: MOV -1",
  6: "Just a Scratch: No effect"
}
```

## Movement and Terrain

### Movement Types
```typescript
interface MovementRules {
  normal: "Up to MOV value",
  climb: "MOV -2 inches",
  jump: "Up to MOV/2 inches",
  traverse: "MOV -2 inches",
  fly: "Ignore obstacles",
  drop: "3 inch free, test per extra inch",
  push: "3 inch with opposed roll"
}
```

### Line of Sight
```typescript
interface LineOfSight {
  requirements: [
    "Target is Visible",
    "Target is not Hidden"
  ];
  cover: "Within 1 inch of terrain",
  range: "360° viewing radius"
}
```

## Actions

### Standard Actions (1 AP)
```typescript
interface StandardActions {
  MOVE: "Up to MOV inches",
  SHOOT: "Make ranged attack",
  CHARGE: "Move +2 inches to melee",
  FIGHT: "Engage in melee combat",
  HIDE: "Gain cover benefits",
  PASS: "Skip remaining AP",
  INTERACT: "Use scenario objects",
  LOOT: "Roll 2D6 for equipment",
  RECOVER: "Remove status effects"
}
```

### Special Actions
```typescript
interface SpecialActions {
  OVERWATCH: "Delayed ranged attack",
  GUARD: "Extra block die",
  CAST: "Use magic spell",
  PRAYER: "Use faction prayer",
  HEAL: "Restore 2D3 wounds",
  COMMAND: "Grant 1 AP to ally"
}
``` 