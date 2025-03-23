import React from 'react';
import styled from 'styled-components';
import { WeaponStats } from '../../types/gameTypes';

interface CombatActionsProps {
  onAttack: () => void;
  onBlock: () => void;
  onSkip: () => void;
  onBlockOnly: () => void;
  canAttack: boolean;
  canBlock: boolean;
  canBlockOnly: boolean;
  canSkip: boolean;
  selectedWeapon: WeaponStats | null;
}

const ActionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1.25rem;
  justify-content: center;
`;

const ActionButton = styled.button`
  background: var(--accent);
  color: var(--primary-light);
  padding: 0.75rem 1.5rem;
  border-radius: 2px;
  font-family: 'IM Fell English', serif;
  font-size: 1rem;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  min-width: 120px;
  border: none;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 0 20px rgba(220, 38, 38, 0.2);
  }

  &:after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(220, 38, 38, 0.1);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover:after:not(:disabled) {
    opacity: 1;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const AttackButton = styled(ActionButton)`
  background: var(--primary-red);
`;

const BlockButton = styled(ActionButton)`
  background: var(--secondary-blue);
`;

export const CombatActions: React.FC<CombatActionsProps> = ({
  onAttack,
  onBlock,
  onSkip,
  onBlockOnly,
  canAttack,
  canBlock,
  canBlockOnly,
  canSkip,
  selectedWeapon
}) => {
  return (
    <ActionsContainer>
      <AttackButton 
        onClick={onAttack} 
        disabled={!canAttack || !selectedWeapon}
      >
        Attack
      </AttackButton>
      <BlockButton 
        onClick={onBlock} 
        disabled={!canBlock || !selectedWeapon}
      >
        Attack + Block
      </BlockButton>
      <BlockButton 
        onClick={onBlockOnly} 
        disabled={!canBlockOnly}
      >
        Block Only
      </BlockButton>
      <ActionButton 
        onClick={onSkip} 
        disabled={!canSkip}
      >
        Skip
      </ActionButton>
    </ActionsContainer>
  );
};