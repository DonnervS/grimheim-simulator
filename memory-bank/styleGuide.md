# Grimheim Style Guide

Dieses Dokument definiert die visuelle Sprache der Grimheim Web-Applikation und bietet eine konsistente Designsprache für alle UI-Komponenten und Interaktionen.

## Design-Philosophie

Grimheim kombiniert eine dunkle mittelalterliche Ästhetik mit modernen UI-Praktiken. Das Design soll:

- Eine düstere, atmosphärische Ästhetik mit einer dunklen Farbpalette vermitteln
- Lesbarkeit und Zugänglichkeit in allen Situationen sicherstellen
- Eine konsistente visuelle Hierarchie durch Größe, Gewicht und Farbe etablieren
- Responsiv sein und auf allen Geräten gut funktionieren
- Durch subtile Animationen und Effekte die Benutzererfahrung verbessern

## Farbpalette

### Primäre Farben

| Name | Wert | Verwendung |
|------|------|------------|
| **Primary Red** | `#dc2626` | Hauptakzentfarbe, wichtige UI-Elemente, Call-to-Actions |
| **Background Dark** | `#0f0f0f` | Haupthintergrundfarbe |
| **Foreground Light** | `#fafafa` | Haupttextfarbe |

### Sekundäre Farben

| Name | Wert | Verwendung |
|------|------|------------|
| **Secondary** | `#27272a` | Sekundäre UI-Elemente |
| **Accent** | `#18181b` | Akzentbereiche, Hintergründe für Buttons im Ruhezustand |
| **Gold Accent** | `#f59e0b` | Besondere Hervorhebungen, Premium-Features |
| **Muted** | `#171717` | Gedämpfte UI-Elemente |
| **Card** | `#1c1c1c` | Kartenhintergründe und Container |

### Status-Farben

| Name | Wert | Verwendung |
|------|------|------------|
| **Success** | `#16a34a` | Erfolgsmeldungen, positive Aktionen |
| **Warning** | `#ca8a04` | Warnungen, wichtige Hinweise |
| **Danger** | `#b91c1c` | Fehler, kritische Aktionen |
| **Info** | `#2563eb` | Informationsmeldungen |

### Erweiterte Farbpalette

| Name | Wert | Verwendung |
|------|------|------------|
| **Blood Red** | `#991b1b` | Dunklere Akzente, Schadenseffekte |
| **Bone** | `#fffbeb` | Helle Hervorhebungen, Skelettteile |
| **Ash Gray** | `#374151` | Gedämpfte UI-Bereiche |
| **Shadow** | `#111827` | Tiefe Schatten, dunkle Hintergründe |
| **Poison** | `#22c55e` | Gifteffekte |
| **Ice** | `#22d3ee` | Eiseffekte |
| **Fire** | `#f97316` | Feuereffekte |
| **Curse** | `#7e22ce` | Flucheffekte |

## Typografie

### Schriftarten

- **Überschriften**: 'IM Fell English' - Historisch inspirierte Schriftart für thematische Konsistenz
- **Fließtext**: Systemschrift (Sans-Serif) für optimale Lesbarkeit

### Typografie-Hierarchie

| Element | Schriftart | Größe | Gewicht | Farbe | Verwendung |
|---------|------------|-------|---------|-------|------------|
| **H1** | IM Fell English | 2.5rem (40px) | Normal | Primary Red | Hauptseitentitel |
| **H2** | IM Fell English | 2rem (32px) | Normal | Primary Red | Sektionsüberschriften |
| **H3** | IM Fell English | 1.5rem (24px) | Normal | Primary Red | Kartenüberschriften, Untersektionen |
| **H4** | IM Fell English | 1.25rem (20px) | Normal | Primary Red | Kleinere Überschriften |
| **Large Body** | System Font | 1.125rem (18px) | Normal | Foreground Light | Hervorgehobener Text |
| **Body** | System Font | 1rem (16px) | Normal | Foreground Light | Normaler Fließtext |
| **Small** | System Font | 0.875rem (14px) | Normal | Foreground Light | Beschriftungen, kleine Texte |
| **Xsmall** | System Font | 0.75rem (12px) | Normal | Muted | Fußnoten, rechtliche Hinweise |

### Texteffekte

