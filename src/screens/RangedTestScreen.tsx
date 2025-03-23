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
  background: var(--primary-dark);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  color: var(--primary-light);
  font-family: 'IM Fell English', serif;
  overflow-y: auto;
  overflow-x: hidden;

  /* Customize scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: var(--primary-dark);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--primary-red);
  }
`;

const CombatContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  min-height: calc(100vh - 4rem);
  background: var(--card);
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

  const handleModelSelect = (modelId: string, isAttacker: boolean) => {
    const model = (isAttacker ? availableAttackers : availableDefenders)
      .find(m => m.id === modelId);
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
                    value={selectedAttacker?.id || ''}
                    onChange={(e) => handleModelSelect(e.target.value, true)}
                  >
                    <option value="">Select a fighter...</option>
                    {attackersByFaction[attackerFaction].map(model => (
                      <option key={model.id} value={model.id}>
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
                    value={selectedDefender?.id || ''}
                    onChange={(e) => handleModelSelect(e.target.value, false)}
                  >
                    <option value="">Select a fighter...</option>
                    {defendersByFaction[defenderFaction].map(model => (
                      <option key={model.id} value={model.id}>
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
            onAttackerWeaponSelect={(weapon: WeaponStats) => setSelectedAttackerWeapon(weapon)}
            onDefenderWeaponSelect={(weapon: WeaponStats) => setSelectedDefenderWeapon(weapon)}
            onWinnerDeclared={setWinner}
            onEndCombat={handleEndCombat}
          />
        )}
      </CombatContainer>
    </TestContainer>
  );
}; 