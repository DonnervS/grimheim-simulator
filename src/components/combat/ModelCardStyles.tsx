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