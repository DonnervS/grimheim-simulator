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
  gap: 1.25rem;
  padding: 1.25rem;
  width: 100%;
`;

const Title = styled.h2`
  color: var(--primary-red);
  font-size: 1.5rem;
  text-shadow: 0 0 10px rgba(220, 38, 38, 0.3);
  margin: 0;
`;

const ModelList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 400px;
`;

const ModelButton = styled.button<{ isSelected: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: ${props => props.isSelected ? 'rgba(220, 38, 38, 0.1)' : 'var(--accent)'};
  border: 1px solid var(--primary-red);
  border-radius: 2px;
  color: var(--primary-light);
  cursor: pointer;
  width: 100%;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(220, 38, 38, 0.1);
    transform: translateY(-2px);
    box-shadow: 0 0 20px rgba(220, 38, 38, 0.2);
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
  gap: 0.25rem;
`;

const ModelName = styled.span`
  color: var(--primary-red);
  font-size: 1.25rem;
  text-shadow: 0 0 10px rgba(220, 38, 38, 0.3);
`;

const ModelStats = styled.span`
  font-size: 0.875rem;
  color: var(--muted-foreground);
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