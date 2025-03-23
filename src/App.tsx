import React, { useEffect } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import BattleScreen from './screens/BattleScreen'
import MapScreen from './screens/MapScreen'
import CombatTestScreen from './screens/CombatTestScreen'
import { RangedTestScreen } from './screens/RangedTestScreen'
import StyleGuideComponent from '../grimheim-style-guide/style-guide'

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: var(--primary-dark);
  color: var(--primary-light);
  font-family: 'Inter', sans-serif;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 260px 1px;
  height: 73px;
  left: 0px;
  right: 0px;
  top: 0px;
  background: rgba(28, 28, 28, 0.5);
  backdrop-filter: blur(2px);
`

const HeaderInner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  gap: 368.67px;
  width: 1400px;
  max-width: 1400px;
  height: 72px;
`

const HeaderLogo = styled(Link)`
  color: #F40B0B;
  font-size: 30px;
  font-weight: 400;
  font-family: 'IM Fell English', serif;
  text-decoration: none;
  line-height: 36px;
  display: flex;
  align-items: center;
  width: 127px;
  height: 36px;
  
  &:hover {
    text-decoration: none;
  }
`

const NavigationBar = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  margin: 0 auto;
  width: 875px;
  height: 40px;
`

const NavLink = styled(Link)<{ $active?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  height: 40px;
  border-radius: 6px;
  margin-left: 24px;
  background-color: ${props => props.$active ? 'rgba(244, 11, 11, 0.1)' : 'transparent'};
  color: ${props => props.$active ? '#F40B0B' : '#FAFAFA'};
  text-decoration: none;
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: ${props => props.$active ? '500' : '400'};
  font-size: 16px;
  line-height: 24px;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.$active ? 'rgba(244, 11, 11, 0.1)' : 'rgba(244, 11, 11, 0.05)'};
    text-decoration: none;
  }

  &:first-child {
    margin-left: 0;
  }

  svg {
    margin-right: 8px;
    stroke: ${props => props.$active ? '#F40B0B' : '#FAFAFA'};
  }
`

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px;
  width: 16px;
  height: 16px;
  margin-right: 8px;
`

const MainContent = styled.main`
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`

const Title = styled.h1`
  font-size: 2.5rem;
  line-height: 3rem;
  margin-bottom: 0.7rem;
  text-align: center;
  color: var(--primary-red);
  font-family: 'IM Fell English', serif;
  font-weight: normal;
  text-shadow: 0 0 10px rgba(220, 38, 38, 0.3);
`

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: var(--foreground);
  margin-bottom: 4rem;
  text-align: center;
  font-weight: 300;
  max-width: 800px;
`

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(300px, 400px));
  gap: 2rem;
  width: 100%;
  max-width: 850px;
  justify-content: center;
`

const Card = styled(Link)`
  background: var(--card);
  border-radius: var(--radius);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  text-decoration: none;
  color: var(--foreground);
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--card);
    text-decoration: none;
  }
`

const IconCircle = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(220, 38, 38, 0.15);
  margin-bottom: 1.8rem;
  transition: box-shadow 0.3s ease;

  ${Card}:hover & {
    box-shadow: none;
  }
`

const CardTitle = styled.h3`
  color: var(--primary-red);
  font-size: 1.5rem;
  margin-bottom: 0.7rem;
  font-family: 'IM Fell English', serif;
  font-weight: normal;
`

const CardDescription = styled.p`
  color: var(--muted-foreground);
  font-size: 0.875rem;
  margin: 0;
`

const Footer = styled.footer`
  text-align: center;
  padding: 1rem;
  color: var(--muted-foreground);
  font-size: 0.75rem;
  margin-top: auto;
`

// SVG Icon Components
const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const SetupIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

const CombatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
  </svg>
);

const RangedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="6"></circle>
    <circle cx="12" cy="12" r="2"></circle>
  </svg>
);

const MapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
    <line x1="8" y1="2" x2="8" y2="18"></line>
    <line x1="16" y1="6" x2="16" y2="22"></line>
  </svg>
);

const StyleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
  </svg>
);

// Play Icon for Cards
const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3"></polygon>
  </svg>
);

// Sword Icon for Cards
const SwordIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 17.5L3 6V3h3l11.5 11.5"></path>
    <path d="M13 19l6-6"></path>
    <path d="M16 16l4 4"></path>
    <path d="M19 21l2-2"></path>
  </svg>
);

// Target Icon for Cards
const TargetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="6"></circle>
    <circle cx="12" cy="12" r="2"></circle>
  </svg>
);

// Palette Icon for Cards
const PaletteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="13.5" cy="6.5" r="2.5"></circle>
    <circle cx="17.5" cy="10.5" r="2.5"></circle>
    <circle cx="8.5" cy="7.5" r="2.5"></circle>
    <circle cx="6.5" cy="12.5" r="2.5"></circle>
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path>
  </svg>
);

const Navigation = () => {
  const location = useLocation();
  
  return (
    <HeaderContainer>
      <HeaderInner>
        <HeaderLogo to="/">Grimheim</HeaderLogo>
        <NavigationBar>
          <NavLink to="/" $active={location.pathname === '/'}>
            <IconWrapper><HomeIcon /></IconWrapper> Home
          </NavLink>
          <NavLink to="/map" $active={location.pathname === '/map'}>
            <IconWrapper><MapIcon /></IconWrapper> Combat Setup
          </NavLink>
          <NavLink to="/combat-test" $active={location.pathname === '/combat-test'}>
            <IconWrapper><CombatIcon /></IconWrapper> Combat Test
          </NavLink>
          <NavLink to="/ranged-test" $active={location.pathname === '/ranged-test'}>
            <IconWrapper><RangedIcon /></IconWrapper> Ranged Test
          </NavLink>
          <NavLink to="/style-guide" $active={location.pathname === '/style-guide'}>
            <IconWrapper><StyleIcon /></IconWrapper> Style Guide
          </NavLink>
        </NavigationBar>
      </HeaderInner>
    </HeaderContainer>
  );
};

const MainScreen = () => (
  <MainContent>
    <Title>Grimheim Combat Simulator</Title>
    <Subtitle>A companion app for the Grimheim tabletop skirmisher game</Subtitle>
    
    <CardGrid>
      <Card to="/map">
        <IconCircle>
          <PlayIcon />
        </IconCircle>
        <CardTitle>Start Game</CardTitle>
        <CardDescription>Set up and start a new combat simulation</CardDescription>
      </Card>
      
      <Card to="/combat-test">
        <IconCircle>
          <SwordIcon />
        </IconCircle>
        <CardTitle>Combat Test</CardTitle>
        <CardDescription>Test melee combat mechanics</CardDescription>
      </Card>
      
      <Card to="/ranged-test">
        <IconCircle>
          <TargetIcon />
        </IconCircle>
        <CardTitle>Ranged Combat Test</CardTitle>
        <CardDescription>Test ranged combat mechanics</CardDescription>
      </Card>
      
      <Card to="/style-guide">
        <IconCircle>
          <PaletteIcon />
        </IconCircle>
        <CardTitle>Style Guide</CardTitle>
        <CardDescription>View the Grimheim design system</CardDescription>
      </Card>
    </CardGrid>
    
    <Footer>
      Grimheim Combat Simulator © 2025
    </Footer>
  </MainContent>
);

const StyleGuide: React.FC = () => {
  return (
    <MainContent>
      <StyleGuideComponent />
    </MainContent>
  );
};

function App() {
  return (
    <AppContainer>
      <Navigation />
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/map" element={<MapScreen />} />
        <Route path="/battle" element={<BattleScreen />} />
        <Route path="/combat-test" element={<CombatTestScreen />} />
        <Route path="/ranged-test" element={<RangedTestScreen />} />
        <Route path="/style-guide" element={<StyleGuide />} />
      </Routes>
    </AppContainer>
  )
}

export default App