import React from 'react';
import styled from 'styled-components';
import { DieResult } from './DiceDisplay';

interface ActionButtonsProps {
  onStrike: () => void;
  onBlock: () => void;
  canBlock: boolean;
  selectedDie: DieResult | null;
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 10px 0;
`;

const ActionButton = styled.button<{ action: 'strike' | 'block' }>`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${props => props.action === 'strike' ? '#ff4444' : '#40E0D0'};
  color: white;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &:hover:not(:disabled) {
    transform: scale(1.05);
  }
`;

const ActionButtons: React.FC<ActionButtonsProps> = ({ onStrike, onBlock, canBlock, selectedDie }) => {
  return (
    <ButtonContainer>
      <ActionButton
        action="strike"
        onClick={onStrike}
        disabled={!selectedDie}
      >
        Strike ({selectedDie?.isCritical ? 'CRIT' : 'Normal'})
      </ActionButton>
      <ActionButton
        action="block"
        onClick={onBlock}
        disabled={!selectedDie || !canBlock}
      >
        Block
      </ActionButton>
    </ButtonContainer>
  );
};

export default ActionButtons; 