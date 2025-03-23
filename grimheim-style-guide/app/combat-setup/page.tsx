"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skull, Shield, Sword, Users } from "lucide-react"
import Layout from "@/components/layout"

const factions = ["Primordial", "Beasts", "Imperial", "Undead"]

const charactersByFaction = {
  Primordial: ["Elemental Guardian", "Chaos Spawn", "Ancient One"],
  Beasts: ["Dire Wolf", "Minotaur", "Wyvern"],
  Imperial: ["Knight Captain", "Royal Guard", "Battle Mage"],
  Undead: ["Zombie with Electro Coil", "Skeleton Archer", "Savage Sorcerer Lord"],
}

const FactionIcon = ({ faction }: { faction: string }) => {
  switch (faction) {
    case "Primordial":
      return <Skull className="h-5 w-5" />
    case "Beasts":
      return <Sword className="h-5 w-5" />
    case "Imperial":
      return <Shield className="h-5 w-5" />
    case "Undead":
      return <Users className="h-5 w-5" />
    default:
      return null
  }
}

export default function CombatSetupPage() {
  const router = useRouter()
  const [attackerFaction, setAttackerFaction] = useState("Undead")
  const [defenderFaction, setDefenderFaction] = useState("Undead")
  const [attacker, setAttacker] = useState("Savage Sorcerer Lord")
  const [defender, setDefender] = useState("Zombie with Electro Coil")

  const handleStartCombat = () => {
    router.push("/combat-test")
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-imfell text-primary text-4xl md:text-5xl mb-4">Combat Setup</h1>
            <p className="text-xl text-muted-foreground">Select your combatants and prepare for battle</p>
          </div>

          <Tabs defaultValue="attacker" className="mb-12">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="attacker">Attacker</TabsTrigger>
              <TabsTrigger value="defender">Defender</TabsTrigger>
            </TabsList>

            <TabsContent value="attacker" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-imfell text-2xl">Select Attacker</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-imfell text-lg mb-4">Faction</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {factions.map((faction) => (
                          <Button
                            key={faction}
                            variant={attackerFaction === faction ? "default" : "outline"}
                            className={`flex items-center gap-2 ${
                              attackerFaction === faction
                                ? "bg-primary/20 text-primary border-primary"
                                : "hover:bg-primary/10 border-primary/20"
                            }`}
                            onClick={() => {
                              setAttackerFaction(faction)
                              setAttacker(charactersByFaction[faction as keyof typeof charactersByFaction][0])
                            }}
                          >
                            <FactionIcon faction={faction} />
                            {faction}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-imfell text-lg mb-4">Character</h3>
                      <Select value={attacker} onValueChange={setAttacker}>
                        <SelectTrigger className="w-full border-primary/20">
                          <SelectValue placeholder="Select character" />
                        </SelectTrigger>
                        <SelectContent>
                          {charactersByFaction[attackerFaction as keyof typeof charactersByFaction].map((character) => (
                            <SelectItem key={character} value={character}>
                              {character}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="defender" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-imfell text-2xl">Select Defender</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-imfell text-lg mb-4">Faction</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {factions.map((faction) => (
                          <Button
                            key={faction}
                            variant={defenderFaction === faction ? "default" : "outline"}
                            className={`flex items-center gap-2 ${
                              defenderFaction === faction
                                ? "bg-primary/20 text-primary border-primary"
                                : "hover:bg-primary/10 border-primary/20"
                            }`}
                            onClick={() => {
                              setDefenderFaction(faction)
                              setDefender(charactersByFaction[faction as keyof typeof charactersByFaction][0])
                            }}
                          >
                            <FactionIcon faction={faction} />
                            {faction}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-imfell text-lg mb-4">Character</h3>
                      <Select value={defender} onValueChange={setDefender}>
                        <SelectTrigger className="w-full border-primary/20">
                          <SelectValue placeholder="Select character" />
                        </SelectTrigger>
                        <SelectContent>
                          {charactersByFaction[defenderFaction as keyof typeof charactersByFaction].map((character) => (
                            <SelectItem key={character} value={character}>
                              {character}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-imfell py-6 px-12 text-lg"
              onClick={handleStartCombat}
            >
              Start Combat
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

