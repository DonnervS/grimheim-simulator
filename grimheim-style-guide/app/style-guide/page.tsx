"use client"

import { Badge } from "@/components/ui/badge"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Palette, ExternalLink, Brush, Layers, Shapes, Sparkles } from "lucide-react"
import Layout from "@/components/layout"

export default function StyleGuidePage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-imfell text-primary text-4xl md:text-5xl mb-4">Grimheim Style Guide</h1>
            <p className="text-xl text-muted-foreground">Design system and component library</p>
          </div>

          <Card className="border border-primary/20 mb-8">
            <CardHeader>
              <CardTitle className="font-imfell text-2xl flex items-center gap-2">
                <Palette className="h-5 w-5 text-primary" />
                Style Guide Overview
              </CardTitle>
              <CardDescription>A comprehensive guide to the Grimheim design system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p>
                This page provides a quick reference to the Grimheim design system. For a more comprehensive guide,
                please refer to the full style guide document.
              </p>
              <div className="flex justify-center">
                <Link href="/enhanced-style-guide">
                  <Button className="font-imfell flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    View Full Style Guide
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="border border-primary/20">
              <CardHeader>
                <CardTitle className="font-imfell flex items-center gap-2">
                  <Brush className="h-5 w-5 text-primary" />
                  Color Palette
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <div className="h-12 bg-primary rounded-md flex items-center justify-center text-primary-foreground">
                    Primary
                  </div>
                  <div className="h-12 bg-secondary rounded-md flex items-center justify-center text-secondary-foreground">
                    Secondary
                  </div>
                  <div className="h-12 bg-amber-500 rounded-md flex items-center justify-center text-black">Gold</div>
                  <div className="h-12 bg-background rounded-md border border-border flex items-center justify-center">
                    Background
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-primary/20">
              <CardHeader>
                <CardTitle className="font-imfell flex items-center gap-2">
                  <Layers className="h-5 w-5 text-primary" />
                  Typography
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-imfell text-2xl text-primary">IM Fell English</h3>
                    <p className="text-sm text-muted-foreground">Used for headings and titles</p>
                  </div>
                  <div>
                    <p className="text-base">Inter Regular</p>
                    <p className="text-sm text-muted-foreground">Used for body text</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border border-primary/20">
              <CardHeader>
                <CardTitle className="font-imfell flex items-center gap-2">
                  <Shapes className="h-5 w-5 text-primary" />
                  Components
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Buttons</h3>
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm">Primary</Button>
                      <Button size="sm" variant="secondary">
                        Secondary
                      </Button>
                      <Button size="sm" variant="outline">
                        Outline
                      </Button>
                      <Button size="sm" variant="destructive">
                        Destructive
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Badges</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge>Default</Badge>
                      <Badge variant="secondary">Secondary</Badge>
                      <Badge variant="outline">Outline</Badge>
                      <Badge variant="destructive">Destructive</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-primary/20">
              <CardHeader>
                <CardTitle className="font-imfell flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Game Elements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Dice</h3>
                    <div className="flex flex-wrap gap-2">
                      <div className="bg-red-600 text-white h-10 w-10 rounded-md flex items-center justify-center font-bold shadow-md">
                        4
                      </div>
                      <div className="bg-amber-500 text-black h-10 w-10 rounded-md flex items-center justify-center font-bold shadow-md">
                        6
                      </div>
                      <div className="bg-blue-600 text-white h-10 w-10 rounded-md flex items-center justify-center font-bold shadow-md">
                        5
                      </div>
                      <div className="bg-gray-700 text-white h-10 w-10 rounded-md flex items-center justify-center font-bold shadow-md">
                        2
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Stats</h3>
                    <div className="grid grid-cols-4 gap-2">
                      <div className="bg-secondary/60 p-2 rounded-md flex flex-col items-center">
                        <span className="text-xs text-muted-foreground">MOV</span>
                        <span className="font-bold">4"</span>
                      </div>
                      <div className="bg-secondary/60 p-2 rounded-md flex flex-col items-center">
                        <span className="text-xs text-muted-foreground">DEF</span>
                        <span className="font-bold">3</span>
                      </div>
                      <div className="bg-secondary/60 p-2 rounded-md flex flex-col items-center">
                        <span className="text-xs text-muted-foreground">SAV</span>
                        <span className="font-bold">5+</span>
                      </div>
                      <div className="bg-secondary/60 p-2 rounded-md flex flex-col items-center">
                        <span className="text-xs text-muted-foreground">WND</span>
                        <span className="font-bold">10</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  )
}

