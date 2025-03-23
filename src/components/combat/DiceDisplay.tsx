import React from 'react';
import styled, { keyframes } from 'styled-components';

const rollDice = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const DiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
`;

const DiceBox = styled.div<{ $isActive: boolean }>`
  background: var(--card);
  border: 1px solid ${props => props.$isActive ? 'var(--primary-red)' : 'var(--border)'};
  border-radius: 2px;
  padding: 1.25rem;
  transition: all 0.3s ease;
  box-shadow: ${props => props.$isActive ? '0 0 20px rgba(220, 38, 38, 0.2)' : 'none'};
  transform: ${props => props.$isActive ? 'translateY(-2px)' : 'none'};
`;

const DiceBoxHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--border);
`;

const PlayerName = styled.div<{ $isActive: boolean }>`
  font-family: 'IM Fell English', serif;
  font-size: 1.25rem;
  color: ${props => props.$isActive ? 'var(--primary-red)' : 'var(--muted-foreground)'};
  text-shadow: ${props => props.$isActive ? '0 0 10px rgba(220, 38, 38, 0.3)' : 'none'};
`;

const DiceStats = styled.div`
  font-size: 0.875rem;
  color: var(--muted-foreground);
`;

const DiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(48px, 1fr));
  gap: 1rem;
  justify-items: center;
  padding: 0.75rem;
`;

const Dice = styled.div<{ $isHit?: boolean; $isCrit?: boolean; $isBlock?: boolean; $isRolling?: boolean }>`
  width: 48px;
  height: 48px;
  background: ${props => {
    if (props.$isCrit) return 'rgba(220, 38, 38, 0.4)';
    if (props.$isHit) return 'rgba(220, 38, 38, 0.2)';
    if (props.$isBlock) return 'rgba(37, 99, 235, 0.2)';
    return 'var(--card)';
  }};
  border: 1px solid ${props => {
    if (props.$isCrit) return 'var(--blood-red)';
    if (props.$isHit) return 'var(--primary-red)';
    if (props.$isBlock) return 'var(--info)';
    return 'var(--border)';
  }};
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: ${props => props.$isCrit ? 'var(--blood-red)' : 'var(--primary-light)'};
  transition: all 0.3s ease;
  cursor: pointer;
  animation: ${props => props.$isRolling ? `${rollDice} 0.6s ease-in-out` : 'none'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 20px rgba(220, 38, 38, 0.2);
  }
`;

export interface DieResult {
  value: number;
  isHit: boolean;
  isCritical: boolean;
  isUsed: boolean;
  isBlockDie: boolean;
  isUpgradedByCritical?: boolean;
}

interface DiceDisplayProps {
  attackerName: string;
  defenderName: string;
  attackerDice: DieResult[];
  defenderDice: DieResult[];
  isAttackerTurn: boolean;
  isBlockMode?: boolean;
  blockableDice?: number[];
  onDieClick?: (index: number, isAttacker: boolean) => void;
}

const DiceDisplay: React.FC<DiceDisplayProps> = ({
  attackerName,
  defenderName,
  attackerDice,
  defenderDice,
  isAttackerTurn,
  isBlockMode = false,
  blockableDice = [],
  onDieClick
}) => {
  const getStats = (dice: DieResult[]) => {
    const hits = dice.filter(d => d.isHit && !d.isCritical && !d.isUsed).length;
    const crits = dice.filter(d => d.isCritical && !d.isUsed).length;
    const upgradedCrits = dice.filter(d => d.isUpgradedByCritical && !d.isUsed).length;
    const blocks = dice.filter(d => d.isBlockDie && (d.isHit || d.isCritical) && !d.isUsed).length;
    return `${hits} Hits, ${crits} Critical (${upgradedCrits} Upgraded), ${blocks} Block`;
  };

  return (
    <DiceContainer>
      <DiceBox $isActive={isAttackerTurn}>
        <DiceBoxHeader>
          <PlayerName $isActive={isAttackerTurn}>{attackerName}</PlayerName>
          <DiceStats>{getStats(attackerDice)}</DiceStats>
        </DiceBoxHeader>
        <DiceGrid>
          {attackerDice.map((die, index) => (
            <Dice
              key={index}
              $isHit={die.isHit}
              $isCrit={die.isCritical}
              $isBlock={!isAttackerTurn && blockableDice.includes(index)}
              $isRolling={false}
              onClick={() => {
                if (!die.isUsed && onDieClick && ((isAttackerTurn && ((die.isHit && !die.isCritical) || die.isCritical || die.isUpgradedByCritical)) || (!isAttackerTurn && blockableDice.includes(index)))) {
                  onDieClick(index, true);
                }
              }}
            >
              {die.value}
            </Dice>
          ))}
        </DiceGrid>
      </DiceBox>

      <DiceBox $isActive={!isAttackerTurn}>
        <DiceBoxHeader>
          <PlayerName $isActive={!isAttackerTurn}>{defenderName}</PlayerName>
          <DiceStats>{getStats(defenderDice)}</DiceStats>
        </DiceBoxHeader>
        <DiceGrid>
          {defenderDice.map((die, index) => (
            <Dice
              key={index}
              $isHit={die.isHit}
              $isCrit={die.isCritical}
              $isBlock={isAttackerTurn && blockableDice.includes(index)}
              $isRolling={false}
              onClick={() => {
                if (!die.isUsed && onDieClick && ((!isAttackerTurn && ((die.isHit && !die.isCritical) || die.isCritical || die.isUpgradedByCritical)) || (isAttackerTurn && blockableDice.includes(index)))) {
                  onDieClick(index, false);
                }
              }}
            >
              {die.value}
            </Dice>
          ))}
        </DiceGrid>
      </DiceBox>
    </DiceContainer>
  );
};

export default DiceDisplay; 