import React from 'react';
import { Model, WeaponStats } from '../../types/gameTypes';
import {
  ModelCardContainer,
  ModelImage,
  ModelInfo,
  ModelName,
  StatsContainer,
  StatBlock,
  StatLabel,
  StatValue,
  WeaponStatsDisplay,
  WeaponName,
  WeaponStatBlock,
  WeaponStatLabel,
  WeaponStatValue,
  RuleItem,
  RuleTooltip,
  WeaponContainer,
  WeaponList,
  WeaponListItem,
  HealthBar,
  HealthBarFill,
  HealthText
} from './ModelCardStyles';

interface RangedModelCardProps {
  model: Model;
  selectedWeapon: WeaponStats | null;
  onWeaponSelect: (weapon: WeaponStats) => void;
  isSelectable: boolean;
}

export const RangedModelCard: React.FC<RangedModelCardProps> = ({
  model,
  selectedWeapon,
  onWeaponSelect,
  isSelectable
}) => {
  const renderWeaponRules = (rules: string[]) => {
    return rules.map((rule, index) => (
      <RuleItem key={index}>
        {rule}
        <RuleTooltip>{rule}</RuleTooltip>
      </RuleItem>
    ));
  };

  const renderWeaponStats = (weapon: WeaponStats) => (
    <WeaponStatsDisplay>
      <WeaponName>{weapon.name}</WeaponName>
      <WeaponStatBlock>
        <WeaponStatLabel>RNG</WeaponStatLabel>
        <WeaponStatValue>{weapon.RNG}</WeaponStatValue>
      </WeaponStatBlock>
      <WeaponStatBlock>
        <WeaponStatLabel>ATK</WeaponStatLabel>
        <WeaponStatValue>{weapon.ATK}</WeaponStatValue>
      </WeaponStatBlock>
      <WeaponStatBlock>
        <WeaponStatLabel>HTV</WeaponStatLabel>
        <WeaponStatValue>{weapon.HTV}+</WeaponStatValue>
      </WeaponStatBlock>
      <WeaponStatBlock>
        <WeaponStatLabel>DMG</WeaponStatLabel>
        <WeaponStatValue>{weapon.DMG}</WeaponStatValue>
      </WeaponStatBlock>
      <WeaponStatBlock>
        <WeaponStatLabel>CRT</WeaponStatLabel>
        <WeaponStatValue>{weapon.CRT}</WeaponStatValue>
      </WeaponStatBlock>
      {weapon.rules && weapon.rules.length > 0 && renderWeaponRules(weapon.rules)}
    </WeaponStatsDisplay>
  );

  const rangedWeapons = model.weapons.filter(w => w.weaponType === 'range');

  return (
    <ModelCardContainer>
      <ModelImage src={model.imageUrl || '/placeholder.png'} alt={model.name} />
      <ModelInfo>
        <ModelName>{model.name}</ModelName>
        <StatsContainer>
          <StatBlock>
            <StatLabel>MOV</StatLabel>
            <StatValue>{model.stats.MOV}</StatValue>
          </StatBlock>
          <StatBlock>
            <StatLabel>DEF</StatLabel>
            <StatValue>{model.stats.DEF}</StatValue>
          </StatBlock>
          <StatBlock>
            <StatLabel>SAV</StatLabel>
            <StatValue>{model.stats.SAV}+</StatValue>
          </StatBlock>
          <StatBlock>
            <StatLabel>BRV</StatLabel>
            <StatValue>{model.stats.BRV}</StatValue>
          </StatBlock>
          <StatBlock>
            <StatLabel>WND</StatLabel>
            <StatValue>{model.stats.WND}</StatValue>
          </StatBlock>
        </StatsContainer>

        <HealthBar>
          <HealthBarFill
            width={((model.currentWounds || 0) / model.stats.WND) * 100}
          />
          <HealthText>
            {model.currentWounds || 0}/{model.stats.WND}
          </HealthText>
        </HealthBar>

        <WeaponContainer>
          {selectedWeapon ? (
            renderWeaponStats(selectedWeapon)
          ) : (
            <WeaponList>
              {rangedWeapons.map((weapon, index) => (
                <WeaponListItem
                  key={index}
                  onClick={() => isSelectable && onWeaponSelect(weapon)}
                  isSelectable={isSelectable}
                >
                  {weapon.name}
                </WeaponListItem>
              ))}
            </WeaponList>
          )}
        </WeaponContainer>
      </ModelInfo>
    </ModelCardContainer>
  );
};