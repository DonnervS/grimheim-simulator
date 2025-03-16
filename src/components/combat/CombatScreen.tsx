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
  grid-template-rows: auto 200px;
  gap: 10px;
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
  color: #8a8aff;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.8em;
  margin-bottom: 10px;
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
  grid-template-rows: repeat(2, 1fr);
  gap: 5px;
  margin-top: 10px;
  font-size: 0.7em;
`

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px;
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

const BlockOnlyButton = styled.button`
  padding: 10px 20px;
  background: #40E0D0;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 1em;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    transform: scale(1.05);
    background: #48D1CC;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const BackButton = styled.button`
  padding: 8px 16px;
  background: #666;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 0.9em;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-right: 10px;

  &:hover {
    transform: scale(1.05);
    background: #777;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

const RollButton = styled.button`
  padding: 12px 24px;
  background: #8a8aff;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 1em;
  font-family: 'Press Start 2P', cursive;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05);
    background: #9a9aff;
  }
`;

const SkipButton = styled.button`
  padding: 10px 20px;
  background: #666;
  border: none;
  border-radius: 4px;
  color: white;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.8em;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-left: 10px;

  &:hover {
    transform: scale(1.05);
    background: #777;
  }
`;

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
    // Initialize wounds if not set
    if (attacker.currentWounds === undefined) {
      attacker.currentWounds = attacker.stats.WND;
    }
    if (defender.currentWounds === undefined) {
      defender.currentWounds = defender.stats.WND;
    }
  }, [attacker, defender]);

  useEffect(() => {
    if (combatPhase === 'resolution' && selectedDieIndex === null) {
      const currentDice = isAttackerTurn ? attackerDice : defenderDice;
      const unusedDice = currentDice.filter(die => !die.isUsed);
      
      // If there's only one unused die and it's a block die
      if (unusedDice.length === 1 && unusedDice[0].isBlockDie) {
        const opponentDice = isAttackerTurn ? defenderDice : attackerDice;
        const canBlock = opponentDice.some(oppDie => 
          !oppDie.isUsed && 
          oppDie.isHit && 
          (!oppDie.isCritical || unusedDice[0].isCritical)
        );

        if (!canBlock) {
          // If the block die can't block anything, switch turns
          setIsAttackerTurn(!isAttackerTurn);
          addToCombatLog(`${isAttackerTurn ? "Attacker" : "Defender"}'s block die cannot block any hits`);
        }
      }
    }
  }, [combatPhase, selectedDieIndex, isAttackerTurn, attackerDice, defenderDice]);

  const addToCombatLog = (message: string) => {
    setCombatLog(prevLog => [...prevLog, message])
  }

  const handleWeaponSelect = (weapon: WeaponStats, isAttacker: boolean) => {
    if (isAttacker) {
      setAttackerWeapon(weapon)
    } else {
      setDefenderWeapon(weapon)
    }

    // If both weapons are selected, move to rolling phase
    if (
      (isAttacker && defenderWeapon) ||
      (!isAttacker && attackerWeapon)
    ) {
      setCombatPhase('rolling')
      addToCombatLog('Both fighters have selected their weapons')
    }
  }

  const rollDice = () => {
    if (!attackerWeapon || !defenderWeapon) return

    const rollDieForFighter = (weapon: WeaponStats, isAttacker: boolean): DieResult[] => {
      const results: DieResult[] = []
      const diceCount = weapon.ATK
      const blockDiceCount = weapon.DEF

      // Roll attack dice
      for (let i = 0; i < diceCount; i++) {
        const value = Math.floor(Math.random() * 6) + 1
        const htv = isAttacker ? weapon.HTV : defenderWeapon.HTV
        const isHit = value >= htv
        const isCritical = value === 6

        results.push({
          value,
          isHit: isHit || isCritical,
          isCritical,
          isUsed: false,
          isBlockDie: false
        })
      }

      // Roll block dice
      for (let i = 0; i < blockDiceCount; i++) {
        const value = Math.floor(Math.random() * 6) + 1
        const htv = isAttacker ? weapon.HTV : defenderWeapon.HTV
        const isHit = value >= htv
        const isCritical = value === 6

        results.push({
          value,
          isHit: isHit || isCritical,
          isCritical,
          isUsed: false,
          isBlockDie: true
        })
      }

      return results
    }

    const attackerResults = rollDieForFighter(attackerWeapon, true)
    const defenderResults = rollDieForFighter(defenderWeapon, false)

    setAttackerDice(attackerResults)
    setDefenderDice(defenderResults)
    setCombatPhase('resolution')

    // Log the results
    const logResults = (dice: DieResult[], isAttacker: boolean) => {
      const hits = dice.filter(d => !d.isBlockDie && d.isHit).length
      const crits = dice.filter(d => !d.isBlockDie && d.isCritical).length
      const blocks = dice.filter(d => d.isBlockDie).length
      addToCombatLog(
        `${isAttacker ? 'Attacker' : 'Defender'} rolled ${hits} hits (${crits} critical) and ${blocks} block dice`
      )
    }

    logResults(attackerResults, true)
    logResults(defenderResults, false)
  }

  const hasUsableDice = (dice: DieResult[]) => {
    return dice.some(die => !die.isUsed && (die.isHit || die.isBlockDie))
  }

  const findBlockableDice = (selectedDie: DieResult, opponentDice: DieResult[]) => {
    console.log('Finding blockable dice:', { selectedDie, opponentDice })
    const blockableDiceIndices: number[] = []

    opponentDice.forEach((die, index) => {
      const canBlock = !die.isUsed && die.isHit && (!die.isCritical || selectedDie.isCritical)
      console.log('Checking die', index, ':', { die, canBlock, reason: { isUsed: die.isUsed, isHit: die.isHit, isCritical: die.isCritical, selectedIsCritical: selectedDie.isCritical } })
      if (canBlock) {
        blockableDiceIndices.push(index)
      }
    })

    console.log('Blockable dice indices:', blockableDiceIndices)
    return blockableDiceIndices
  }

  const handleDieClick = (player: 'Attacker' | 'Defender', selectedDie: DieResult, allCurrentDice: DieResult[], allOpponentDice: DieResult[]) => {
    console.log('Die clicked:', { player, selectedDie, allCurrentDice, allOpponentDice, isBlockMode })

    const isCurrentPlayer = (player === 'Attacker') === isAttackerTurn
    if (!isCurrentPlayer || selectedDie.isUsed) return

    const currentDiceIndex = allCurrentDice.findIndex(
      die =>
        die.value === selectedDie.value &&
        die.isBlockDie === selectedDie.isBlockDie &&
        !die.isUsed
    )

    if (currentDiceIndex === -1) return

    if (isBlockMode) {
      // Handle blocking
      handleBlockDie(currentDiceIndex)
    } else if (selectedDie.isBlockDie) {
      // Check if the block die can block any hits
      const blockableTargets = findBlockableDice(selectedDie, allOpponentDice)
      console.log('Block die check:', { hasBlockableTargets: blockableTargets.length > 0, blockableDice: blockableTargets })

      if (blockableTargets.length > 0) {
        setBlockingDieIndex(currentDiceIndex)
        setBlockableDice(blockableTargets)
        setIsBlockMode(true)
        console.log('Block start:', { selectedDie, selectedDieIndex: currentDiceIndex, opponentDice: allOpponentDice })
      }
    } else if (selectedDie.isHit) {
      // Handle strike
      handleStrike(currentDiceIndex)
    }
  }

  const handleStrike = (strikeIndex: number) => {
    if (strikeIndex === null) return

    const currentDice = isAttackerTurn ? attackerDice : defenderDice
    const selectedDie = currentDice[strikeIndex]
    const opponent = isAttackerTurn ? defender : attacker

    if (!selectedDie || selectedDie.isUsed || !selectedDie.isHit) return

    // Apply damage
    const damage = selectedDie.isCritical
      ? (isAttackerTurn ? attackerWeapon?.DMG : defenderWeapon?.DMG) ?? 1 * 2
      : (isAttackerTurn ? attackerWeapon?.DMG : defenderWeapon?.DMG) ?? 1

    opponent.currentWounds = Math.max(0, opponent.currentWounds - damage)

    // Mark the die as used
    const updatedCurrentDice = [...currentDice]
    updatedCurrentDice[strikeIndex] = { ...selectedDie, isUsed: true }

    if (isAttackerTurn) {
      setAttackerDice(updatedCurrentDice)
    } else {
      setDefenderDice(updatedCurrentDice)
    }

    // Add to combat log
    addToCombatLog(
      `${isAttackerTurn ? 'Attacker' : 'Defender'} strikes for ${damage} damage${selectedDie.isCritical ? ' (Critical Hit!)' : ''}`
    )

    // Check if the opponent is defeated
    if (opponent.currentWounds <= 0) {
      addToCombatLog(`${isAttackerTurn ? 'Defender' : 'Attacker'} is defeated!`)
      onCombatEnd(isAttackerTurn ? attacker : defender)
      return
    }

    // Check if next player has usable dice
    const nextPlayerDice = !isAttackerTurn ? updatedCurrentDice : (isAttackerTurn ? defenderDice : attackerDice)
    const otherPlayerDice = !isAttackerTurn ? (isAttackerTurn ? defenderDice : attackerDice) : updatedCurrentDice
    
    const nextPlayerHasUsableDice = hasUsableDice(nextPlayerDice)
    const currentPlayerHasUsableDice = hasUsableDice(otherPlayerDice)

    console.log('Turn switch check:', {
      nextPlayerHasUsableDice,
      currentPlayerHasUsableDice,
      nextPlayerDice,
      otherPlayerDice
    })

    if (nextPlayerHasUsableDice) {
      // If next player has usable dice, switch to them
      setIsAttackerTurn(!isAttackerTurn)
      addToCombatLog(`Switching to ${!isAttackerTurn ? "Attacker" : "Defender"}'s turn`)
    } else if (currentPlayerHasUsableDice) {
      // If current player still has usable dice, stay with them
      addToCombatLog(`${!isAttackerTurn ? "Attacker" : "Defender"} has no usable dice left`)
    } else {
      // If neither player has usable dice, switch turns anyway
      setIsAttackerTurn(!isAttackerTurn)
    }

    setSelectedDieIndex(null)
  }

  const handleBlockDie = (opponentDieIndex: number) => {
    if (blockingDieIndex === null) return
    
    const currentDice = isAttackerTurn ? attackerDice : defenderDice
    const selectedDie = currentDice[blockingDieIndex]
    const opponentDice = isAttackerTurn ? defenderDice : attackerDice
    
    console.log('Blocking die:', {
      blockingDie: selectedDie,
      targetDie: opponentDice[opponentDieIndex],
      blockingDieIndex,
      opponentDieIndex,
      isBlockMode
    })

    if (!selectedDie || selectedDie.isUsed) return

    // Mark both dice as used
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

    addToCombatLog(`${isAttackerTurn ? "Attacker" : "Defender"} blocks a hit`)

    // Reset block mode
    setIsBlockMode(false)
    setBlockableDice([])
    setBlockingDieIndex(null)
    setSelectedDieIndex(null)

    // Check if next player has usable dice
    const nextPlayerDice = !isAttackerTurn ? updatedCurrentDice : updatedOpponentDice
    const otherPlayerDice = !isAttackerTurn ? updatedOpponentDice : updatedCurrentDice
    
    const nextPlayerHasUsableDice = hasUsableDice(nextPlayerDice)
    const currentPlayerHasUsableDice = hasUsableDice(otherPlayerDice)

    console.log('Turn switch check:', {
      nextPlayerHasUsableDice,
      currentPlayerHasUsableDice,
      nextPlayerDice,
      otherPlayerDice
    })

    if (nextPlayerHasUsableDice) {
      // If next player has usable dice, switch to them
      setIsAttackerTurn(!isAttackerTurn)
      addToCombatLog(`Switching to ${!isAttackerTurn ? "Attacker" : "Defender"}'s turn`)
    } else if (currentPlayerHasUsableDice) {
      // If current player still has usable dice, stay with them
      addToCombatLog(`${!isAttackerTurn ? "Attacker" : "Defender"} has no usable dice left`)
    } else {
      // If neither player has usable dice, switch turns anyway
      setIsAttackerTurn(!isAttackerTurn)
    }
  }

  const handleSkip = () => {
    setIsAttackerTurn(!isAttackerTurn)
    addToCombatLog(`${isAttackerTurn ? "Attacker" : "Defender"} skips their turn`)
    setSelectedDieIndex(null)
    setIsBlockMode(false)
    setBlockableDice([])
    setBlockingDieIndex(null)
  }

  return (
    <CombatContainer>
      <BattleArea>
        <FighterColumn>
          <FighterLabel>Attacker</FighterLabel>
          <ModelCard
            model={attacker}
            showWeaponSelect={combatPhase === 'weapon-select'}
            onWeaponSelect={weapon => handleWeaponSelect(weapon, true)}
            selectedWeapon={attackerWeapon}
          />
          {attackerWeapon && (
            <WeaponInfo>
              {attackerWeapon.name}
              <WeaponStatsGrid>
                <StatsRow>
                  <div>
                    <StatLabel>ATK:</StatLabel> {attackerWeapon.ATK}
                  </div>
                  <div>
                    <StatLabel>HTV:</StatLabel> {attackerWeapon.HTV}
                  </div>
                </StatsRow>
                <StatsRow>
                  <div>
                    <StatLabel>DMG:</StatLabel> {attackerWeapon.DMG}
                  </div>
                  <div>
                    <StatLabel>CRT:</StatLabel> {attackerWeapon.CRT}
                  </div>
                </StatsRow>
              </WeaponStatsGrid>
              {attackerWeapon.rules && (
                <WeaponRules>
                  Rules: {attackerWeapon.rules}
                </WeaponRules>
              )}
            </WeaponInfo>
          )}
        </FighterColumn>

        <DiceArea>
          {combatPhase === 'rolling' && (
            <ButtonGroup>
              <RollButton onClick={rollDice}>Roll Dice</RollButton>
            </ButtonGroup>
          )}

          {combatPhase === 'resolution' && (
            <>
              <TurnIndicator>
                {isAttackerTurn ? "Attacker" : "Defender"}'s Turn
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
                onDieClick={handleDieClick}
              />

              {!isBlockMode && (
                <ButtonGroup>
                  <SkipButton onClick={handleSkip}>
                    Skip Turn
                  </SkipButton>
                </ButtonGroup>
              )}

              {selectedDieIndex !== null && !isBlockMode && (
                <ButtonGroup>
                  <BackButton onClick={() => setSelectedDieIndex(null)}>
                    Back
                  </BackButton>
                  {selectedDie?.isBlockDie && (
                    <BlockOnlyButton
                      onClick={() => handleBlockDie(selectedDieIndex)}
                      disabled={!canBlock}
                    >
                      Block
                    </BlockOnlyButton>
                  )}
                </ButtonGroup>
              )}
            </>
          )}
        </DiceArea>

        <FighterColumn>
          <FighterLabel>Defender</FighterLabel>
          <ModelCard
            model={defender}
            showWeaponSelect={combatPhase === 'weapon-select'}
            onWeaponSelect={weapon => handleWeaponSelect(weapon, false)}
            selectedWeapon={defenderWeapon}
          />
          {defenderWeapon && (
            <WeaponInfo>
              {defenderWeapon.name}
              <WeaponStatsGrid>
                <StatsRow>
                  <div>
                    <StatLabel>ATK:</StatLabel> {defenderWeapon.ATK}
                  </div>
                  <div>
                    <StatLabel>HTV:</StatLabel> {defenderWeapon.HTV}
                  </div>
                </StatsRow>
                <StatsRow>
                  <div>
                    <StatLabel>DMG:</StatLabel> {defenderWeapon.DMG}
                  </div>
                  <div>
                    <StatLabel>CRT:</StatLabel> {defenderWeapon.CRT}
                  </div>
                </StatsRow>
              </WeaponStatsGrid>
              {defenderWeapon.rules && (
                <WeaponRules>
                  Rules: {defenderWeapon.rules}
                </WeaponRules>
              )}
            </WeaponInfo>
          )}
        </FighterColumn>
      </BattleArea>

      <CombatLog messages={combatLog} />

      <EndCombatButton onClick={() => onCombatEnd(attacker)}>
        End Combat
      </EndCombatButton>
    </CombatContainer>
  )
}

export default CombatScreen