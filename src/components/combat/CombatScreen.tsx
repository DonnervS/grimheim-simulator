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
          addToCombatLog(`${isAttackerTurn ? 'Attacker' : 'Defender'} skips turn - block die cannot be used`);
          setIsAttackerTurn(!isAttackerTurn);
        }
      }
    }
  }, [combatPhase, selectedDieIndex, isAttackerTurn, attackerDice, defenderDice]);

  const addToCombatLog = (message: string) => {
    setCombatLog(prev => [...prev, message])
  }

  const handleWeaponSelect = (weapon: WeaponStats, isAttacker: boolean) => {
    if (isAttacker) {
      setAttackerWeapon(weapon)
      addToCombatLog(`Attacker selects ${weapon.name}`)
    } else {
      setDefenderWeapon(weapon)
      addToCombatLog(`Defender selects ${weapon.name}`)
      setCombatPhase('rolling')
    }
  }

  const rollDice = (weapon: WeaponStats, model: Model): DieResult[] => {
    // Roll attack dice
    const attackDice = Array.from({ length: weapon.ATK }, () => {
      const value = Math.floor(Math.random() * 6) + 1
      const isCritical = value === 6
      const isHit = value >= weapon.HTV // Critical is not automatic hit
      return { value, isHit, isCritical, isUsed: false, isBlockDie: false }
    })

    // Roll block dice based on SAV
    const extraBlockDice = model.stats.SAV <= 3 ? 2 : model.stats.SAV === 4 ? 1 : 0
    const blockDice = Array.from({ length: extraBlockDice }, () => {
      const value = Math.floor(Math.random() * 6) + 1
      const isCritical = value === 6
      const isHit = value >= model.stats.SAV // Use SAV instead of HTV for block dice
      return { value, isHit, isCritical, isUsed: false, isBlockDie: true }
    })

    return [...attackDice, ...blockDice]
  }

  const handleDiceRoll = () => {
    if (!attackerWeapon || !defenderWeapon) return

    const attackerResults = rollDice(attackerWeapon, attacker)
    const defenderResults = rollDice(defenderWeapon, defender)

    setAttackerDice(attackerResults)
    setDefenderDice(defenderResults)

    const attackerHits = attackerResults.filter(d => !d.isBlockDie && d.isHit).length
    const attackerCrits = attackerResults.filter(d => !d.isBlockDie && d.isCritical && d.isHit).length
    const defenderHits = defenderResults.filter(d => !d.isBlockDie && d.isHit).length
    const defenderCrits = defenderResults.filter(d => !d.isBlockDie && d.isCritical && d.isHit).length
    const attackerBlocks = attackerResults.filter(d => d.isBlockDie && (d.value >= attacker.stats.SAV || d.isCritical)).length
    const defenderBlocks = defenderResults.filter(d => d.isBlockDie && (d.value >= defender.stats.SAV || d.isCritical)).length

    addToCombatLog(`Attacker rolls ${attackerHits} hits (${attackerCrits} critical) and ${attackerBlocks} successful blocks (SAV ${attacker.stats.SAV}+)`)
    addToCombatLog(`Defender rolls ${defenderHits} hits (${defenderCrits} critical) and ${defenderBlocks} successful blocks (SAV ${defender.stats.SAV}+)`)

    setCombatPhase('resolution')
  }

  const hasUnusedHits = (dice: DieResult[]) => {
    return dice.some(die => (die.isHit || die.isCritical) && !die.isUsed)
  }

  const handleDieClick = (index: number) => {
    const currentDice = isAttackerTurn ? attackerDice : defenderDice;
    const opponentDice = isAttackerTurn ? defenderDice : attackerDice;
    
    console.log('Die clicked:', {
      player: isAttackerTurn ? 'Attacker' : 'Defender',
      selectedDie: currentDice[index],
      allCurrentDice: currentDice,
      allOpponentDice: opponentDice,
      isBlockMode
    });

    // If in block mode, handle blocking the clicked die
    if (isBlockMode && blockableDice.includes(index)) {
      handleBlockDie(index);
      return;
    }
    
    if (currentDice[index].isUsed) return;
    
    // If it's a block die, check if there are any dice that can be blocked
    if (currentDice[index].isBlockDie) {
      const hasBlockableTargets = opponentDice.some(oppDie => 
        !oppDie.isUsed && 
        oppDie.isHit && 
        (!oppDie.isCritical || currentDice[index].isCritical)
      );

      console.log('Block die check:', {
        hasBlockableTargets,
        blockableDice: opponentDice.filter(oppDie => 
          !oppDie.isUsed && 
          oppDie.isHit && 
          (!oppDie.isCritical || currentDice[index].isCritical)
        )
      });

      if (!hasBlockableTargets) {
        addToCombatLog(`${isAttackerTurn ? 'Attacker' : 'Defender'} skips turn - no valid targets to block`);
        setIsAttackerTurn(!isAttackerTurn);
        return;
      }
    }

    setSelectedDieIndex(index);
  };

  const findBlockableDice = (selectedDie: DieResult, opponentDice: DieResult[]): number[] => {
    console.log('Finding blockable dice:', {
      selectedDie,
      opponentDice
    });

    const blockable = opponentDice.reduce((blockable: number[], die, index) => {
      const canBlock = !die.isUsed && die.isHit && (!die.isCritical || selectedDie.isCritical);
      console.log(`Checking die ${index}:`, {
        die,
        canBlock,
        reason: {
          isUsed: die.isUsed,
          isHit: die.isHit,
          criticalCheck: !die.isCritical || selectedDie.isCritical
        }
      });
      
      if (canBlock) {
        blockable.push(index);
      }
      return blockable;
    }, []);

    console.log('Blockable dice indices:', blockable);
    return blockable;
  }

  const handleBlockStart = () => {
    if (selectedDieIndex === null) return;
    
    const currentDice = isAttackerTurn ? attackerDice : defenderDice;
    const selectedDie = currentDice[selectedDieIndex];
    const opponentDice = isAttackerTurn ? defenderDice : attackerDice;
    
    console.log('Block start:', {
      selectedDie,
      selectedDieIndex,
      opponentDice
    });

    if (!selectedDie || selectedDie.isUsed) return;

    const blockable = findBlockableDice(selectedDie, opponentDice);
    console.log('Found blockable dice:', blockable);
    
    if (blockable.length > 0) {
      setIsBlockMode(true);
      setBlockableDice(blockable);
      setBlockingDieIndex(selectedDieIndex);
    }
  }

  const handleBlockDie = (opponentDieIndex: number) => {
    if (blockingDieIndex === null) return;
    
    const currentDice = isAttackerTurn ? attackerDice : defenderDice;
    const selectedDie = currentDice[blockingDieIndex];
    const opponentDice = isAttackerTurn ? defenderDice : attackerDice;
    
    console.log('Blocking die:', {
      blockingDie: selectedDie,
      targetDie: opponentDice[opponentDieIndex],
      blockingDieIndex,
      opponentDieIndex,
      isBlockMode
    });

    if (!selectedDie || selectedDie.isUsed) return;

    // Mark both dice as used
    const updatedCurrentDice = [...currentDice];
    updatedCurrentDice[blockingDieIndex] = { ...selectedDie, isUsed: true };

    const updatedOpponentDice = [...opponentDice];
    updatedOpponentDice[opponentDieIndex] = { ...opponentDice[opponentDieIndex], isUsed: true };

    if (isAttackerTurn) {
      setAttackerDice(updatedCurrentDice);
      setDefenderDice(updatedOpponentDice);
    } else {
      setDefenderDice(updatedCurrentDice);
      setAttackerDice(updatedOpponentDice);
    }

    addToCombatLog(`${isAttackerTurn ? "Attacker" : "Defender"} blocks a hit`);

    // Reset block mode
    setIsBlockMode(false);
    setBlockableDice([]);
    setBlockingDieIndex(null);
    setSelectedDieIndex(null);

    // Check if next player has usable dice
    const nextPlayerDice = !isAttackerTurn ? updatedCurrentDice : updatedOpponentDice;
    const otherPlayerDice = !isAttackerTurn ? updatedOpponentDice : updatedCurrentDice;
    
    const nextPlayerHasUsableDice = hasUsableDice(nextPlayerDice);
    const currentPlayerHasUsableDice = hasUsableDice(otherPlayerDice);

    console.log('Turn switch check:', {
      nextPlayerHasUsableDice,
      currentPlayerHasUsableDice,
      nextPlayerDice,
      otherPlayerDice
    });

    if (nextPlayerHasUsableDice) {
      // If next player has usable dice, switch to them
      setIsAttackerTurn(!isAttackerTurn);
      addToCombatLog(`Switching to ${!isAttackerTurn ? "Attacker" : "Defender"}'s turn`);
    } else if (currentPlayerHasUsableDice) {
      // If current player still has usable dice, stay with them
      addToCombatLog(`${!isAttackerTurn ? "Attacker" : "Defender"} has no usable dice left`);
    } else {
      // If neither player has usable dice, switch turns anyway
      setIsAttackerTurn(!isAttackerTurn);
    }
  };

  const hasUsableDice = (dice: DieResult[]) => {
    if (!dice || dice.length === 0) return false;
    
    const currentModel = isAttackerTurn ? attacker : defender;
    
    return dice.some(die => {
      if (!die) return false;
      if (die.isUsed) return false;
      
      // For block dice, check against SAV
      if (die.isBlockDie) {
        return die.value >= currentModel.stats.SAV || die.isCritical;
      }
      
      // For normal dice, check if it's a hit
      return die.isHit || die.isCritical;
    });
  };

  const switchTurnIfNeeded = () => {
    const currentDice = isAttackerTurn ? attackerDice : defenderDice;
    const opponentDice = isAttackerTurn ? defenderDice : attackerDice;
    
    const currentPlayerHasUsableDice = hasUsableDice(currentDice);
    const opponentHasUsableDice = hasUsableDice(opponentDice);

    console.log('Turn switch check:', {
      currentPlayerHasUsableDice,
      opponentHasUsableDice,
      currentDice,
      opponentDice
    });

    if (!currentPlayerHasUsableDice) {
      if (opponentHasUsableDice) {
        setIsAttackerTurn(!isAttackerTurn);
        addToCombatLog(`Switching to ${!isAttackerTurn ? "Attacker" : "Defender"}'s turn`);
      } else {
        // If neither player has usable dice, resolve damage
        resolveDamage();
      }
    }
  };

  const handleDamageClick = () => {
    if (selectedDieIndex === null) return;
    
    const currentDice = isAttackerTurn ? attackerDice : defenderDice;
    const selectedDie = currentDice[selectedDieIndex];
    
    if (!selectedDie || selectedDie.isUsed || selectedDie.isBlockDie) return;

    const currentWeapon = isAttackerTurn ? attackerWeapon : defenderWeapon;
    if (!currentWeapon) return;

    // Calculate damage
    const damage = selectedDie.isCritical ? currentWeapon.CRT : currentWeapon.DMG;
    
    // Apply damage to the opponent
    if (isAttackerTurn) {
      defender.currentWounds = Math.max(0, defender.currentWounds! - damage);
      addToCombatLog(`Attacker deals ${damage} damage to Defender (${defender.currentWounds} wounds remaining)`);
    } else {
      attacker.currentWounds = Math.max(0, attacker.currentWounds! - damage);
      addToCombatLog(`Defender deals ${damage} damage to Attacker (${attacker.currentWounds} wounds remaining)`);
    }

    // Mark the die as used
    const updatedDice = [...currentDice];
    updatedDice[selectedDieIndex] = { ...selectedDie, isUsed: true };
    
    if (isAttackerTurn) {
      setAttackerDice(updatedDice);
    } else {
      setDefenderDice(updatedDice);
    }

    // Reset selection
    setSelectedDieIndex(null);

    // Check if the combat should end
    if (attacker.currentWounds === 0 || defender.currentWounds === 0) {
      const winner = attacker.currentWounds === 0 ? defender : attacker;
      onCombatEnd(winner);
      return;
    }

    // Switch turns if needed
    switchTurnIfNeeded();
  };

  const resolveDamage = () => {
    // Reset for next round
    setCombatPhase('rolling');
    setSelectedDieIndex(null);
    setIsBlockMode(false);
    setBlockableDice([]);
    setBlockingDieIndex(null);
    
    // Check if combat should end
    if (attacker.currentWounds === 0 || defender.currentWounds === 0) {
      const winner = attacker.currentWounds === 0 ? defender : attacker;
      onCombatEnd(winner);
    }
  };

  const renderWeaponSelection = () => {
    const currentModel = isAttackerTurn ? attacker : defender;
    
    return (
      <div>
        <TurnIndicator>
          {isAttackerTurn ? "Attacker's" : "Defender's"} Weapon Selection
        </TurnIndicator>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          {currentModel.weapons.map((weapon, index) => (
            <WeaponInfo
              key={index}
              onClick={() => handleWeaponSelect(weapon, isAttackerTurn)}
              style={{ cursor: 'pointer' }}
            >
              <div>{weapon.name}</div>
              <WeaponStatsGrid>
                <StatsRow>
                  <div><StatLabel>RNG:</StatLabel> {weapon.RNG}"</div>
                  <div><StatLabel>ATK:</StatLabel> {weapon.ATK}</div>
                </StatsRow>
                <StatsRow>
                  <div><StatLabel>HTV:</StatLabel> {weapon.HTV}+</div>
                  <div><StatLabel>DMG:</StatLabel> {weapon.DMG}/{weapon.CRT}</div>
                </StatsRow>
              </WeaponStatsGrid>
              {weapon.rules && (
                <WeaponRules>
                  Rules: {weapon.rules}
                </WeaponRules>
              )}
            </WeaponInfo>
          ))}
        </div>
      </div>
    );
  };

  const renderCombatArea = () => {
    return (
      <BattleArea>
        <FighterColumn>
          <FighterLabel>Attacker</FighterLabel>
          <ModelCard model={attacker} />
          {attackerWeapon && (
            <WeaponInfo>
              <div>{attackerWeapon.name}</div>
              <WeaponStatsGrid>
                <StatsRow>
                  <div><StatLabel>RNG:</StatLabel> {attackerWeapon.RNG}"</div>
                  <div><StatLabel>ATK:</StatLabel> {attackerWeapon.ATK}</div>
                </StatsRow>
                <StatsRow>
                  <div><StatLabel>HTV:</StatLabel> {attackerWeapon.HTV}+</div>
                  <div><StatLabel>DMG:</StatLabel> {attackerWeapon.DMG}/{attackerWeapon.CRT}</div>
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
              <RollButton onClick={handleDiceRoll}>
                Roll Dice
              </RollButton>
            </ButtonGroup>
          )}

          {combatPhase === 'resolution' && (
            <>
              <TurnIndicator>
                {isAttackerTurn ? "Attacker's" : "Defender's"} Turn
              </TurnIndicator>
              
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <DiceDisplay
                  dice={isAttackerTurn ? attackerDice : defenderDice}
                  selectedIndex={selectedDieIndex}
                  blockableDice={isBlockMode ? blockableDice : []}
                  onDieClick={handleDieClick}
                />
                
                {selectedDieIndex !== null && !isBlockMode && (
                  <ActionButtons
                    selectedDie={(isAttackerTurn ? attackerDice : defenderDice)[selectedDieIndex]}
                    onDamageClick={handleDamageClick}
                    onBlockClick={handleBlockStart}
                  />
                )}
              </div>
            </>
          )}
          
          <CombatLog messages={combatLog} />
        </DiceArea>

        <FighterColumn>
          <FighterLabel>Defender</FighterLabel>
          <ModelCard model={defender} />
          {defenderWeapon && (
            <WeaponInfo>
              <div>{defenderWeapon.name}</div>
              <WeaponStatsGrid>
                <StatsRow>
                  <div><StatLabel>RNG:</StatLabel> {defenderWeapon.RNG}"</div>
                  <div><StatLabel>ATK:</StatLabel> {defenderWeapon.ATK}</div>
                </StatsRow>
                <StatsRow>
                  <div><StatLabel>HTV:</StatLabel> {defenderWeapon.HTV}+</div>
                  <div><StatLabel>DMG:</StatLabel> {defenderWeapon.DMG}/{defenderWeapon.CRT}</div>
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
    );
  };

  return (
    <CombatContainer>
      {combatPhase === 'weapon-select' ? renderWeaponSelection() : renderCombatArea()}
    </CombatContainer>
  );
};