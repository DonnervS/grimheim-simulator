import React from 'react';
import styled, { keyframes, css } from 'styled-components';

const pulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(138, 138, 255, 0.4);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(138, 138, 255, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(138, 138, 255, 0);
  }
`;

const blockPulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.4);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(76, 175, 80, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(76, 175, 80, 0);
  }
`;

const DiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const DiceBox = styled.div<{ $isActive: boolean }>`
  background: rgba(26, 26, 46, 0.9);
  border: 2px solid ${props => props.$isActive ? '#8a8aff' : '#4a4a8a'};
  border-radius: 8px;
  padding: 15px;
  transition: all 0.2s ease;

  ${props => props.$isActive && css`
    box-shadow: 0 0 10px #8a8aff;
    transform: scale(1.02);
  `}
`;

const DiceBoxHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #4a4a8a;
`;

const PlayerName = styled.div<{ $isActive: boolean }>`
  font-family: 'Press Start 2P', cursive;
  font-size: 0.9em;
  color: ${props => props.$isActive ? '#8a8aff' : '#6a6a8a'};
`;

const DiceStats = styled.div`
  font-size: 0.8em;
  color: #6a6a8a;
`;

const DiceGrid = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  padding: 10px;
  margin: -5px;
`;

const Die = styled.div<{ 
  $result: 'miss' | 'hit' | 'critical' | 'block'; 
  $isUsable: boolean; 
  $isUsed: boolean;
  $isBlockable: boolean;
  $isBlockMode: boolean;
  $isBlockDie: boolean;
  $isUpgradedCritical: boolean;
}>`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
  font-weight: bold;
  color: white;
  cursor: ${props => ((props.$isUsable && props.$result !== 'miss') || props.$isBlockable) && !props.$isUsed ? 'pointer' : 'default'};
  opacity: ${props => {
    if (props.$isUsed) return 0.5;
    if (props.$result === 'miss') return 0.5;
    return 1;
  }};
  background: ${props => {
    if (props.$isBlockable && !props.$isUsed) return '#40E0D0';
    if (props.$isBlockDie) {
      if (props.$result === 'critical') return '#40E0D0';
      if (props.$result === 'hit') return '#40E0D0';
      return '#40E0D0';
    }
    switch (props.$result) {
      case 'miss': return '#666';
      case 'hit': return '#4a4aff';
      case 'critical': return props.$isUpgradedCritical ? '#9400D3' : '#8a2be2';
    }
  }};
  transition: all 0.2s ease;
  margin: 5px;
  
  ${props => props.$isBlockable && !props.$isUsed && css`
    border: 2px solid #40E0D0;
    &:hover {
      transform: scale(1.1);
      animation: ${blockPulse} 1.5s infinite;
    }
  `}
  
  ${props => props.$isUsable && !props.$isUsed && !props.$isBlockMode && props.$result !== 'miss' && css`
    &:hover {
      transform: scale(1.1);
      animation: ${props.$isBlockDie ? blockPulse : pulse} 1.5s infinite;
    }
  `}
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
            <Die
              key={index}
              $result={die.isCritical ? 'critical' : die.isHit ? 'hit' : 'miss'}
              $isUsable={(isAttackerTurn && !die.isUsed && ((die.isHit && !die.isCritical) || die.isCritical || die.isUpgradedByCritical))}
              $isUsed={die.isUsed}
              $isBlockMode={isBlockMode || false}
              $isBlockable={(!isAttackerTurn && blockableDice.includes(index)) || false}
              $isBlockDie={die.isBlockDie}
              $isUpgradedCritical={Boolean(die.isUpgradedByCritical)}
              onClick={() => {
                if (!die.isUsed && onDieClick && ((isAttackerTurn && ((die.isHit && !die.isCritical) || die.isCritical || die.isUpgradedByCritical)) || (!isAttackerTurn && blockableDice.includes(index)))) {
                  onDieClick(index, true);
                }
              }}
            >
              {die.value}
            </Die>
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
            <Die
              key={index}
              $result={die.isCritical ? 'critical' : die.isHit ? 'hit' : 'miss'}
              $isUsable={(!isAttackerTurn && !die.isUsed && ((die.isHit && !die.isCritical) || die.isCritical || die.isUpgradedByCritical))}
              $isUsed={die.isUsed}
              $isBlockMode={isBlockMode || false}
              $isBlockable={(isAttackerTurn && blockableDice.includes(index)) || false}
              $isBlockDie={die.isBlockDie}
              $isUpgradedCritical={Boolean(die.isUpgradedByCritical)}
              onClick={() => {
                if (!die.isUsed && onDieClick && ((!isAttackerTurn && ((die.isHit && !die.isCritical) || die.isCritical || die.isUpgradedByCritical)) || (isAttackerTurn && blockableDice.includes(index)))) {
                  onDieClick(index, false);
                }
              }}
            >
              {die.value}
            </Die>
          ))}
        </DiceGrid>
      </DiceBox>
    </DiceContainer>
  );
};

export default DiceDisplay; 