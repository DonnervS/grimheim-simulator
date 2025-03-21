import React from 'react';
import styled, { keyframes } from 'styled-components';

const rollAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const DiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  padding: 10px;
  background: rgba(26, 26, 46, 0.7);
  border-radius: 8px;
  min-height: 80px;
`;

export interface DieResult {
  value: number;
  isHit: boolean;
  isCritical: boolean;
  isSave: boolean;
  isShieldSave: boolean;
  isCoverSave: boolean;
  isBlocked?: boolean;
  isUsed?: boolean;
  isSelected?: boolean;
}

interface RangedDiceDisplayProps {
  diceResults: DieResult[];
  isRolling: boolean;
  label: string;
  onDieClick?: (index: number) => void;
  highlightedDice?: number[];
}

interface DiceProps {
  isRolling: boolean;
  isHit: boolean;
  isCritical: boolean;
  isSave: boolean;
  isSelected: boolean;
  isClickable?: boolean;
  isShieldSave?: boolean;
  isCoverSave?: boolean;
  isBlocked?: boolean;
  isUsed?: boolean;
}

const Dice = styled.div<DiceProps>`
  width: 50px;
  height: 50px;
  background: ${props => {
    if (props.isRolling) return '#e6e6fa';
    if (props.isBlocked || props.isUsed) return '#404040';
    if (props.isCoverSave) return '#98FB98';
    if (props.isShieldSave) return '#E8E8E8';
    if (props.isCritical && props.isSave) return '#ffd700';
    if (props.isCritical) return '#800080';
    if (props.isHit) return '#0000ff';
    if (props.isSave) return '#CD7F32';
    return '#404040';
  }};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5em;
  font-weight: bold;
  color: ${props => {
    if (props.isBlocked || props.isUsed) return '#808080';
    if (props.isShieldSave && props.isCritical) return '#ffd700';
    if (props.isCoverSave) return '#006400';
    if (!props.isSave && !props.isHit && !props.isCritical) return '#808080';
    return props.isSelected ? '#ffffff' : '#1a1a2e';
  }};
  box-shadow: ${props => {
    if (props.isBlocked || props.isUsed) return '0 2px 4px rgba(0, 0, 0, 0.2)';
    if (props.isSelected) return '0 0 15px rgba(255, 255, 255, 0.7)';
    return '0 2px 4px rgba(0, 0, 0, 0.2)';
  }};
  animation: ${props => props.isRolling ? rollAnimation : 'none'} 0.5s linear infinite;
  opacity: ${props => (props.isBlocked || props.isUsed) ? 0.5 : 1};
  cursor: ${props => props.isClickable ? 'pointer' : 'default'};
  border: ${props => {
    if (props.isBlocked || props.isUsed) return '2px solid #404040';
    if (props.isSelected) return '2px solid rgba(255, 255, 255, 0.8)';
    return props.isClickable ? '2px solid rgba(255, 255, 255, 0.2)' : 'none';
  }};
  
  &:hover {
    transform: ${props => (props.isClickable && !props.isRolling && !props.isBlocked && !props.isUsed) ? 'scale(1.05)' : 'none'};
    transition: transform 0.2s ease;
    border-color: ${props => {
      if (props.isBlocked || props.isUsed) return '#404040';
      return props.isClickable ? 'rgba(255, 255, 255, 0.8)' : 'none';
    }};
    box-shadow: ${props => {
      if (props.isBlocked || props.isUsed) return '0 2px 4px rgba(0, 0, 0, 0.2)';
      if (props.isClickable) return '0 0 15px rgba(255, 255, 255, 0.4)';
      return '0 2px 4px rgba(0, 0, 0, 0.2)';
    }};
  }
`;

const DiceLabel = styled.div`
  color: #8a8aff;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.8em;
  margin-bottom: 10px;
  text-align: center;
`;

const DiceGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`;

const RangedDiceDisplay: React.FC<RangedDiceDisplayProps> = ({
  diceResults,
  isRolling,
  label,
  onDieClick,
  highlightedDice = []
}) => {
  return (
    <DiceContainer>
      <DiceLabel>{label}</DiceLabel>
      <DiceGrid>
        {diceResults.map((result, index) => (
          <Dice
            key={index}
            isRolling={isRolling}
            isHit={result.isHit}
            isCritical={result.isCritical}
            isSave={result.isSave}
            isSelected={highlightedDice.includes(index)}
            isClickable={!!onDieClick}
            isShieldSave={result.isShieldSave}
            isCoverSave={result.isCoverSave}
            isBlocked={result.isBlocked}
            isUsed={result.isUsed}
            onClick={() => !isRolling && onDieClick && onDieClick(index)}
          >
            {result.value}
          </Dice>
        ))}
      </DiceGrid>
    </DiceContainer>
  );
};

export default RangedDiceDisplay;