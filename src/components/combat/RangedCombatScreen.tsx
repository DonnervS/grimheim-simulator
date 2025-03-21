import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Model, WeaponStats } from '../../types/gameTypes';
import { RangedModelCard } from './RangedModelCard';
import RangedDiceDisplay, { DieResult } from './RangedDiceDisplay';
import Tooltip from '../ui/Tooltip';
import { weaponRuleDescriptions } from '../../data/ruleDescriptions';

const CombatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  position: relative;
  min-height: 100%;
`;

const BattleArea = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: flex-start;
  width: 100%;
  max-width: 1200px;
  margin: 20px 0;
  gap: 40px;
  position: relative;
`;

const ModelArea = styled.div<{ $isRight?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.$isRight ? 'flex-start' : 'flex-end'};
  padding: ${props => props.$isRight ? '0 0 0 20px' : '0 20px 0 0'};
`;

const CenterArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 20px;
  min-width: 400px;
`;

const DiceArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  width: 100%;
  gap: 20px;
`;

const TurnIndicator = styled.div`
  color: #8a8aff;
  font-family: 'Press Start 2P', cursive;
  font-size: 1.2em;
  text-align: center;
  margin-bottom: 20px;
`;

const DiceButton = styled.button`
  padding: 12px 24px;
  background: #8a8aff;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 1em;
  font-family: 'Press Start 2P', cursive;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  max-width: 200px;

  &:hover:not(:disabled) {
    transform: scale(1.05);
    background: #9a9aff;
  }

  &:disabled {
    background: #4a4a8a;
    cursor: not-allowed;
    transform: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
  justify-content: center;
`;

const ControlButton = styled(DiceButton)`
  margin: 0;
  background: ${props => props.color || '#4a4a8a'};
  
  &:hover:not(:disabled) {
    background: ${props => props.color ? `${props.color}cc` : '#6a6aaa'};
  }
`;

const CombatLog = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  padding: 20px;
  background: rgba(26, 26, 46, 0.9);
  border-radius: 8px;
  border: 2px solid #4a4a8a;
  max-height: 200px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #1a1a2e;
  }

  &::-webkit-scrollbar-thumb {
    background: #4a4a8a;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #6a6aaa;
  }
`;

const LogEntry = styled.div`
  color: #e6e6fa;
  margin: 5px 0;
  font-family: monospace;
  font-size: 0.9em;
  padding: 5px;
  border-bottom: 1px solid #4a4a8a;

  &:last-child {
    border-bottom: none;
  }
`;

const WeaponInfoContainer = styled.div`
  background: rgba(26, 26, 46, 0.9);
  border-radius: 8px;
  padding: 15px;
  margin-top: 10px;
  border: 2px solid #4a4a8a;
  width: 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const WeaponTitle = styled.div`
  color: #8a8aff;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.9em;
  margin-bottom: 10px;
  text-align: center;
  text-shadow: 0 0 10px rgba(138, 138, 255, 0.5);
`;

const WeaponStatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 10px;
`;

const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #e6e6fa;
  font-size: 0.9em;
`;

const StatLabel = styled.span`
  color: #8a8aff;
`;

const WeaponRuleItem = styled.span`
  cursor: help;
  border-bottom: 1px dotted #8a8aff;
  margin-right: 4px;
  display: inline-block;
  background-color: rgba(74, 74, 138, 0.3);
  padding: 1px 4px;
  border-radius: 3px;
  color: #e6e6fa;
  font-size: 0.8em;
  
  &:hover {
    background-color: rgba(74, 74, 138, 0.5);
  }
`;

const WeaponRules = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const WeaponInfo: React.FC<{ weapon: WeaponStats }> = ({ weapon }) => {
  const renderWeaponRules = (rules: string | undefined) => {
    if (!rules) return null;
    
    const rulesList = rules.split(',').map(rule => rule.trim());
    
    return (
      <WeaponRules>
        {rulesList.map((rule, index) => {
          const description = weaponRuleDescriptions[rule] || 'No description available';
          return (
            <Tooltip 
              key={index} 
              text={description}
              position="bottom"
            >
              <WeaponRuleItem>
                {rule}
              </WeaponRuleItem>
            </Tooltip>
          );
        })}
      </WeaponRules>
    );
  };

  return (
    <WeaponInfoContainer>
      <WeaponTitle>{weapon.name}</WeaponTitle>
      <WeaponStatsGrid>
        <StatRow>
          <StatLabel>RNG:</StatLabel> {weapon.RNG}"
        </StatRow>
        <StatRow>
          <StatLabel>ATK:</StatLabel> {weapon.ATK}D6
        </StatRow>
        <StatRow>
          <StatLabel>HTV:</StatLabel> {weapon.HTV}+
        </StatRow>
        <StatRow>
          <StatLabel>DMG:</StatLabel> {weapon.DMG}/{weapon.CRT}
        </StatRow>
      </WeaponStatsGrid>
      {renderWeaponRules(weapon.rules)}
    </WeaponInfoContainer>
  );
};

const SaveButton = styled(DiceButton)`
  background: ${props => props.disabled ? '#4a4a8a' : '#8a8aff'};
  margin: 5px 0;
  
  &:hover:not(:disabled) {
    background: ${props => props.disabled ? '#4a4a8a' : '#9a9aff'};
  }
`;

const SaveButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px 0;
`;

interface SaveState extends DiceSelectionState {
  coverSaveUsed: boolean;
  selectedSaveIndices: number[];
}

interface SaveInteraction {
  selectedSaveIndex: number | null;
  mode: 'block' | 'upgrade' | null;
  availableTargets: number[];
}

interface RangedCombatScreenProps {
  attacker: Model;
  defender: Model;
  attackerWeapon: WeaponStats | null;
  defenderWeapon: WeaponStats | null;
  onAttackerWeaponSelect: (weapon: WeaponStats) => void;
  onDefenderWeaponSelect: (weapon: WeaponStats) => void;
  onWinnerDeclared: (winner: Model) => void;
  onEndCombat: () => void;
}

interface DiceSelectionState {
  attackerHits: DieResult[];
  defenderSaves: DieResult[];
  selectedHits: number[];
  selectedSaves: number[];
}

interface ModelStats {
  MOV: number;
  DEF: number;
  SAV: number;
  WND: number;
  SHD: number;  // Add shield dice to stats
  SR: string[];
}

interface WeaponStats {
  RNG: string;
  ATK: number;
  DMG: string;
  rules: string[];  // Add rules array to weapon stats
}

export const RangedCombatScreen: React.FC<RangedCombatScreenProps> = ({
  attacker,
  defender,
  attackerWeapon,
  defenderWeapon,
  onAttackerWeaponSelect,
  onDefenderWeaponSelect,
  onWinnerDeclared,
  onEndCombat
}) => {
  const [phase, setPhase] = useState<'attack' | 'save' | 'resolve'>('attack');
  const [combatLog, setCombatLog] = useState<string[]>([]);
  const [attackerDice, setAttackerDice] = useState<DieResult[]>([]);
  const [defenderDice, setDefenderDice] = useState<DieResult[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [round, setRound] = useState(1);
  const [diceSelection, setDiceSelection] = useState<DiceSelectionState>({
    attackerHits: [],
    defenderSaves: [],
    selectedHits: [],
    selectedSaves: []
  });
  const [saveState, setSaveState] = useState<SaveState>({
    attackerHits: [],
    defenderSaves: [],
    selectedHits: [],
    selectedSaves: [],
    coverSaveUsed: false,
    selectedSaveIndices: []
  });
  const [saveInteraction, setSaveInteraction] = useState<SaveInteraction>({
    selectedSaveIndex: null,
    mode: null,
    availableTargets: []
  });

  useEffect(() => {
    if (attacker.currentWounds === undefined) {
      attacker.currentWounds = attacker.stats.WND;
    }
    if (defender.currentWounds === undefined) {
      defender.currentWounds = defender.stats.WND;
    }
  }, [attacker, defender]);

  const addToCombatLog = (message: string) => {
    setCombatLog(prev => [...prev, message]);
  };

  const rollDice = (count: number): { value: number }[] => {
    return Array(count)
      .fill(0)
      .map(() => ({
        value: Math.floor(Math.random() * 6) + 1
      }));
  };

  const handleAttackRoll = () => {
    if (!attackerWeapon) return;
    
    setIsRolling(true);
    setTimeout(() => {
      const hitResults = rollDice(attackerWeapon.ATK).map(die => ({
        value: die.value,
        isHit: die.value >= attackerWeapon.HTV,
        isCritical: die.value === 6,
        isSave: false,
        isShieldSave: false,
        isCoverSave: false,
        isSelected: false,
        isBlocked: false,
        isUsed: false
      }));

      setAttackerDice(hitResults);
      setPhase('save');
      setIsRolling(false);

      const hits = hitResults.filter(die => die.isHit).length;
      const crits = hitResults.filter(die => die.isCritical).length;
      addToCombatLog(`${attacker?.name} rolls ${attackerWeapon.ATK} attack dice with ${hits} hits (${crits} critical)`);
    }, 1000);
  };

  const handleSaveRoll = () => {
    if (phase !== 'save' || !attackerWeapon || !defender.stats) return;

    setIsRolling(true);
    setTimeout(() => {
      // Calculate modified save value based on weapon rules
      let modifiedSaveValue = defender.stats.SAV;
      if (attackerWeapon.rules?.includes('Armor Piercing')) {
        modifiedSaveValue = Math.min(modifiedSaveValue + 1, 6);
        addToCombatLog('Armor Piercing reduces save value by 1');
      } else if (attackerWeapon.rules?.includes('Armor Shatter')) {
        modifiedSaveValue = Math.min(modifiedSaveValue + 2, 6);
        addToCombatLog('Armor Shatter reduces save value by 2');
      }

      const numDice = defender.stats.DEF;
      const results = rollDice(numDice).map(({ value }) => ({
        value,
        isHit: false,
        isCritical: false,
        isSave: value >= modifiedSaveValue,
        isShieldSave: false,
        isCoverSave: false,
        isSelected: false,
        isBlocked: false,
        isUsed: false
      }));

      // Add shield saves if the model has the Shield special rule
      const hasShield = defender.stats.SR.includes('Shield');
      const shieldResults = hasShield ? rollDice(1).map(({ value }) => ({
        value,
        isHit: false,
        isCritical: false,
        isSave: value >= modifiedSaveValue,
        isShieldSave: true,
        isCoverSave: false,
        isSelected: false,
        isBlocked: false,
        isUsed: false
      })) : [];

      const allResults = [...results, ...shieldResults];
      setDefenderDice(allResults);
      setPhase('resolve');
      setIsRolling(false);

      const numSaves = allResults.filter(die => die.isSave).length;
      const numShieldSaves = allResults.filter(die => die.isSave && die.isShieldSave).length;
      
      addToCombatLog(`Rolled ${numDice} defense dice${hasShield ? ' and 1 shield die' : ''} with ${numSaves} successes (${numShieldSaves} shield saves) at ${modifiedSaveValue}+`);
    }, 1000);
  };

  const getModifiedSaveValue = () => {
    if (!attackerWeapon || !defender.stats) return defender.stats?.SAV;

    let modifiedSaveValue = defender.stats.SAV;
    if (attackerWeapon.rules?.includes('Armor Piercing')) {
      modifiedSaveValue = Math.min(modifiedSaveValue + 1, 6);
    } else if (attackerWeapon.rules?.includes('Armor Shatter')) {
      modifiedSaveValue = Math.min(modifiedSaveValue + 2, 6);
    }
    return modifiedSaveValue;
  };

  const renderSaveValue = () => {
    if (!attackerWeapon || !defender.stats) return defender.stats?.SAV + '+';

    const originalValue = defender.stats.SAV;
    const modifiedValue = getModifiedSaveValue();
    const isModified = modifiedValue > originalValue;

    return (
      <span style={{ color: isModified ? '#ff4444' : 'inherit' }}>
        {modifiedValue}+
      </span>
    );
  };

  const handleSaveActionButton = (mode: 'block' | 'upgrade') => {
    if (saveInteraction.selectedSaveIndex === null) return;

    const die = defenderDice[saveInteraction.selectedSaveIndex];
    console.log('Selected die for action:', {
      index: saveInteraction.selectedSaveIndex,
      die,
      mode
    });

    let availableTargets: number[] = [];

    if (mode === 'block') {
      if (die.isCritical) {
        // Critical saves can block any hit
        availableTargets = attackerDice
          .map((die, idx) => ({ die, idx }))
          .filter(({ die }) => (die.isHit || die.isCritical) && !die.isBlocked)
          .map(({ idx }) => idx);
      } else {
        // Normal saves can only block normal hits
        availableTargets = attackerDice
          .map((die, idx) => ({ die, idx }))
          .filter(({ die }) => die.isHit && !die.isCritical && !die.isBlocked)
          .map(({ idx }) => idx);
      }
    } else if (mode === 'upgrade') {
      // Can upgrade any non-critical, non-used save
      availableTargets = defenderDice
        .map((die, idx) => ({ die, idx }))
        .filter(({ die, idx }) => {
          const isValidSave = die.isSave || die.isShieldSave;
          const isNotCritical = !die.isCritical;
          const isNotUsed = !die.isUsed;
          const isNotSelected = idx !== saveInteraction.selectedSaveIndex;
          
          console.log('Checking die for upgrade:', {
            idx,
            die,
            isValidSave,
            isNotCritical,
            isNotUsed,
            isNotSelected,
            wouldBeTarget: isValidSave && isNotCritical && isNotUsed && isNotSelected
          });
          
          return isValidSave && isNotCritical && isNotUsed && isNotSelected;
        })
        .map(({ idx }) => idx);
      
      console.log('Available upgrade targets:', {
        allDice: defenderDice,
        filteredTargets: availableTargets,
        selectedDie: die
      });
    }

    setSaveInteraction({
      ...saveInteraction,
      mode,
      availableTargets
    });
  };

  const handleSaveDieClick = (index: number) => {
    if (phase !== 'resolve') return;
    
    // Wenn wir bereits im Upgrade/Block-Modus sind und der Würfel ein gültiges Ziel ist
    if (saveInteraction.mode && saveInteraction.availableTargets.includes(index)) {
      handleTargetDieClick(index);
      return;
    }
    
    const die = defenderDice[index];
    if (!die.isSave && !die.isShieldSave) return; // Allow clicking both normal and shield saves

    // Reset if clicking the same die
    if (saveInteraction.selectedSaveIndex === index) {
      setSaveInteraction({
        selectedSaveIndex: null,
        mode: null,
        availableTargets: []
      });
      return;
    }

    setSaveInteraction({
      selectedSaveIndex: index,
      mode: null,
      availableTargets: []
    });
  };

  const handleTargetDieClick = (index: number) => {
    if (!saveInteraction.mode || saveInteraction.selectedSaveIndex === null) return;

    const { mode, selectedSaveIndex } = saveInteraction;
    console.log('Target die clicked:', {
      mode,
      targetIndex: index,
      selectedIndex: selectedSaveIndex,
      targetDie: defenderDice[index],
      sourceDie: defenderDice[selectedSaveIndex]
    });

    if (mode === 'block') {
      // Mark the attack die as blocked
      const newAttackerDice = [...attackerDice];
      newAttackerDice[index] = {
        ...newAttackerDice[index],
        isBlocked: true
      };
      setAttackerDice(newAttackerDice);

      // Mark the save die as used
      const newDefenderDice = [...defenderDice];
      newDefenderDice[selectedSaveIndex] = {
        ...newDefenderDice[selectedSaveIndex],
        isUsed: true
      };
      setDefenderDice(newDefenderDice);
      
      addToCombatLog(`Used a ${defenderDice[selectedSaveIndex].isShieldSave ? 'shield' : 'normal'} save to block a ${attackerDice[index].isCritical ? 'critical' : 'normal'} hit`);
    } else if (mode === 'upgrade') {
      console.log('Before upgrade - Full state:', {
        defenderDice,
        targetIndex: index,
        selectedIndex: selectedSaveIndex,
        mode
      });

      // Create a new array with updated dice
      const newDefenderDice = defenderDice.map((die, i) => {
        if (i === index) {
          const upgradedDie = {
            ...die,
            isCritical: true,
            value: 6,
            isSave: true,
            isSelected: false,
            isBlocked: false,
            isUsed: false
          };
          console.log('Upgrading die:', { original: die, upgraded: upgradedDie });
          return upgradedDie;
        }
        if (i === selectedSaveIndex) {
          const usedDie = {
            ...die,
            isUsed: true,
            isSelected: false
          };
          console.log('Marking source die as used:', { original: die, used: usedDie });
          return usedDie;
        }
        return die;
      });

      console.log('After upgrade - New state:', newDefenderDice);
      
      // Force a re-render by creating a completely new array
      setDefenderDice([...newDefenderDice]);
      
      const sourceType = defenderDice[selectedSaveIndex].isShieldSave ? 'shield' : 'normal';
      const targetType = defenderDice[index].isShieldSave ? 'shield' : 'normal';
      addToCombatLog(`Used a ${sourceType} save to upgrade a ${targetType} save to critical`);
    }

    // Reset interaction state
    setSaveInteraction({
      selectedSaveIndex: null,
      mode: null,
      availableTargets: []
    });
  };

  const handleResolveSaves = () => {
    if (!attackerWeapon || !defender) return;

    // Hole die ausgewählten Saves
    const selectedSaves = saveState.selectedSaveIndices.map(index => defenderDice[index]);
    
    // Zähle normale und kritische Saves
    const normalSaves = selectedSaves.filter(save => !save.isCritical && !save.isShieldSave).length;
    const criticalSaves = selectedSaves.filter(save => save.isCritical || save.isShieldSave).length;

    // Verarbeite die Treffer
    let remainingHits = [...saveState.attackerHits];
    let damage = 0;

    // Verarbeite kritische Saves zuerst
    for (let i = 0; i < criticalSaves; i++) {
      const criticalHitIndex = remainingHits.findIndex(hit => hit.isCritical && !hit.isSelected);
      if (criticalHitIndex >= 0) {
        remainingHits[criticalHitIndex].isSelected = true;
      }
    }

    // Verarbeite normale Saves
    for (let i = 0; i < normalSaves; i++) {
      const normalHitIndex = remainingHits.findIndex(hit => !hit.isSelected);
      if (normalHitIndex >= 0) {
        remainingHits[normalHitIndex].isSelected = true;
      }
    }

    // Berechne den Schaden für nicht geblockte Treffer
    remainingHits.forEach(hit => {
      if (!hit.isSelected) {
        damage += hit.isCritical ? attackerWeapon.CRT : attackerWeapon.DMG;
      }
    });

    // Aktualisiere die Wunden des Verteidigers
    const newWounds = Math.max(0, defender.currentWounds - damage);
    
    addToCombatLog(`${defender.name} blocks ${selectedSaves.length} hits`);
    addToCombatLog(`${defender.name} takes ${damage} damage`);
    
    if (newWounds <= 0) {
      handleCombatEnd(attacker);
      addToCombatLog(`${attacker.name} wins the combat!`);
    } else {
      addToCombatLog(`${defender.name} has ${newWounds} wounds remaining`);
    }

    // Setze die Würfel zurück
    setSaveState({
      attackerHits: [],
      defenderSaves: [],
      selectedHits: [],
      selectedSaves: [],
      coverSaveUsed: false,
      selectedSaveIndices: []
    });
    
    setPhase('attack');
  };

  const handleCombatEnd = (winner: Model) => {
    addToCombatLog(`${winner.name} wins the combat!`);
    onWinnerDeclared(winner);
  };

  const handleNewRound = () => {
    setRound(prev => prev + 1);
    setPhase('attack');
    setAttackerDice([]);
    setDefenderDice([]);
    setDiceSelection({
      attackerHits: [],
      defenderSaves: [],
      selectedHits: [],
      selectedSaves: []
    });
    setSaveState({
      attackerHits: [],
      defenderSaves: [],
      selectedHits: [],
      selectedSaves: [],
      coverSaveUsed: false,
      selectedSaveIndices: []
    });
    setSaveInteraction({
      selectedSaveIndex: null,
      mode: null,
      availableTargets: []
    });
    addToCombatLog(`\n--- Round ${round + 1} ---\n`);
  };

  return (
    <CombatContainer>
      <BattleArea>
        <ModelArea>
          <RangedModelCard
            model={attacker}
            selectedWeapon={attackerWeapon}
            onWeaponSelect={onAttackerWeaponSelect}
            isSelectable={true}
          />
          {attackerWeapon && <WeaponInfo weapon={attackerWeapon} />}
        </ModelArea>
        
        <CenterArea>
          <TurnIndicator>Round {round}</TurnIndicator>
          <DiceArea>
            <RangedDiceDisplay
              diceResults={attackerDice}
              isRolling={isRolling && phase === 'attack'}
              label="Attacker Dice"
              onDieClick={(index) => 
                saveInteraction.mode === 'block' && 
                saveInteraction.availableTargets.includes(index) ? 
                  handleTargetDieClick(index) : undefined}
              highlightedDice={saveInteraction.mode === 'block' ? saveInteraction.availableTargets : []}
            />
            <SaveButtonContainer>
              <SaveButton
                onClick={handleAttackRoll}
                disabled={isRolling || phase !== 'attack' || !attackerWeapon}
              >
                Roll Attack
              </SaveButton>
              <SaveButton
                onClick={handleSaveRoll}
                disabled={isRolling || phase !== 'save'}
              >
                Roll Save
              </SaveButton>
            </SaveButtonContainer>
            <RangedDiceDisplay
              diceResults={defenderDice}
              isRolling={isRolling && phase === 'save'}
              label="Defender Dice"
              onDieClick={(index) => phase === 'resolve' ? handleSaveDieClick(index) : undefined}
              highlightedDice={saveInteraction.mode === 'upgrade' ? saveInteraction.availableTargets : []}
            />
            {saveInteraction.selectedSaveIndex !== null && phase === 'resolve' && (
              <ActionButtonContainer>
                <ActionButton
                  onClick={() => handleSaveActionButton('block')}
                  disabled={saveInteraction.mode === 'block'}
                >
                  Block Hit
                </ActionButton>
                {!defenderDice[saveInteraction.selectedSaveIndex].isCritical && !defenderDice[saveInteraction.selectedSaveIndex].isUsed && (
                  <ActionButton
                    onClick={() => handleSaveActionButton('upgrade')}
                    disabled={saveInteraction.mode === 'upgrade'}
                  >
                    Upgrade Save
                  </ActionButton>
                )}
              </ActionButtonContainer>
            )}
          </DiceArea>
          <ButtonContainer>
            <ControlButton
              onClick={handleNewRound}
              color="#4CAF50"
            >
              New Round
            </ControlButton>
            <ControlButton
              onClick={onEndCombat}
              color="#f44336"
            >
              End Combat
            </ControlButton>
          </ButtonContainer>
        </CenterArea>

        <ModelArea $isRight>
          <RangedModelCard
            model={defender}
            selectedWeapon={defenderWeapon}
            onWeaponSelect={onDefenderWeaponSelect}
            isSelectable={false}
            modifiedSaveValue={phase !== 'attack' ? getModifiedSaveValue() : undefined}
          />
        </ModelArea>
      </BattleArea>

      <CombatLog>
        {combatLog.map((log, index) => (
          <LogEntry key={index}>{log}</LogEntry>
        ))}
      </CombatLog>
    </CombatContainer>
  );
};

const SpecialRuleTooltip = styled.div`
  position: absolute;
  background: rgba(26, 26, 46, 0.95);
  border: 1px solid #4a4a8a;
  padding: 10px;
  border-radius: 4px;
  color: #e6e6fa;
  font-size: 0.8em;
  max-width: 200px;
  z-index: 1000;
  pointer-events: none;
  white-space: normal;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  left: 50%;
  transform: translateX(-50%);
  bottom: 100%;
  margin-bottom: 5px;
`;

const ActionButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  background-color: ${props => props.disabled ? '#666' : '#2c3e50'};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  
  &:hover {
    background-color: ${props => props.disabled ? '#666' : '#34495e'};
  }
`;