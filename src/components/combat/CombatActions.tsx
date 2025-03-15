import React from 'react';
import styled from 'styled-components';

const ActionsContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
`;

const ActionButton = styled.button<{ isActive: boolean }>`
  padding: 10px 20px;
  background: ${props => props.isActive ? '#8a8aff' : '#4a4a8a'};
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 1em;
  cursor: ${props => props.isActive ? 'pointer' : 'not-allowed'};
  opacity: ${props => props.isActive ? 1 : 0.5};
  transition: all 0.2s ease;

  &:hover {
    transform: ${props => props.isActive ? 'scale(1.05)' : 'none'};
    background: ${props => props.isActive ? '#7a7aef' : '#4a4a8a'};
  }
`;

interface CombatActionsProps {
  onStrike: () => void;
  onBlock: () => void;
  canStrike: boolean;
  canBlock: boolean;
}

const CombatActions: React.FC<CombatActionsProps> = ({
  onStrike,
  onBlock,
  canStrike,
  canBlock
}) => {
  return (
    <ActionsContainer>
      <ActionButton isActive={canStrike} onClick={onStrike}>
        Strike
      </ActionButton>
      <ActionButton isActive={canBlock} onClick={onBlock}>
        Block
      </ActionButton>
    </ActionsContainer>
  );
};

export default CombatActions;