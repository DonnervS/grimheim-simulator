import styled from 'styled-components';

export const Card = styled.div<{ $isActive: boolean }>`
  background: ${props => props.$isActive ? 'rgba(42, 42, 74, 0.9)' : 'rgba(42, 42, 74, 0.6)'};
  border: 2px solid ${props => props.$isActive ? '#8a8aff' : '#4a4a8a'};
  border-radius: 8px;
  padding: 15px;
  width: 100%;
  max-width: 300px;
  color: #e6e6fa;
  font-family: 'Press Start 2P', cursive;
  transition: all 0.2s ease;

  &:hover {
    transform: ${props => props.$isActive ? 'scale(1.02)' : 'none'};
  }
`;

export const ModelName = styled.h3`
  color: #8a8aff;
  margin: 0 0 15px 0;
  font-size: 14px;
  text-align: center;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-bottom: 15px;
`;

export const StatBox = styled.div`
  background: rgba(74, 74, 138, 0.3);
  border: 1px solid #4a4a8a;
  border-radius: 4px;
  padding: 8px;
  text-align: center;
`;

export const StatLabel = styled.div`
  font-size: 10px;
  color: #8a8aff;
  margin-bottom: 4px;
`;

export const StatValue = styled.div<{ $isWounds?: boolean; $woundPercentage?: number }>`
  font-size: 12px;
  color: ${props => {
    if (props.$isWounds && props.$woundPercentage !== undefined) {
      if (props.$woundPercentage <= 25) return '#ff4444';
      if (props.$woundPercentage <= 50) return '#ffaa44';
      return '#e6e6fa';
    }
    return '#e6e6fa';
  }};
`;

export const WeaponList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
`;

export const WeaponButton = styled.button<{ $isSelected: boolean }>`
  background: ${props => props.$isSelected ? '#8a8aff' : '#4a4a8a'};
  color: #e6e6fa;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  font-family: 'Press Start 2P', cursive;
  font-size: 10px;
  cursor: pointer;
  width: 100%;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.$isSelected ? '#9a9aff' : '#5a5a9a'};
    transform: scale(1.02);
  }
`;

export const WeaponStatsDisplay = styled.div`
  background: rgba(74, 74, 138, 0.3);
  border: 1px solid #4a4a8a;
  border-radius: 4px;
  padding: 8px;
  margin-top: 8px;
  font-size: 10px;
`;

export const WeaponRuleItem = styled.span`
  background: #4a4a8a;
  color: #e6e6fa;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 8px;
  cursor: help;
`;

export const RulesContainer = styled.div`
  margin-top: 15px;
`;

export const RulesTitle = styled.div`
  color: #8a8aff;
  font-size: 12px;
  margin-bottom: 8px;
`;

export const RulesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

export const RuleItem = styled.span`
  background: #4a4a8a;
  color: #e6e6fa;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 10px;
  cursor: help;
`;

export const ModelCardContainer = styled.div`
  background: rgba(42, 42, 74, 0.9);
  border: 2px solid #4a4a8a;
  border-radius: 8px;
  padding: 15px;
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const ModelImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
`;

export const ModelInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
`;

export const StatBlock = styled.div`
  background: rgba(74, 74, 138, 0.3);
  border: 1px solid #4a4a8a;
  border-radius: 4px;
  padding: 6px;
  text-align: center;
`;

export const WeaponContainer = styled.div`
  margin-top: 10px;
`;

export const WeaponName = styled.div`
  color: #8a8aff;
  font-size: 12px;
  margin-bottom: 8px;
  text-align: center;
`;

export const WeaponStatBlock = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
  border-bottom: 1px solid #4a4a8a;

  &:last-child {
    border-bottom: none;
  }
`;

export const WeaponStatLabel = styled.span`
  color: #8a8aff;
  font-size: 10px;
`;

export const WeaponStatValue = styled.span`
  color: #e6e6fa;
  font-size: 10px;
`;

export const WeaponListItem = styled.div<{ isSelectable: boolean }>`
  background: #4a4a8a;
  color: #e6e6fa;
  padding: 8px;
  border-radius: 4px;
  font-size: 10px;
  cursor: ${props => props.isSelectable ? 'pointer' : 'default'};
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.isSelectable ? '#5a5a9a' : '#4a4a8a'};
  }
`;

export const RuleTooltip = styled.div`
  display: none;
  position: absolute;
  background: rgba(26, 26, 46, 0.95);
  border: 1px solid #8a8aff;
  border-radius: 4px;
  padding: 8px;
  font-size: 10px;
  z-index: 1000;
  max-width: 200px;
  pointer-events: none;
`;

export const HealthBar = styled.div`
  width: 100%;
  height: 20px;
  background: rgba(74, 74, 138, 0.3);
  border: 1px solid #4a4a8a;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
`;

export const HealthBarFill = styled.div<{ width: number }>`
  width: ${props => props.width}%;
  height: 100%;
  background: ${props => {
    if (props.width <= 25) return '#ff4444';
    if (props.width <= 50) return '#ffaa44';
    return '#44ff44';
  }};
  transition: width 0.3s ease;
`;

export const HealthText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #e6e6fa;
  font-size: 10px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`; 