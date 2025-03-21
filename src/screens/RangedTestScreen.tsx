import React, { useState } from 'react';
import styled from 'styled-components';
import { RangedCombatScreen } from '../components/combat/RangedCombatScreen';
import { Model, WeaponStats } from '../types/gameTypes';
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

export const RangedTestScreen: React.FC = () => {
  const [winner, setWinner] = useState<Model | null>(null);
  const [selectedAttacker, setSelectedAttacker] = useState<Model | null>(null);
  const [selectedDefender, setSelectedDefender] = useState<Model | null>(null);
  const [selectedAttackerWeapon, setSelectedAttackerWeapon] = useState<WeaponStats | null>(null);
  const [selectedDefenderWeapon, setSelectedDefenderWeapon] = useState<WeaponStats | null>(null);
  const [combatStarted, setCombatStarted] = useState(false);
  const [attackerFaction, setAttackerFaction] = useState<string>('');
  const [defenderFaction, setDefenderFaction] = useState<string>('');

  const allModels = [
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
  ];

  // Filter models that have ranged weapons for attackers
  const availableAttackers = allModels.filter(model => 
    model.weapons.some(weapon => weapon.weaponType === 'range')
  );

  // All models can be defenders
  const availableDefenders = allModels;

  const attackerFactions = Array.from(new Set(availableAttackers.map(model => model.faction)));
  const defenderFactions = Array.from(new Set(availableDefenders.map(model => model.faction)));

  const attackersByFaction = availableAttackers.reduce((acc, model) => {
    if (!acc[model.faction]) {
      acc[model.faction] = [];
    }
    acc[model.faction].push(model);
    return acc;
  }, {} as Record<string, Model[]>);

  const defendersByFaction = availableDefenders.reduce((acc, model) => {
    if (!acc[model.faction]) {
      acc[model.faction] = [];
    }
    acc[model.faction].push(model);
    return acc;
  }, {} as Record<string, Model[]>);

  const handleStartCombat = () => {
    if (selectedAttacker && selectedDefender) {
      // Reset models to initial state
      selectedAttacker.currentWounds = selectedAttacker.stats.WND;
      selectedDefender.currentWounds = selectedDefender.stats.WND;
      setCombatStarted(true);
    }
  };

  const handleEndCombat = () => {
    setWinner(null);
    setSelectedAttackerWeapon(null);
    setSelectedDefenderWeapon(null);
    setCombatStarted(false);
    
    // Reset models to initial state
    if (selectedAttacker) {
      selectedAttacker.currentWounds = selectedAttacker.stats.WND;
    }
    if (selectedDefender) {
      selectedDefender.currentWounds = selectedDefender.stats.WND;
    }
  };

  const handleModelSelect = (modelName: string, isAttacker: boolean) => {
    const model = (isAttacker ? availableAttackers : availableDefenders)
      .find(m => m.name === modelName);
    if (model) {
      if (isAttacker) {
        setSelectedAttacker({ ...model });
      } else {
        setSelectedDefender({ ...model });
      }
    }
  };

  return (
    <TestContainer>
      <CombatContainer>
        {!combatStarted ? (
          <SelectionContainer>
            <Title>Ranged Combat Test</Title>
            <SubTitle>Select two fighters to test ranged combat mechanics</SubTitle>

            <SelectionStep>
              <Title>Select Attacker (with Ranged Weapons)</Title>
              <FactionGrid>
                {attackerFactions.map(faction => (
                  <FactionButton
                    key={faction}
                    $isSelected={attackerFaction === faction}
                    onClick={() => setAttackerFaction(faction)}
                  >
                    {faction}
                  </FactionButton>
                ))}
              </FactionGrid>
              {attackerFaction && (
                <SelectionBox>
                  <ModelSelect
                    value={selectedAttacker?.name || ''}
                    onChange={(e) => handleModelSelect(e.target.value, true)}
                  >
                    <option value="">Select a fighter...</option>
                    {attackersByFaction[attackerFaction].map(model => (
                      <option key={model.name} value={model.name}>
                        {model.name}
                      </option>
                    ))}
                  </ModelSelect>
                </SelectionBox>
              )}
            </SelectionStep>

            <SelectionStep>
              <Title>Select Defender</Title>
              <FactionGrid>
                {defenderFactions.map(faction => (
                  <FactionButton
                    key={faction}
                    $isSelected={defenderFaction === faction}
                    onClick={() => setDefenderFaction(faction)}
                  >
                    {faction}
                  </FactionButton>
                ))}
              </FactionGrid>
              {defenderFaction && (
                <SelectionBox>
                  <ModelSelect
                    value={selectedDefender?.name || ''}
                    onChange={(e) => handleModelSelect(e.target.value, false)}
                  >
                    <option value="">Select a fighter...</option>
                    {defendersByFaction[defenderFaction].map(model => (
                      <option key={model.name} value={model.name}>
                        {model.name}
                      </option>
                    ))}
                  </ModelSelect>
                </SelectionBox>
              )}
            </SelectionStep>

            <StartButton
              onClick={handleStartCombat}
              disabled={!selectedAttacker || !selectedDefender}
            >
              Start Combat
            </StartButton>
          </SelectionContainer>
        ) : (
          <RangedCombatScreen
            attacker={selectedAttacker!}
            defender={selectedDefender!}
            attackerWeapon={selectedAttackerWeapon}
            defenderWeapon={selectedDefenderWeapon}
            onAttackerWeaponSelect={setSelectedAttackerWeapon}
            onDefenderWeaponSelect={setSelectedDefenderWeapon}
            onWinnerDeclared={setWinner}
            onEndCombat={handleEndCombat}
          />
        )}
      </CombatContainer>
    </TestContainer>
  );
}; 