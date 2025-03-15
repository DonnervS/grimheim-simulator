import styled from 'styled-components'

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: 1fr 100px;
  gap: 10px;
  padding: 10px;
`

const MapView = styled.div`
  grid-column: 2;
  grid-row: 1;
  background-color: #2a2a4a;
  border: 2px solid #4a4a8a;
  border-radius: 8px;
  position: relative;
`

const SidePanel = styled.div`
  background-color: #2a2a4a;
  border: 2px solid #4a4a8a;
  border-radius: 8px;
  padding: 10px;
`

const ActionBar = styled.div`
  grid-column: 1 / -1;
  grid-row: 2;
  background-color: #2a2a4a;
  border: 2px solid #4a4a8a;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  gap: 10px;
`

const ActionButton = styled.button`
  background-color: #4a4a8a;
  color: #e6e6fa;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'Press Start 2P', cursive;
  font-size: 12px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #6a6aaa;
  }
`

function MapScreen() {
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
      </ActionBar>
    </MapContainer>
  )
}

export default MapScreen