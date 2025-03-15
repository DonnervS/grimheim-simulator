import React from 'react'
import { Routes, Route } from 'react-router-dom'
import styled from 'styled-components'
import BattleScreen from './screens/BattleScreen'
import MapScreen from './screens/MapScreen'
import CombatTestScreen from './screens/CombatTestScreen'

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #1a1a2e;
  color: #e6e6fa;
  font-family: 'Press Start 2P', cursive;
  overflow: hidden;
`

function App() {
  return (
    <AppContainer>
      <Routes>
        <Route path="/" element={<MapScreen />} />
        <Route path="/battle" element={<BattleScreen />} />
        <Route path="/combat-test" element={<CombatTestScreen />} />
      </Routes>
    </AppContainer>
  )
}

export default App