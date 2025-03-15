import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import MapScreen from './components/map/MapScreen';
import CombatScreen from './components/combat/CombatScreen';
import { GlobalStyle } from './styles/GlobalStyle';

const AppContainer = styled.div`
  min-height: 100vh;
  background: #1a1a2e;
  color: #fff;
  font-family: 'Roboto', sans-serif;
  overflow: hidden;
`

const Header = styled.header`
  text-align: center;
  padding: 20px;
`

function App() {
  return (
    <AppContainer>
      <Header>
        <h1>Grimheim Combat Simulator</h1>
      </Header>
      <Routes>
        <Route path="/" element={<MapScreen />} />
        <Route path="/combat" element={<CombatScreen />} />
      </Routes>
      <GlobalStyle />
    </AppContainer>
  );
}

export default App;