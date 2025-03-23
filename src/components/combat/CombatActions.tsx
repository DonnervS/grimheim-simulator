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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: var(--accent);
  color: var(--primary-light);
  border-radius: 2px;
  padding: 0.625rem 1rem;
  font-family: 'IM Fell English', serif;
  font-size: 1rem;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
  border: none;
  min-width: 120px;
  min-height: 2.5rem;

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
  
  &:hover:not(:disabled) {
    background: rgba(220, 38, 38, 0.9);
  }
`;

const BlockButton = styled(ActionButton)`
  background: var(--secondary-blue);
  
  &:hover:not(:disabled) {
    background: rgba(59, 130, 246, 0.9);
  }
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