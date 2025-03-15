import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Model } from '../../types/models';
import CombatLog from './CombatLog';
import DiceDisplay from './DiceDisplay';
import ModelCard from './ModelCard';
import ModelSelection from './ModelSelection';

interface CombatScreenProps {
  player1Warband: Model[];
  player2Warband: Model[];
  onCombatEnd: (winner: Model) => void;
  isMelee: boolean;
}

const CombatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const ModelsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 40px;
`;

const ActionArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 20px;
`;

const SelectionPhase = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 2rem;
`;

const StartButton = styled.button<{ isEnabled: boolean }>`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background: ${props => props.isEnabled ? '#2c5282' : '#1a365d'};
  border: 2px solid ${props => props.isEnabled ? '#4299e1' : '#2b6cb0'};
  border-radius: 0.5rem;
  color: white;
  cursor: ${props => props.isEnabled ? 'pointer' : 'not-allowed'};
  opacity: ${props => props.isEnabled ? '1' : '0.5'};
  transition: all 0.2s;

  &:hover {
    background: ${props => props.isEnabled ? '#2a4365' : '#1a365d'};
  }
`;

const CombatScreen: React.FC<CombatScreenProps> = ({
  player1Warband,
  player2Warband,
  onCombatEnd,
  isMelee
}) => {
  const [phase, setPhase] = useState<'selection' | 'combat'>('selection');
  const [selectedModel1, setSelectedModel1] = useState<Model | undefined>();
  const [selectedModel2, setSelectedModel2] = useState<Model | undefined>();
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
  const [combatLog, setCombatLog] = useState<string[]>([]);
  const [player1Dice, setPlayer1Dice] = useState<Array<{ value: number; used: boolean }>>([]);
  const [player2Dice, setPlayer2Dice] = useState<Array<{ value: number; used: boolean }>>([]);

  const initializeDice = () => {
    return [
      { value: Math.floor(Math.random() * 6) + 1, used: false },
      { value: Math.floor(Math.random() * 6) + 1, used: false },
      { value: Math.floor(Math.random() * 6) + 1, used: false }
    ];
  };

  const startCombat = () => {
    if (selectedModel1 && selectedModel2) {
      setPhase('combat');
      setPlayer1Dice(initializeDice());
      setPlayer2Dice(initializeDice());
      addToCombatLog('Kampf beginnt!');
      addToCombatLog(`${selectedModel1.name} gegen ${selectedModel2.name}`);
    }
  };

  const addToCombatLog = (message: string) => {
    setCombatLog(prev => [...prev, message]);
  };

  const hasUsableDice = (dice: Array<{ value: number; used: boolean }>) => {
    return dice.some(die => !die.used);
  };

  const switchTurnIfNeeded = () => {
    const currentDice = currentPlayer === 1 ? player1Dice : player2Dice;
    const opponentDice = currentPlayer === 1 ? player2Dice : player1Dice;

    if (!hasUsableDice(currentDice)) {
      if (hasUsableDice(opponentDice)) {
        setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
        addToCombatLog(`Zug wechselt zu Spieler ${currentPlayer === 1 ? 2 : 1}`);
      } else {
        addToCombatLog('Kampfphase endet - keine verwendbaren Würfel mehr übrig');
        // Handle end of combat phase here
      }
    }
  };

  const handleStrike = (dieIndex: number) => {
    const currentDice = currentPlayer === 1 ? player1Dice : player2Dice;
    const opponentDice = currentPlayer === 1 ? player2Dice : player1Dice;
    
    if (currentDice[dieIndex].used) {
      addToCombatLog('Dieser Würfel wurde bereits verwendet!');
      return;
    }

    // Mark the die as used
    if (currentPlayer === 1) {
      setPlayer1Dice(prev => {
        const newDice = [...prev];
        newDice[dieIndex].used = true;
        return newDice;
      });
    } else {
      setPlayer2Dice(prev => {
        const newDice = [...prev];
        newDice[dieIndex].used = true;
        return newDice;
      });
    }

    addToCombatLog(`Spieler ${currentPlayer} greift mit einer ${currentDice[dieIndex].value} an`);

    // Check if opponent has usable dice
    if (hasUsableDice(opponentDice)) {
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
      addToCombatLog(`Zug wechselt zu Spieler ${currentPlayer === 1 ? 2 : 1}`);
    } else if (hasUsableDice(currentDice)) {
      // Current player still has usable dice
      addToCombatLog(`Spieler ${currentPlayer} setzt seinen Zug fort`);
    } else {
      addToCombatLog('Kampfphase endet - keine verwendbaren Würfel mehr übrig');
      // Handle end of combat phase here
    }
  };

  const handleBlockDie = (dieIndex: number) => {
    const currentDice = currentPlayer === 1 ? player1Dice : player2Dice;
    const opponentDice = currentPlayer === 1 ? player2Dice : player1Dice;

    if (currentDice[dieIndex].used) {
      addToCombatLog('Dieser Würfel wurde bereits verwendet!');
      return;
    }

    // Mark the die as used
    if (currentPlayer === 1) {
      setPlayer1Dice(prev => {
        const newDice = [...prev];
        newDice[dieIndex].used = true;
        return newDice;
      });
    } else {
      setPlayer2Dice(prev => {
        const newDice = [...prev];
        newDice[dieIndex].used = true;
        return newDice;
      });
    }

    addToCombatLog(`Spieler ${currentPlayer} blockt mit einer ${currentDice[dieIndex].value}`);

    // Check if opponent has usable dice
    if (hasUsableDice(opponentDice)) {
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
      addToCombatLog(`Zug wechselt zu Spieler ${currentPlayer === 1 ? 2 : 1}`);
    } else if (hasUsableDice(currentDice)) {
      // Current player still has usable dice
      addToCombatLog(`Spieler ${currentPlayer} setzt seinen Zug fort`);
    } else {
      addToCombatLog('Kampfphase endet - keine verwendbaren Würfel mehr übrig');
      // Handle end of combat phase here
    }
  };

  if (phase === 'selection') {
    return (
      <CombatContainer>
        <SelectionPhase>
          <ModelSelection
            warband={player1Warband}
            playerNumber={1}
            onModelSelect={setSelectedModel1}
            selectedModel={selectedModel1}
          />
          <ModelSelection
            warband={player2Warband}
            playerNumber={2}
            onModelSelect={setSelectedModel2}
            selectedModel={selectedModel2}
          />
        </SelectionPhase>
        <StartButton
          isEnabled={!!selectedModel1 && !!selectedModel2}
          onClick={startCombat}
          disabled={!selectedModel1 || !selectedModel2}
        >
          Kampf Starten
        </StartButton>
      </CombatContainer>
    );
  }

  return (
    <CombatContainer>
      <ModelsContainer>
        {selectedModel1 && selectedModel2 && (
          <>
            <ModelCard
              model={selectedModel1}
              isActive={currentPlayer === 1}
              playerNumber={1}
            />
            <ModelCard
              model={selectedModel2}
              isActive={currentPlayer === 2}
              playerNumber={2}
            />
          </>
        )}
      </ModelsContainer>
      
      <ActionArea>
        <DiceDisplay
          dice={currentPlayer === 1 ? player1Dice : player2Dice}
          onStrike={handleStrike}
          onBlock={handleBlockDie}
          isActive={true}
        />
      </ActionArea>

      <CombatLog messages={combatLog} />
    </CombatContainer>
  );
};

export default CombatScreen;