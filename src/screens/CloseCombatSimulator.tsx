import React, { useState } from 'react';
import styled from 'styled-components';
import { CombatScreen } from '../components/combat/CombatScreen';
import { Model, WeaponStats } from '../types/gameTypes';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #1a1a2e;
`;

const Title = styled.h1`
  color: #8080ff;
  font-family: 'Press Start 2P', cursive;
  text-align: center;
  margin: 20px 0;
  font-size: 2em;
  text-shadow: 0 0 10px rgba(128, 128, 255, 0.5);
`;

const brutalWarhammer: WeaponStats = {
  name: "Brutal Warhammer",
  ATK: 2,
  HTV: 3,
  DMG: 2,
  CRT: 4,
  RNG: 1
};

export const CloseCombatSimulator: React.FC = () => {
  const [winner, setWinner] = useState<Model | null>(null);

  const handleCombatEnd = (winner: Model) => {
    setWinner(winner);
  };

  return (
    <Container>
      <Title>Close Combat Simulator</Title>
      <CombatScreen
        attacker={{
          id: "savage-brute",
          name: "Savage Brute with Warhammer",
          faction: "Barbarians",
          bodyType: "Medium",
          tier: "normal",
          armor: "none",
          class: "Warrior",
          stats: { 
            MOV: 4, 
            DEF: 4, 
            SAV: 4, 
            WND: 16,
            AP: 1,
            PT: 0,
            SR: []
          },
          weapons: [brutalWarhammer],
          gear: [],
          currentWounds: 16,
          statusEffects: [],
          injuries: [],
          isReady: true,
          isHidden: false,
          position: { x: 0, y: 0 }
        }}
        defender={{
          id: "brute-greataxe",
          name: "Brute with Greataxe",
          faction: "Barbarians",
          bodyType: "Medium",
          tier: "normal",
          armor: "none",
          class: "Warrior",
          stats: { 
            MOV: 4, 
            DEF: 4, 
            SAV: 4, 
            WND: 12,
            AP: 1,
            PT: 0,
            SR: []
          },
          weapons: [{
            name: "Greataxe",
            ATK: 4,
            HTV: 4,
            DMG: 2,
            CRT: 4,
            RNG: 1
          }],
          gear: [],
          currentWounds: 12,
          statusEffects: [],
          injuries: [],
          isReady: true,
          isHidden: false,
          position: { x: 0, y: 0 }
        }}
        isMelee={true}
        onCombatEnd={handleCombatEnd}
      />
    </Container>
  );
};

export default CloseCombatSimulator;