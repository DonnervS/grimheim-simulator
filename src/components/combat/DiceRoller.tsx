import React from 'react';
import styled from 'styled-components';

const DiceContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`;

const DiceButton = styled.button<{ isHit: boolean; isUsed: boolean; isBlockable: boolean; isActive: boolean }>`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  border: 2px solid #4a4a8a;
  background: ${props =>
    props.isUsed
      ? '#666'
      : props.isBlockable
      ? '#4CAF50'
      : props.isHit
      ? '#8a8aff'
      : '#444'};
  color: white;
  font-size: 1.2em;
  cursor: ${props => (props.isActive && !props.isUsed ? 'pointer' : 'not-allowed')};
  opacity: ${props => (props.isUsed ? 0.5 : 1)};
  transition: all 0.2s ease;

  &:hover {
    transform: ${props => (props.isActive && !props.isUsed ? 'scale(1.1)' : 'none')};
  }
`;

const RollButton = styled.button`
  padding: 10px 20px;
  background: #8a8aff;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 1em;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05);
    background: #7a7aef;
  }
`;

interface DiceResult {
  value: number;
  isUsed: boolean;
  isCritical: boolean;
  isHit: boolean;
  isBlockable?: boolean;
}

interface DiceRollerProps {
  isAttacker: boolean;
  onRoll: (isAttacker: boolean) => void;
  attackerDice: DiceResult[];
  defenderDice: DiceResult[];
  onDiceSelect: (isAttacker: boolean, index: number, action: 'strike' | 'block') => void;
  showRollButton: boolean;
  isActive: boolean;
  isBlocking: boolean;
}

const DiceRoller: React.FC<DiceRollerProps> = ({
  isAttacker,
  onRoll,
  attackerDice,
  defenderDice,
  onDiceSelect,
  showRollButton,
  isActive,
  isBlocking
}) => {
  const dice = isAttacker ? attackerDice : defenderDice;

  const handleDiceClick = (index: number) => {
    if (!isActive || dice[index].isUsed) return;

    // Wenn wir im Blockierungsmodus sind, führen wir eine Blockierung aus
    if (isBlocking) {
      console.log('Führe Blockierung aus mit Würfel ' + index + ':', {
        würfel: {
          index,
          wert: dice[index].value,
          istKritisch: dice[index].isCritical,
          istTreffer: dice[index].isHit,
          istBlockierbar: dice[index].isBlockable
        }
      });
      onDiceSelect(isAttacker, index, 'block');
      return;
    }

    // Ansonsten führen wir einen normalen Schlag aus
    if (dice[index].isHit) {
      onDiceSelect(isAttacker, index, 'strike');
    }
  };

  return (
    <DiceContainer>
      {showRollButton ? (
        <RollButton onClick={() => onRoll(isAttacker)}>Roll Dice</RollButton>
      ) : (
        dice.map((die, index) => {
          // Debug-Ausgabe für den Blockierungsstatus
          console.log(`Würfel ${index} Blockierungsstatus:`, {
            würfel: {
              index,
              wert: die.value,
              istTreffer: die.isHit,
              istKritisch: die.isCritical,
              istBenutzt: die.isUsed,
              istBlockierbar: die.isBlockable
            },
            blockierung: {
              istAktiv: isBlocking,
              istAktuellerSpieler: isActive
            }
          });

          return (
            <DiceButton
              key={index}
              isHit={die.isHit}
              isUsed={die.isUsed}
              isBlockable={die.isBlockable || false}
              isActive={isActive}
              onClick={() => handleDiceClick(index)}
            >
              {die.value}
              {die.isCritical && '*'}
            </DiceButton>
          );
        })
      )}
    </DiceContainer>
  );
};

export default DiceRoller;