- **Text-Schatten für Überschriften**: `text-shadow: 0 0 10px rgba(220, 38, 38, 0.3);`
- **Zitate**: Linksseitiger Rahmen in Primary Red, kursiv

## Komponenten

### Karten (Cards)

- **Hintergrund**: Card (`#1c1c1c`)
- **Rahmen**: 1px solid Primary Red
- **Eckenradius**: 2px
- **Schatten**: `box-shadow: 0 0 20px rgba(220, 38, 38, 0.1);`
- **Padding**: 1.25rem (20px)

```html
<div class="card">
  <h3 class="card-title">Kartentitel</h3>
  <div class="card-content">Karteninhalt</div>
</div>
```

### Buttons

#### Standard Button
- **Hintergrund**: Accent (`#18181b`)
- **Text**: Foreground Light
- **Rahmen**: Keiner im Normalzustand
- **Eckenradius**: 2px
- **Padding**: 0.75rem 1.5rem (12px 24px)
- **Transition**: all 0.3s ease
- **Hover-Effekt**: 
  - Background: rgba(220, 38, 38, 0.1)
  - Transform: translateY(-2px)
  - Box-shadow: 0 0 20px rgba(220, 38, 38, 0.2)
  - Overlay Selection Effect: Roter Overlay mit Deckkraft-Animation

#### Primary Button
- Wie Standard Button, aber mit Background: Primary Red

#### Disabled Button
- Opacity: 0.5
- Cursor: not-allowed

### Formularelemente

#### Input-Felder
- **Hintergrund**: Accent (`#18181b`)
- **Text**: Foreground Light
- **Rahmen**: 1px solid Primary Red
- **Eckenradius**: 2px
- **Padding**: 0.75rem (12px)
- **Fokus-Effekt**: Box-shadow: 0 0 20px rgba(220, 38, 38, 0.2)

#### Select-Felder
- Wie Input-Felder
- Custom Dropdown-Icon: SVG-Pfeil in Weiß
- Padding-Right: 2.5rem für das Icon

#### Switches
- Angepasste Styling mit Primary Red als aktive Farbe

## Effekte

### Schatten-Effekte
- **Standard-Schatten**: `box-shadow: 0 0 20px rgba(220, 38, 38, 0.1);`
- **Hover-Schatten**: `box-shadow: 0 0 20px rgba(220, 38, 38, 0.2);`
- **Hervorgehobener Schatten**: `box-shadow: 0 0 20px rgba(220, 38, 38, 0.3);`

### Glüh-Effekte
- **Rot glühend**: Animation zwischen `0 0 10px 2px rgba(220, 38, 38, 0.3)` und `0 0 15px 5px rgba(220, 38, 38, 0.5)`
- **Gold glühend**: Animation zwischen `0 0 10px 2px rgba(245, 158, 11, 0.3)` und `0 0 15px 5px rgba(245, 158, 11, 0.5)`

### Hover-Effekte
- **Standard-Hover**: 
  - Transform: translateY(-2px)
  - Erhöhter Schatten
  - Subtile Hintergrundfarbenänderung

### Transitions
- **Standard-Transition**: `transition: all 0.3s ease;`
- **Schnelle Transition**: `transition: all 0.2s ease;`

## Würfel-Design

### Standard-Würfel
- **Hintergrund**: Accent oder Secondary
- **Rahmen**: 1px solid Primary Red
- **Eckenradius**: 2px
- **Größe**: 2.5rem (40px) Standard, 1.75rem (28px) klein
- **Text**: Zentriert, Foreground Light

### Würfel-Status
- **Treffer**: Grün glühend
- **Kritischer Treffer**: Gold glühend
- **Block**: Blau glühend
- **Verfehlt**: Normaler Zustand

### Würfel-Animation
- **Würfelwurf**: 3D-Rotation mit `transform: rotateX() rotateY()` über 0.5s
- **Ergebnis-Highlighting**: Pulsierender Glow-Effekt

## Icons

### Icon-System
- SVG-Icons aus der Lucide-Icon-Bibliothek
- Standard-Größe: 1rem (16px)
- Farbe: Foreground Light oder Primary Red für Hervorhebungen

