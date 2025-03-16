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
  background: #1a1a2e;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  color: #e6e6fa;
  font-family: 'Press Start 2P', cursive;
  overflow-y: auto;
  overflow-x: hidden;

  /* Customize scrollbar */
  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: #1a1a2e;
  }

  &::-webkit-scrollbar-thumb {
    background: #4a4a8a;
    border-radius: 6px;
    border: 3px solid #1a1a2e;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #6a6aaa;
  }
`;

const CombatContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  min-height: calc(100vh - 40px);
  background: rgba(42, 42, 74, 0.8);
  border-radius: 8px;
  border: 2px solid #4a4a8a;
  overflow: visible;
  margin-bottom: 20px;
`;

const SelectionContainer = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  margin-bottom: 20px;
  padding: 20px;
`;

const FactionButton = styled.button<{ $isSelected: boolean }>`
  background: ${props => props.$isSelected ? '#8a8aff' : '#4a4a8a'};
  color: #e6e6fa;
  border: none;
  border-radius: 8px;
  padding: 15px 30px;
  font-family: 'Press Start 2P', cursive;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 200px;

  &:hover {
    transform: scale(1.05);
    background: ${props => props.$isSelected ? '#9a9aff' : '#5a5a9a'};
  }
`;

const FactionGrid = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
`;

const SelectionStep = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

const ModelSelect = styled.select`
  background: #4a4a8a;
  color: #e6e6fa;
  border: 2px solid #8a8aff;
  border-radius: 4px;
  padding: 12px;
  font-family: 'Press Start 2P', cursive;
  font-size: 12px;
  cursor: pointer;
  width: 300px;
  appearance: none;
  position: relative;
  text-align: center;

  /* Custom arrow */
  background-image: linear-gradient(45deg, transparent 50%, #e6e6fa 50%),
                    linear-gradient(135deg, #e6e6fa 50%, transparent 50%);
  background-position: calc(100% - 20px) calc(1em + 2px),
                       calc(100% - 15px) calc(1em + 2px);
  background-size: 5px 5px,
                  5px 5px;
  background-repeat: no-repeat;

  &:focus {
    outline: none;
    border-color: #9a9aff;
    box-shadow: 0 0 10px rgba(138, 138, 255, 0.3);
  }

  option {
    background: #2a2a4a;
    padding: 12px;
  }
`;

const SelectionBox = styled.div`
  background: rgba(42, 42, 74, 0.8);
  border: 2px solid #4a4a8a;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: 100%;
`;

const StartButton = styled.button`
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 15px 30px;
  font-family: 'Press Start 2P', cursive;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 20px;

  &:hover {
    transform: scale(1.05);
    background: #45a049;
  }

  &:disabled {
    background: #666;
    cursor: not-allowed;
    transform: none;
  }
`;

const Title = styled.h2`
  color: #8a8aff;
  margin-bottom: 10px;
  text-align: center;
`;

const SubTitle = styled.h3`
  color: #e6e6fa;
  font-size: 14px;
  margin-bottom: 20px;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
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