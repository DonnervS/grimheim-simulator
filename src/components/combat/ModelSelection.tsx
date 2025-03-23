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
  gap: 2rem;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: var(--primary-red);
  font-size: 3.5rem;
  font-family: 'IM Fell English', serif;
  text-align: center;
  margin-bottom: 0.5rem;
  font-weight: normal;
`;

const Subtitle = styled.p`
  color: var(--primary-light);
  font-size: 1.2rem;
  text-align: center;
  font-weight: 300;
  margin-bottom: 3rem;
`;

const TabContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 2rem;
`;

const Tab = styled.button<{ $active?: boolean }>`
  flex: 1;
  padding: 1rem;
  background: ${props => props.$active ? 'var(--primary-red)' : '#171717'};
  color: var(--primary-light);
  border: none;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${props => props.$active ? 'var(--primary-red)' : 'rgba(220, 38, 38, 0.8)'};
  }
`;

const SelectionCard = styled.div`
  background: #171717;
  padding: 2rem;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  color: var(--primary-light);
  font-size: 1.5rem;
  font-family: 'IM Fell English', serif;
  margin-bottom: 1.5rem;
  font-weight: normal;
`;

const FactionContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`;

enum Faction {
  Primordial = "Primordial",
  Beasts = "Beasts",
  Imperial = "Imperial",
  Undead = "Undead"
}

const FactionButton = styled.button<{ $active?: boolean }>`
  padding: 0.75rem 1.5rem;
  background: ${props => props.$active ? 'var(--primary-red)' : '#171717'};
  color: var(--primary-light);
  border: none;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${props => props.$active ? 'var(--primary-red)' : 'rgba(220, 38, 38, 0.8)'};
  }
`;

const SelectDropdown = styled.select`
  width: 100%;
  padding: 1rem;
  background: #171717;
  color: var(--primary-light);
  border: none;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  margin-bottom: 2rem;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem top 50%;
  background-size: 1em auto;
  padding-right: 2.5rem;
`;

const ActionButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const ActionButton = styled.button`
  background: var(--primary-red);
  color: var(--primary-light);
  border: none;
  padding: 0.85rem 2.5rem;
  font-family: 'IM Fell English', serif;
  font-size: 1.3rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #b91c1c;
  }
`;

const ModelSelection: React.FC<ModelSelectionProps> = ({
  warband,
  playerNumber,
  onModelSelect,
  selectedModel
}) => {
  // In einer echten Implementierung würden diese Zustände verwaltet werden
  const activeFaction = Faction.Primordial;
  
  return (
    <SelectionContainer>
      <div>
        <Title>Grimheim Combat Simulator</Title>
        <Subtitle>A companion app for the Grimheim tabletop skirmisher game</Subtitle>
      </div>
      
      <TabContainer>
        <Tab $active={playerNumber === 1}>Attacker</Tab>
        <Tab $active={playerNumber === 2}>Defender</Tab>
      </TabContainer>
      
      <SelectionCard>
        <SectionTitle>Faction</SectionTitle>
        <FactionContainer>
          <FactionButton $active={activeFaction === Faction.Primordial}>Primordial</FactionButton>
          <FactionButton $active={activeFaction === Faction.Beasts}>Beasts</FactionButton>
          <FactionButton $active={activeFaction === Faction.Imperial}>Imperial</FactionButton>
          <FactionButton $active={activeFaction === Faction.Undead}>Undead</FactionButton>
        </FactionContainer>
      
        <SectionTitle>Character</SectionTitle>
        <SelectDropdown value={selectedModel?.name || ''} onChange={(e) => {
          const selected = warband.find(model => model.name === e.target.value);
          if (selected) onModelSelect(selected);
        }}>
          <option value="" disabled>Select a character</option>
          {warband.map((model, index) => (
            <option key={index} value={model.name}>
              {model.name} - W: {model.stats.WND} | M: {model.stats.MOV} | DEF: {model.stats.DEF} | AP: {model.stats.AP}
            </option>
          ))}
        </SelectDropdown>
      </SelectionCard>
      
      <ActionButtonContainer>
        <ActionButton>Start Combat</ActionButton>
      </ActionButtonContainer>
    </SelectionContainer>
  );
};

export default ModelSelection;