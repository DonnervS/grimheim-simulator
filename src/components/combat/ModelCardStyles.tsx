import styled, { keyframes } from 'styled-components';

export const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

export const Card = styled.div<{ $isActive?: boolean }>`
  background: var(--card);
  border: 1px solid ${props => props.$isActive ? 'var(--primary-red)' : 'rgba(220, 38, 38, 0.3)'};
  border-radius: 2px;
  padding: 1.25rem;
  width: 100%;
  max-width: 300px;
  box-shadow: 0 0 20px rgba(220, 38, 38, 0.1);
  opacity: ${props => props.$isActive ? '1' : '0.7'};
  transition: all 0.3s ease;

  &:hover {
    opacity: 1;
    border-color: var(--primary-red);
  }
`;

export const ModelName = styled.h3`
  color: var(--primary-red);
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: normal;
  letter-spacing: 0.05em;
  text-shadow: 0 0 10px rgba(220, 38, 38, 0.3);
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.25rem;
`;

export const StatBox = styled.div`
  background: rgba(15, 15, 15, 0.5);
  border: 1px solid var(--primary-red);
  border-radius: 2px;
  padding: 0.75rem;
  text-align: center;
`;

export const StatLabel = styled.div`
  color: var(--muted);
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
`;

export const StatValue = styled.div<{ $isWounds?: boolean; $woundPercentage?: number }>`
  color: ${props => {
    if (props.$isWounds) {
      if (props.$woundPercentage === undefined) return 'var(--primary-light)';
      if (props.$woundPercentage <= 25) return '#ff4444';
      if (props.$woundPercentage <= 50) return '#ffaa44';
      return 'var(--primary-light)';
    }
    return 'var(--primary-light)';
  }};
  font-size: 1.25rem;
  transition: color 0.3s ease;
`;

export const WeaponSection = styled.div`
  margin-top: 1.25rem;
`;

export const WeaponButton = styled.button<{ $isSelected: boolean }>`
  width: 100%;
  background: ${props => props.$isSelected ? 'rgba(220, 38, 38, 0.1)' : 'var(--accent)'};
  color: var(--primary-light);
  border: 1px solid var(--primary-red);
  border-radius: 2px;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(220, 38, 38, 0.1);
    transform: translateY(-2px);
    box-shadow: 0 0 20px rgba(220, 38, 38, 0.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const RulesSection = styled.div`
  margin-top: 1rem;
`;

export const RulesTitle = styled.h4`
  color: var(--primary-red);
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  font-weight: normal;
  letter-spacing: 0.05em;
`;

export const RulesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const RuleItem = styled.li`
  color: var(--primary-light);
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(220, 38, 38, 0.1);

  &:last-child {
    border-bottom: none;
  }
`;

export const RulesContainer = styled.div`
  margin-top: 1rem;
  padding: 0.75rem;
  background: rgba(15, 15, 15, 0.5);
  border: 1px solid var(--primary-red);
  border-radius: 2px;
`;

export const WeaponList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const WeaponStatsDisplay = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: rgba(15, 15, 15, 0.5);
  border: 1px solid var(--primary-red);
  border-radius: 2px;
`;

export const WeaponRuleItem = styled.div`
  color: var(--primary-light);
  font-size: 0.875rem;
  padding: 0.25rem 0;
  border-bottom: 1px solid rgba(220, 38, 38, 0.1);

  &:last-child {
    border-bottom: none;
  }
`; 