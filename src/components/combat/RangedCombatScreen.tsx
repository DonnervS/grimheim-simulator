import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Model, WeaponStats } from '../../types/gameTypes';
import { RangedModelCard } from './RangedModelCard';
import RangedDiceDisplay, { DieResult } from './RangedDiceDisplay';
import Tooltip from '../ui/Tooltip';
import { weaponRuleDescriptions } from '../../data/ruleDescriptions';

const CombatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  position: relative;
  min-height: 100%;
`;

const BattleArea = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: flex-start;
  width: 100%;
  max-width: 1200px;
  margin: 20px 0;
  gap: 40px;
  position: relative;
`;

const ModelArea = styled.div<{ $isRight?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.$isRight ? 'flex-start' : 'flex-end'};
  padding: ${props => props.$isRight ? '0 0 0 20px' : '0 20px 0 0'};
`;

const CenterArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 20px;
  min-width: 400px;
`;

const DiceArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  width: 100%;
  gap: 20px;
`;

const TurnIndicator = styled.div`
  color: #8a8aff;
  font-family: 'Press Start 2P', cursive;
  font-size: 1.2em;
  text-align: center;
  margin-bottom: 20px;
`;

const DiceButton = styled.button`
  padding: 12px 24px;
  background: #8a8aff;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 1em;
  font-family: 'Press Start 2P', cursive;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  max-width: 200px;

  &:hover:not(:disabled) {
    transform: scale(1.05);
    background: #9a9aff;
  }

  &:disabled {
    background: #4a4a8a;
    cursor: not-allowed;
    transform: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
  justify-content: center;
`;

const ControlButton = styled(DiceButton)`
  margin: 0;
  background: ${props => props.color || '#4a4a8a'};
  
  &:hover:not(:disabled) {
    background: ${props => props.color ? `${props.color}cc` : '#6a6aaa'};
  }
`;

const CombatLog = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  padding: 20px;
  background: rgba(26, 26, 46, 0.9);
  border-radius: 8px;
  border: 2px solid #4a4a8a;
  max-height: 200px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #1a1a2e;
  }

  &::-webkit-scrollbar-thumb {
    background: #4a4a8a;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #6a6aaa;
  }
`;

const LogEntry = styled.div`
  color: #e6e6fa;
  margin: 5px 0;
  font-family: monospace;
  font-size: 0.9em;
  padding: 5px;
  border-bottom: 1px solid #4a4a8a;

  &:last-child {
    border-bottom: none;
  }
`;

const WeaponInfoContainer = styled.div`
  background: rgba(26, 26, 46, 0.9);
  border-radius: 8px;
  padding: 15px;
  margin-top: 10px;
  border: 2px solid #4a4a8a;
  width: 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const WeaponTitle = styled.div`
  color: #8a8aff;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.9em;
  margin-bottom: 10px;
  text-align: center;
  text-shadow: 0 0 10px rgba(138, 138, 255, 0.5);
`;

const WeaponStatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 10px;
`;

const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #e6e6fa;
  font-size: 0.9em;
`;

const StatLabel = styled.span`
  color: #8a8aff;
`;

const WeaponRuleItem = styled.span`
  cursor: help;
  border-bottom: 1px dotted #8a8aff;
  margin-right: 4px;
  display: inline-block;
  background-color: rgba(74, 74, 138, 0.3);
  padding: 1px 4px;
  border-radius: 3px;
  color: #e6e6fa;
  font-size: 0.8em;
  
  &:hover {
    background-color: rgba(74, 74, 138, 0.5);
  }
`;

const WeaponRules = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const WeaponInfo: React.FC<{ weapon: WeaponStats }> = ({ weapon }) => {
  const renderWeaponRules = (rules: string | undefined) => {
    if (!rules) return null;
    
    const rulesList = rules.split(',').map(rule => rule.trim());
    
    return (
      <WeaponRules>
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
      </WeaponRules>
    );
  };

  return (
    <WeaponInfoContainer>
      <WeaponTitle>{weapon.name}</WeaponTitle>
      <WeaponStatsGrid>
        <StatRow>
          <StatLabel>RNG:</StatLabel> {weapon.RNG}"
        </StatRow>
        <StatRow>
          <StatLabel>ATK:</StatLabel> {weapon.ATK}D6
        </StatRow>
        <StatRow>
          <StatLabel>HTV:</StatLabel> {weapon.HTV}+
        </StatRow>
        <StatRow>
          <StatLabel>DMG:</StatLabel> {weapon.DMG}/{weapon.CRT}
        </StatRow>
      </WeaponStatsGrid>
      {renderWeaponRules(weapon.rules)}
    </WeaponInfoContainer>
  );
};

interface RangedCombatScreenProps {
  attacker: Model;
  defender: Model;
  attackerWeapon: WeaponStats | null;
  defenderWeapon: WeaponStats | null;
  onAttackerWeaponSelect: (weapon: WeaponStats) => void;
  onDefenderWeaponSelect: (weapon: WeaponStats) => void;
  onWinnerDeclared: (winner: Model) => void;
  onEndCombat: () => void;
}

export const RangedCombatScreen: React.FC<RangedCombatScreenProps> = ({
  attacker,
  defender,
  attackerWeapon,
  defenderWeapon,
  onAttackerWeaponSelect,
  onDefenderWeaponSelect,
  onWinnerDeclared,
  onEndCombat
}) => {
  const [phase, setPhase] = useState<'attack' | 'save'>('attack');
  const [combatLog, setCombatLog] = useState<string[]>([]);
  const [attackerDice, setAttackerDice] = useState<DieResult[]>([]);
  const [defenderDice, setDefenderDice] = useState<DieResult[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [round, setRound] = useState(1);

  useEffect(() => {
    if (attacker.currentWounds === undefined) {
      attacker.currentWounds = attacker.stats.WND;
    }
    if (defender.currentWounds === undefined) {
      defender.currentWounds = defender.stats.WND;
    }
  }, [attacker, defender]);

  const addToCombatLog = (message: string) => {
    setCombatLog(prev => [...prev, message]);
  };

  const rollDice = (amount: number): DieResult[] => {
    return Array.from({ length: amount }, () => ({
      value: Math.floor(Math.random() * 6) + 1,
      isHit: false,
      isCritical: false,
      isSave: false,
      isSelected: false
    }));
  };

  const handleAttackRoll = () => {
    if (!attackerWeapon) return;
    setIsRolling(true);

    const dice = rollDice(attackerWeapon.ATK);
    const processedDice = dice.map(die => ({
      ...die,
      isHit: die.value >= attackerWeapon.HTV,
      isCritical: die.value === 6
    }));

    setAttackerDice(processedDice);

    const hits = processedDice.filter(d => d.isHit).length;
    const criticals = processedDice.filter(d => d.isCritical).length;

    addToCombatLog(`${attacker.name} rolls ${processedDice.map(d => d.value).join(', ')} for attack`);
    addToCombatLog(`Hits: ${hits}, Criticals: ${criticals}`);

    if (hits > 0 || criticals > 0) {
      setPhase('save');
    } else {
      handleCombatEnd(defender);
    }

    setTimeout(() => setIsRolling(false), 1000);
  };

  const handleSaveRoll = () => {
    if (!attackerWeapon) return;
    setIsRolling(true);

    const dice = rollDice(defender.stats.DEF);
    const processedDice = dice.map(die => ({
      ...die,
      isSave: die.value >= defender.stats.SAV
    }));

    setDefenderDice(processedDice);

    const saves = processedDice.filter(d => d.isSave).length;
    addToCombatLog(`${defender.name} rolls ${processedDice.map(d => d.value).join(', ')} for save`);
    addToCombatLog(`Saves: ${saves}`);

    // Calculate damage
    const damage = Math.max(0, attackerWeapon.DMG - saves);
    if (damage > 0) {
      defender.currentWounds = Math.max(0, (defender.currentWounds ?? 0) - damage);
      addToCombatLog(`${defender.name} takes ${damage} damage`);
    }

    if (defender.currentWounds <= 0) {
      handleCombatEnd(attacker);
    } else {
      setPhase('attack');
      setAttackerDice([]);
      setDefenderDice([]);
    }

    setTimeout(() => setIsRolling(false), 1000);
  };

  const handleCombatEnd = (winner: Model) => {
    addToCombatLog(`${winner.name} wins the combat!`);
    onWinnerDeclared(winner);
  };

  const handleNewRound = () => {
    setRound(prev => prev + 1);
    setPhase('attack');
    setAttackerDice([]);
    setDefenderDice([]);
    addToCombatLog(`\n--- Round ${round + 1} ---\n`);
  };

  return (
    <CombatContainer>
      <BattleArea>
        <ModelArea>
          <RangedModelCard
            model={attacker}
            selectedWeapon={attackerWeapon}
            onWeaponSelect={onAttackerWeaponSelect}
            isSelectable={true}
          />
          {attackerWeapon && <WeaponInfo weapon={attackerWeapon} />}
        </ModelArea>
        
        <CenterArea>
          <TurnIndicator>Round {round}</TurnIndicator>
          <DiceArea>
            <RangedDiceDisplay
              diceResults={attackerDice}
              isRolling={isRolling && phase === 'attack'}
              label="Attacker Dice"
            />
            <RangedDiceDisplay
              diceResults={defenderDice}
              isRolling={isRolling && phase === 'save'}
              label="Defender Dice"
            />
            {phase === 'attack' ? (
              <DiceButton
                onClick={handleAttackRoll}
                disabled={!attackerWeapon || isRolling}
              >
                Roll Attack
              </DiceButton>
            ) : (
              <DiceButton
                onClick={handleSaveRoll}
                disabled={isRolling}
              >
                Roll Save
              </DiceButton>
            )}
          </DiceArea>
          <ButtonContainer>
            <ControlButton
              onClick={handleNewRound}
              color="#4CAF50"
            >
              New Round
            </ControlButton>
            <ControlButton
              onClick={onEndCombat}
              color="#f44336"
            >
              End Combat
            </ControlButton>
          </ButtonContainer>
        </CenterArea>

        <ModelArea $isRight>
          <RangedModelCard
            model={defender}
            selectedWeapon={defenderWeapon}
            onWeaponSelect={onDefenderWeaponSelect}
            isSelectable={false}
          />
        </ModelArea>
      </BattleArea>

      <CombatLog>
        {combatLog.map((log, index) => (
          <LogEntry key={index}>{log}</LogEntry>
        ))}
      </CombatLog>
    </CombatContainer>
  );
};