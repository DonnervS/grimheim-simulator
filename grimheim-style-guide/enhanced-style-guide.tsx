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
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Check,
  Skull,
  Shield,
  Sword,
  Users,
  Book,
  Dice6,
  Menu,
  X,
  ChevronRight,
  Moon,
  Sun,
  Edit,
  Eye,
  Printer,
  AlertCircle,
  Flame,
  Snowflake,
  Droplets,
  Zap,
  Heart,
  Crosshair,
  Swords,
  Bomb,
  Scroll,
  Move,
  Target,
  Footprints,
  ArrowBigRight,
  ArrowDown,
  Dices,
  Mountain,
  Trees,
  Cloud,
  Waves,
  Sparkles,
  Wand,
  Backpack,
  Repeat,
  Radiation,
  Landmark,
  Rocket,
  Megaphone,
  RefreshCw,
  CrosshairIcon,
  Stethoscope,
  ShieldOff,
  ArrowRightLeft,
  Award,
  Boxes,
} from "lucide-react"

export default function EnhancedStyleGuide() {
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
          <TabsList className="mb-8 flex flex-wrap">
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="typography">Typography</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="status">Status Effects</TabsTrigger>
            <TabsTrigger value="dice">Dice</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
            <TabsTrigger value="icons">Icons</TabsTrigger>
            <TabsTrigger value="effects">Effects</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
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
                <ColorCard name="Gold Accent" color="bg-amber-500" textColor="text-black" hex="#f59e0b" />
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

            <section>
              <h2 className="font-imfell text-2xl mb-4">Extended Color Palette</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <ColorCard name="Blood Red" color="bg-red-800" textColor="text-white" hex="#991b1b" />
                <ColorCard name="Bone" color="bg-amber-50" textColor="text-gray-900" hex="#fffbeb" />
                <ColorCard name="Ash Gray" color="bg-gray-700" textColor="text-white" hex="#374151" />
                <ColorCard name="Shadow" color="bg-gray-900" textColor="text-white" hex="#111827" />
                <ColorCard name="Poison" color="bg-green-500" textColor="text-white" hex="#22c55e" />
                <ColorCard name="Ice" color="bg-cyan-400" textColor="text-gray-900" hex="#22d3ee" />
                <ColorCard name="Fire" color="bg-orange-500" textColor="text-white" hex="#f97316" />
                <ColorCard name="Curse" color="bg-purple-700" textColor="text-white" hex="#7e22ce" />
              </div>
            </section>
          </TabsContent>

          <TabsContent value="typography" className="space-y-8">
            <section>
              <h2 className="font-imfell text-2xl mb-4">Headings</h2>
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h1 className="font-imfell text-4xl md:text-5xl text-primary">Heading 1 - IM Fell English</h1>
                    <p className="text-sm text-muted-foreground mt-1">Used for main page titles and hero sections</p>
                  </div>
                  <Separator />
                  <div>
                    <h2 className="font-imfell text-3xl md:text-4xl text-primary">Heading 2 - IM Fell English</h2>
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

            <section>
              <h2 className="font-imfell text-2xl mb-4">Quotes</h2>
              <Card>
                <CardContent className="p-6 space-y-6">
                  <blockquote className="border-l-4 border-primary pl-4 italic">
                    <p className="font-imfell text-lg">
                      "In the grim darkness of Grimheim, there is only war. The weak perish, and the strong survive to
                      fight another day."
                    </p>
                    <footer className="text-sm text-muted-foreground mt-2">
                      — Warlord Thorgrim, <cite>Chronicles of the Fallen</cite>
                    </footer>
                  </blockquote>
                  <Separator />
                  <blockquote className="bg-secondary p-4 rounded-md italic">
                    <p className="font-imfell">
                      "The gods favor the bold, but fortune favors the prepared. Ready your weapons, sharpen your
                      blades, and trust in your warband."
                    </p>
                    <footer className="text-sm text-muted-foreground mt-2">— Battle Sage Erika</footer>
                  </blockquote>
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
              <h2 className="font-imfell text-2xl mb-4">Action Buttons</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-4">
                    <Button className="flex items-center gap-2">
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button variant="secondary" className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Printer className="h-4 w-4" />
                      Print
                    </Button>
                    <Button variant="destructive" className="flex items-center gap-2">
                      <X className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="font-imfell text-2xl mb-4">Table Action Buttons</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-4">
                    <Button size="icon" variant="ghost" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8">
                      <Printer className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive">
                      <X className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline" className="h-8 w-8">
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="secondary" className="h-8 w-8">
                      <Sword className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="default" className="h-8 w-8">
                      <Shield className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="font-imfell text-2xl mb-4">Weapon Buttons</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-4">
                    <Button variant="secondary" className="flex items-center gap-2">
                      <Sword className="h-4 w-4" />
                      Close Combat
                    </Button>
                    <Button variant="secondary" className="flex items-center gap-2">
                      <Crosshair className="h-4 w-4" />
                      Ranged Weapon
                    </Button>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 border-amber-500 text-amber-500 hover:bg-amber-500/10"
                    >
                      <Bomb className="h-4 w-4" />
                      Special Weapon
                    </Button>
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
              <h2 className="font-imfell text-2xl mb-4">Info Boxes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-950/50 border border-blue-800 rounded-md p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5" />
                    <div>
                      <h4 className="font-imfell text-blue-400 mb-1">Information</h4>
                      <p className="text-sm text-blue-200">
                        Units with the Scout ability can deploy anywhere on the battlefield that is more than 9" away
                        from enemy units.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-red-950/50 border border-red-800 rounded-md p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-400 mt-0.5" />
                    <div>
                      <h4 className="font-imfell text-red-400 mb-1">Warning</h4>
                      <p className="text-sm text-red-200">
                        Berserker units must always charge the nearest enemy if possible, even if it would be tactically
                        disadvantageous.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-950/50 border border-amber-800 rounded-md p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-400 mt-0.5" />
                    <div>
                      <h4 className="font-imfell text-amber-400 mb-1">Caution</h4>
                      <p className="text-sm text-amber-200">
                        Spellcasters risk Perils of the Warp when rolling doubles on casting attempts. Roll on the
                        Mishap table immediately.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-950/50 border border-green-800 rounded-md p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="font-imfell text-green-400 mb-1">Tip</h4>
                      <p className="text-sm text-green-200">
                        Positioning is key. Units gain +1 to hit rolls when attacking enemies from the flank or rear.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
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

            <section>
              <h2 className="font-imfell text-2xl mb-4">Lists and Tables</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-imfell">Ordered List</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>Initiative Phase: Determine turn order</li>
                      <li>Movement Phase: Move units across the battlefield</li>
                      <li>Shooting Phase: Ranged attacks and spells</li>
                      <li>Charge Phase: Declare and resolve charges</li>
                      <li>Combat Phase: Resolve melee combat</li>
                      <li>Morale Phase: Test for broken units</li>
                    </ol>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-imfell">Unordered List</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Humans: Versatile warriors with balanced stats</li>
                      <li>Dwarves: Tough and resilient, but slow</li>
                      <li>Elves: Fast and skilled, but fragile</li>
                      <li>Orcs: Strong in combat, poor discipline</li>
                      <li>Undead: Immune to psychology, weak to holy damage</li>
                      <li>Demons: Powerful but unstable presence</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-imfell">Weapon Stats Table</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableCaption>Comprehensive weapon statistics for Grimheim</TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Weapon</TableHead>
                          <TableHead>Range</TableHead>
                          <TableHead>Strength</TableHead>
                          <TableHead>Damage</TableHead>
                          <TableHead>Special Rules</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Longsword</TableCell>
                          <TableCell>Melee</TableCell>
                          <TableCell>User</TableCell>
                          <TableCell>1</TableCell>
                          <TableCell>Parry</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Battle Axe</TableCell>
                          <TableCell>Melee</TableCell>
                          <TableCell>User+1</TableCell>
                          <TableCell>1</TableCell>
                          <TableCell>-</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Warhammer</TableCell>
                          <TableCell>Melee</TableCell>
                          <TableCell>User</TableCell>
                          <TableCell>1</TableCell>
                          <TableCell>Armor Piercing (1)</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Shortbow</TableCell>
                          <TableCell>16"</TableCell>
                          <TableCell>3</TableCell>
                          <TableCell>1</TableCell>
                          <TableCell>-</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Crossbow</TableCell>
                          <TableCell>24"</TableCell>
                          <TableCell>4</TableCell>
                          <TableCell>1</TableCell>
                          <TableCell>Move or Fire</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="font-imfell text-2xl mb-4">Image with Caption</h2>
              <Card>
                <CardContent className="p-6">
                  <figure className="relative">
                    <div className="aspect-video bg-muted rounded-md overflow-hidden">
                      <img
                        src="/placeholder.svg?height=400&width=800"
                        alt="Battle scene from Grimheim"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <figcaption className="mt-2 text-sm text-muted-foreground text-center italic">
                      The Battle of Blackfire Pass - a decisive conflict that changed the fate of Grimheim forever
                    </figcaption>
                  </figure>
                </CardContent>
              </Card>
            </section>
          </TabsContent>

          <TabsContent value="status" className="space-y-8">
            <section>
              <h2 className="font-imfell text-2xl mb-4">Status Effect Tags</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    <StatusEffectTag
                      name="Stunned"
                      icon={<Zap className="h-3 w-3" />}
                      color="bg-yellow-600"
                      description="Unit loses its next activation"
                      small
                    />
                    <StatusEffectTag
                      name="Poisoned"
                      icon={<Droplets className="h-3 w-3" />}
                      color="bg-green-600"
                      description="Unit takes 1 damage at start of turn"
                      small
                    />
                    <StatusEffectTag
                      name="Frozen"
                      icon={<Snowflake className="h-3 w-3" />}
                      color="bg-cyan-600"
                      description="Movement reduced by half"
                      small
                    />
                    <StatusEffectTag
                      name="Burning"
                      icon={<Flame className="h-3 w-3" />}
                      color="bg-orange-600"
                      description="Unit takes D3 damage at end of turn"
                      small
                    />
                    <StatusEffectTag
                      name="Cursed"
                      icon={<Skull className="h-3 w-3" />}
                      color="bg-purple-700"
                      description="All dice rolls -1"
                      small
                    />
                    <StatusEffectTag
                      name="Fearful"
                      icon={<AlertCircle className="h-3 w-3" />}
                      color="bg-blue-700"
                      description="Must pass courage test to charge"
                      small
                    />
                  </div>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="font-imfell text-2xl mb-4">Wound Markers</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <WoundMarker location="Head" severity="Critical" />
                    <WoundMarker location="Arm" severity="Severe" />
                    <WoundMarker location="Leg" severity="Light" />
                  </div>
                </CardContent>
              </Card>
            </section>
          </TabsContent>

          <TabsContent value="dice" className="space-y-8">
            <section>
              <h2 className="font-imfell text-2xl mb-4">Dice Colors</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                    <DiceDisplay
                      type="Miss"
                      color="bg-gray-700"
                      fadedColor="bg-gray-700/30"
                      textColor="text-white"
                      value="1"
                    />
                    <DiceDisplay
                      type="Hit"
                      color="bg-red-600"
                      fadedColor="bg-red-600/30"
                      textColor="text-white"
                      value="4"
                    />
                    <DiceDisplay
                      type="Critical"
                      color="bg-yellow-500"
                      fadedColor="bg-yellow-500/30"
                      textColor="text-black"
                      value="6"
                    />
                    <DiceDisplay
                      type="Block"
                      color="bg-blue-600"
                      fadedColor="bg-blue-600/30"
                      textColor="text-white"
                      value="5"
                    />
                    <DiceDisplay
                      type="Shield"
                      color="bg-cyan-600"
                      fadedColor="bg-cyan-600/30"
                      textColor="text-white"
                      value="3"
                    />
                    <DiceDisplay
                      type="Armor"
                      color="bg-gray-500"
                      fadedColor="bg-gray-500/30"
                      textColor="text-white"
                      value="2"
                    />
                  </div>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="font-imfell text-2xl mb-4">Dice Combinations</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-secondary p-4 rounded-md">
                      <h3 className="font-imfell text-lg mb-3">Attack Roll</h3>
                      <div className="flex gap-2">
                        <DiceDisplay type="Hit" color="bg-red-600" textColor="text-white" value="4" small />
                        <DiceDisplay type="Hit" color="bg-red-600" textColor="text-white" value="5" small />
                        <DiceDisplay type="Critical" color="bg-yellow-500" textColor="text-black" value="6" small />
                        <DiceDisplay type="Miss" color="bg-gray-700" textColor="text-white" value="2" small />
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">2 Hits, 1 Critical, 1 Miss</p>
                    </div>
                    <div className="bg-secondary p-4 rounded-md">
                      <h3 className="font-imfell text-lg mb-3">Defense Roll</h3>
                      <div className="flex gap-2">
                        <DiceDisplay type="Block" color="bg-blue-600" textColor="text-white" value="3" small />
                        <DiceDisplay type="Shield" color="bg-cyan-600" textColor="text-white" value="4" small />
                        <DiceDisplay type="Miss" color="bg-gray-700" textColor="text-white" value="1" small />
                        <DiceDisplay
                          type="Critical Block"
                          color="bg-purple-600"
                          textColor="text-white"
                          value="6"
                          small
                        />
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">1 Block, 1 Shield, 1 Miss, 1 Critical Block</p>
                    </div>
                    <div className="bg-secondary p-4 rounded-md">
                      <h3 className="font-imfell text-lg mb-3">Armor Roll</h3>
                      <div className="flex gap-2">
                        <DiceDisplay type="Armor" color="bg-gray-500" textColor="text-white" value="5" small />
                        <DiceDisplay type="Armor" color="bg-gray-500" textColor="text-white" value="6" small />
                        <DiceDisplay type="Armor" fadedColor="bg-gray-500/30" textColor="text-white" value="2" small />
                        <DiceDisplay type="Critical" color="bg-amber-500" textColor="text-black" value="6" small />
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">2 Successes, 1 Failure, 1 Critical</p>
                    </div>
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
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                    <IconExample icon={<Skull className="h-5 w-5" />} name="Skull" />
                    <IconExample icon={<Shield className="h-5 w-5" />} name="Shield" />
                    <IconExample icon={<Sword className="h-5 w-5" />} name="Sword" />
                    <IconExample icon={<Users className="h-5 w-5" />} name="Warband" />
                    <IconExample icon={<Book className="h-5 w-5" />} name="Rules" />
                    <IconExample icon={<Dice6 className="h-5 w-5" />} name="Dice" />
                    <IconExample icon={<Crosshair className="h-5 w-5" />} name="Ranged Attack" />
                    <IconExample icon={<Swords className="h-5 w-5" />} name="Close Combat" />
                  </div>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="font-imfell text-2xl mb-4">Action Icons</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                    <IconExample icon={<Move className="h-5 w-5" />} name="MOVE" />
                    <IconExample icon={<Crosshair className="h-5 w-5" />} name="SHOOT" />
                    <IconExample icon={<ArrowBigRight className="h-5 w-5" />} name="CHARGE" />
                    <IconExample icon={<Swords className="h-5 w-5" />} name="FIGHT" />
                    <IconExample icon={<ArrowDown className="h-5 w-5" />} name="FALL BACK" />
                    <IconExample icon={<Eye className="h-5 w-5 opacity-50" />} name="HIDE" />
                    <IconExample icon={<X className="h-5 w-5" />} name="PASS" />
                    <IconExample icon={<Hand className="h-5 w-5" />} name="INTERACT" />
                    <IconExample icon={<Backpack className="h-5 w-5" />} name="LOOT" />
                    <IconExample icon={<Footprints className="h-5 w-5" />} name="RUN" />
                    <IconExample icon={<RefreshCw className="h-5 w-5" />} name="RECOVER" />
                    <IconExample icon={<Target className="h-5 w-5" />} name="OVERWATCH" />
                    <IconExample icon={<Shield className="h-5 w-5" />} name="GUARD" />
                    <IconExample icon={<Wand className="h-5 w-5" />} name="CAST A SPELL" />
                    <IconExample icon={<Landmark className="h-5 w-5" />} name="PRAYER" />
                    <IconExample icon={<Zap className="h-5 w-5" />} name="OVEREXERTION" />
                    <IconExample icon={<Rocket className="h-5 w-5" />} name="RUN AND GUN" />
                    <IconExample icon={<CrosshairIcon className="h-5 w-5" />} name="TAKE AIM" />
                    <IconExample icon={<Stethoscope className="h-5 w-5" />} name="HEAL" />
                    <IconExample icon={<ShieldOff className="h-5 w-5" />} name="COUNTERSPELL" />
                    <IconExample icon={<Megaphone className="h-5 w-5" />} name="COMMAND" />
                    <IconExample icon={<Repeat className="h-5 w-5" />} name="RELOAD" />
                    <IconExample icon={<Sparkles className="h-5 w-5" />} name="CLEANSE" />
                    <IconExample icon={<ArrowRightLeft className="h-5 w-5" />} name="REPOSITION" />
                    <IconExample icon={<Award className="h-5 w-5" />} name="AGAINST ALL ODDS" />
                  </div>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="font-imfell text-2xl mb-4">Terrain & Fate Dice Icons</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                    <IconExample icon={<Mountain className="h-5 w-5" />} name="Mountain" />
                    <IconExample icon={<Trees className="h-5 w-5" />} name="Forest" />
                    <IconExample icon={<Cloud className="h-5 w-5" />} name="Fog" />
                    <IconExample icon={<Waves className="h-5 w-5" />} name="Water" />
                    <IconExample icon={<Boxes className="h-5 w-5" />} name="Ruins" />
                    <IconExample icon={<Dices className="h-5 w-5" />} name="Fate Dice" />
                    <IconExample icon={<Sparkles className="h-5 w-5" />} name="Magic" />
                    <IconExample icon={<Radiation className="h-5 w-5" />} name="Hazard" />
                  </div>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="font-imfell text-2xl mb-4">Model Stats</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <ModelStat name="AP" value="2" description="Action Points" />
                    <ModelStat name="MOV" value='4"' description="Movement" />
                    <ModelStat name="DEF" value="3" description="Defense" />
                    <ModelStat name="SAV" value="4+" description="Save" />
                    <ModelStat name="WND" value="10" description="Wounds" />
                  </div>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="font-imfell text-2xl mb-4">Weapon Stats</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <WeaponStat name="RNG" value='6"' description="Range" />
                    <WeaponStat name="ATK" value="3" description="Attacks" />
                    <WeaponStat name="HTV" value="4+" description="Hit Value" />
                    <WeaponStat name="DMG" value="2" description="Damage" />
                    <WeaponStat name="CRT" value="4" description="Critical" />
                  </div>
                </CardContent>
              </Card>
            </section>
          </TabsContent>

          <TabsContent value="effects" className="space-y-8">
            <section>
              <h2 className="font-imfell text-2xl mb-4">Tooltip Effect</h2>
              <Card>
                <CardContent className="p-6">
                  <TooltipProvider>
                    <div className="flex flex-wrap gap-4">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline">Hover Me</Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Basic tooltip with information</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" className="flex items-center gap-2">
                            <Sword className="h-4 w-4" />
                            Weapon Stats
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="w-64">
                          <div className="space-y-2">
                            <p className="font-bold">Runic Longsword</p>
                            <div className="grid grid-cols-2 gap-1 text-sm">
                              <span>Damage:</span>
                              <span>1d6+2</span>
                              <span>Range:</span>
                              <span>Melee</span>
                              <span>Type:</span>
                              <span>Slashing</span>
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" className="flex items-center gap-2">
                            <Scroll className="h-4 w-4" />
                            Ability Info
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="w-64 p-0">
                          <div className="bg-secondary p-2 rounded-t-sm font-imfell">Berserker Rage</div>
                          <div className="p-2 space-y-1">
                            <p className="text-sm">+2 to Attack, -1 to Defense</p>
                            <p className="text-xs text-muted-foreground">Activates when unit is below 50% health</p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TooltipProvider>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="font-imfell text-2xl mb-4">Hover & Glow Effects</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-imfell text-lg">Hover Effects</h3>
                      <div className="flex flex-wrap gap-4">
                        <div className="bg-secondary p-4 rounded-md transition-all duration-300 hover:bg-secondary/80 cursor-pointer">
                          Basic Hover
                        </div>
                        <div className="bg-secondary p-4 rounded-md transition-all duration-300 hover:scale-105 cursor-pointer">
                          Scale Hover
                        </div>
                        <div className="bg-secondary p-4 rounded-md transition-all duration-300 hover:shadow-md hover:shadow-primary/50 cursor-pointer">
                          Shadow Hover
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-imfell text-lg">Glow Effects</h3>
                      <div className="flex flex-wrap gap-4">
                        <div className="bg-secondary p-4 rounded-md shadow-[0_0_10px_2px] shadow-primary/20 transition-all duration-300 hover:shadow-[0_0_15px_3px] hover:shadow-primary/40 cursor-pointer">
                          Red Glow
                        </div>
                        <div className="bg-secondary p-4 rounded-md shadow-[0_0_10px_2px] shadow-blue-500/20 transition-all duration-300 hover:shadow-[0_0_15px_3px] hover:shadow-blue-500/40 cursor-pointer">
                          Blue Glow
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-imfell text-lg">Selection Effects</h3>
                      <div className="flex flex-wrap gap-4">
                        <div className="relative bg-secondary p-4 rounded-md transition-all duration-300 hover:bg-secondary/80 cursor-pointer group">
                          <div className="absolute inset-0 border-2 border-transparent rounded-md group-hover:border-primary"></div>
                          Border Selection
                        </div>
                        <div className="relative bg-secondary p-4 rounded-md transition-all duration-300 cursor-pointer group overflow-hidden">
                          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all duration-300"></div>
                          Overlay Selection
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </TabsContent>

          <TabsContent value="content" className="space-y-8">
            <section>
              <h2 className="font-imfell text-2xl mb-4">Content Blocks</h2>
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-imfell text-xl">Rule Block</h3>
                    <div className="bg-secondary p-4 rounded-md">
                      <h4 className="font-imfell text-lg mb-2">Charging</h4>
                      <p className="mb-2">
                        A unit may charge an enemy unit if it is within charge range (Movement characteristic + D6
                        inches). The charging unit moves into base contact with the target and gains +1 Attack in the
                        subsequent Combat phase.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Units that charged cannot be selected to fight again in the same turn.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-imfell text-xl">Lore Block</h3>
                    <div className="bg-secondary p-4 rounded-md">
                      <h4 className="font-imfell text-lg mb-2">The Ashen Wastes</h4>
                      <p className="italic text-muted-foreground mb-2">
                        "Beyond the Blackfire Mountains lie the desolate plains known as the Ashen Wastes. No living
                        thing grows there, and the ground is covered in a fine gray dust that swirls in the toxic
                        winds."
                      </p>
                      <p>
                        The Ashen Wastes were created during the Cataclysm, when the great city of Dorn was consumed by
                        dark magic. Now it serves as a battleground for warbands seeking ancient artifacts buried
                        beneath the ash.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-imfell text-xl">Scenario Block</h3>
                    <div className="bg-secondary p-4 rounded-md">
                      <h4 className="font-imfell text-lg mb-2">Relic Hunt</h4>
                      <div className="space-y-2">
                        <p>
                          <span className="font-bold">Setup:</span> Place D3+2 objective markers across the battlefield,
                          at least 6" from any edge.
                        </p>
                        <p>
                          <span className="font-bold">Victory Conditions:</span> Control more objective markers than
                          your opponent at the end of battle round 5.
                        </p>
                        <p>
                          <span className="font-bold">Special Rules:</span> A unit controls an objective if it is within
                          3" of it and no enemy units are within 3" of the same objective.
                        </p>
                      </div>
                    </div>
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

// Helper Components

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

function StatusEffectTag({ name, icon, color, description, small = false }) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className={`flex items-center gap-2 px-${small ? "2" : "3"} py-${small ? "1" : "1.5"} rounded-full ${color} text-white text-${small ? "xs" : "sm"} w-fit`}
      >
        {icon}
        <span className="font-medium">{name}</span>
      </div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  )
}

