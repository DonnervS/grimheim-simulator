"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Sword, Crosshair, Palette } from "lucide-react"
import Layout from "@/components/layout"

export default function HomePage() {
  const router = useRouter()

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="font-imfell text-primary text-4xl md:text-6xl mb-4">Grimheim Combat Simulator</h1>
          <p className="text-xl text-muted-foreground">A companion app for the Grimheim tabletop skirmisher game</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card className="overflow-hidden border border-primary/20 hover:border-primary/40 transition-colors group">
            <CardContent className="p-0">
              <Button
                variant="ghost"
                className="w-full h-full p-8 flex flex-col items-center justify-center gap-4 rounded-none group-hover:bg-primary/5"
                onClick={() => router.push("/combat-setup")}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Play className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h2 className="font-imfell text-2xl mb-2">Start Game</h2>
                  <p className="text-muted-foreground">Set up and start a new combat simulation</p>
                </div>
              </Button>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border border-primary/20 hover:border-primary/40 transition-colors group">
            <CardContent className="p-0">
              <Button
                variant="ghost"
                className="w-full h-full p-8 flex flex-col items-center justify-center gap-4 rounded-none group-hover:bg-primary/5"
                onClick={() => router.push("/combat-test")}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Sword className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h2 className="font-imfell text-2xl mb-2">Combat Test</h2>
                  <p className="text-muted-foreground">Test melee combat mechanics</p>
                </div>
              </Button>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border border-primary/20 hover:border-primary/40 transition-colors group">
            <CardContent className="p-0">
              <Button
                variant="ghost"
                className="w-full h-full p-8 flex flex-col items-center justify-center gap-4 rounded-none group-hover:bg-primary/5"
                onClick={() => router.push("/ranged-test")}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Crosshair className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h2 className="font-imfell text-2xl mb-2">Ranged Combat Test</h2>
                  <p className="text-muted-foreground">Test ranged combat mechanics</p>
                </div>
              </Button>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border border-primary/20 hover:border-primary/40 transition-colors group">
            <CardContent className="p-0">
              <Button
                variant="ghost"
                className="w-full h-full p-8 flex flex-col items-center justify-center gap-4 rounded-none group-hover:bg-primary/5"
                onClick={() => router.push("/style-guide")}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Palette className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h2 className="font-imfell text-2xl mb-2">Style Guide</h2>
                  <p className="text-muted-foreground">View the Grimheim design system</p>
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}

