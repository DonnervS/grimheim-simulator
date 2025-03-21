import React from 'react';
import styled, { keyframes } from 'styled-components';

const rollAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const DiceContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin: 20px 0;
  padding: 10px;
  background: rgba(26, 26, 46, 0.7);
  border-radius: 8px;
  min-height: 80px;
  align-items: center;
`;

interface DiceProps {
  isRolling: boolean;
  isHit?: boolean;
  isCritical?: boolean;
  isSave?: boolean;
  isSelected?: boolean;
  isClickable?: boolean;
}

const Dice = styled.div<DiceProps>`
  width: 50px;
  height: 50px;
  background: ${props => {
    if (props.isRolling) return '#e6e6fa';
    if (props.isSelected) return '#666666';
    if (props.isCritical && props.isSave) return '#ffd700';
    if (props.isCritical) return '#ff4500';
    if (props.isHit) return '#90ee90';
    if (props.isSave) return '#40e0d0';
    return '#ff6b6b';
  }};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5em;
  font-weight: bold;
  color: ${props => props.isSelected ? '#cccccc' : '#1a1a2e'};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  animation: ${props => props.isRolling ? rollAnimation : 'none'} 0.5s linear infinite;
  opacity: ${props => props.isSelected ? 0.7 : 1};
  cursor: ${props => props.isClickable ? 'pointer' : 'default'};
  border: ${props => props.isClickable ? '2px solid rgba(255, 255, 255, 0.2)' : 'none'};
  
  &:hover {
    transform: ${props => (props.isClickable && !props.isRolling) ? 'scale(1.05)' : 'none'};
    transition: transform 0.2s ease;
    border-color: ${props => props.isClickable ? 'rgba(255, 255, 255, 0.5)' : 'none'};
  }
`;

export interface DieResult {
  value: number;
  isHit: boolean;
  isCritical: boolean;
  isSave: boolean;
  isSelected: boolean;
}

interface RangedDiceDisplayProps {
  diceResults: DieResult[];
  isRolling: boolean;
  onDieClick?: (index: number) => void;
  label?: string;
}

const Label = styled.div`
  color: #8a8aff;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.8em;
  margin-bottom: 10px;
  text-align: center;
`;

const RangedDiceDisplay: React.FC<RangedDiceDisplayProps> = ({ 
  diceResults, 
  isRolling, 
  onDieClick,
  label 
}) => {
  return (
    <div>
      {label && <Label>{label}</Label>}
      <DiceContainer>
        {diceResults.map((result, index) => (
          <Dice 
            key={index} 
            isRolling={isRolling}
            isHit={result.isHit}
            isCritical={result.isCritical}
            isSave={result.isSave}
            isSelected={result.isSelected}
            isClickable={!!onDieClick}
            onClick={() => !isRolling && onDieClick && onDieClick(index)}
          >
            {isRolling ? '?' : result.value}
          </Dice>
        ))}
      </DiceContainer>
    </div>
  );
};

export default RangedDiceDisplay;