function WoundMarker({ location, severity }) {
  const getSeverityColor = (sev) => {
    switch (sev) {
      case "Critical":
        return "bg-red-700"
      case "Severe":
        return "bg-orange-600"
      case "Light":
        return "bg-yellow-600"
      default:
        return "bg-gray-600"
    }
  }

  const getIcon = (loc) => {
    switch (loc) {
      case "Head":
        return <Skull className="h-4 w-4" />
      case "Arm":
        return <Sword className="h-4 w-4" />
      case "Leg":
        return <Boot className="h-4 w-4" />
      default:
        return <Heart className="h-4 w-4" />
    }
  }

  return (
    <div className="flex items-center gap-3 p-3 bg-secondary rounded-md">
      <div className={`${getSeverityColor(severity)} h-10 w-10 rounded-full flex items-center justify-center`}>
        {getIcon(location)}
      </div>
      <div>
        <p className="font-medium">{location} Wound</p>
        <p className="text-sm text-muted-foreground">{severity} Damage</p>
      </div>
    </div>
  )
}

function Boot(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 9h.01" />
      <path d="M4 7h13.4a1 1 0 0 1 .9.5l2.4 3.5a1 1 0 0 1 .1.5v2a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-1c0-1.5 1.4-2.7 3-2.9" />
    </svg>
  )
}

function DiceDisplay({ type, color, fadedColor, textColor, value, small }) {
  const bgColor = fadedColor || color
  const size = small ? "h-8 w-8" : "h-16 w-16"
  const fontSize = small ? "text-lg" : "text-2xl"

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`${bgColor} ${size} rounded-md flex items-center justify-center ${textColor} font-bold ${fontSize}`}
      >
        {value}
      </div>
      {!small && <span className="text-xs text-muted-foreground">{type}</span>}
    </div>
  )
}

function Hand(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
      <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
      <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
    </svg>
  )
}

function ModelStat({ name, value, description }) {
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

function WeaponStat({ name, value, description }) {
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