### Icon-Varianten
- **Standard**: Outline-Style, 1.5px Linienstärke
- **Klein**: 0.875rem (14px)
- **Groß**: 1.25rem (20px)
- **Interaktive Icons**: Hover-Effekt wie bei Buttons

## Layout

### Container
- **Maximale Breite**: 1200px
- **Padding**: 2rem (32px)
- **Margin**: auto (zentriert)

### Grid-Layout
- Flexibles Grid-System basierend auf CSS Grid
- Standard-Gap: 1.25rem (20px)
- Responsives Verhalten mit verschiedenen Spaltenanzahlen:
  - Mobile: 1 Spalte
  - Tablet: 2 Spalten
  - Desktop: 3-4 Spalten

### Flex-Layout
- Für einfachere Layouts und Komponenten
- Standard-Gap: 1rem (16px)
- Verschiedene Ausrichtungen mit justify-content und align-items

## Scrollbars

- **Breite**: 8px
- **Hintergrund**: Primary Dark
- **Daumen**: Primary Red
- **Eckenradius**: 2px
- **Hover-Effekt**: Leicht hellere Farbe

## Media Queries

### Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1023px
- **Desktop**: 1024px - 1279px
- **Large Desktop**: >= 1280px

### Responsive Anpassungen

- **Container**: Unterschiedliche maximale Breiten
- **Typografie**: Kleinere Schriftgrößen auf mobilen Geräten
- **Grid-Layout**: Weniger Spalten auf kleineren Bildschirmen

## Animationen

### Animation-Timing
- **Standard**: 0.3s ease
- **Schnell**: 0.2s ease
- **Langsam**: 0.5s ease-in-out

### Animation-Arten
- **Fade**: Opacity-Übergang
- **Slide**: TranslateX/Y-Übergang
- **Scale**: Transform-Scale-Übergang
- **Glow**: Box-Shadow-Übergang

## Status-Effekte

### Status-Anzeigen
- **Health (Leben)**: Grün bis Rot Farbverlauf je nach Zustand
- **Status-Badges**: Kleine Badges mit entsprechenden Farben und Icons

### Status-Icons
- **Poison**: Grün, Tropfen-Icon
- **Fire**: Orange, Flammen-Icon
- **Stun**: Gelb, Blitz-Icon
- **Bleed**: Rot, Blut-Icon

## Inhalts-Styling

### Listen
- **Ungeordnete Listen**: Benutzerdefinierte rote Bullet-Points
- **Geordnete Listen**: Rote Ziffern
- **Beschreibungslisten**: Hervorgehobene Begriffe in Primary Red

### Tabellen
- **Kopfzeile**: Hintergrund in Secondary, Text in Primary Red
- **Zeilen**: Alternierende Hintergründe für bessere Lesbarkeit
- **Ränder**: Subtile Trennlinien zwischen Zeilen

### Tooltips
- **Hintergrund**: Card oder leicht transparentes Schwarz
- **Text**: Foreground Light
- **Rahmen**: 1px solid Primary Red
- **Eckenradius**: 2px
- **Schatten**: Standard-Schatten
- **Position**: Erscheint über dem Element, mit Pfeil zum Referenzelement

## Best Practices

### Abstände
- Verwende konsistente Abstände basierend auf einer 4px-Basis (0.25rem)
- Standard-Abstand zwischen Komponenten: 1.25rem (20px)
- Innere Abstände (Padding): 1.25rem (20px) für Container, 0.75rem (12px) für kleinere Elemente

### Animationen
- Verwende Animationen sparsam und gezielt
- Halte Animationen kurz (0.2s-0.3s)
- Stelle sicher, dass Animationen auf die reduced-motion Medieneigenschaft reagieren

### Ränder
- Verwende einheitliche Rahmenbreite (1px)
- Primary Red für Hervorhebungen
- Subtile Rahmen für Abgrenzungen (rgba-Werte mit geringer Deckkraft)

### Interaktivität
- Sorge für klares visuelles Feedback bei Interaktionen
- Verwende Hover- und Focus-Zustände konsistent
- Stelle sicher, dass interaktive Elemente ausreichend groß für Touch-Interaktion sind (min. 44px)

### Responsive Design
- Mobile-First-Ansatz
- Teste auf verschiedenen Geräten und Bildschirmgrößen
- Verwende relative Einheiten (rem, %) statt absoluter Einheiten (px)
