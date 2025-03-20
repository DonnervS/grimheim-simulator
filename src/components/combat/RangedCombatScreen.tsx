import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Model, WeaponStats } from '../../types/gameTypes';
import { RangedModelCard } from './RangedModelCard';
import RangedDiceDisplay from './RangedDiceDisplay';

const CombatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  position: relative;
  min-height: 100%;
`;

const BattleArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  max-width: 1200px;
  margin: 20px 0;
  gap: 40px;
  position: relative;
`;

const ModelArea = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const CenterArea = styled.div`
  flex: 1;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 20px;
`;

const DiceArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  width: 100%;
`;

const TurnIndicator = styled.div`
  font-size: 1.2em;
  color: #8a8aff;
  margin-bottom: 20px;
  font-family: 'Press Start 2P', cursive;
  text-align: center;
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

  &:hover {
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
  
  &:hover {
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

  /* Customize scrollbar */
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
  const [diceResults, setDiceResults] = useState<number[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [round, setRound] = useState(1);

  useEffect(() => {
    // Initialize wounds if not set
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

  const rollDice = (amount: number): number[] => {
    return Array.from({ length: amount }, () => Math.floor(Math.random() * 6) + 1);
  };

  const handleAttackRoll = () => {
    if (!attackerWeapon) return;
    setIsRolling(true);

    const dice = rollDice(attackerWeapon.ATK);
    setDiceResults(dice);

    const hits = dice.filter(d => d >= attackerWeapon.HTV).length;
    const criticals = dice.filter(d => d === 6).length;

    addToCombatLog(`${attacker.name} rolls ${dice.join(', ')} for attack`);
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
    setDiceResults(dice);

    const saves = dice.filter(d => d >= defender.stats.SAV).length;
    addToCombatLog(`${defender.name} rolls ${dice.join(', ')} for save`);
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
    addToCombatLog(`\n--- Round ${round + 1} ---\n`);
  };

  return (
    <CombatContainer>
      <BattleArea>
        <ModelArea>
          <RangedModelCard
            model={attacker}
            onWeaponSelect={onAttackerWeaponSelect}
            selectedWeapon={attackerWeapon}
            isSelectable={true}
          />
        </ModelArea>
        
        <CenterArea>
          <DiceArea>
            <TurnIndicator>
              {phase === 'attack' ? "Attacker's Turn" : "Defender's Turn"}
            </TurnIndicator>
            {phase === 'attack' ? (
              <DiceButton onClick={handleAttackRoll} disabled={!attackerWeapon || isRolling}>
                Roll Attack
              </DiceButton>
            ) : (
              <DiceButton onClick={handleSaveRoll} disabled={isRolling}>
                Roll Save
              </DiceButton>
            )}
            {diceResults.length > 0 && (
              <RangedDiceDisplay
                diceResults={diceResults}
                isRolling={isRolling}
              />
            )}
          </DiceArea>
        </CenterArea>

        <ModelArea>
          <RangedModelCard
            model={defender}
            onWeaponSelect={onDefenderWeaponSelect}
            selectedWeapon={defenderWeapon}
            isSelectable={true}
          />
        </ModelArea>
      </BattleArea>

      <CombatLog>
        {combatLog.map((entry, index) => (
          <LogEntry key={index}>{entry}</LogEntry>
        ))}
      </CombatLog>

      <ButtonContainer>
        <ControlButton onClick={handleNewRound} color="#4a4a8a">
          New Round
        </ControlButton>
        <ControlButton onClick={onEndCombat} color="#4a4a8a">
          End Combat
        </ControlButton>
      </ButtonContainer>
    </CombatContainer>
  );
};