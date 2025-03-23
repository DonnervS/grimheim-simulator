"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  MapIcon,
  ChevronRight,
  ChevronLeft,
  Move,
  Sword,
  Crosshair,
  Backpack,
  Eye,
  Target,
  RefreshCw,
  Dices,
  Info,
} from "lucide-react"
import Layout from "@/components/layout"

// Model type definition
interface Model {
  id: number
  name: string
  ap: number
  mov: number
  def: number
  sav: string
  wnd: string
  activated: boolean
  specialRules: string[]
  weapons: Weapon[]
  position: { x: number; y: number }
  player: "attacker" | "defender"
}

// Weapon type definition
interface Weapon {
  name: string
  rng: string
  atk: string
  htv: string
  dmg: string
  special?: string
}

// Terrain type definition
interface Terrain {
  type: "open" | "cover" | "blocking" | "climb"
  x: number
  y: number
  width: number
  height: number
  shape: "rect" | "circle"
  radius?: number
}

// Game state
interface GameState {
  turn: number
  phase: "deployment" | "game"
  activePlayer: "attacker" | "defender"
  selectedModel: Model | null
  selectedAction: string | null
  fateDice: number
}

export default function MapPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [showOpponentModels, setShowOpponentModels] = useState(true)
  const [expandedModelId, setExpandedModelId] = useState<number | null>(null)
  const [gameState, setGameState] = useState<GameState>({
    turn: 1,
    phase: "deployment",
    activePlayer: "attacker",
    selectedModel: null,
    selectedAction: null,
    fateDice: 3,
  })

  // Sample models data
  const [models, setModels] = useState<Model[]>([
    {
      id: 1,
      name: "Savage Sorcerer Lord",
      ap: 2,
      mov: 6,
      def: 3,
      sav: "4+",
      wnd: "25/25",
      activated: false,
      specialRules: ["Leader", "Hero", "Arcane", "Fly", "Medium Armor"],
      weapons: [
        {
          name: "Arcane Staff",
          rng: '8"',
          atk: "2D6",
          htv: "3+",
          dmg: "2/4",
          special: "Arcane Blast",
        },
      ],
      position: { x: 10, y: 25 },
      player: "attacker",
    },
    {
      id: 2,
      name: "Imperial Guard",
      ap: 1,
      mov: 4,
      def: 3,
      sav: "5+",
      wnd: "10/10",
      activated: false,
      specialRules: ["Shield", "Disciplined"],
      weapons: [
        {
          name: "Sword",
          rng: "Melee",
          atk: "1D6",
          htv: "4+",
          dmg: "1/3",
          special: "Parry",
        },
      ],
      position: { x: 15, y: 25 },
      player: "attacker",
    },
    {
      id: 3,
      name: "Zombie with Electro Coil",
      ap: 1,
      mov: 3,
      def: 3,
      sav: "6+",
      wnd: "8/8",
      activated: false,
      specialRules: ["Resilient", "Group", "Slow", "Necrotic Hunger"],
      weapons: [
        {
          name: "Shock Grasp",
          rng: '3"',
          atk: "2D4",
          htv: "4+",
          dmg: "2/6",
          special: "Stun",
        },
      ],
      position: { x: 10, y: 5 },
      player: "defender",
    },
    {
      id: 4,
      name: "Skeleton Archer",
      ap: 1,
      mov: 4,
      def: 2,
      sav: "6+",
      wnd: "5/5",
      activated: false,
      specialRules: ["Undead", "Brittle"],
      weapons: [
        {
          name: "Shortbow",
          rng: '16"',
          atk: "1D6",
          htv: "4+",
          dmg: "1/3",
        },
      ],
      position: { x: 20, y: 5 },
      player: "defender",
    },
  ])

  // Sample terrain data
  const [terrain, setTerrain] = useState<Terrain[]>([
    // Center circular structure
    { type: "open", x: 15, y: 15, width: 6, height: 6, shape: "circle", radius: 3 },
    { type: "blocking", x: 15, y: 15, width: 2, height: 2, shape: "circle", radius: 1 },

    // Cover elements (blue)
    { type: "cover", x: 10, y: 8, width: 4, height: 1, shape: "rect" },
    { type: "cover", x: 20, y: 8, width: 1, height: 1, shape: "rect" },
    { type: "cover", x: 18, y: 10, width: 4, height: 1, shape: "rect" },
    { type: "cover", x: 8, y: 20, width: 4, height: 1, shape: "rect" },
    { type: "cover", x: 18, y: 20, width: 4, height: 1, shape: "rect" },
    { type: "cover", x: 15, y: 23, width: 4, height: 1, shape: "rect" },

    // Blocking terrain (black with gray)
    { type: "blocking", x: 5, y: 12, width: 3, height: 4, shape: "rect" },
    { type: "blocking", x: 22, y: 12, width: 3, height: 4, shape: "rect" },
    { type: "blocking", x: 15, y: 10, width: 2, height: 2, shape: "rect" },
  ])

  // Filter models by player
  const playerModels = models.filter((model) => model.player === "attacker")
  const opponentModels = models.filter((model) => model.player === "defender")

  // Draw the map
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size (30x30 inches with 20px per inch)
    const scale = 20 // 20px per inch
    canvas.width = 30 * scale
    canvas.height = 30 * scale

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw grid
    ctx.strokeStyle = "#cccccc"
    ctx.lineWidth = 1

    // Draw vertical grid lines
    for (let i = 0; i <= 30; i++) {
      ctx.beginPath()
      ctx.moveTo(i * scale, 0)
      ctx.lineTo(i * scale, canvas.height)
      ctx.stroke()
    }

    // Draw horizontal grid lines
    for (let i = 0; i <= 30; i++) {
      ctx.beginPath()
      ctx.moveTo(0, i * scale)
      ctx.lineTo(canvas.width, i * scale)
      ctx.stroke()
    }

    // Draw deployment zones
    // Attacker zone (bottom)
    ctx.fillStyle = "rgba(0, 50, 100, 0.2)"
    ctx.fillRect(0, canvas.height - 6 * scale, canvas.width, 6 * scale)

    // Defender zone (top)
    ctx.fillStyle = "rgba(150, 0, 0, 0.2)"
    ctx.fillRect(0, 0, canvas.width, 6 * scale)

    // Draw deployment zone labels
    ctx.fillStyle = "#ffffff"
    ctx.font = 'bold 24px "IM Fell English", serif'
    ctx.textAlign = "center"
    ctx.fillText("Defender", canvas.width / 2, 3 * scale)
    ctx.fillText("Attacker", canvas.width / 2, canvas.height - 3 * scale)

    // Draw terrain
    terrain.forEach((t) => {
      if (t.shape === "rect") {
        if (t.type === "open") {
          ctx.fillStyle = "#999999"
        } else if (t.type === "cover") {
          ctx.fillStyle = "#3498db"
        } else if (t.type === "blocking") {
          ctx.fillStyle = "#333333"
        } else if (t.type === "climb") {
          ctx.fillStyle = "#e91e63"
        }

        ctx.fillRect(
          t.x * scale - (t.width * scale) / 2,
          t.y * scale - (t.height * scale) / 2,
          t.width * scale,
          t.height * scale,
        )
      } else if (t.shape === "circle" && t.radius) {
        if (t.type === "open") {
          ctx.fillStyle = "#999999"
        } else if (t.type === "cover") {
          ctx.fillStyle = "#3498db"
        } else if (t.type === "blocking") {
          ctx.fillStyle = "#333333"
        } else if (t.type === "climb") {
          ctx.fillStyle = "#e91e63"
        }

        ctx.beginPath()
        ctx.arc(t.x * scale, t.y * scale, t.radius * scale, 0, Math.PI * 2)
        ctx.fill()
      }
    })

    // Draw models
    models.forEach((model) => {
      // Draw model circle
      if (model.player === "attacker") {
        ctx.fillStyle = "#2ecc71" // Green for player models
      } else {
        ctx.fillStyle = "#e74c3c" // Red for opponent models
      }

      ctx.beginPath()
      ctx.arc(
        model.position.x * scale,
        model.position.y * scale,
        0.5 * scale, // 0.5 inch radius
        0,
        Math.PI * 2,
      )
      ctx.fill()

      // Draw model number
      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 16px sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(model.id.toString(), model.position.x * scale, model.position.y * scale)
    })

    // Draw movement path if a model is selected and MOVE action is chosen
    if (gameState.selectedModel && gameState.selectedAction === "MOVE") {
      const model = gameState.selectedModel

      // Draw movement radius
      ctx.strokeStyle = "rgba(46, 204, 113, 0.5)" // Semi-transparent green
      ctx.lineWidth = 2
      ctx.setLineDash([5, 5]) // Dashed line

      ctx.beginPath()
      ctx.arc(
        model.position.x * scale,
        model.position.y * scale,
        model.mov * scale, // Movement radius in inches
        0,
        Math.PI * 2,
      )
      ctx.stroke()
      ctx.setLineDash([]) // Reset dash
    }
  }, [models, terrain, gameState])

  // Handle model selection
  const handleModelClick = (model: Model) => {
    setGameState((prev) => ({
      ...prev,
      selectedModel: model,
    }))
    setExpandedModelId(model.id)
  }

  // Handle action selection
  const handleActionClick = (action: string) => {
    setGameState((prev) => ({
      ...prev,
      selectedAction: action,
    }))
  }

  // Toggle model details
  const toggleModelDetails = (id: number) => {
    setExpandedModelId(expandedModelId === id ? null : id)
  }

  // Activate/deactivate model
  const toggleModelActivation = (id: number) => {
    setModels(models.map((model) => (model.id === id ? { ...model, activated: !model.activated } : model)))
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="font-imfell text-primary text-4xl md:text-5xl mb-4">Grimheim Map</h1>
          <p className="text-xl text-muted-foreground">Battlefield view and warband management</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Left sidebar - Player models */}
          <div className="w-full lg:w-64 flex-shrink-0 order-2 lg:order-1">
            <Card className="border border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="font-imfell text-primary flex items-center gap-2">
                  <MapIcon className="h-5 w-5" />
                  Your Warband
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {playerModels.map((model) => (
                  <div key={model.id} className="space-y-2">
                    <div
                      className={`p-2 rounded-md cursor-pointer transition-colors ${
                        gameState.selectedModel?.id === model.id
                          ? "bg-primary/20 border border-primary/50"
                          : "bg-secondary/30 hover:bg-secondary/50"
                      } ${model.activated ? "opacity-50" : ""}`}
                      onClick={() => handleModelClick(model)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                            {model.id}
                          </div>
                          <div className="font-medium truncate">{model.name}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-secondary/50">
                            AP: {model.ap}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleModelDetails(model.id)
                            }}
                          >
                            <ChevronRight
                              className={`h-4 w-4 transition-transform ${expandedModelId === model.id ? "rotate-90" : ""}`}
                            />
                          </Button>
                        </div>
                      </div>

                      {expandedModelId === model.id && (
                        <div className="mt-2 pt-2 border-t border-border">
                          <div className="grid grid-cols-2 gap-2 mb-2">
                            <div className="text-sm">
                              <span className="text-muted-foreground">MOV:</span> {model.mov}
                            </div>
                            <div className="text-sm">
                              <span className="text-muted-foreground">DEF:</span> {model.def}
                            </div>
                            <div className="text-sm">
                              <span className="text-muted-foreground">SAV:</span> {model.sav}
                            </div>
                            <div className="text-sm">
                              <span className="text-muted-foreground">WND:</span> {model.wnd}
                            </div>
                          </div>

                          <div className="mb-2">
                            <div className="text-sm font-medium mb-1">Special Rules:</div>
                            <div className="flex flex-wrap gap-1">
                              {model.specialRules.map((rule, index) => (
                                <Badge key={index} variant="outline" className="text-xs bg-secondary/30">
                                  {rule}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <div className="text-sm font-medium mb-1">Weapons:</div>
                            {model.weapons.map((weapon, index) => (
                              <div key={index} className="bg-secondary/30 p-2 rounded-md text-sm">
                                <div className="font-medium text-primary">{weapon.name}</div>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-1">
                                  <div>
                                    <span className="text-muted-foreground">RNG:</span> {weapon.rng}
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">ATK:</span> {weapon.atk}
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">HTV:</span> {weapon.htv}
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">DMG:</span> {weapon.dmg}
                                  </div>
                                  {weapon.special && (
                                    <div className="col-span-2">
                                      <span className="text-muted-foreground">Special:</span> {weapon.special}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="mt-2 flex justify-between">
                            <Button
                              variant={model.activated ? "outline" : "default"}
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleModelActivation(model.id)
                              }}
                            >
                              {model.activated ? "Activate" : "Deactivate"}
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main map area */}
          <div className="flex-grow order-1 lg:order-2">
            <div className="bg-card border border-primary/20 rounded-lg overflow-hidden">
              <div className="relative w-full overflow-auto">
                <canvas ref={canvasRef} className="min-w-full" style={{ aspectRatio: "1/1" }}></canvas>
              </div>
            </div>
          </div>

          {/* Right sidebar - Opponent models */}
          <div className="w-full lg:w-64 flex-shrink-0 order-3">
            <Collapsible open={showOpponentModels} onOpenChange={setShowOpponentModels}>
              <Card className="border border-primary/20">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-imfell text-primary flex items-center gap-2">
                      <MapIcon className="h-5 w-5" />
                      Opponent's Warband
                    </CardTitle>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        {showOpponentModels ? (
                          <ChevronRight className="h-4 w-4" />
                        ) : (
                          <ChevronLeft className="h-4 w-4" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                </CardHeader>
                <CollapsibleContent>
                  <CardContent className="space-y-2">
                    {opponentModels.map((model) => (
                      <div key={model.id} className="space-y-2">
                        <div
                          className={`p-2 rounded-md cursor-pointer transition-colors ${
                            gameState.selectedModel?.id === model.id
                              ? "bg-primary/20 border border-primary/50"
                              : "bg-secondary/30 hover:bg-secondary/50"
                          } ${model.activated ? "opacity-50" : ""}`}
                          onClick={() => handleModelClick(model)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">
                                {model.id}
                              </div>
                              <div className="font-medium truncate">{model.name}</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="bg-secondary/50">
                                AP: {model.ap}
                              </Badge>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toggleModelDetails(model.id)
                                }}
                              >
                                <ChevronRight
                                  className={`h-4 w-4 transition-transform ${expandedModelId === model.id ? "rotate-90" : ""}`}
                                />
                              </Button>
                            </div>
                          </div>

                          {expandedModelId === model.id && (
                            <div className="mt-2 pt-2 border-t border-border">
                              <div className="grid grid-cols-2 gap-2 mb-2">
                                <div className="text-sm">
                                  <span className="text-muted-foreground">MOV:</span> {model.mov}
                                </div>
                                <div className="text-sm">
                                  <span className="text-muted-foreground">DEF:</span> {model.def}
                                </div>
                                <div className="text-sm">
                                  <span className="text-muted-foreground">SAV:</span> {model.sav}
                                </div>
                                <div className="text-sm">
                                  <span className="text-muted-foreground">WND:</span> {model.wnd}
                                </div>
                              </div>

                              <div className="mb-2">
                                <div className="text-sm font-medium mb-1">Special Rules:</div>
                                <div className="flex flex-wrap gap-1">
                                  {model.specialRules.map((rule, index) => (
                                    <Badge key={index} variant="outline" className="text-xs bg-secondary/30">
                                      {rule}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <div className="text-sm font-medium mb-1">Weapons:</div>
                                {model.weapons.map((weapon, index) => (
                                  <div key={index} className="bg-secondary/30 p-2 rounded-md text-sm">
                                    <div className="font-medium text-primary">{weapon.name}</div>
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-1">
                                      <div>
                                        <span className="text-muted-foreground">RNG:</span> {weapon.rng}
                                      </div>
                                      <div>
                                        <span className="text-muted-foreground">ATK:</span> {weapon.atk}
                                      </div>
                                      <div>
                                        <span className="text-muted-foreground">HTV:</span> {weapon.htv}
                                      </div>
                                      <div>
                                        <span className="text-muted-foreground">DMG:</span> {weapon.dmg}
                                      </div>
                                      {weapon.special && (
                                        <div className="col-span-2">
                                          <span className="text-muted-foreground">Special:</span> {weapon.special}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          </div>
        </div>

        {/* Bottom action bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-primary/20 py-2 z-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Game info */}
              <div className="flex items-center gap-4">
                <div className="bg-secondary/50 px-3 py-1 rounded-md">
                  <span className="text-sm text-muted-foreground">Turn:</span>
                  <span className="ml-2 font-medium">{gameState.turn}</span>
                </div>
                <div className="bg-secondary/50 px-3 py-1 rounded-md">
                  <span className="text-sm text-muted-foreground">Phase:</span>
                  <span className="ml-2 font-medium capitalize">{gameState.phase}</span>
                </div>
                <div className="bg-secondary/50 px-3 py-1 rounded-md">
                  <span className="text-sm text-muted-foreground">Active Player:</span>
                  <span className="ml-2 font-medium capitalize">{gameState.activePlayer}</span>
                </div>
              </div>

              {/* Fate dice */}
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Dices className="h-4 w-4" />
                        <span>Fate Dice: {gameState.fateDice}</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Click to use Fate Dice</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-wrap">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={gameState.selectedAction === "MOVE" ? "default" : "outline"}
                        className="flex items-center gap-2"
                        onClick={() => handleActionClick("MOVE")}
                        disabled={!gameState.selectedModel}
                      >
                        <Move className="h-4 w-4" />
                        <span>Move</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Move your model</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={gameState.selectedAction === "FIGHT" ? "default" : "outline"}
                        className="flex items-center gap-2"
                        onClick={() => handleActionClick("FIGHT")}
                        disabled={!gameState.selectedModel}
                      >
                        <Sword className="h-4 w-4" />
                        <span>Fight</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Engage in melee combat</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={gameState.selectedAction === "SHOOT" ? "default" : "outline"}
                        className="flex items-center gap-2"
                        onClick={() => handleActionClick("SHOOT")}
                        disabled={!gameState.selectedModel}
                      >
                        <Crosshair className="h-4 w-4" />
                        <span>Shoot</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Make a ranged attack</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={gameState.selectedAction === "LOOT" ? "default" : "outline"}
                        className="flex items-center gap-2"
                        onClick={() => handleActionClick("LOOT")}
                        disabled={!gameState.selectedModel}
                      >
                        <Backpack className="h-4 w-4" />
                        <span>Loot</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Loot an objective or corpse</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={gameState.selectedAction === "HIDE" ? "default" : "outline"}
                        className="flex items-center gap-2"
                        onClick={() => handleActionClick("HIDE")}
                        disabled={!gameState.selectedModel}
                      >
                        <Eye className="h-4 w-4" />
                        <span>Hide</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Hide your model from enemies</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={gameState.selectedAction === "OVERWATCH" ? "default" : "outline"}
                        className="flex items-center gap-2"
                        onClick={() => handleActionClick("OVERWATCH")}
                        disabled={!gameState.selectedModel}
                      >
                        <Target className="h-4 w-4" />
                        <span>Overwatch</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Set up overwatch to react to enemy movement</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={gameState.selectedAction === "RECOVER" ? "default" : "outline"}
                        className="flex items-center gap-2"
                        onClick={() => handleActionClick("RECOVER")}
                        disabled={!gameState.selectedModel}
                      >
                        <RefreshCw className="h-4 w-4" />
                        <span>Recover</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Recover from status effects</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-2" onClick={() => {}}>
                        <Info className="h-4 w-4" />
                        <span>Help</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Show game rules and help</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

