# Close Combat Rules in Grimheim Simulator

## Overview
Close combat in Grimheim is a tactical engagement between two models, resolved through a series of dice rolls that determine hits, blocks, and damage. The combat system simulates the back-and-forth nature of melee combat with specific mechanics for attack and defense.

## Combat Sequence

### 1. Model Selection
- The player whose model is performing the action is the Attacker
- The player controlling the target is the Defender
- Attacker selects a target enemy model within the activated model's Melee Range

### 2. Weapon Selection
- Both players select one of their model's melee weapons
- If a model has no Close Combat Weapon, they use the Unarmed profile:
  - Name: Unarmed
  - RNG: 1"
  - ATK: 2
  - HTV: 5+
  - DMG: 1
  - CRT: 2
  - SR: -

### 3. Attack Rolls
- Both players roll attack dice – a number of D6 equal to their weapon's ATK characteristic
- Each result that equals or beats the model's HTV (Hit Target Value) characteristic is retained as a success
- Results of 6 are always successful and count as critical hits
- All other successes are normal hits
- Results of 1 always fail regardless of modifiers

### 4. Combat Resolution
- Starting with the Attacker, both players alternate resolving successful hits
- This continues until one model is out of action or until they have no more hits to resolve
- If one player has no more hits to resolve, their opponent resolves all remaining hits
- To resolve a hit, select one of your successful hits, then either:
  - **Strike**: Inflicts Damage on the target
    - Normal hit: Inflicts Damage equal to the first value of the weapon's DMG characteristic
    - Critical hit: Inflicts Damage equal to the second value (CRT)
  - **Block**: Discards one of your opponent's hits
    - Normal hit can block a normal hit
    - Critical hit can block either a normal or critical hit

### 5. Damage Application
- Damage reduces the target model's current Wounds
- When a model's wounds reach 0, it is considered out of action
- Combat ends when one model is out of action or when manually ended

## Special Rules and Modifiers

### Defense via Armor
- Models with Medium Armor may roll one additional die for blocking
- Models with Heavy Armor may roll two additional dice for blocking
- When using these extra dice for blocking, the roll must meet or exceed the model's SAV value (not HTV)
- Rolls of 6 are still considered critical for blocking purposes

### Assist
- If an additional friendly model is within Melee Range of the opponent's model, it assists in combat
- This reduces the HTV value of your active model by 1
- Makes it easier to score successful hits

### Weapon Special Rules
Various weapon special rules may modify combat mechanics:
- Some weapons may have additional effects on critical hits
- Special rules may grant re-rolls or other advantages
- Certain weapons may ignore armor or have other unique properties

- Shield 
	1 addition shield dice to block, always counts as a successful hit (1-5), a 6 counts as critical; cannot be used to strike; can be upgraded to critical in ranged combat
- Tough 
	If a model has the Tough rule, then any DMG that is dealt by a strike, is reduced by 1.
- Rending 
	If you roll any critical hit, you can upgrade 1 normal hit to a critical hit. If there is at least 1 normal hit as well, then upgrade this hit to a critical one by changing the color to violet. If there are more then 1 normal hits then only the first shall be upgraded to critical.
- Parry 
	You can use normal hits to block critical hits
- Brutal 
	Only critical hits can be used to block hits by the weapon.

## Combat Log
The combat log records all dice rolls and their outcomes, providing a detailed record of:
- Hit rolls (successes, criticals, and failures)
- Strike and block decisions
- Damage inflicted
- Special rule activations

## User Interface Elements
- Model cards display all relevant stats and current wound status
- Weapon selection buttons allow choosing different weapons
- Dice display shows the results of all rolls with appropriate coloring
- Combat log provides a text record of all actions and results
- Action buttons control the flow of combat (attack, end combat, reset)

## Combat Example
1. Attacker selects an enemy model within Melee Range
2. Both players select melee weapons
3. Attacker with ATK 3, HTV 3+ rolls: 2, 4, 6 (two hits, one critical)
4. Defender with ATK 2, HTV 4+ rolls: 3, 5 (one hit)
5. Attacker uses critical hit (6) to strike, dealing CRT damage value
6. Defender uses hit (5) to block Attacker's normal hit (4)
7. Attacker has no more hits to resolve
8. Defender has no more hits to resolve
9. Combat ends with Defender taking damage from Attacker's critical hit

