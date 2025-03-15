import React, { useState } from 'react';
import styled from 'styled-components';
import { Model } from '../../types/models';
import CombatLog from './CombatLog';
import DiceDisplay from './DiceDisplay';
import ModelCard from './ModelCard';

interface CombatProps {
  player1Model: Model;
  player2Model: Model;
  onCombatEnd: (winner: Model) => void;
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

const Combat: React.FC<CombatProps> = ({
  player1Model,
  player2Model,
  onCombatEnd
}) => {
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
  const [combatLog, setCombatLog] = useState<string[]>(['Kampf beginnt!']);
  const [player1Dice, setPlayer1Dice] = useState<Array<{ value: number; used: boolean }>>([
    { value: Math.floor(Math.random() * 6) + 1, used: false },
    { value: Math.floor(Math.random() * 6) + 1, used: false },
    { value: Math.floor(Math.random() * 6) + 1, used: false }
  ]);
  const [player2Dice, setPlayer2Dice] = useState<Array<{ value: number; used: boolean }>>([
    { value: Math.floor(Math.random() * 6) + 1, used: false },
    { value: Math.floor(Math.random() * 6) + 1, used: false },
    { value: Math.floor(Math.random() * 6) + 1, used: false }
  ]);

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

  return (
    <CombatContainer>
      <ModelsContainer>
        <ModelCard
          model={player1Model}
          isActive={currentPlayer === 1}
          playerNumber={1}
        />
        <ModelCard
          model={player2Model}
          isActive={currentPlayer === 2}
          playerNumber={2}
        />
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

export default Combat;