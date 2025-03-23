"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sword, Shield, RefreshCw, X, ArrowRight } from "lucide-react"
import Layout from "@/components/layout"

// Character stat component based on the style guide
function ModelStat({ name, value, description }: { name: string; value: string | number; description: string }) {
  return (
    <div className="bg-secondary p-3 rounded-md flex flex-col items-center">
      <div className="text-xs text-muted-foreground">{description}</div>
      <div className="flex items-baseline gap-2 mt-1">
        <span className="font-imfell text-amber-500 text-lg">{name}</span>
        <span className="font-bold text-xl">{value}</span>
      </div>
    </div>
  )
}

// Weapon stat component based on the style guide
function WeaponStat({ name, value, description }: { name: string; value: string | number; description: string }) {
  return (
    <div className="bg-secondary p-3 rounded-md flex flex-col items-center">
      <div className="text-xs text-muted-foreground">{description}</div>
      <div className="flex items-baseline gap-2 mt-1">
        <span className="font-imfell text-primary text-lg">{name}</span>
        <span className="font-bold text-xl">{value}</span>
      </div>
    </div>
  )
}

// Dice component
function Dice({ value, type }: { value: number; type: "hit" | "block" | "critical" | "miss" }) {
  const bgColor =
    type === "hit"
      ? "bg-red-600"
      : type === "block"
        ? "bg-blue-600"
        : type === "critical"
          ? "bg-amber-500"
          : "bg-gray-700"

  const textColor = type === "critical" ? "text-black" : "text-white"

  return (
    <div
      className={`${bgColor} ${textColor} w-12 h-12 rounded-md flex items-center justify-center font-bold text-xl shadow-md`}
    >
      {value}
    </div>
  )
}

