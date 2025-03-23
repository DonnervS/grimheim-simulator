"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Crosshair, Shield, RefreshCw, X, Plus } from "lucide-react"
import Layout from "@/components/layout"

// Character stat component
function StatBlock({ label, value, icon }: { label: string; value: string | number; icon?: React.ReactNode }) {
  return (
    <div className="bg-secondary/60 rounded-md p-3 flex flex-col items-center">
      <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
        {icon}
        {label}
      </div>
      <div className="text-xl font-bold">{value}</div>
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

export default function RangedTestPage() {
  const router = useRouter()
  const [round, setRound] = useState(1)
  const [combatLog, setCombatLog] = useState<string[]>(["Witchhunter rolls 2 attack dice with 1 hits (0 critical)"])

  const addLogEntry = (entry: string) => {
    setCombatLog((prev) => [...prev, entry])
  }

  const handleNewRound = () => {
    setRound((prev) => prev + 1)
    addLogEntry(`Starting round ${round + 1}`)
  }

  const handleEndCombat = () => {
    router.push("/")
  }

  const handleRollAttack = () => {
    addLogEntry("Rolling attack dice...")
  }

  const handleRollSave = () => {
    addLogEntry("Rolling save dice...")
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-imfell text-primary text-4xl md:text-5xl mb-4">Ranged Combat Test</h1>
            <p className="text-xl text-muted-foreground">Ranged combat simulation</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Attacker Card */}
            <Card className="border border-primary/20">
              <CardHeader>
                <CardTitle className="font-imfell text-primary flex items-center gap-2">
                  <Crosshair className="h-5 w-5" />
                  Attacker
                </CardTitle>
                <CardDescription>Witchhunter</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <StatBlock label="MOV" value="4" />
                  <StatBlock label="DEF" value="3" />
                  <StatBlock label="SAV" value="5+" />
                  <StatBlock label="WND" value="25/25" />
                </div>

                <div>
                  <h3 className="font-imfell text-sm mb-2 text-primary/80">Special Rules</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Fearless</Badge>
                    <Badge variant="outline">Leader</Badge>
                    <Badge variant="outline">Hero</Badge>
                  </div>
                </div>

                <div>
                  <h3 className="font-imfell text-sm mb-2 text-blue-400">Pistol</h3>
                  <div className="grid grid-cols-2 gap-2 text-xs text-blue-300">
                    <div>RNG: 10"</div>
                    <div>ATK: 2D6</div>
                    <div>HTV: 3+</div>
                    <div>DMG: 2/4</div>
                    <div colSpan={2}>Armor Piercing</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Combat Area */}
            <Card className="border border-primary/20">
              <CardHeader>
                <CardTitle className="font-imfell text-center flex items-center justify-center gap-2">
                  <span className="text-blue-400">Round {round}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-imfell text-sm mb-2 text-primary/80 text-center">Attacker Dice</h3>
                  <div className="flex justify-center gap-2 mb-4">
                    <Dice value={2} type="miss" />
                    <Dice value={5} type="hit" />
                  </div>
                </div>

                <div className="flex justify-center gap-4">
                  <Button variant="outline" className="flex items-center gap-2" onClick={handleRollAttack}>
                    <RefreshCw className="h-4 w-4" />
                    Roll Attack
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2" onClick={handleRollSave}>
                    <RefreshCw className="h-4 w-4" />
                    Roll Save
                  </Button>
                </div>

                <div>
                  <h3 className="font-imfell text-sm mb-2 text-primary/80 text-center">Defender Dice</h3>
                  <div className="flex justify-center gap-2 mb-4">
                    <Dice value={3} type="miss" />
                    <Dice value={6} type="critical" />
                    <Dice value={4} type="block" />
                    <Dice value={3} type="miss" />
                  </div>
                </div>

                <div className="flex justify-center gap-4">
                  <Button
                    className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                    onClick={handleNewRound}
                  >
                    <Plus className="h-4 w-4" />
                    New Round
                  </Button>
                  <Button variant="destructive" className="flex items-center gap-2" onClick={handleEndCombat}>
                    <X className="h-4 w-4" />
                    End Combat
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Defender Card */}
            <Card className="border border-primary/20">
              <CardHeader>
                <CardTitle className="font-imfell text-primary flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Defender
                </CardTitle>
                <CardDescription>Zombie with Halberd and Shield</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <StatBlock label="MOV" value="3" />
                  <StatBlock label="DEF" value="3" />
                  <StatBlock label="SAV" value="6+" />
                  <StatBlock label="WND" value="8/8" />
                </div>

                <div>
                  <h3 className="font-imfell text-sm mb-2 text-primary/80">Special Rules</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Resilient</Badge>
                    <Badge variant="outline">Slow</Badge>
                    <Badge variant="outline">Necrotic Hunger</Badge>
                    <Badge variant="outline">Shield</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Combat Log */}
          <Card className="border border-primary/20 mb-8">
            <CardHeader>
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
        </div>
      </div>
    </Layout>
  )
}

