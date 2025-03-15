import { create } from 'zustand'
import { GameState, Model, Warband } from '../types/gameTypes'

interface GameStore extends GameState {
  // Spielablauf
  initializeGame: (player1Warband: Warband, player2Warband: Warband) => void;
  rollInitiative: () => void;
  rollFateDice: () => void;
  activateModel: (modelId: string) => void;
  endTurn: () => void;
  
  // Modell-Aktionen
  moveModel: (modelId: string, x: number, y: number) => void;
  performAction: (modelId: string, action: string, target?: string) => void;
  applyDamage: (modelId: string, damage: number) => void;
  applyStatusEffect: (modelId: string, effect: string) => void;
  removeStatusEffect: (modelId: string, effect: string) => void;
  
  // Hilfsfunktionen
  isModelInMeleeRange: (model1Id: string, model2Id: string) => boolean;
  isModelInLineOfSight: (model1Id: string, model2Id: string) => boolean;
  isModelInCover: (modelId: string) => boolean;
  calculateDistance: (model1Id: string, model2Id: string) => number;
}

const initialState: GameState = {
  turn: 1,
  phase: 'initiative',
  activePlayer: 'player1',
  player1: {
    warband: {
      id: '',
      name: '',
      faction: '',
      models: [],
      totalPoints: 0,
      victoryPoints: 0,
      fateDice: []
    },
    fateDice: []
  },
  player2: {
    warband: {
      id: '',
      name: '',
      faction: '',
      models: [],
      totalPoints: 0,
      victoryPoints: 0,
      fateDice: []
    },
    fateDice: []
  },
  missionObjectives: []
}

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,

  // Spielablauf
  initializeGame: (player1Warband: Warband, player2Warband: Warband) => {
    set({
      player1: { ...initialState.player1, warband: player1Warband },
      player2: { ...initialState.player2, warband: player2Warband }
    })
  },

  rollInitiative: () => {
    const player1Roll = Math.floor(Math.random() * 6) + 1
    const player2Roll = Math.floor(Math.random() * 6) + 1
    set({ activePlayer: player1Roll >= player2Roll ? 'player1' : 'player2' })
  },

  rollFateDice: () => {
    const rollDice = (count: number) => Array.from({ length: count }, () => Math.floor(Math.random() * 6) + 1)
    
    const state = get()
    set({
      player1: { ...state.player1, fateDice: rollDice(3) },
      player2: { ...state.player2, fateDice: rollDice(3) },
      phase: 'action'
    })
  },

  activateModel: (modelId: string) => {
    const state = get()
    const player = state.activePlayer === 'player1' ? state.player1 : state.player2
    
    const updatedModels = player.warband.models.map(model => 
      model.id === modelId ? { ...model, isReady: false } : model
    )

    set({
      [state.activePlayer]: {
        ...player,
        warband: { ...player.warband, models: updatedModels }
      }
    })
  },

  endTurn: () => {
    const state = get()
    if (state.turn >= 4) {
      // Spiel beenden oder 5. Runde prüfen
      const pointDifference = Math.abs(state.player1.warband.victoryPoints - state.player2.warband.victoryPoints)
      if (pointDifference >= 5) {
        // Spiel beenden
        return
      }
    }

    // Alle Modelle wieder aktivieren
    const resetModels = (warband: Warband): Warband => ({
      ...warband,
      models: warband.models.map(model => ({ ...model, isReady: true }))
    })

    set({
      turn: state.turn + 1,
      phase: 'initiative',
      player1: { ...state.player1, warband: resetModels(state.player1.warband) },
      player2: { ...state.player2, warband: resetModels(state.player2.warband) }
    })
  },

  // Modell-Aktionen
  moveModel: (modelId: string, x: number, y: number) => {
    const state = get()
    const player = state.activePlayer === 'player1' ? state.player1 : state.player2
    
    const updatedModels = player.warband.models.map(model => 
      model.id === modelId ? { ...model, position: { x, y } } : model
    )

    set({
      [state.activePlayer]: {
        ...player,
        warband: { ...player.warband, models: updatedModels }
      }
    })
  },

  performAction: (modelId: string, action: string, target?: string) => {
    // Implementierung der verschiedenen Aktionen
    // Dies wird später erweitert
  },

  applyDamage: (modelId: string, damage: number) => {
    const state = get()
    const allModels = [...state.player1.warband.models, ...state.player2.warband.models]
    const model = allModels.find(m => m.id === modelId)
    
    if (!model) return

    const newWounds = Math.max(0, model.currentWounds - damage)
    const isDefeated = newWounds === 0

    // Verletzungen und Effekte anwenden
    if (isDefeated) {
      // Modell entfernen
    } else if (newWounds < model.stats.WND) {
      // Verletzungswurf
      const injuryRoll = Math.floor(Math.random() * 6) + 1
      let injury: string
      switch(injuryRoll) {
        case 1: injury = 'Head'; break
        case 2:
        case 3: injury = 'Arm'; break
        case 4:
        case 5: injury = 'Leg'; break
        default: injury = 'None'
      }
      
      // Verletzung anwenden
      // Dies wird später implementiert
    }
  },

  applyStatusEffect: (modelId: string, effect: string) => {
    const state = get()
    const allModels = [...state.player1.warband.models, ...state.player2.warband.models]
    const modelIndex = allModels.findIndex(m => m.id === modelId)
    
    if (modelIndex === -1) return

    const model = allModels[modelIndex]
    if (!model.statusEffects.includes(effect)) {
      model.statusEffects.push(effect)
      // Update model
    }
  },

  removeStatusEffect: (modelId: string, effect: string) => {
    const state = get()
    const allModels = [...state.player1.warband.models, ...state.player2.warband.models]
    const modelIndex = allModels.findIndex(m => m.id === modelId)
    
    if (modelIndex === -1) return

    const model = allModels[modelIndex]
    model.statusEffects = model.statusEffects.filter(e => e !== effect)
    // Update model
  },

  // Hilfsfunktionen
  isModelInMeleeRange: (model1Id: string, model2Id: string) => {
    const state = get()
    const allModels = [...state.player1.warband.models, ...state.player2.warband.models]
    const model1 = allModels.find(m => m.id === model1Id)
    const model2 = allModels.find(m => m.id === model2Id)
    
    if (!model1 || !model2) return false

    const distance = Math.sqrt(
      Math.pow(model2.position.x - model1.position.x, 2) +
      Math.pow(model2.position.y - model1.position.y, 2)
    )

    return distance <= 1 // 1 Zoll Nahkampfreichweite
  },

  isModelInLineOfSight: (model1Id: string, model2Id: string) => {
    // Implementierung der Sichtlinien-Prüfung
    // Dies wird später erweitert
    return true
  },

  isModelInCover: (modelId: string) => {
    // Implementierung der Deckungsprüfung
    // Dies wird später erweitert
    return false
  },

  calculateDistance: (model1Id: string, model2Id: string) => {
    const state = get()
    const allModels = [...state.player1.warband.models, ...state.player2.warband.models]
    const model1 = allModels.find(m => m.id === model1Id)
    const model2 = allModels.find(m => m.id === model2Id)
    
    if (!model1 || !model2) return Infinity

    return Math.sqrt(
      Math.pow(model2.position.x - model1.position.x, 2) +
      Math.pow(model2.position.y - model1.position.y, 2)
    )
  }
}))