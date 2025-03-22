import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import styled from 'styled-components'
import BattleScreen from './screens/BattleScreen'
import MapScreen from './screens/MapScreen'
import CombatTestScreen from './screens/CombatTestScreen'
import { RangedTestScreen } from './screens/RangedTestScreen'
import StyleGuideScreen from './screens/StyleGuideScreen'
import ModernStyleGuideScreen from './screens/ModernStyleGuideScreen'

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #1a1a2e;
  color: #e6e6fa;
  font-family: 'Press Start 2P', cursive;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

const Header = styled.header`
  text-align: center;
  padding: 20px;
`

const MainMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
`

const MenuButton = styled(Link)`
  background-color: #4a4a8a;
  color: #e6e6fa;
  border: none;
  padding: 15px 30px;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'Press Start 2P', cursive;
  font-size: 14px;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background-color: #6a6aaa;
    transform: scale(1.05);
  }
`

const MainScreen = () => (
  <MainMenu>
    <MenuButton to="/map">Start Game</MenuButton>
    <MenuButton to="/combat-test">Combat Test</MenuButton>
    <MenuButton to="/ranged-test">Ranged Combat Test</MenuButton>
    <MenuButton to="/style-guide">Style Guide</MenuButton>
    <MenuButton to="/modern-style-guide">Modern Style Guide</MenuButton>
  </MainMenu>
);

function App() {
  return (
    <AppContainer>
      <Header>
        <h1>Grimheim Combat Simulator</h1>
      </Header>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/map" element={<MapScreen />} />
        <Route path="/battle" element={<BattleScreen />} />
        <Route path="/combat-test" element={<CombatTestScreen />} />
        <Route path="/ranged-test" element={<RangedTestScreen />} />
        <Route path="/style-guide" element={<StyleGuideScreen />} />
        <Route path="/modern-style-guide" element={<ModernStyleGuideScreen />} />
      </Routes>
    </AppContainer>
  )
}

export default App