import React from 'react';
import styled from 'styled-components';
import { Model } from '../../types/models';

interface ModelSelectionProps {
  warband: Model[];
  playerNumber: number;
  onModelSelect: (model: Model) => void;
  selectedModel?: Model;
}

const SelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  width: 100%;
`;

const Title = styled.h2`
  color: #e0e0e0;
  margin: 0;
`;

const ModelList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  max-width: 400px;
`;

const ModelButton = styled.button<{ isSelected: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: ${props => props.isSelected ? '#2c5282' : '#1a365d'};
  border: 2px solid ${props => props.isSelected ? '#4299e1' : '#2b6cb0'};
  border-radius: 0.5rem;
  color: white;
  cursor: pointer;
  width: 100%;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.isSelected ? '#2c5282' : '#2a4365'};
    border-color: #4299e1;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ModelInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ModelName = styled.span`
  font-weight: bold;
  font-size: 1.1rem;
`;

const ModelStats = styled.span`
  font-size: 0.9rem;
  color: #a0aec0;
`;

const ModelSelection: React.FC<ModelSelectionProps> = ({
  warband,
  playerNumber,
  onModelSelect,
  selectedModel
}) => {
  return (
    <SelectionContainer>
      <Title>Spieler {playerNumber} - Modell auswählen</Title>
      <ModelList>
        {warband.map((model, index) => (
          <ModelButton
            key={index}
            isSelected={selectedModel?.name === model.name}
            onClick={() => onModelSelect(model)}
          >
            <ModelInfo>
              <ModelName>{model.name}</ModelName>
              <ModelStats>
                W: {model.stats.wounds} | M: {model.stats.movement}" | 
                WS: {model.stats.weaponSkill} | BS: {model.stats.ballisticSkill}
              </ModelStats>
            </ModelInfo>
          </ModelButton>
        ))}
      </ModelList>
    </SelectionContainer>
  );
};

export default ModelSelection;