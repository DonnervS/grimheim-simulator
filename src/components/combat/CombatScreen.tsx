import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Model, WeaponStats } from '../../types/gameTypes'
import ModelCard from './ModelCard'
import DiceRoller from './DiceRoller'
import CombatActions from './CombatActions'
import CombatLog from './CombatLog'

const CombatContainer = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1a1a2e 0%, #2a2a4a 100%);
  display: grid;
  grid-template-rows: auto 250px;
  gap: 20px;
  padding: 20px;
  position: relative;
  overflow: hidden;
`

const BattleArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 20px;
  align-items: start;
  position: relative;
`

const DiceArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: rgba(42, 42, 74, 0.8);
  border-radius: 8px;
  border: 2px solid #4a4a8a;
`

const FighterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  position: relative;
`

const FighterLabel = styled.div`
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  color: #8a8aff;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.8em;
`

const WeaponInfo = styled.div`
  background: rgba(42, 42, 74, 0.8);
  border-radius: 8px;
  border: 2px solid #4a4a8a;
  padding: 10px;
  width: 100%;
  text-align: center;
  color: #e6e6fa;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.8em;
`

const WeaponStatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px;
  margin-top: 10px;
  font-size: 0.7em;
`

const StatLabel = styled.span`
  color: #8a8aff;
`

const EndCombatButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #ff4a4a;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  color: #e6e6fa;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.8em;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05);
    filter: brightness(1.2);
  }
`

const WeaponRules = styled.div`
  margin-top: 10px;
  font-size: 0.7em;
  color: #8a8aff;
  text-align: left;
  padding: 5px;
  border-top: 1px solid #4a4a8a;
`

interface CombatScreenProps {
  attacker: Model;
  defender: Model;
  isMelee: boolean;
  onCombatEnd: (winner: Model) => void;
}

interface DiceResult {
  value: number;
  isUsed: boolean;
  isCritical: boolean;
  isHit: boolean;
  isBlockable?: boolean;
}

