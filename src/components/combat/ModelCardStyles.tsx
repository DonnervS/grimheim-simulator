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
  box-shadow: ${props => props.$isActive ? '0 0 20px rgba(220, 38, 38, 0.2)' : '0 0 20px rgba(220, 38, 38, 0.1)'};
  opacity: ${props => props.$isActive ? '1' : '0.8'};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    opacity: 1;
    border-color: var(--primary-red);
    box-shadow: 0 0 25px rgba(220, 38, 38, 0.3);
    transform: ${props => props.$isActive ? 'translateY(-2px)' : 'none'};
  }
`;

export const ModelName = styled.h3`
  color: var(--primary-red);
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: normal;
  font-family: 'IM Fell English', serif;
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
  background: var(--accent);
  border: 1px solid var(--primary-red);
  border-radius: 2px;
  padding: 0.75rem;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    box-shadow: 0 0 15px rgba(220, 38, 38, 0.2);
  }
`;

export const StatLabel = styled.div`
  color: var(--primary-light);
  opacity: 0.8;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
  font-family: 'Inter', sans-serif;
`;

export const StatValue = styled.div<{ $isWounds?: boolean; $woundPercentage?: number }>`
  color: ${props => {
    if (props.$isWounds) {
      if (props.$woundPercentage === undefined) return 'var(--primary-light)';
      if (props.$woundPercentage <= 25) return 'var(--danger)';
      if (props.$woundPercentage <= 50) return 'var(--warning)';
      return 'var(--primary-light)';
    }
    return 'var(--primary-light)';
  }};
  font-size: 1.25rem;
  font-family: 'IM Fell English', serif;
  transition: color 0.3s ease;
  font-weight: normal;
`;

export const WeaponSection = styled.div`
  margin-top: 1.25rem;
`;

export const WeaponButton = styled.button<{ $isSelected: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${props => props.$isSelected ? 'rgba(220, 38, 38, 0.1)' : 'var(--accent)'};
  color: var(--primary-light);
  border: 1px solid var(--primary-red);
  border-radius: 2px;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  font-family: 'IM Fell English', serif;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 20px rgba(220, 38, 38, 0.2);
    background: ${props => props.$isSelected ? 'rgba(220, 38, 38, 0.15)' : 'rgba(220, 38, 38, 0.05)'};
  }

  &:after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(220, 38, 38, 0.1);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover:after {
    opacity: 1;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
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
  font-family: 'IM Fell English', serif;
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
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;

  &:last-child {
    border-bottom: none;
  }
`;

export const RulesContainer = styled.div`
  margin-top: 1rem;
  padding: 0.75rem;
  background: var(--accent);
  border: 1px solid var(--primary-red);
  border-radius: 2px;
  transition: box-shadow 0.3s ease;
  
  &:hover {
    box-shadow: 0 0 15px rgba(220, 38, 38, 0.2);
  }
`;

export const WeaponList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
`;

export const WeaponStatsDisplay = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: var(--accent);
  border: 1px solid var(--primary-red);
  border-radius: 2px;
  transition: box-shadow 0.3s ease;
  
  &:hover {
    box-shadow: 0 0 15px rgba(220, 38, 38, 0.2);
  }
`;

export const WeaponRuleItem = styled.div`
  color: var(--primary-light);
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
  background: rgba(220, 38, 38, 0.1);
  border: 1px solid rgba(220, 38, 38, 0.3);
  border-radius: 2px;
  font-family: 'Inter', sans-serif;
  display: inline-block;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(220, 38, 38, 0.2);
    box-shadow: 0 0 10px rgba(220, 38, 38, 0.2);
  }
`; 