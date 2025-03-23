import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { CombatScreen } from '../components/combat/CombatScreen';
import { 
  savageBrute, 
  bruteWithGreataxe, 
  fighter, 
  warhound, 
  gunslingerWithPistol, 
  marksmanWithCrossbow, 
  witchhunter,
  savageSorcererLord,
  savageFighterWithSpear,
  savageFighterWithAxes,
  zombieWithKnife,
  zombieWithHalberd,
  zombieWithElectroCoil,
  zombieWithKnifeAndElectroCoil,
  zombieWithClubAndElectroCoil,
  necromancerWithStaff
} from '../data/testModels';
import { Model, WeaponStats } from '../types/gameTypes';

const TestContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: var(--primary-dark);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  color: var(--primary-light);
  font-family: 'IM Fell English', serif;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: var(--primary-dark);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--primary-red);
    border-radius: 2px;
  }
`;

const CombatContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  min-height: calc(100vh - 4rem);
  background: var(--card);
  border-radius: 2px;
  overflow: visible;
  margin-bottom: 2rem;
`;

const SelectionContainer = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 2rem;
`;

const FactionButton = styled.button<{ $isSelected: boolean }>`
  background: ${props => props.$isSelected ? '#3D0F0F' : 'var(--accent)'};
  color: var(--primary-light);
  padding: 1rem 2rem;
  border-radius: 2px;
  cursor: pointer;
  font-family: 'IM Fell English', serif;
  font-size: 1.25rem;
  min-width: 200px;
  border: none;
`;

const FactionGrid = styled.div`
  display: flex;
  gap: 1.25rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const SelectionStep = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  width: 100%;
`;

const ModelSelect = styled.select`
  background: var(--accent);
  color: var(--primary-light);
  border: none;
  border-radius: 2px;
  padding: 0.75rem;
  font-family: 'IM Fell English', serif;
  font-size: 1rem;
  cursor: pointer;
  width: 300px;
  appearance: none;
  position: relative;
  text-align: center;

  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.7em top 50%;
  background-size: 1em auto;
  padding-right: 2.5rem;

  &:focus {
    outline: none;
  }

  option {
    background: var(--accent);
    padding: 0.75rem;
  }
`;

const SelectionBox = styled.div`
  background: var(--card);
  border-radius: 2px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;

const StartButton = styled.button`
  background: var(--primary-red);
  color: var(--primary-light);
  padding: 1rem 2rem;
  border-radius: 2px;
  cursor: pointer;
  font-family: 'IM Fell English', serif;
  font-size: 1.25rem;
  margin-top: 1.25rem;
  border: none;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Title = styled.h2`
  color: var(--primary-red);
  font-size: 2rem;
  margin-bottom: 0.75rem;
  text-align: center;
  font-weight: normal;
  letter-spacing: 0.05em;
`;

const SubTitle = styled.h3`
  color: var(--primary-light);
  font-size: 1.25rem;
  margin-bottom: 1.25rem;
  text-align: center;
  font-weight: normal;
  letter-spacing: 0.05em;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1.25rem;
  margin-top: 1.25rem;
`;

const ActionButton = styled(StartButton)`
  min-width: 200px;