export const CombatScreen: React.FC<CombatScreenProps> = ({
  attacker,
  defender,
  isMelee,
  onCombatEnd
}) => {
  const [attackerDice, setAttackerDice] = useState<DiceResult[]>([])
  const [defenderDice, setDefenderDice] = useState<DiceResult[]>([])
  const [selectedWeapon, setSelectedWeapon] = useState<WeaponStats | null>(null)
  const [defenderWeapon, setDefenderWeapon] = useState<WeaponStats | null>(null)
  const [combatPhase, setCombatPhase] = useState<'weapon-select' | 'rolling' | 'resolution'>('weapon-select')
  const [combatLog, setCombatLog] = useState<string[]>([])
  const [isAttackerTurn, setIsAttackerTurn] = useState(true)
  const [blockingDieIndex, setBlockingDieIndex] = useState<number | null>(null)
  const [isBlocking, setIsBlocking] = useState(false)

  const addToCombatLog = (message: string) => {
    setCombatLog(prev => [...prev, message])
  }

  const handleWeaponSelect = (weapon: WeaponStats, isAttacker: boolean) => {
    if (isAttacker) {
      setSelectedWeapon(weapon)
      addToCombatLog(`${attacker.name} selects ${weapon.name}`)
      if (!isMelee) {
        setCombatPhase('rolling')
      }
    } else {
      setDefenderWeapon(weapon)
      addToCombatLog(`${defender.name} selects ${weapon.name}`)
      setCombatPhase('rolling')
    }
  }

  const handleDiceRoll = (isAttacker: boolean) => {
    if (!selectedWeapon || !defenderWeapon) return

    // Roll for both fighters
    const rollForFighter = (weapon: WeaponStats): DiceResult[] => {
      return Array.from({ length: weapon.ATK }, () => {
        const value = Math.floor(Math.random() * 6) + 1
        return {
          value,
          isUsed: false,
          isCritical: value === 6,
          isHit: value >= weapon.HTV
        }
      })
    }

    const attackerResults = rollForFighter(selectedWeapon)
    const defenderResults = rollForFighter(defenderWeapon)

    setAttackerDice(attackerResults)
    setDefenderDice(defenderResults)

    addToCombatLog(`${attacker.name} rolls ${attackerResults.length} dice`)
    const attackerHits = attackerResults.filter(die => die.isHit).length
    const attackerCrits = attackerResults.filter(die => die.isCritical).length
    addToCombatLog(`Results for ${attacker.name}: ${attackerHits} hits${attackerCrits > 0 ? `, including ${attackerCrits} critical hits!` : ''}`)

    addToCombatLog(`${defender.name} rolls ${defenderResults.length} dice`)
    const defenderHits = defenderResults.filter(die => die.isHit).length
    const defenderCrits = defenderResults.filter(die => die.isCritical).length
    addToCombatLog(`Results for ${defender.name}: ${defenderHits} hits${defenderCrits > 0 ? `, including ${defenderCrits} critical hits!` : ''}`)

    setCombatPhase('resolution')
    addToCombatLog(`${isAttackerTurn ? attacker.name : defender.name}'s turn`)
  }

  const handleDiceSelection = (isAttacker: boolean, diceIndex: number, action: 'strike' | 'block') => {
    // Grundlegende Variablen
    const currentDice = isAttacker ? attackerDice : defenderDice;
    const setCurrentDice = isAttacker ? setAttackerDice : setDefenderDice;
    const enemyDice = isAttacker ? defenderDice : attackerDice;
    const setEnemyDice = isAttacker ? setDefenderDice : setAttackerDice;
    const currentModel = isAttacker ? attacker : defender;
    const enemyModel = isAttacker ? defender : attacker;

    // Überprüfen Sie, ob es der richtige Zug ist
    if (!isBlocking && ((isAttacker && !isAttackerTurn) || (!isAttacker && isAttackerTurn))) {
      addToCombatLog(`Es ist nicht dein Zug!`);
      return;
    }

    // Überprüfen Sie, ob der Würfel verwendet werden kann
    const selectedDie = currentDice[diceIndex];
    if (!selectedDie || selectedDie.isUsed || (!selectedDie.isHit && !isBlocking)) {
      return;
    }

    if (action === 'strike') {
      if (isBlocking) return;

      // Führen Sie den Schlag aus
      const newDice = currentDice.map((die, i) => 
        i === diceIndex ? { ...die, isUsed: true } : die
      );
      setCurrentDice(newDice);

      // Berechnen Sie den Schaden
      const damage = selectedDie.isCritical ? 
        (isAttacker ? selectedWeapon?.CRT : defenderWeapon?.CRT) : 
        (isAttacker ? selectedWeapon?.DMG : defenderWeapon?.DMG);

      if (damage) {
        enemyModel.currentWounds = Math.max(0, enemyModel.currentWounds - damage);
        addToCombatLog(`${currentModel.name} trifft für ${damage} Schaden${selectedDie.isCritical ? ' (Kritischer Treffer!)' : ''}`);
        addToCombatLog(`${enemyModel.name} hat noch ${enemyModel.currentWounds} Wunden`);

        if (enemyModel.currentWounds <= 0) {
          addToCombatLog(`${enemyModel.name} wurde besiegt!`);
          onCombatEnd(currentModel);
          return;
        }
      }

      // Spieler wechseln
      setIsAttackerTurn(!isAttackerTurn);
      addToCombatLog(`${!isAttackerTurn ? attacker.name : defender.name} ist am Zug`);

    } else if (action === 'block') {
      if (!isBlocking) {
        // Blockierung initiieren
        console.log('Blockierung wird initiiert:', {
          blockingDieIndex: diceIndex,
          blockingDie: selectedDie,
          isAttackerDice: isAttacker
        });
        
        setBlockingDieIndex(diceIndex);
        setIsBlocking(true);

        // Markieren Sie die blockierbaren Würfel
        const updatedEnemyDice = enemyDice.map(die => ({
          ...die,
          isBlockable: !die.isUsed && die.isHit && !die.isCritical
        }));
        setEnemyDice(updatedEnemyDice);

        addToCombatLog(`${currentModel.name} versucht zu blocken`);
      } else {
        // Blockierung ausführen
        console.log('Blockierung wird ausgeführt:', {
          targetDieIndex: diceIndex,
          targetDie: enemyDice[diceIndex],
          blockingDieIndex,
          blockingDie: currentDice[blockingDieIndex!]
        });

        if (blockingDieIndex === null) {
          console.error('Kein blockierender Würfel ausgewählt');
          return;
        }

        const targetDie = enemyDice[diceIndex];
        if (!targetDie?.isBlockable) {
          console.log('Zielwürfel ist nicht blockierbar:', targetDie);
          return;
        }

        // Führen Sie die Blockierung durch
        const updatedEnemyDice = enemyDice.map((die, i) => 
          i === diceIndex ? { ...die, isUsed: true, isBlockable: false } : { ...die, isBlockable: false }
        );
        setEnemyDice(updatedEnemyDice);

        const updatedCurrentDice = currentDice.map((die, i) => 
          i === blockingDieIndex ? { ...die, isUsed: true } : die
        );
        setCurrentDice(updatedCurrentDice);

        addToCombatLog(`${currentModel.name} blockt erfolgreich einen Treffer von ${enemyModel.name}`);

        // Blockierung zurücksetzen
        setBlockingDieIndex(null);
        setIsBlocking(false);
      }
    }
  }

  const canBlock = (isAttacker: boolean) => {
    const currentDice = isAttacker ? attackerDice : defenderDice;
    return currentDice.some(die => !die.isUsed && die.isHit);
  }

  const canStrike = (isAttacker: boolean) => {
    const currentDice = isAttacker ? attackerDice : defenderDice;
    return currentDice.some(die => !die.isUsed && die.isHit);
  }

  return (
    <CombatContainer>
      <BattleArea>
        <FighterColumn>
          <FighterLabel>Angreifer</FighterLabel>
          <ModelCard
            model={attacker}
            isActive={combatPhase === 'weapon-select' || (combatPhase === 'resolution' && isAttackerTurn)}
            onWeaponSelect={(weapon) => handleWeaponSelect(weapon, true)}
            alwaysShowWeapons={combatPhase === 'weapon-select'}
          />
          {selectedWeapon && (
            <WeaponInfo>
              <div>{selectedWeapon.name}</div>
              <WeaponStatsGrid>
                <div><StatLabel>RNG:</StatLabel> {selectedWeapon.RNG}"</div>
                <div><StatLabel>ATK:</StatLabel> {selectedWeapon.ATK}</div>
                <div><StatLabel>HTV:</StatLabel> {selectedWeapon.HTV}+</div>
                <div><StatLabel>DMG:</StatLabel> {selectedWeapon.DMG}</div>
              </WeaponStatsGrid>
              <WeaponRules>
                {selectedWeapon.WR.map((rule, index) => (
                  <div key={index}>{rule}</div>
                ))}
              </WeaponRules>
            </WeaponInfo>
          )}
        </FighterColumn>

        <DiceArea>
          {combatPhase === 'rolling' && (
            <button onClick={() => handleDiceRoll(true)}>Würfeln</button>
          )}
          {combatPhase === 'resolution' && (
            <DiceRoller
              attackerDice={attackerDice}
              defenderDice={defenderDice}
              onDiceClick={handleDiceSelection}
              isAttackerTurn={isAttackerTurn}
              isBlocking={isBlocking}
            />
          )}
          {combatPhase === 'resolution' && (
            <CombatActions
              canStrike={canStrike(isAttackerTurn)}
              canBlock={canBlock(!isAttackerTurn)}
              onStrike={() => {/* Handled by dice click */}}
              onBlock={() => {/* Handled by dice click */}}
            />
          )}
        </DiceArea>

        <FighterColumn>
          <FighterLabel>Verteidiger</FighterLabel>
          <ModelCard
            model={defender}
            isActive={combatPhase === 'weapon-select' || (combatPhase === 'resolution' && !isAttackerTurn)}
            onWeaponSelect={(weapon) => handleWeaponSelect(weapon, false)}
            alwaysShowWeapons={combatPhase === 'weapon-select'}
          />
          {defenderWeapon && (
            <WeaponInfo>
              <div>{defenderWeapon.name}</div>
              <WeaponStatsGrid>
                <div><StatLabel>RNG:</StatLabel> {defenderWeapon.RNG}"</div>
                <div><StatLabel>ATK:</StatLabel> {defenderWeapon.ATK}</div>
                <div><StatLabel>HTV:</StatLabel> {defenderWeapon.HTV}+</div>
                <div><StatLabel>DMG:</StatLabel> {defenderWeapon.DMG}</div>
              </WeaponStatsGrid>
              <WeaponRules>
                {defenderWeapon.WR.map((rule, index) => (
                  <div key={index}>{rule}</div>
                ))}
              </WeaponRules>
            </WeaponInfo>
          )}
        </FighterColumn>
      </BattleArea>

      <CombatLog messages={combatLog} />
    </CombatContainer>
  )
}