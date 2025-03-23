import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: 1fr 100px;
  gap: 1.25rem;
  padding: 1.25rem;
`

const MapView = styled.div`
  grid-column: 2;
  grid-row: 1;
  background: var(--card);
  border: 1px solid var(--primary-red);
  border-radius: 2px;
  position: relative;
  box-shadow: 0 0 20px rgba(220, 38, 38, 0.1);
`

const SidePanel = styled.div`
  background: var(--card);
  border: 1px solid var(--primary-red);
  border-radius: 2px;
  padding: 1.25rem;
  box-shadow: 0 0 20px rgba(220, 38, 38, 0.1);
`

const ActionBar = styled.div`
  grid-column: 1 / -1;
  grid-row: 2;
  background: var(--card);
  border: 1px solid var(--primary-red);
  border-radius: 2px;
  padding: 1.25rem;
  display: flex;
  gap: 1rem;
  box-shadow: 0 0 20px rgba(220, 38, 38, 0.1);
`

const ActionButton = styled.button`
  background: var(--accent);
  color: var(--primary-light);
  border: 1px solid var(--primary-red);
  border-radius: 2px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-family: 'IM Fell English', serif;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(220, 38, 38, 0.1);
    transform: translateY(-2px);
    box-shadow: 0 0 20px rgba(220, 38, 38, 0.2);
  }
`

const TestButton = styled(ActionButton)`
  margin-left: auto;
  background: var(--secondary-blue);
  
  &:hover {
    background: rgba(59, 130, 246, 0.1);
  }
`

function MapScreen() {
  const navigate = useNavigate();

  return (
    <MapContainer>
      <SidePanel>
        <h2>Warband Info</h2>
        {/* Hier kommt später die Warband-Information */}
      </SidePanel>
      
      <MapView>
        {/* Hier kommt später die Kartenansicht */}
      </MapView>
      
      <SidePanel>
        <h2>Gegner Info</h2>
        {/* Hier kommt später die Gegner-Information */}
      </SidePanel>
      
      <ActionBar>
        <ActionButton>Bewegen</ActionButton>
        <ActionButton>Kämpfen</ActionButton>
        <ActionButton>Zug Beenden</ActionButton>
        <TestButton onClick={() => navigate('/combat-test')}>
          Combat Test
        </TestButton>
      </ActionBar>
    </MapContainer>
  )
}

export default MapScreen