import styled from 'styled-components'

const BattleContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 250px 1fr 250px;
  grid-template-rows: 1fr 150px;
  gap: 10px;
  padding: 10px;
`

const BattleView = styled.div`
  grid-column: 2;
  grid-row: 1;
  background-color: #2a2a4a;
  border: 2px solid #4a4a8a;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
`

const SidePanel = styled.div`
  background-color: #2a2a4a;
  border: 2px solid #4a4a8a;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const ModelCard = styled.div`
  background-color: #3a3a6a;
  border: 1px solid #5a5aaa;
  border-radius: 4px;
  padding: 8px;
  font-size: 12px;
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

function BattleScreen() {
  return (
    <BattleContainer>
      <SidePanel>
        <h2>Aktiver Kämpfer</h2>
        <ModelCard>
          <h3>Name</h3>
          <p>HP: 10/10</p>
          <p>AP: 3/3</p>
        </ModelCard>
      </SidePanel>
      
      <BattleView>
        {/* Hier kommt später die Kampfansicht */}
      </BattleView>
      
      <SidePanel>
        <h2>Gegner</h2>
        <ModelCard>
          <h3>Gegner 1</h3>
          <p>HP: 8/8</p>
        </ModelCard>
        <ModelCard>
          <h3>Gegner 2</h3>
          <p>HP: 12/12</p>
        </ModelCard>
      </SidePanel>
      
      <ActionBar>
        <ActionButton>Angriff</ActionButton>
        <ActionButton>Verteidigung</ActionButton>
        <ActionButton>Spezial</ActionButton>
        <ActionButton>Fliehen</ActionButton>
      </ActionBar>
    </BattleContainer>
  )
}

export default BattleScreen