import React from 'react';
import styled from 'styled-components';
import { Model, WeaponStats } from '../../types/gameTypes';

const Card = styled.div<{ isActive: boolean }>`
  background: rgba(26, 26, 46, 0.9);
  border-radius: 8px;
  border: 2px solid ${props => props.isActive ? '#8a8aff' : '#4a4a8a'};
  padding: 20px;
  width: 250px;
  color: #e6e6fa;
  transition: all 0.2s ease;

  ${props => props.isActive && `
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

const WoundBar = styled.div`
  width: 100%;
  height: 20px;
  background: #444;
  border-radius: 4px;
  margin: 10px 0;
  position: relative;
  overflow: hidden;
`;

const WoundFill = styled.div<{ percentage: number }>`
  width: ${props => props.percentage}%;
  height: 100%;
  background: ${props => props.percentage > 50 ? '#4CAF50' : props.percentage > 25 ? '#FFA500' : '#FF4444'};
  transition: width 0.3s ease;
`;

const WoundText = styled.div`
  position: absolute;
  width: 100%;
  text-align: center;
  line-height: 20px;
  color: white;
  mix-blend-mode: difference;
`;

const WeaponList = styled.div`
  margin-top: 15px;
`;

const WeaponButton = styled.button<{ isSelected?: boolean }>`
  width: 100%;
  padding: 8px;
  margin: 5px 0;
  background: ${props => props.isSelected ? '#8a8aff' : '#4a4a8a'};
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

interface ModelCardProps {
  model: Model;
  isActive: boolean;
  onWeaponSelect: (weapon: WeaponStats) => void;
  alwaysShowWeapons?: boolean;
}

const ModelCard: React.FC<ModelCardProps> = ({ model, isActive, onWeaponSelect, alwaysShowWeapons }) => {
  const woundPercentage = (model.currentWounds / model.maxWounds) * 100;

  return (
    <Card isActive={isActive}>
      <ModelName>{model.name}</ModelName>
      
      <WoundBar>
        <WoundFill percentage={woundPercentage} />
        <WoundText>
          {model.currentWounds} / {model.maxWounds}
        </WoundText>
      </WoundBar>

      {(isActive || alwaysShowWeapons) && (
        <WeaponList>
          {model.weapons.map((weapon, index) => (
            <WeaponButton
              key={index}
              onClick={() => onWeaponSelect(weapon)}
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