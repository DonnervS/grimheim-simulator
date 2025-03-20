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
}

const Dice = styled.div<DiceProps>`
  width: 50px;
  height: 50px;
  background: #e6e6fa;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5em;
  font-weight: bold;
  color: #1a1a2e;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  animation: ${props => props.isRolling ? rollAnimation : 'none'} 0.5s linear infinite;
  
  &:hover {
    transform: ${props => props.isRolling ? 'none' : 'scale(1.1)'};
    transition: transform 0.2s ease;
  }
`;

interface RangedDiceDisplayProps {
  diceResults: number[];
  isRolling: boolean;
}

const RangedDiceDisplay: React.FC<RangedDiceDisplayProps> = ({ diceResults, isRolling }) => {
  return (
    <DiceContainer>
      {diceResults.map((result, index) => (
        <Dice key={index} isRolling={isRolling}>
          {isRolling ? '?' : result}
        </Dice>
      ))}
    </DiceContainer>
  );
};

export default RangedDiceDisplay;