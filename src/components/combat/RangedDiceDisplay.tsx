import React from 'react';
import styled, { keyframes, css } from 'styled-components';

const roll = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const DiceContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
  min-height: 60px;
`;

const Die = styled.div<{ $isRolling: boolean }>`
  width: 40px;
  height: 40px;
  background: #8a8aff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
  font-weight: bold;
  color: white;
  margin: 5px;
  ${props => props.$isRolling && css`
    animation: ${roll} 0.5s linear infinite;
  `}
  transition: all 0.2s ease;

  &:hover {
    transform: ${props => props.$isRolling ? 'none' : 'scale(1.1)'};
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
        <Die key={index} $isRolling={isRolling}>
          {isRolling ? '?' : result}
        </Die>
      ))}
    </DiceContainer>
  );
};

export default RangedDiceDisplay;