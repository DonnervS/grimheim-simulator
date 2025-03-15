import React, { useState } from 'react';
import styled from 'styled-components';
import StartScreen from './components/StartScreen';
import CombatScreen from './components/combat/CombatScreen';
import { Model } from './types/models';

interface GameState {
  isStarted: boolean;
  player1Warband?: Model[];
  player2Warband?: Model[];
}

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #1a202c;
  color: #e2e8f0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function App() {
  const [gameState, setGameState] = useState<GameState>({
    isStarted: false
  });

  const handleStartGame = (player1Warband: Model[], player2Warband: Model[]) => {
    setGameState({
      isStarted: true,
      player1Warband,
      player2Warband
    });
  };

  const handleCombatEnd = (winner: Model) => {
    console.log('Combat ended - Winner:', winner);
    setGameState({
      isStarted: false
    });
  };

  return (
    <AppContainer>
      {!gameState.isStarted ? (
        <StartScreen onStartGame={handleStartGame} />
      ) : (
        <CombatScreen
          player1Warband={gameState.player1Warband!}
          player2Warband={gameState.player2Warband!}
          onCombatEnd={handleCombatEnd}
          isMelee={true}
        />
      )}
    </AppContainer>
  );
}

export default App;