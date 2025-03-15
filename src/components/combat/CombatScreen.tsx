import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Model, WeaponStats } from '../../types/gameTypes'
import ModelCard from './ModelCard'
import DiceDisplay, { DieResult } from './DiceDisplay'
import ActionButtons from './ActionButtons'
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
  width: 100%;
`

const TurnIndicator = styled.div`
  color: #8a8aff;
  font-family: 'Press Start 2P', cursive;
  font-size: 1.2em;
  text-align: center;
  margin-bottom: 20px;
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

export const CombatScreen: React.FC<CombatScreenProps> = ({
  attacker,
  defender,
  isMelee,
  onCombatEnd
}) => {
  const [attackerWeapon, setAttackerWeapon] = useState<WeaponStats | null>(null)
  const [defenderWeapon, setDefenderWeapon] = useState<WeaponStats | null>(null)
  const [attackerDice, setAttackerDice] = useState<DieResult[]>([])
  const [defenderDice, setDefenderDice] = useState<DieResult[]>([])
  const [isAttackerTurn, setIsAttackerTurn] = useState(true)
  const [selectedDieIndex, setSelectedDieIndex] = useState<number | null>(null)
  const [combatPhase, setCombatPhase] = useState<'weapon-select' | 'rolling' | 'resolution'>('weapon-select')
  const [combatLog, setCombatLog] = useState<string[]>([])
  const [isBlockMode, setIsBlockMode] = useState(false)
  const [blockableDice, setBlockableDice] = useState<number[]>([])
  const [blockingDieIndex, setBlockingDieIndex] = useState<number | null>(null)

  useEffect(() => {
    if (attacker.currentWounds === undefined) {
      attacker.currentWounds = attacker.stats.WND;
    }
    if (defender.currentWounds === undefined) {
      defender.currentWounds = defender.stats.WND;
    }
  }, [attacker, defender]);

  const addToCombatLog = (message: string) => {
    setCombatLog(prev => [...prev, message])
  }

  const handleWeaponSelect = (weapon: WeaponStats, isAttacker: boolean) => {
    if (isAttacker) {
      setAttackerWeapon(weapon)
      addToCombatLog(`${attacker.name} wählt ${weapon.name}`)
    } else {
      setDefenderWeapon(weapon)
      addToCombatLog(`${defender.name} wählt ${weapon.name}`)
      setCombatPhase('rolling')
    }
  }

  const rollDice = (weapon: WeaponStats, model: Model): DieResult[] => {
    // Berechne zusätzliche Blockwürfel basierend auf SAV
    const extraBlockDice = model.stats.SAV <= 3 ? 2 : model.stats.SAV === 4 ? 1 : 0
    const totalDice = weapon.ATK + extraBlockDice

    return Array.from({ length: totalDice }, () => {
      const value = Math.floor(Math.random() * 6) + 1
      const isCritical = value === 6
      const isHit = isCritical || value >= weapon.HTV
      return { value, isHit, isCritical, isUsed: false }
    })
  }

  const handleDiceRoll = () => {
    if (!attackerWeapon || !defenderWeapon) return

    const attackerResults = rollDice(attackerWeapon, attacker)
    const defenderResults = rollDice(defenderWeapon, defender)

    setAttackerDice(attackerResults)
    setDefenderDice(defenderResults)

    addToCombatLog(`${attacker.name} würfelt ${attackerResults.filter(d => d.isHit).length} Treffer`)
    addToCombatLog(`${defender.name} würfelt ${defenderResults.filter(d => d.isHit).length} Treffer`)

    setCombatPhase('resolution')
  }

  const hasUnusedHits = (dice: DieResult[]) => {
    return dice.some(die => (die.isHit || die.isCritical) && !die.isUsed)
  }

  const handleDieSelect = (index: number) => {
    if (isBlockMode) {
      // Wenn wir im Block-Modus sind und ein blockbarer Würfel wurde ausgewählt
      if (blockableDice.includes(index)) {
        handleBlockDie(index)
      }
      return
    }
    setSelectedDieIndex(index)
  }

  const findBlockableDice = (selectedDie: DieResult, opponentDice: DieResult[]): number[] => {
    return opponentDice.reduce((blockable: number[], die, index) => {
      if (!die.isUsed && (die.isHit || die.isCritical) && (!die.isCritical || selectedDie.isCritical)) {
        blockable.push(index)
      }
      return blockable
    }, [])
  }

  const handleBlockStart = () => {
    if (selectedDieIndex === null) return
    
    const currentDice = isAttackerTurn ? attackerDice : defenderDice
    const selectedDie = currentDice[selectedDieIndex]
    const opponentDice = isAttackerTurn ? defenderDice : attackerDice
    
    if (!selectedDie || selectedDie.isUsed) return

    const blockable = findBlockableDice(selectedDie, opponentDice)
    if (blockable.length > 0) {
      setIsBlockMode(true)
      setBlockableDice(blockable)
      setBlockingDieIndex(selectedDieIndex)
    }
  }

  const handleBlockDie = (opponentDieIndex: number) => {
    if (blockingDieIndex === null) return
    
    const currentDice = isAttackerTurn ? attackerDice : defenderDice
    const selectedDie = currentDice[blockingDieIndex]
    const opponentDice = isAttackerTurn ? defenderDice : attackerDice
    
    if (!selectedDie || selectedDie.isUsed) return

    // Markiere beide Würfel als benutzt
    const updatedCurrentDice = [...currentDice]
    updatedCurrentDice[blockingDieIndex] = { ...selectedDie, isUsed: true }

    const updatedOpponentDice = [...opponentDice]
    updatedOpponentDice[opponentDieIndex] = { ...opponentDice[opponentDieIndex], isUsed: true }

    if (isAttackerTurn) {
      setAttackerDice(updatedCurrentDice)
      setDefenderDice(updatedOpponentDice)
    } else {
      setDefenderDice(updatedCurrentDice)
      setAttackerDice(updatedOpponentDice)
    }

    addToCombatLog(`${isAttackerTurn ? attacker.name : defender.name} blockt einen Treffer`)

    // Reset block mode
    setIsBlockMode(false)
    setBlockableDice([])
    setBlockingDieIndex(null)
    setSelectedDieIndex(null)

    // Wechsle den Spieler wenn möglich
    const otherPlayerHasHits = hasUnusedHits(isAttackerTurn ? defenderDice : attackerDice)
    if (otherPlayerHasHits) {
      setIsAttackerTurn(!isAttackerTurn)
    }
  }

  const handleStrike = () => {
    if (selectedDieIndex === null) return
    
    const currentDice = isAttackerTurn ? attackerDice : defenderDice
    const selectedDie = currentDice[selectedDieIndex]
    const weapon = isAttackerTurn ? attackerWeapon : defenderWeapon
    const targetModel = isAttackerTurn ? defender : attacker
    
    if (!weapon || !selectedDie || selectedDie.isUsed) return

    const damage = selectedDie.isCritical ? weapon.CRT : weapon.DMG
    const newWounds = Math.max(0, targetModel.currentWounds - damage)
    
    if (isAttackerTurn) {
      defender.currentWounds = newWounds
    } else {
      attacker.currentWounds = newWounds
    }

    // Markiere den Würfel als benutzt
    const updatedDice = [...currentDice]
    updatedDice[selectedDieIndex] = { ...selectedDie, isUsed: true }
    if (isAttackerTurn) {
      setAttackerDice(updatedDice)
    } else {
      setDefenderDice(updatedDice)
    }

    addToCombatLog(`${isAttackerTurn ? attacker.name : defender.name} verursacht ${damage} Schaden`)

    // Prüfe auf Kampfende
    if (newWounds <= 0) {
      addToCombatLog(`${targetModel.name} wurde ausgeschaltet!`)
      onCombatEnd(isAttackerTurn ? attacker : defender)
      return
    }

    // Wechsle den Spieler wenn möglich
    const otherPlayerHasHits = hasUnusedHits(isAttackerTurn ? defenderDice : attackerDice)
    if (otherPlayerHasHits) {
      setIsAttackerTurn(!isAttackerTurn)
    }
    setSelectedDieIndex(null)
  }

  const canBlock = () => {
    if (selectedDieIndex === null) return false
    
    const currentDice = isAttackerTurn ? attackerDice : defenderDice
    const selectedDie = currentDice[selectedDieIndex]
    const opponentDice = isAttackerTurn ? defenderDice : attackerDice
    
    return opponentDice.some(die => 
      !die.isUsed && (die.isHit || die.isCritical) && 
      (!die.isCritical || selectedDie?.isCritical)
    )
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
          {attackerWeapon && (
            <WeaponInfo>
              <div>{attackerWeapon.name}</div>
              <WeaponStatsGrid>
                <div><StatLabel>RNG:</StatLabel> {attackerWeapon.RNG}"</div>
                <div><StatLabel>ATK:</StatLabel> {attackerWeapon.ATK}</div>
                <div><StatLabel>HTV:</StatLabel> {attackerWeapon.HTV}+</div>
                <div><StatLabel>DMG:</StatLabel> {attackerWeapon.DMG}</div>
              </WeaponStatsGrid>
              <WeaponRules>
                {attackerWeapon.WR.map((rule, index) => (
                  <div key={index}>{rule}</div>
                ))}
              </WeaponRules>
            </WeaponInfo>
          )}
        </FighterColumn>

        <DiceArea>
          {combatPhase === 'rolling' && (
            <button onClick={handleDiceRoll}>Würfeln</button>
          )}
          
          {combatPhase === 'resolution' && (
            <>
              <TurnIndicator>
                {isAttackerTurn ? attacker.name : defender.name} ist am Zug
                {isBlockMode && " (Blocking)"}
              </TurnIndicator>
              
              <DiceDisplay
                attackerName={attacker.name}
                defenderName={defender.name}
                attackerDice={attackerDice}
                defenderDice={defenderDice}
                isAttackerTurn={isAttackerTurn}
                isBlockMode={isBlockMode}
                blockableDice={blockableDice}
                onDieClick={(index, isAttacker) => {
                  if (isAttacker === isAttackerTurn || isBlockMode) {
                    handleDieSelect(index);
                  }
                }}
              />

              {selectedDieIndex !== null && !isBlockMode && (
                <ActionButtons
                  onStrike={handleStrike}
                  onBlock={handleBlockStart}
                  canBlock={canBlock()}
                  selectedDie={isAttackerTurn ? attackerDice[selectedDieIndex] : defenderDice[selectedDieIndex]}
                />
              )}
            </>
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