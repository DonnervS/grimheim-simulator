import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Model, WeaponStats } from '../../types/gameTypes'
import DiceDisplay, { DieResult } from './DiceDisplay'
import ModelCard from './ModelCard'
import ActionButtons from './ActionButtons'
import CombatLog from './CombatLog'
import Tooltip from '../ui/Tooltip'
import { weaponRuleDescriptions } from '../../data/ruleDescriptions'

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

const WeaponRuleItem = styled.span`
  cursor: help;
  border-bottom: 1px dotted #8a8aff;
  margin-right: 4px;
  display: inline-block;
  background-color: rgba(74, 74, 138, 0.3);
  padding: 1px 4px;
  border-radius: 3px;
  &:hover {
    color: #8a8aff;
    background-color: rgba(74, 74, 138, 0.5);
  }
`;

const WeaponInfo = ({ weapon }: { weapon: WeaponStats }) => {
  const renderWeaponRules = (rules: string) => {
    if (!rules) return null;
    
    const rulesList = rules.split(',').map(rule => rule.trim());
    
    return (
      <div style={{ 
        marginTop: '4px', 
        fontSize: '0.7em',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '4px' 
      }}>
        {rulesList.map((rule, index) => {
          const description = weaponRuleDescriptions[rule] || 'No description available';
          return (
            <Tooltip 
              key={index} 
              text={description}
              position="bottom"
            >
              <WeaponRuleItem>
                {rule}
              </WeaponRuleItem>
            </Tooltip>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <div style={{ fontSize: '0.8em', fontWeight: 'bold' }}>{weapon.name}</div>
      <WeaponStatsGrid>
        <StatsRow>
          <div><StatLabel>RNG:</StatLabel> {weapon.RNG}"</div>
          <div><StatLabel>ATK:</StatLabel> {weapon.ATK}D6</div>
        </StatsRow>
        <StatsRow>
          <div><StatLabel>HTV:</StatLabel> {weapon.HTV}+</div>
          <div><StatLabel>DMG:</StatLabel> {weapon.DMG}/{weapon.CRT}</div>
        </StatsRow>
      </WeaponStatsGrid>
      {weapon.rules && renderWeaponRules(weapon.rules)}
    </div>
  );
};

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
  selectedAttackerWeapon: WeaponStats | null;
  selectedDefenderWeapon: WeaponStats | null;
  onAttackerWeaponSelect: (weapon: WeaponStats) => void;
  onDefenderWeaponSelect: (weapon: WeaponStats) => void;
  onWinnerDeclared: (winner: Model) => void;
}

export const CombatScreen: React.FC<CombatScreenProps> = ({
  attacker,
  defender,
  selectedAttackerWeapon,
  selectedDefenderWeapon,
  onAttackerWeaponSelect,
  onDefenderWeaponSelect,
  onWinnerDeclared
}) => {
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
      onAttackerWeaponSelect(weapon);
    } else {
      onDefenderWeaponSelect(weapon);
    }
    
    // Only proceed to rolling phase when both weapons are selected
    if ((isAttacker && selectedDefenderWeapon) || (!isAttacker && selectedAttackerWeapon)) {
      setCombatPhase('rolling');
    }
  }

  const rollDiceWithRending = (weapon: WeaponStats, model: Model): DieResult[] => {
    // Roll attack dice
    const attackDice = Array.from({ length: weapon.ATK }, () => {
      const value = Math.floor(Math.random() * 6) + 1;
      const isCritical = value === 6;
      const isHit = value >= weapon.HTV;
      return {
        value,
        isHit,
        isCritical,
        isUsed: false,
        isBlockDie: false,
        isUpgradedByCritical: false
      } as DieResult;
    });

    // Roll block dice based on armor rules
    let blockDiceCount = 0;
    if (model.stats.SR?.includes('Heavy Armor')) {
      blockDiceCount = 2;
    } else if (model.stats.SR?.includes('Medium Armor')) {
      blockDiceCount = 1;
    }
    
    // Add an extra block die if the model has the Shield rule
    if (model.stats.SR?.includes('Shield')) {
      blockDiceCount += 1;
    }

    const blockDice = Array.from({ length: blockDiceCount }, () => {
      const value = Math.floor(Math.random() * 6) + 1;
      const isCritical = value === 6;
      // If model has Shield rule, ensure the block die is always successful
      const isHit = model.stats.SR?.includes('Shield') ? true : (value >= model.stats.SAV || isCritical);
      return {
        value,
        isHit,
        isCritical,
        isUsed: false,
        isBlockDie: true,
        isUpgradedByCritical: false
      } as DieResult;
    });

    const allDice = [...attackDice, ...blockDice];

    // Apply Rending rule if weapon has it
    if (weapon.rules?.includes('Rending')) {
      const criticalHits = allDice.filter(die => !die.isBlockDie && die.isCritical).length;
      const normalHits = allDice.filter(die => !die.isBlockDie && die.isHit && !die.isCritical);
      
      if (criticalHits > 0 && normalHits.length > 0) {
        // Upgrade the first normal hit to a critical hit
        const firstNormalHitIndex = allDice.findIndex(die => !die.isBlockDie && die.isHit && !die.isCritical);
        if (firstNormalHitIndex !== -1) {
          allDice[firstNormalHitIndex] = {
            ...allDice[firstNormalHitIndex],
            isCritical: true,
            isUpgradedByCritical: true
          };
          addToCombatLog(`Rending rule: Upgraded one normal hit to a critical hit`);
        }
      }
    }

    return allDice;
  }

  const handleDiceRoll = () => {
    if (!selectedAttackerWeapon || !selectedDefenderWeapon) return

    const attackerResults = rollDiceWithRending(selectedAttackerWeapon, attacker)
    const defenderResults = rollDiceWithRending(selectedDefenderWeapon, defender)

    setAttackerDice(attackerResults)
    setDefenderDice(defenderResults)

    const attackerHits = attackerResults.filter(d => !d.isBlockDie && d.isHit).length
    const attackerCrits = attackerResults.filter(d => !d.isBlockDie && d.isCritical).length
    const defenderHits = defenderResults.filter(d => !d.isBlockDie && d.isHit).length
    const defenderCrits = defenderResults.filter(d => !d.isBlockDie && d.isCritical).length
    const attackerBlocks = attackerResults.filter(d => d.isBlockDie && (d.value >= attacker.stats.SAV || d.isCritical)).length
    const defenderBlocks = defenderResults.filter(d => d.isBlockDie && (d.value >= defender.stats.SAV || d.isCritical)).length

    addToCombatLog(`Attacker rolls ${attackerHits} hits (${attackerCrits} critical) and ${attackerBlocks} successful blocks (SAV ${attacker.stats.SAV}+)`)
    addToCombatLog(`Defender rolls ${defenderHits} hits (${defenderCrits} critical) and ${defenderBlocks} successful blocks (SAV ${defender.stats.SAV}+)`)

    // Check Strike Last rule
    const attackerHasStrikeLast = selectedAttackerWeapon.rules?.includes('Strike Last') ?? false;
    const defenderHasStrikeLast = selectedDefenderWeapon.rules?.includes('Strike Last') ?? false;

    if (attackerHasStrikeLast && !defenderHasStrikeLast) {
      setIsAttackerTurn(false);
      addToCombatLog("Defender strikes first due to Attacker's Strike Last rule");
    } else if (!attackerHasStrikeLast && defenderHasStrikeLast) {
      setIsAttackerTurn(true);
      addToCombatLog("Attacker strikes first due to Defender's Strike Last rule");
    }

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
    
    // Check if the die can be used for blocking
    const currentWeapon = isAttackerTurn ? selectedAttackerWeapon : selectedDefenderWeapon;
    const opponentWeapon = isAttackerTurn ? selectedDefenderWeapon : selectedAttackerWeapon;
    const hasParry = currentWeapon?.rules?.includes('Parry') ?? false;
    const opponentHasBrutal = opponentWeapon?.rules?.includes('Brutal') ?? false;
    const selectedDie = currentDice[index];
    const currentModel = isAttackerTurn ? attacker : defender;
    const hasShield = currentModel.stats.SR?.includes('Shield');

    // If opponent has Brutal rule and this is not a critical die, show warning message
    if (opponentHasBrutal && !selectedDie.isCritical && hasUnusedHits(opponentDice)) {
      addToCombatLog(`Cannot block hits from Brutal weapons - critical hits required`);
    }

    // Only check for blockable targets if this is a block die or has Parry
    if (selectedDie.isBlockDie || hasParry) {
      const blockable = findBlockableDice(selectedDie, opponentDice);
      const hasBlockableTargets = blockable.length > 0;

      console.log('Block die check:', {
        hasBlockableTargets,
        blockable,
        selectedDie,
        hasParry,
        opponentHasBrutal,
        hasShield,
        isBlockDie: selectedDie.isBlockDie,
        isCritical: selectedDie.isCritical
      });

      // Only skip turn if this is a block die and there are no valid targets
      // AND we have no Shield (which would allow upgrading to block)
      if (!hasBlockableTargets && selectedDie.isBlockDie && 
          !(hasShield && !selectedDie.isCritical && opponentDice.some(die => !die.isUsed && die.isHit && die.isCritical))) {
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

    const currentWeapon = isAttackerTurn ? selectedAttackerWeapon : selectedDefenderWeapon;
    const opponentWeapon = isAttackerTurn ? selectedDefenderWeapon : selectedAttackerWeapon;
    const hasParry = currentWeapon?.rules?.includes('Parry') ?? false;
    const opponentHasBrutal = opponentWeapon?.rules?.includes('Brutal') ?? false;

    const blockable = opponentDice.reduce((blockable: number[], die, index) => {
      let canBlock = false;

      if (!die.isUsed && die.isHit) {
        // If opponent has Brutal, only critical dice can block
        if (opponentHasBrutal && !selectedDie.isCritical) {
          canBlock = false;
        }
        // If the selected die is critical (6), it can block anything
        else if (selectedDie.isCritical) {
          canBlock = true;
        }
        // If the die is a block die
        else if (selectedDie.isBlockDie) {
          canBlock = !die.isCritical; // Block dice can only block normal hits
        }
        // If the die is a normal attack die and the weapon has Parry
        else if (hasParry) {
          canBlock = true; // Can also block critical hits
        }
        // Normal attack die without Parry
        else {
          canBlock = !die.isCritical;
        }
      }

      console.log(`Checking die ${index}:`, {
        die,
        canBlock,
        reason: {
          isUsed: die.isUsed,
          isHit: die.isHit,
          isCritical: die.isCritical,
          selectedDieIsCritical: selectedDie.isCritical,
          selectedDieIsBlockDie: selectedDie.isBlockDie,
          hasParry,
          opponentHasBrutal
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
    const opponentWeapon = isAttackerTurn ? selectedDefenderWeapon : selectedAttackerWeapon;
    const opponentHasBrutal = opponentWeapon?.rules?.includes('Brutal') ?? false;
    
    console.log('Block start:', {
      selectedDie,
      selectedDieIndex,
      opponentDice,
      opponentHasBrutal
    });

    if (!selectedDie || selectedDie.isUsed) return;

    // Check if opponent has Brutal and this is not a critical die
    if (opponentHasBrutal && !selectedDie.isCritical) {
      addToCombatLog(`Cannot block hits from Brutal weapons - critical hits required`);
      return;
    }

    const blockable = findBlockableDice(selectedDie, opponentDice);
    console.log('Found blockable dice:', blockable);
    
    if (blockable.length > 0) {
      if (opponentHasBrutal) {
        addToCombatLog(`Hits from Brutal weapons can only be blocked with critical dice`);
      }
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
    const currentModel = isAttackerTurn ? attacker : defender;
    const hasShield = currentModel.stats.SR?.includes('Shield');
    const targetDie = opponentDice[opponentDieIndex];
    
    console.log('Blocking die:', {
      blockingDie: selectedDie,
      targetDie: opponentDice[opponentDieIndex],
      blockingDieIndex,
      opponentDieIndex,
      isBlockMode,
      hasShield
    });

    if (!selectedDie || selectedDie.isUsed) return;

    // Mark both dice as used
    const updatedCurrentDice = [...currentDice];
    updatedCurrentDice[blockingDieIndex] = { 
      ...selectedDie, 
      isUsed: true
    };

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
    
    // Check for unused regular dice
    const hasUnusedRegularDice = dice.some(die => 
      !die.isUsed && 
      !die.isBlockDie
    );
    
    // Check for unused block dice
    const hasUnusedBlockDice = dice.some(die => 
      !die.isUsed && 
      die.isBlockDie
    );
    
    // If we have unused regular dice, they're always usable
    if (hasUnusedRegularDice) return true;
    
    // If we have unused block dice, check if there are unblocked hits to block
    if (hasUnusedBlockDice) {
      const opponentDice = isAttackerTurn ? defenderDice : attackerDice;
      const unblockableHits = opponentDice.filter(die => 
        !die.isBlockDie && 
        die.isHit && 
        !die.isUsed  // If the die is not used, it hasn't been blocked yet
      );
      return unblockableHits.length > 0;
    }
    
    return false;
  };

  const checkAndSwitchTurns = () => {
    const currentDice = isAttackerTurn ? attackerDice : defenderDice;
    const opponentDice = isAttackerTurn ? defenderDice : attackerDice;
    
    const currentPlayerHasUsableDice = hasUsableDice(currentDice);
    const opponentHasUsableDice = hasUsableDice(opponentDice);

    if (!currentPlayerHasUsableDice && !opponentHasUsableDice) {
      // If neither player has usable dice, end the round
      addToCombatLog("No more usable dice, round ends");
      handleRoundEnd();
    } else if (!currentPlayerHasUsableDice && opponentHasUsableDice) {
      // Only switch if current player has no dice but opponent does
      setIsAttackerTurn(!isAttackerTurn);
      addToCombatLog(`${isAttackerTurn ? "Attacker" : "Defender"} has no usable dice, switching to ${!isAttackerTurn ? "Attacker" : "Defender"}'s turn`);
    }
    // If current player still has dice, let them continue playing
  };

  const handleRoundEnd = () => {
    // Apply any remaining damage
    applyRemainingDamage();
    
    // Reset for next round
    setSelectedDieIndex(null);
    setIsBlockMode(false);
    setBlockableDice([]);
    setBlockingDieIndex(null);
    setCombatPhase('rolling');
  };

  const calculateDamage = (dice: DieResult[], weapon: WeaponStats, target: Model): number => {
    // Calculate base damage
    const baseDamage = dice.reduce((total, die) => {
      if (die.isCritical) {
        return total + weapon.CRT;
      }
      return total + weapon.DMG;
    }, 0);

    // Reduce damage by 1 if target has Tough rule
    if (target.stats.SR?.includes('Tough')) {
      const reducedDamage = Math.max(0, baseDamage - dice.length); // Reduce by 1 for each hit
      addToCombatLog(`${target.name} reduces damage from ${baseDamage} to ${reducedDamage} due to Tough rule`);
      return reducedDamage;
    }

    return baseDamage;
  };

  const applyDamage = (target: Model, damage: number) => {
    if (target.currentWounds === undefined) {
      target.currentWounds = target.stats.WND;
    }
    target.currentWounds = Math.max(0, target.currentWounds - damage);

    if (target.currentWounds <= 0) {
      addToCombatLog(`${target.name} is defeated!`);
      onWinnerDeclared(isAttackerTurn ? attacker : defender);
    }
  };

  const applyRemainingDamage = () => {
    // Apply damage from any unused hit dice
    const attackerHits = attackerDice.filter(die => !die.isUsed && !die.isBlockDie && die.isHit);
    const defenderHits = defenderDice.filter(die => !die.isUsed && !die.isBlockDie && die.isHit);
    
    if (attackerHits.length > 0 && selectedAttackerWeapon) {
      const damage = calculateDamage(attackerHits, selectedAttackerWeapon, defender);
      applyDamage(defender, damage);
      addToCombatLog(`Attacker deals ${damage} remaining damage`);
    }
    
    if (defenderHits.length > 0 && selectedDefenderWeapon) {
      const damage = calculateDamage(defenderHits, selectedDefenderWeapon, attacker);
      applyDamage(attacker, damage);
      addToCombatLog(`Defender deals ${damage} remaining damage`);
    }
  };

  const handleStrike = () => {
    if (selectedDieIndex === null) return
    
    const currentDice = isAttackerTurn ? attackerDice : defenderDice
    const selectedDie = currentDice[selectedDieIndex]
    
    // Only block dice cannot strike
    if (selectedDie.isBlockDie) {
      addToCombatLog(`Block dice can only be used for blocking`)
      return
    }

    const weapon = isAttackerTurn ? selectedAttackerWeapon : selectedDefenderWeapon;
    const targetModel = isAttackerTurn ? defender : attacker;
    
    if (!weapon || !selectedDie || selectedDie.isUsed) return

    // Calculate damage considering Tough rule
    const damage = calculateDamage([selectedDie], weapon, targetModel);
    const newWounds = Math.max(0, targetModel.currentWounds - damage);
    
    if (isAttackerTurn) {
      defender.currentWounds = newWounds;
    } else {
      attacker.currentWounds = newWounds;
    }

    // Mark die as used
    const updatedCurrentDice = [...currentDice]
    updatedCurrentDice[selectedDieIndex] = { ...selectedDie, isUsed: true }
    if (isAttackerTurn) {
      setAttackerDice(updatedCurrentDice)
    } else {
      setDefenderDice(updatedCurrentDice)
    }

    addToCombatLog(`${isAttackerTurn ? "Attacker" : "Defender"} deals ${damage} damage`);

    // Check for combat end
    if (newWounds <= 0) {
      addToCombatLog(`${isAttackerTurn ? "Defender" : "Attacker"} is defeated!`)
      onWinnerDeclared(isAttackerTurn ? attacker : defender)
      return
    }

    setSelectedDieIndex(null)

    // Check if next player has usable dice
    const nextPlayerDice = isAttackerTurn ? defenderDice : attackerDice;
    const otherPlayerDice = isAttackerTurn ? updatedCurrentDice : defenderDice;
    
    const nextPlayerHasUsableDice = hasUsableDice(nextPlayerDice);
    const currentPlayerHasUsableDice = hasUsableDice(otherPlayerDice);

    if (nextPlayerHasUsableDice) {
      // If next player has usable dice, switch to them
      setIsAttackerTurn(!isAttackerTurn);
    } else if (currentPlayerHasUsableDice) {
      // If current player still has usable dice, stay with them
      addToCombatLog(`${!isAttackerTurn ? "Attacker" : "Defender"} has no usable dice left`);
    } else {
      // If neither player has usable dice, switch turns anyway
      setIsAttackerTurn(!isAttackerTurn);
    }
  }

  const handleBlock = () => {
    if (selectedDieIndex === null) return
    
    const currentDice = isAttackerTurn ? attackerDice : defenderDice
    const selectedDie = currentDice[selectedDieIndex]
    const opponentDice = isAttackerTurn ? defenderDice : attackerDice
    const opponentWeapon = isAttackerTurn ? selectedDefenderWeapon : selectedAttackerWeapon
    const opponentHasBrutal = opponentWeapon?.rules?.includes('Brutal') ?? false
    
    if (!selectedDie || selectedDie.isUsed) return

    // Check if opponent has Brutal and this is not a critical die
    // For Brutal weapons, only critical dice can block regardless of die type
    if (opponentHasBrutal && !selectedDie.isCritical) {
      addToCombatLog(`Cannot block hits from Brutal weapons - critical hits required`)
      return
    }

    // Find a blockable opponent die
    const blockableIndex = opponentDice.findIndex(die => {
      if (!die.isUsed && (die.isHit || die.isCritical)) {
        // If opponent has Brutal rule and this is not a critical die
        if (opponentHasBrutal && !selectedDie.isCritical) {
          return false
        }
        // If the die is critical, it can only be blocked by critical dice
        return !die.isCritical || selectedDie.isCritical
      }
      return false
    })

    if (blockableIndex === -1) return

    // Mark both dice as used
    const updatedCurrentDice = [...currentDice]
    updatedCurrentDice[selectedDieIndex] = { ...selectedDie, isUsed: true }

    const updatedOpponentDice = [...opponentDice]
    updatedOpponentDice[blockableIndex] = { ...opponentDice[blockableIndex], isUsed: true }

    if (isAttackerTurn) {
      setAttackerDice(updatedCurrentDice)
      setDefenderDice(updatedOpponentDice)
    } else {
      setDefenderDice(updatedCurrentDice)
      setAttackerDice(updatedOpponentDice)
    }

    addToCombatLog(`${isAttackerTurn ? "Attacker" : "Defender"} blocks a hit`)

    // Switch player if possible
    const otherPlayerHasHits = hasUnusedHits(isAttackerTurn ? defenderDice : attackerDice)
    if (otherPlayerHasHits) {
      setIsAttackerTurn(!isAttackerTurn)
    }
    setSelectedDieIndex(null)
  }

  const canBlock = () => {
    if (selectedDieIndex === null) return false;
    
    const currentDice = isAttackerTurn ? attackerDice : defenderDice;
    const selectedDie = currentDice[selectedDieIndex];
    const currentWeapon = isAttackerTurn ? selectedAttackerWeapon : selectedDefenderWeapon;
    const opponentWeapon = isAttackerTurn ? selectedDefenderWeapon : selectedAttackerWeapon;
    
    // Allow blocking with any die that's not used
    if (!selectedDie || selectedDie.isUsed) return false;

    const hasParry = currentWeapon?.rules?.includes('Parry') ?? false;
    const opponentHasBrutal = opponentWeapon?.rules?.includes('Brutal') ?? false;
    const opponentDice = isAttackerTurn ? defenderDice : attackerDice;

    // If opponent has Brutal rule and this is not a critical die, blocking is not possible
    if (opponentHasBrutal && !selectedDie.isCritical) {
      return false;
    }

    // If the die is critical (6), it can always be used for blocking
    if (selectedDie.isCritical) {
      return opponentDice.some(die => !die.isUsed && die.isHit);
    }

    return opponentDice.some(die => {
      if (!die.isUsed && die.isHit) {
        // If the die is a block die
        if (selectedDie.isBlockDie) {
          return !die.isCritical; // Block dice can only block normal hits
        }
        // If the die is a normal attack die and the weapon has Parry
        else if (hasParry) {
          return true; // Can also block critical hits
        }
        // Normal attack die without Parry
        else {
          return !die.isCritical;
        }
      }
      return false;
    });
  }

  const handleBack = () => {
    setSelectedDieIndex(null);
    setIsBlockMode(false);
    setBlockableDice([]);
    setBlockingDieIndex(null);
  };

  const handleSkip = () => {
    setIsAttackerTurn(!isAttackerTurn);
    addToCombatLog(`${isAttackerTurn ? "Attacker" : "Defender"} skips their turn`);
    setSelectedDieIndex(null);
    setIsBlockMode(false);
    setBlockableDice([]);
    setBlockingDieIndex(null);
  };

  return (
    <CombatContainer>
      <BattleArea>
        <FighterColumn>
          <FighterLabel>Attacker</FighterLabel>
          <ModelCard
            model={attacker}
            onWeaponSelect={(weapon) => handleWeaponSelect(weapon, true)}
            selectedWeapon={selectedAttackerWeapon}
            isSelectable={combatPhase === 'weapon-select'}
          />
          {selectedAttackerWeapon && (
            <WeaponInfo weapon={selectedAttackerWeapon} />
          )}
        </FighterColumn>

        <DiceArea>
          {combatPhase === 'weapon-select' && (
            <>
              <TurnIndicator>Select Weapons</TurnIndicator>
            </>
          )}
          {combatPhase === 'rolling' && (
            <>
              <TurnIndicator>Roll Phase</TurnIndicator>
              <RollButton onClick={handleDiceRoll}>Roll Dice</RollButton>
            </>
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
                <>
                <ButtonGroup>
                  <BackButton onClick={handleBack}>Back</BackButton>
                  {/* Only show ActionButtons if selected die is not a block die */}
                  {isAttackerTurn ? 
                    (!attackerDice[selectedDieIndex].isBlockDie && (
                      <ActionButtons
                        onStrike={handleStrike}
                        onBlock={handleBlockStart}
                        canBlock={canBlock()}
                        selectedDie={attackerDice[selectedDieIndex]}
                      />
                    )) : 
                    (!defenderDice[selectedDieIndex].isBlockDie && (
                      <ActionButtons
                        onStrike={handleStrike}
                        onBlock={handleBlockStart}
                        canBlock={canBlock()}
                        selectedDie={defenderDice[selectedDieIndex]}
                      />
                    ))
                  }
                  {/* Show block-only button for block dice */}
                  {isAttackerTurn ? 
                    (attackerDice[selectedDieIndex].isBlockDie && (
                      <BlockOnlyButton 
                        onClick={handleBlockStart}
                        disabled={!canBlock()}
                      >
                        Block
                      </BlockOnlyButton>
                    )) : 
                    (defenderDice[selectedDieIndex].isBlockDie && (
                      <BlockOnlyButton 
                        onClick={handleBlockStart}
                        disabled={!canBlock()}
                      >
                        Block
                      </BlockOnlyButton>
                    ))
                  }
                </ButtonGroup>
                </>
              )}

              {isBlockMode && (
                <ButtonGroup>
                  <BackButton onClick={handleBack}>Back</BackButton>
                </ButtonGroup>
              )}
            </>
          )}
        </DiceArea>

        <FighterColumn>
          <FighterLabel>Defender</FighterLabel>
          <ModelCard
            model={defender}
            onWeaponSelect={(weapon) => handleWeaponSelect(weapon, false)}
            selectedWeapon={selectedDefenderWeapon}
            isSelectable={combatPhase === 'weapon-select'}
          />
          {selectedDefenderWeapon && (
            <WeaponInfo weapon={selectedDefenderWeapon} />
          )}
        </FighterColumn>
      </BattleArea>

      <CombatLog messages={combatLog} />
    </CombatContainer>
  )
}