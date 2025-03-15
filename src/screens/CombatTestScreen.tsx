import React, { useState } from 'react';
import styled from 'styled-components';
import { CombatScreen } from '../components/combat/CombatScreen';
import { savageBrute, bruteWithGreataxe } from '../data/testModels';
import { Model } from '../types/gameTypes';

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
`;

const Header = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

const Title = styled.h1`
  color: #8a8aff;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  color: #6a6aaa;
  font-size: 0.8em;
`;

const CombatContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  height: calc(100vh - 120px);
  background: rgba(42, 42, 74, 0.8);
  border-radius: 8px;
  border: 2px solid #4a4a8a;
  overflow: hidden;
`;

export const CombatTestScreen: React.FC = () => {
  const [winner, setWinner] = useState<Model | null>(null);

  const handleCombatEnd = (winner: Model) => {
    setWinner(winner);
    alert(`Kampf beendet! Gewinner: ${winner.name}`);
  };

  return (
    <TestContainer>
      <Header>
        <Title>Kampfsystem-Test</Title>
        <Subtitle>
          {savageBrute.name} vs {bruteWithGreataxe.name}
        </Subtitle>
      </Header>

      <CombatContainer>
        <CombatScreen
          attacker={savageBrute}
          defender={bruteWithGreataxe}
          isMelee={true}
          onCombatEnd={handleCombatEnd}
        />
      </CombatContainer>
    </TestContainer>
  );
};

export default CombatTestScreen;