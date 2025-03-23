import React from 'react';
import styled from 'styled-components';

const ActionsContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.25rem;
`;

const ActionButton = styled.button<{ isActive: boolean }>`
  padding: 0.75rem 1.5rem;
  background: ${props => props.isActive ? 'var(--accent)' : 'var(--muted)'};
  border: 1px solid var(--primary-red);
  border-radius: 2px;
  color: var(--primary-light);
  font-size: 1rem;
  cursor: ${props => props.isActive ? 'pointer' : 'not-allowed'};
  opacity: ${props => props.isActive ? 1 : 0.5};
  transition: all 0.3s ease;

  &:hover {
    transform: ${props => props.isActive ? 'translateY(-2px)' : 'none'};
    background: ${props => props.isActive ? 'rgba(220, 38, 38, 0.1)' : 'var(--muted)'};
    box-shadow: ${props => props.isActive ? '0 0 20px rgba(220, 38, 38, 0.2)' : 'none'};
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