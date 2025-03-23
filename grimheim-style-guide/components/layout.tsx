"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sword, Crosshair, Play, Palette, Home, MenuIcon, X, Map } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b border-primary/20 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="font-imfell text-primary text-3xl hover:text-primary/90 transition-colors">
            Grimheim
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink href="/" active={pathname === "/"}>
              <Home className="h-4 w-4 mr-2" />
              Home
            </NavLink>
            <NavLink href="/combat-setup" active={pathname === "/combat-setup"}>
              <Play className="h-4 w-4 mr-2" />
              Combat Setup
            </NavLink>
            <NavLink href="/combat-test" active={pathname === "/combat-test"}>
              <Sword className="h-4 w-4 mr-2" />
              Combat Test
            </NavLink>
            <NavLink href="/ranged-test" active={pathname === "/ranged-test"}>
              <Crosshair className="h-4 w-4 mr-2" />
              Ranged Test
            </NavLink>
            <NavLink href="/map" active={pathname === "/map"}>
              <Map className="h-4 w-4 mr-2" />
              Map
            </NavLink>
            <NavLink href="/style-guide" active={pathname === "/style-guide"}>
              <Palette className="h-4 w-4 mr-2" />
              Style Guide
            </NavLink>
          </nav>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </Button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-card/95 backdrop-blur-sm border-t border-primary/20 py-2 absolute w-full">
            <div className="container mx-auto px-4 flex flex-col space-y-2">
              <MobileNavLink href="/" active={pathname === "/"}>
                <Home className="h-4 w-4 mr-2" />
                Home
              </MobileNavLink>
              <MobileNavLink href="/combat-setup" active={pathname === "/combat-setup"}>
                <Play className="h-4 w-4 mr-2" />
                Combat Setup
              </MobileNavLink>
              <MobileNavLink href="/combat-test" active={pathname === "/combat-test"}>
                <Sword className="h-4 w-4 mr-2" />
                Combat Test
              </MobileNavLink>
              <MobileNavLink href="/ranged-test" active={pathname === "/ranged-test"}>
                <Crosshair className="h-4 w-4 mr-2" />
                Ranged Test
              </MobileNavLink>
              <MobileNavLink href="/map" active={pathname === "/map"}>
                <Map className="h-4 w-4 mr-2" />
                Map
              </MobileNavLink>
              <MobileNavLink href="/style-guide" active={pathname === "/style-guide"}>
                <Palette className="h-4 w-4 mr-2" />
                Style Guide
              </MobileNavLink>
            </div>
          </div>
        )}
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-primary/20 py-4 text-center text-sm text-muted-foreground">
        <div className="container mx-auto px-4">Grimheim Combat Simulator &copy; {new Date().getFullYear()}</div>
      </footer>
    </div>
  )
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`flex items-center px-3 py-2 rounded-md transition-colors ${
        active ? "bg-primary/10 text-primary font-medium" : "text-foreground hover:bg-primary/5 hover:text-primary"
      }`}
    >
      {children}
    </Link>
  )
}

function MobileNavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`flex items-center px-3 py-2 rounded-md transition-colors ${
        active ? "bg-primary/10 text-primary font-medium" : "text-foreground hover:bg-primary/5 hover:text-primary"
      }`}
    >
      {children}
    </Link>
  )
}

