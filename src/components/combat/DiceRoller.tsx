import React from 'react';
import styled from 'styled-components';

const DiceContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  justify-content: center;
  margin: var(--space-3) 0;
`;

const DiceButton = styled.button<{ isHit: boolean; isUsed: boolean; isBlockable: boolean; isActive: boolean }>`
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  border: 1px solid var(--primary-red);
  background: ${props =>
    props.isUsed
      ? 'var(--muted)'
      : props.isBlockable
      ? 'var(--success)'
      : props.isHit
      ? 'var(--secondary-blue)'
      : 'var(--accent)'};
  color: var(--primary-light);
  font-size: 1.5rem;
  font-family: 'IM Fell English', serif;
  cursor: ${props => (props.isActive && !props.isUsed ? 'pointer' : 'not-allowed')};
  opacity: ${props => (props.isUsed ? 0.5 : 1)};
  transition: all 0.3s ease;
  position: relative;
  box-shadow: ${props => (props.isHit ? '0 0 15px rgba(59, 130, 246, 0.3)' : 'none')};
  box-shadow: ${props => (props.isBlockable ? '0 0 15px rgba(34, 197, 94, 0.3)' : '')};

  &:hover {
    transform: ${props => (props.isActive && !props.isUsed ? 'translateY(-2px)' : 'none')};
    box-shadow: ${props => (props.isActive && !props.isUsed ? '0 0 15px rgba(255, 255, 255, 0.2)' : '')};
  }

  &:after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.1);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover:after {
    opacity: ${props => (props.isActive && !props.isUsed ? 1 : 0)};
  }
`;

const RollButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  background: var(--secondary-blue);
  border: none;
  border-radius: 2px;
  color: var(--primary-light);
  font-size: 1rem;
  font-family: 'IM Fell English', serif;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
  position: relative;
  overflow: hidden;
  min-width: 120px;
  min-height: 2.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
    background: rgba(59, 130, 246, 0.9);
  }

  &:after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.1);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover:after {
    opacity: 1;
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