import styled from 'styled-components'

const BattleContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 250px 1fr 250px;
  grid-template-rows: 1fr 150px;
  gap: 2rem;
  padding: 2rem;
`

const BattleView = styled.div`
  grid-column: 2;
  grid-row: 1;
  background: var(--card);
  border: 1px solid var(--primary-red);
  border-radius: 2px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(220, 38, 38, 0.1);
`

const SidePanel = styled.div`
  background: var(--card);
  border: 1px solid var(--primary-red);
  border-radius: 2px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0 0 20px rgba(220, 38, 38, 0.1);
`

const ModelCard = styled.div`
  background: var(--accent);
  border: 1px solid var(--primary-red);
  border-radius: 2px;
  padding: 0.75rem;
  font-size: 0.875rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 20px rgba(220, 38, 38, 0.2);
  }
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
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(220, 38, 38, 0.1);
    transform: translateY(-2px);
    box-shadow: 0 0 20px rgba(220, 38, 38, 0.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
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