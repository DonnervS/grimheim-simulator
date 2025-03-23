import React from 'react';
import styled from 'styled-components';
import { Model } from '../../types/gameTypes';

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
  gap: var(--space-5);
  padding: var(--space-5);
  width: 100%;
`;

const Title = styled.h2`
  color: var(--primary-red);
  font-size: 1.5rem;
  font-family: 'IM Fell English', serif;
  text-shadow: 0 0 10px rgba(220, 38, 38, 0.3);
  margin: 0;
  font-weight: normal;
`;

const ModelList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  width: 100%;
  max-width: 400px;
`;

const ModelButton = styled.button<{ isSelected: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-3) var(--space-4);
  background: ${props => props.isSelected ? 'rgba(220, 38, 38, 0.1)' : 'var(--accent)'};
  border: 1px solid var(--primary-red);
  border-radius: 2px;
  color: var(--primary-light);
  cursor: pointer;
  width: 100%;
  font-family: 'IM Fell English', serif;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
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

  &:hover:after {
    opacity: 1;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ModelInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-1);
`;

const ModelName = styled.span`
  color: var(--primary-red);
  font-size: 1.25rem;
  font-family: 'IM Fell English', serif;
  text-shadow: 0 0 10px rgba(220, 38, 38, 0.3);
`;

const ModelStats = styled.span`
  font-size: 0.875rem;
  font-family: 'Inter', sans-serif;
  color: var(--primary-light);
  opacity: 0.9;
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
                W: {model.stats.WND} | M: {model.stats.MOV}" | 
                DEF: {model.stats.DEF} | AP: {model.stats.AP}
              </ModelStats>
            </ModelInfo>
          </ModelButton>
        ))}
      </ModelList>
    </SelectionContainer>
  );
};

export default ModelSelection;