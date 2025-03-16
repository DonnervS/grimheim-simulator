import React from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 10px;
`;

const ActionButton = styled.button<{ action: 'strike' | 'block' }>`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.action === 'strike' ? '#ff4444' : '#4444ff'};

  &:hover {
    transform: scale(1.05);
    filter: brightness(1.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    filter: none;
  }
`;

interface ActionButtonsProps {
  onStrike: () => void;
  onBlock: () => void;
  canBlock: boolean;
  selectedDie?: { value: number; isCritical: boolean } | null;
}

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