// Weapon card component
function WeaponCard({ name, stats }: { name: string; stats: { label: string; value: string }[] }) {
  return (
    <Card className="border border-primary/20 bg-secondary/30">
      <CardHeader className="pb-2">
        <CardTitle className="font-imfell text-lg text-primary">{name}</CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="grid grid-cols-2 gap-2 text-sm">
          {stats.map((stat, index) => (
            <div key={index} className="flex justify-between">
              <span className="text-muted-foreground">{stat.label}:</span>
              <span className="font-medium">{stat.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function CombatTestPage() {
  const router = useRouter()
  const [combatLog, setCombatLog] = useState<string[]>([
    "Attacker rolls 2 hits (0 critical) and 0 successful blocks (SAV 4+)",
    "Defender rolls 2 hits (0 critical) and 0 successful blocks (SAV 6+)",
  ])

  const addLogEntry = (entry: string) => {
    setCombatLog((prev) => [...prev, entry])
  }

  const handleSkipTurn = () => {
    addLogEntry("Turn skipped")
  }

  const handleEndCombat = () => {
    router.push("/")
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-imfell text-primary text-4xl md:text-5xl mb-4">Combat Test</h1>
            <p className="text-xl text-muted-foreground">Melee combat simulation</p>
          </div>

          {/* Combat Area - Dice Rolls */}
          <Card className="border border-primary/20 mb-8">
            <CardHeader>
              <CardTitle className="font-imfell text-center text-2xl">Combat Round</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Attacker Dice */}
                <div className="space-y-4">
                  <h3 className="font-imfell text-lg text-primary flex items-center gap-2">
                    <Sword className="h-5 w-5" />
                    Attacker Dice
                  </h3>
                  <div className="bg-secondary/30 rounded-md p-4">
                    <div className="flex justify-center gap-2 mb-4">
                      <Dice value={5} type="hit" />
                      <Dice value={1} type="miss" />
                      <Dice value={1} type="miss" />
                    </div>
                    <div className="text-sm text-center">
                      <span className="text-red-400 font-medium">1 Hit</span>,
                      <span className="text-amber-400 font-medium"> 0 Critical</span>,
                      <span className="text-gray-400 font-medium"> 2 Misses</span>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 border-primary/20 hover:bg-primary/10"
                      onClick={() => addLogEntry("Rolling attack dice...")}
                    >
                      <RefreshCw className="h-4 w-4" />
                      Roll Again
                    </Button>
                  </div>
                </div>

                {/* Defender Dice */}
                <div className="space-y-4">
                  <h3 className="font-imfell text-lg text-primary flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Defender Dice
                  </h3>
                  <div className="bg-secondary/30 rounded-md p-4">
                    <div className="flex justify-center gap-2 mb-4">
                      <Dice value={4} type="miss" />
                      <Dice value={4} type="miss" />
                    </div>
                    <div className="text-sm text-center">
                      <span className="text-red-400 font-medium">0 Hit</span>,
                      <span className="text-amber-400 font-medium"> 0 Critical</span>,
                      <span className="text-gray-400 font-medium"> 2 Misses</span>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 border-primary/20 hover:bg-primary/10"
                      onClick={() => addLogEntry("Rolling defense dice...")}
                    >
                      <RefreshCw className="h-4 w-4" />
                      Roll Again
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-4 mt-8">
                <Button className="flex items-center gap-2 bg-primary/80 hover:bg-primary" onClick={handleSkipTurn}>
                  <ArrowRight className="h-4 w-4" />
                  Next Turn
                </Button>
                <Button variant="destructive" className="flex items-center gap-2" onClick={handleEndCombat}>
                  <X className="h-4 w-4" />
                  End Combat
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Combat Log */}
          <Card className="border border-primary/20 mb-8">
            <CardHeader className="pb-2">
              <CardTitle className="font-imfell text-primary flex items-center gap-2">
                <RefreshCw className="h-5 w-5" />
                Combat Log
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-secondary/30 rounded-md p-4 h-32 overflow-y-auto font-mono text-sm">
                {combatLog.map((entry, index) => (
                  <div key={index} className="mb-1">
                    {entry}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Combatants */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Attacker */}
            <Card className="border border-primary/20">
              <CardHeader>
                <CardTitle className="font-imfell text-primary flex items-center gap-2">
                  <Sword className="h-5 w-5" />
                  Attacker
                </CardTitle>
                <CardDescription>Savage Sorcerer Lord</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <ModelStat name="MOV" value="6" description="Movement" />
                  <ModelStat name="DEF" value="3" description="Defense" />
                  <ModelStat name="SAV" value="4+" description="Save" />
                  <ModelStat name="WND" value="25/25" description="Wounds" />
                </div>

                {/* Special Rules */}
                <div>
                  <h3 className="font-imfell text-lg mb-3">Special Rules</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-secondary/50">
                      Leader
                    </Badge>
                    <Badge variant="outline" className="bg-secondary/50">
                      Hero
                    </Badge>
                    <Badge variant="outline" className="bg-secondary/50">
                      Arcane
                    </Badge>
                    <Badge variant="outline" className="bg-secondary/50">
                      Fly
                    </Badge>
                    <Badge variant="outline" className="bg-secondary/50">
                      Medium Armor
                    </Badge>
                  </div>
                </div>

                {/* Weapon */}
                <div>
                  <h3 className="font-imfell text-lg mb-3">Weapons</h3>
                  <WeaponCard
                    name="Arcane Staff"
                    stats={[
                      { label: "RNG", value: '8"' },
                      { label: "ATK", value: "2D6" },
                      { label: "HTV", value: "3+" },
                      { label: "DMG", value: "2/4" },
                      { label: "Special", value: "Arcane Blast" },
                    ]}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Defender */}
            <Card className="border border-primary/20">
              <CardHeader>
                <CardTitle className="font-imfell text-primary flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Defender
                </CardTitle>
                <CardDescription>Zombie with Electro Coil</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <ModelStat name="MOV" value="3" description="Movement" />
                  <ModelStat name="DEF" value="3" description="Defense" />
                  <ModelStat name="SAV" value="6+" description="Save" />
                  <ModelStat name="WND" value="8/8" description="Wounds" />
                </div>

                {/* Special Rules */}
                <div>
                  <h3 className="font-imfell text-lg mb-3">Special Rules</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-secondary/50">
                      Resilient
                    </Badge>
                    <Badge variant="outline" className="bg-secondary/50">
                      Group
                    </Badge>
                    <Badge variant="outline" className="bg-secondary/50">
                      Slow
                    </Badge>
                    <Badge variant="outline" className="bg-secondary/50">
                      Necrotic Hunger
                    </Badge>
                  </div>
                </div>

                {/* Weapon */}
                <div>
                  <h3 className="font-imfell text-lg mb-3">Weapons</h3>
                  <WeaponCard
                    name="Shock Grasp"
                    stats={[
                      { label: "RNG", value: '3"' },
                      { label: "ATK", value: "2D4" },
                      { label: "HTV", value: "4+" },
                      { label: "DMG", value: "2/6" },
                      { label: "Special", value: "Stun" },
                    ]}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  )
}

