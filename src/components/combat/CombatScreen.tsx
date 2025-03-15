import React, { useState } from 'react';
import styled from 'styled-components';
import { Model } from '../../types/models';
import ModelSelection from './ModelSelection';
import Combat from './Combat';

interface CombatScreenProps {
  player1Warband: Model[];
  player2Warband: Model[];
  onCombatEnd: (winner: Model) => void;
  isMelee: boolean;
}

const CombatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const SelectionPhase = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 2rem;
`;

const StartButton = styled.button<{ isEnabled: boolean }>`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background: ${props => props.isEnabled ? '#2c5282' : '#1a365d'};
  border: 2px solid ${props => props.isEnabled ? '#4299e1' : '#2b6cb0'};
  border-radius: 0.5rem;
  color: white;
  cursor: ${props => props.isEnabled ? 'pointer' : 'not-allowed'};
  opacity: ${props => props.isEnabled ? '1' : '0.5'};
  transition: all 0.2s;

  &:hover {
    background: ${props => props.isEnabled ? '#2a4365' : '#1a365d'};
  }
`;

const CombatScreen: React.FC<CombatScreenProps> = ({
  player1Warband,
  player2Warband,
  onCombatEnd,
  isMelee
}) => {
  const [phase, setPhase] = useState<'selection' | 'combat'>('selection');
  const [selectedModel1, setSelectedModel1] = useState<Model | undefined>();
  const [selectedModel2, setSelectedModel2] = useState<Model | undefined>();

  const startCombat = () => {
    if (selectedModel1 && selectedModel2) {
      setPhase('combat');
    }
  };

  if (phase === 'selection') {
    return (
      <CombatContainer>
        <SelectionPhase>
          <ModelSelection
            warband={player1Warband}
            playerNumber={1}
            onModelSelect={setSelectedModel1}
            selectedModel={selectedModel1}
          />
          <ModelSelection
            warband={player2Warband}
            playerNumber={2}
            onModelSelect={setSelectedModel2}
            selectedModel={selectedModel2}
          />
        </SelectionPhase>
        <StartButton
          isEnabled={!!selectedModel1 && !!selectedModel2}
          onClick={startCombat}
          disabled={!selectedModel1 || !selectedModel2}
        >
          Kampf Starten
        </StartButton>
      </CombatContainer>
    );
  }

  return (
    <Combat
      player1Model={selectedModel1!}
      player2Model={selectedModel2!}
      onCombatEnd={onCombatEnd}
    />
  );
};

export default CombatScreen;