import React from 'react';
import styled from 'styled-components';
import { Model, WeaponStats } from '../../types/gameTypes';
import Tooltip from '../ui/Tooltip';
import { modelRuleDescriptions, weaponRuleDescriptions } from '../../data/ruleDescriptions';
import {
  Card,
  ModelName,
  StatsGrid,
  StatBox,
  StatLabel,
  StatValue,
  WeaponList,
  WeaponButton,
  WeaponStatsDisplay,
  WeaponRuleItem,
  RulesContainer,
  RulesTitle,
  RulesList,
  RuleItem
} from './ModelCardStyles';

// Create a local fallback weapon
const fallbackFists: WeaponStats = {
  name: "Unarmed",
  RNG: 1,    // 1"
  ATK: 2,    // 2 dice
  HTV: 5,    // 5+
  DMG: 1,    // 1 damage
  CRT: 1,    // 1 critical damage
  rules: [],
  weaponType: "close"
};

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

  // Function to render weapon rules with tooltips
  const renderWeaponRules = (rules: string[] | string) => {
    if (!rules || (Array.isArray(rules) && rules.length === 0)) return null;
    
    // Convert string to array if necessary
    const rulesArray = Array.isArray(rules) ? rules : rules.split(',').map(r => r.trim());
    
    return (
      <div style={{ 
        marginTop: '4px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '4px' 
      }}>
        {rulesArray.map((rule, index) => {
          const description = weaponRuleDescriptions[rule] || 'No description available';
          return (
            <Tooltip 
              key={index} 
              text={description}
              position="bottom"
            >
              <WeaponRuleItem>
                {rule}
              </WeaponRuleItem>
            </Tooltip>
          );
        })}
      </div>
    );
  };

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
            {model.stats.SR.map((rule, index) => {
              const description = modelRuleDescriptions[rule] || 'No description available';
              return (
                <Tooltip 
                  key={index} 
                  text={description}
                  position="bottom"
                >
                  <RuleItem>
                    {rule}
                  </RuleItem>
                </Tooltip>
              );
            })}
          </RulesList>
        </RulesContainer>
      )}

      {isSelectable && (
        <WeaponList>
          {availableWeapons.map((weapon, index) => (
            <div key={`${weapon.name}-${index}`}>
              <WeaponButton
                onClick={() => onWeaponSelect(weapon)}
                $isSelected={selectedWeapon?.name === weapon.name}
                type="button"
              >
                {weapon.name}
              </WeaponButton>
              {weapon.rules && renderWeaponRules(weapon.rules)}
            </div>
          ))}
        </WeaponList>
      )}
    </Card>
  );
};

export default ModelCard;