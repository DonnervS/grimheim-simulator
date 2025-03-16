import React from 'react';
import styled from 'styled-components';
import { Model, WeaponStats } from '../../types/gameTypes';

// Create a local fallback weapon
const fallbackFists: WeaponStats = {
  name: "Unarmed",
  RNG: 1,    // 1"
  ATK: 2,    // 2 dice
  HTV: 5,    // 5+
  DMG: 1,    // 1 damage
  CRT: 1,    // 1 critical damage
  rules: "",
  weaponType: "close"
};

const Card = styled.div<{ $isActive: boolean }>`
  background: rgba(26, 26, 46, 0.9);
  border-radius: 8px;
  border: 2px solid ${props => props.$isActive ? '#8a8aff' : '#4a4a8a'};
  padding: 20px;
  width: 250px;
  color: #e6e6fa;
  transition: all 0.2s ease;

  ${props => props.$isActive && `
    box-shadow: 0 0 10px #8a8aff;
    transform: scale(1.02);
  `}
`;

const ModelName = styled.h2`
  margin: 0 0 10px 0;
  font-size: 1.2em;
  color: #8a8aff;
  font-family: 'Press Start 2P', cursive;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin: 10px 0;
`;

const StatBox = styled.div`
  background: #444;
  border-radius: 4px;
  padding: 8px;
  text-align: center;
`;

const StatLabel = styled.div`
  font-size: 0.8em;
  color: #8a8aff;
  margin-bottom: 4px;
`;

const StatValue = styled.div<{ $isWounds?: boolean; $woundPercentage?: number }>`
  font-size: 1.2em;
  font-weight: bold;
  color: ${props => {
    if (props.$isWounds && props.$woundPercentage !== undefined) {
      if (props.$woundPercentage > 50) return '#4CAF50';
      if (props.$woundPercentage > 25) return '#FFA500';
      return '#FF4444';
    }
    return 'inherit';
  }};
`;

const WeaponList = styled.div`
  margin-top: 15px;
`;

const WeaponButton = styled.button<{ $isSelected?: boolean }>`
  width: 100%;
  padding: 8px;
  margin: 5px 0;
  background: ${props => props.$isSelected ? '#8a8aff' : '#4a4a8a'};
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #7a7aef;
    transform: scale(1.02);
  }
`;

const RulesContainer = styled.div`
  margin-top: 10px;
  padding: 8px;
  background: rgba(74, 74, 138, 0.3);
  border-radius: 4px;
`;

const RulesTitle = styled.div`
  font-size: 0.8em;
  color: #8a8aff;
  margin-bottom: 4px;
  font-family: 'Press Start 2P', cursive;
`;

const RulesList = styled.div`
  font-size: 0.9em;
  color: #e6e6fa;
`;

interface ModelCardProps {
  model: Model;
  onWeaponSelect: (weapon: WeaponStats) => void;
  selectedWeapon: WeaponStats | null;
  isSelectable: boolean;
}

const ModelCard: React.FC<ModelCardProps> = ({
  model,
  onWeaponSelect,
  selectedWeapon,
  isSelectable
}) => {
  // Ensure both values are defined and not zero before calculating percentage
  const woundPercentage = model.currentWounds !== undefined && model.stats.WND > 0
    ? (model.currentWounds / model.stats.WND) * 100
    : 0;

  // Get close combat weapons
  const closeWeapons = model.weapons.filter(weapon => weapon.weaponType === 'close');
  
  // Add Unarmed as fallback only if no other close combat weapons are available
  const availableWeapons = closeWeapons.length > 0 ? closeWeapons : [fallbackFists];

  return (
    <Card $isActive={isSelectable}>
      <ModelName>{model.name}</ModelName>
      
      <StatsGrid>
        <StatBox>
          <StatLabel>MOV</StatLabel>
          <StatValue>{model.stats.MOV}</StatValue>
        </StatBox>
        <StatBox>
          <StatLabel>DEF</StatLabel>
          <StatValue>{model.stats.DEF}</StatValue>
        </StatBox>
        <StatBox>
          <StatLabel>SAV</StatLabel>
          <StatValue>{model.stats.SAV}+</StatValue>
        </StatBox>
        <StatBox>
          <StatLabel>WND</StatLabel>
          <StatValue $isWounds $woundPercentage={woundPercentage}>
            {model.currentWounds ?? model.stats.WND}/{model.stats.WND}
          </StatValue>
        </StatBox>
      </StatsGrid>

      {model.stats.SR && model.stats.SR.length > 0 && (
        <RulesContainer>
          <RulesTitle>Special Rules</RulesTitle>
          <RulesList>
            {model.stats.SR.join(', ')}
          </RulesList>
        </RulesContainer>
      )}

      {isSelectable && (
        <WeaponList>
          {availableWeapons.map((weapon, index) => (
            <WeaponButton
              key={`${weapon.name}-${index}`}
              onClick={() => onWeaponSelect(weapon)}
              $isSelected={selectedWeapon?.name === weapon.name}
              type="button"
            >
              {weapon.name}
            </WeaponButton>
          ))}
        </WeaponList>
      )}
    </Card>
  );
};

export default ModelCard;