`;

export const CombatTestScreen: React.FC = () => {
  const [winner, setWinner] = useState<Model | null>(null);
  const [selectedAttacker, setSelectedAttacker] = useState<Model | null>(null);
  const [selectedDefender, setSelectedDefender] = useState<Model | null>(null);
  const [selectedAttackerWeapon, setSelectedAttackerWeapon] = useState<WeaponStats | null>(null);
  const [selectedDefenderWeapon, setSelectedDefenderWeapon] = useState<WeaponStats | null>(null);
  const [combatStarted, setCombatStarted] = useState(false);
  const [attackerFaction, setAttackerFaction] = useState<string>('');
  const [defenderFaction, setDefenderFaction] = useState<string>('');

  const availableModels = [
    // Beasts
    savageBrute,
    fighter,
    // Imperial
    bruteWithGreataxe,
    warhound,
    gunslingerWithPistol,
    marksmanWithCrossbow,
    witchhunter,
    // Primordial
    savageSorcererLord,
    savageFighterWithSpear,
    savageFighterWithAxes,
    // Undead
    zombieWithKnife,
    zombieWithHalberd,
    zombieWithElectroCoil,
    zombieWithKnifeAndElectroCoil,
    zombieWithClubAndElectroCoil,
    necromancerWithStaff
  ];

  const factions = useMemo(() => {
    return Array.from(new Set(availableModels.map(model => model.faction)));
  }, []);

  const modelsByFaction = useMemo(() => {
    return availableModels.reduce((acc, model) => {
      if (!acc[model.faction]) {
        acc[model.faction] = [];
      }
      acc[model.faction].push(model);
      return acc;
    }, {} as Record<string, Model[]>);
  }, []);

  const handleCombatEnd = (winner: Model) => {
    setWinner(winner);
    alert(`Combat ended! Winner: ${winner.name}`);
  };

  const resetSelection = () => {
    setSelectedAttacker(null);
    setSelectedDefender(null);
    setSelectedAttackerWeapon(null);
    setSelectedDefenderWeapon(null);
    setAttackerFaction('');
    setDefenderFaction('');
    setCombatStarted(false);
    setWinner(null);
  };

  const startNewRound = () => {
    if (selectedAttacker && selectedDefender) {
      setSelectedAttackerWeapon(null);
      setSelectedDefenderWeapon(null);
      setCombatStarted(false);
      setTimeout(() => setCombatStarted(true), 0);
    }
  };

  const handleAttackerSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    const model = availableModels.find(m => m.id === selectedId);
    setSelectedAttacker(model || null);
  };

  const handleDefenderSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    const model = availableModels.find(m => m.id === selectedId);
    setSelectedDefender(model || null);
  };

  return (
    <TestContainer>
      {combatStarted && selectedAttacker && selectedDefender ? (
        <>
          <CombatContainer>
            <CombatScreen
              attacker={selectedAttacker}
              defender={selectedDefender}
              onWinnerDeclared={handleCombatEnd}
              selectedAttackerWeapon={selectedAttackerWeapon}
              selectedDefenderWeapon={selectedDefenderWeapon}
              onAttackerWeaponSelect={setSelectedAttackerWeapon}
              onDefenderWeaponSelect={setSelectedDefenderWeapon}
            />
          </CombatContainer>
          <ButtonContainer>
            <ActionButton onClick={resetSelection}>
              End Combat
            </ActionButton>
            <ActionButton onClick={startNewRound}>
              New Round
            </ActionButton>
          </ButtonContainer>
        </>
      ) : (
        <SelectionContainer>
          <Title>Combat Setup</Title>
          
          <SelectionBox>
            <SubTitle>Attacker Selection</SubTitle>
            <FactionGrid>
              {factions.map((faction) => (
                <FactionButton
                  key={`attacker-${faction}`}
                  onClick={() => setAttackerFaction(faction)}
                  $isSelected={attackerFaction === faction}
                >
                  {faction}
                </FactionButton>
              ))}
            </FactionGrid>
            
            {attackerFaction && (
              <ModelSelect
                value={selectedAttacker?.id || ''}
                onChange={handleAttackerSelect}
              >
                <option value="">Select Model</option>
                {modelsByFaction[attackerFaction]?.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </ModelSelect>
            )}
          </SelectionBox>

          <SelectionBox>
            <SubTitle>Defender Selection</SubTitle>
            <FactionGrid>
              {factions.map((faction) => (
                <FactionButton
                  key={`defender-${faction}`}
                  onClick={() => setDefenderFaction(faction)}
                  $isSelected={defenderFaction === faction}
                >
                  {faction}
                </FactionButton>
              ))}
            </FactionGrid>
            
            {defenderFaction && (
              <ModelSelect
                value={selectedDefender?.id || ''}
                onChange={handleDefenderSelect}
              >
                <option value="">Select Model</option>
                {modelsByFaction[defenderFaction]?.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </ModelSelect>
            )}
          </SelectionBox>

          <StartButton
            onClick={() => setCombatStarted(true)}
            disabled={!selectedAttacker || !selectedDefender}
          >
            Start Combat
          </StartButton>
        </SelectionContainer>
      )}
    </TestContainer>
  );
};

export default CombatTestScreen;