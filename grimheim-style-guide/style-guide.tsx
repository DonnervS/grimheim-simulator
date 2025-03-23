"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Check, Skull, Shield, Sword, Users, Book, Dice6, Menu, X, ChevronRight, Moon, Sun } from "lucide-react"

export default function StyleGuide() {
  const [isDarkMode, setIsDarkMode] = useState(true)

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <div className="bg-background text-foreground p-6 md:p-10">
        <header className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h1 className="font-imfell text-4xl md:text-5xl text-primary">Grimheim</h1>
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4" />
              <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} id="dark-mode" />
              <Moon className="h-4 w-4" />
            </div>
          </div>
          <p className="text-xl text-muted-foreground">Style Guide & Design System</p>
        </header>

        <Tabs defaultValue="colors">
          <TabsList className="mb-8">
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="typography">Typography</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
            <TabsTrigger value="icons">Icons</TabsTrigger>
          </TabsList>

          <TabsContent value="colors" className="space-y-8">
            <section>
              <h2 className="font-imfell text-2xl mb-4">Primary Colors</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ColorCard name="Primary (Red)" color="bg-primary" textColor="text-primary-foreground" hex="#dc2626" />
                <ColorCard name="Background (Dark)" color="bg-background" textColor="text-foreground" hex="#0f0f0f" />
                <ColorCard name="Foreground (Light)" color="bg-foreground" textColor="text-background" hex="#fafafa" />
              </div>
            </section>

            <section>
              <h2 className="font-imfell text-2xl mb-4">Secondary Colors</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <ColorCard name="Secondary" color="bg-secondary" textColor="text-secondary-foreground" hex="#27272a" />
                <ColorCard name="Accent" color="bg-accent" textColor="text-accent-foreground" hex="#18181b" />
                <ColorCard name="Muted" color="bg-muted" textColor="text-muted-foreground" hex="#171717" />
                <ColorCard name="Card" color="bg-card" textColor="text-card-foreground" hex="#1c1c1c" />
              </div>
            </section>

            <section>
              <h2 className="font-imfell text-2xl mb-4">Status Colors</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <ColorCard name="Success" color="bg-green-600" textColor="text-white" hex="#16a34a" />
                <ColorCard name="Warning" color="bg-yellow-600" textColor="text-white" hex="#ca8a04" />
                <ColorCard name="Danger" color="bg-red-700" textColor="text-white" hex="#b91c1c" />
                <ColorCard name="Info" color="bg-blue-600" textColor="text-white" hex="#2563eb" />
              </div>
            </section>
          </TabsContent>

          <TabsContent value="typography" className="space-y-8">
            <section>
              <h2 className="font-imfell text-2xl mb-4">Headings</h2>
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h1 className="font-imfell text-4xl md:text-5xl">Heading 1 - IM Fell English</h1>
                    <p className="text-sm text-muted-foreground mt-1">Used for main page titles and hero sections</p>
                  </div>
                  <Separator />
                  <div>
                    <h2 className="font-imfell text-3xl md:text-4xl">Heading 2 - IM Fell English</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Used for section titles and major content divisions
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="font-imfell text-2xl md:text-3xl">Heading 3 - IM Fell English</h3>
                    <p className="text-sm text-muted-foreground mt-1">Used for subsection titles and card headers</p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-imfell text-xl md:text-2xl">Heading 4 - IM Fell English</h4>
                    <p className="text-sm text-muted-foreground mt-1">Used for minor section titles and list headers</p>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="font-imfell text-2xl mb-4">Body Text</h2>
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <p className="text-lg">Large Body Text - Inter</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Used for important paragraphs and highlighted content
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-base">Regular Body Text - Inter</p>
                    <p className="text-sm text-muted-foreground mt-1">Used for standard paragraphs and most content</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm">Small Text - Inter</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Used for captions, footnotes, and secondary information
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-xs">Extra Small Text - Inter</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Used for legal text, credits, and very minor information
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>
          </TabsContent>

          <TabsContent value="components" className="space-y-8">
            <section>
              <h2 className="font-imfell text-2xl mb-4">Buttons</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-imfell text-xl">Primary</h3>
                      <div className="flex flex-wrap gap-4">
                        <Button>Default</Button>
                        <Button disabled>Disabled</Button>
                        <Button size="sm">Small</Button>
                        <Button size="lg">Large</Button>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-imfell text-xl">Secondary</h3>
                      <div className="flex flex-wrap gap-4">
                        <Button variant="secondary">Default</Button>
                        <Button variant="secondary" disabled>
                          Disabled
                        </Button>
                        <Button variant="secondary" size="sm">
                          Small
                        </Button>
                        <Button variant="secondary" size="lg">
                          Large
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-imfell text-xl">Outline</h3>
                      <div className="flex flex-wrap gap-4">
                        <Button variant="outline">Default</Button>
                        <Button variant="outline" disabled>
                          Disabled
                        </Button>
                        <Button variant="outline" size="sm">
                          Small
                        </Button>
                        <Button variant="outline" size="lg">
                          Large
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-imfell text-xl">Ghost</h3>
                      <div className="flex flex-wrap gap-4">
                        <Button variant="ghost">Default</Button>
                        <Button variant="ghost" disabled>
                          Disabled
                        </Button>
                        <Button variant="ghost" size="sm">
                          Small
                        </Button>
                        <Button variant="ghost" size="lg">
                          Large
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="font-imfell text-2xl mb-4">Cards</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-imfell">Warband Card</CardTitle>
                    <CardDescription>A card displaying warband information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>
                      This card contains information about a player's warband, including units, equipment, and
                      abilities.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="font-imfell">Unit Card</CardTitle>
                    <CardDescription>A card displaying unit information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>
                      This card contains detailed information about a specific unit, including stats, equipment, and
                      special rules.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="font-imfell text-2xl mb-4">Form Elements</h2>
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Enter warband name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="points">Points (0-100)</Label>
                    <Slider defaultValue={[50]} max={100} step={1} />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="veteran-mode" />
                    <Label htmlFor="veteran-mode">Veteran Mode</Label>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="font-imfell text-2xl mb-4">Badges</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                  </div>
                </CardContent>
              </Card>
            </section>
          </TabsContent>

          <TabsContent value="layout" className="space-y-8">
            <section>
              <h2 className="font-imfell text-2xl mb-4">Spacing System</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-imfell text-xl mb-2">Spacing Scale</h3>
                      <div className="flex flex-col gap-4">
                        <SpacingExample name="xs" size="4px" tailwind="p-1" />
                        <SpacingExample name="sm" size="8px" tailwind="p-2" />
                        <SpacingExample name="md" size="16px" tailwind="p-4" />
                        <SpacingExample name="lg" size="24px" tailwind="p-6" />
                        <SpacingExample name="xl" size="32px" tailwind="p-8" />
                        <SpacingExample name="2xl" size="48px" tailwind="p-12" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="font-imfell text-2xl mb-4">Responsive Breakpoints</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-secondary rounded-md">
                        <h3 className="font-imfell text-xl mb-2">Mobile</h3>
                        <p className="text-sm">Up to 639px</p>
                        <p className="text-xs text-muted-foreground mt-1">Single column layouts, stacked components</p>
                      </div>
                      <div className="p-4 bg-secondary rounded-md">
                        <h3 className="font-imfell text-xl mb-2">Tablet</h3>
                        <p className="text-sm">640px - 1023px</p>
                        <p className="text-xs text-muted-foreground mt-1">Two column layouts, side navigation</p>
                      </div>
                      <div className="p-4 bg-secondary rounded-md">
                        <h3 className="font-imfell text-xl mb-2">Desktop</h3>
                        <p className="text-sm">1024px - 1279px</p>
                        <p className="text-xs text-muted-foreground mt-1">Multi-column layouts, full navigation</p>
                      </div>
                      <div className="p-4 bg-secondary rounded-md">
                        <h3 className="font-imfell text-xl mb-2">Large Desktop</h3>
                        <p className="text-sm">1280px and above</p>
                        <p className="text-xs text-muted-foreground mt-1">Expanded layouts, additional content areas</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="font-imfell text-2xl mb-4">Grid System</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="bg-secondary h-20 rounded-md flex items-center justify-center">
                        <p className="text-sm">Column {i}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    The grid system uses Tailwind's grid classes for responsive layouts. Default gap is 16px (gap-4) but
                    can be adjusted as needed.
                  </p>
                </CardContent>
              </Card>
            </section>
          </TabsContent>

          <TabsContent value="icons" className="space-y-8">
            <section>
              <h2 className="font-imfell text-2xl mb-4">UI Icons</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    <IconExample icon={<Menu className="h-6 w-6" />} name="Menu" />
                    <IconExample icon={<X className="h-6 w-6" />} name="Close" />
                    <IconExample icon={<ChevronRight className="h-6 w-6" />} name="Chevron" />
                    <IconExample icon={<Check className="h-6 w-6" />} name="Check" />
                    <IconExample icon={<Moon className="h-6 w-6" />} name="Dark Mode" />
                    <IconExample icon={<Sun className="h-6 w-6" />} name="Light Mode" />
                  </div>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="font-imfell text-2xl mb-4">Game Icons</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    <IconExample icon={<Skull className="h-6 w-6" />} name="Skull" />
                    <IconExample icon={<Shield className="h-6 w-6" />} name="Shield" />
                    <IconExample icon={<Sword className="h-6 w-6" />} name="Sword" />
                    <IconExample icon={<Users className="h-6 w-6" />} name="Warband" />
                    <IconExample icon={<Book className="h-6 w-6" />} name="Rules" />
                    <IconExample icon={<Dice6 className="h-6 w-6" />} name="Dice" />
                  </div>
                </CardContent>
              </Card>
            </section>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function ColorCard({ name, color, textColor, hex }) {
  return (
    <div className="rounded-md overflow-hidden">
      <div className={`${color} ${textColor} h-24 flex items-center justify-center`}>
        <span className="font-medium">{name}</span>
      </div>
      <div className="bg-card p-2 text-xs">
        <p className="font-mono">{hex}</p>
      </div>
    </div>
  )
}

function SpacingExample({ name, size, tailwind }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-16">
        <span className="text-sm font-medium">{name}</span>
      </div>
      <div className={`bg-primary h-4 rounded`} style={{ width: size }}></div>
      <div className="text-sm text-muted-foreground">
        <span>
          {size} ({tailwind})
        </span>
      </div>
    </div>
  )
}

function IconExample({ icon, name }) {
  return (
    <div className="flex flex-col items-center gap-2 p-4 bg-secondary rounded-md">
      {icon}
      <span className="text-xs">{name}</span>
    </div>
  )
}

