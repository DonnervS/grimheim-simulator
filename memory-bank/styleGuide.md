# Grimheim Style Guide

## Design Philosophy

The design of Grimheim combines a dark medieval aesthetic with modern UI practices. It is:

- **Atmospheric**: Dark color scheme with red and gold accents that reflect a grim fantasy world
- **Clear and readable**: Despite the dark background, text remains highly legible through careful contrast design
- **Minimalist**: Reduced interfaces with focused visual effects enhance the user experience
- **Consistent**: Unified design language across all components that conveys the feeling of a cohesive world
- **Responsive**: Adapts seamlessly to different screen sizes while maintaining the atmospheric experience

## Color Palette

### Primary Colors
- **Primary (Red)** `#dc2626` - Main accent color for headings, buttons, and important UI elements
- **Background (Dark)** `#0f0f0f` - Main application background
- **Foreground (Light)** `#fafafa` - Primary text color

### Secondary Colors
- **Secondary** `#27272a` - For secondary UI elements, containers, and backgrounds
- **Accent** `#18181b` - For subtle UI distinctions and interactive elements
- **Gold** `#f59e0b` - For special elements, highlights, and model statistics
- **Muted** `#171717` - For less prominent UI elements
- **Card** `#1c1c1c` - For card backgrounds and content containers
- **Muted Foreground** `#a3a3a3` - For secondary text and less important information

### Status Colors
- **Success** `#16a34a` - For positive outcomes and healing effects
- **Warning** `#ca8a04` - For caution indicators and special actions
- **Danger** `#b91c1c` - For negative outcomes and damage effects
- **Info** `#2563eb` - For informational elements and tooltips

### Extended Color Palette
- **Blood Red** `#991b1b` - Deeper red for thematic elements
- **Bone** `#fffbeb` - Light cream color for contrast elements
- **Ash Gray** `#374151` - Medium gray for neutral elements
- **Shadow** `#111827` - Deep shadow color for depth
- **Poison** `#22c55e` - For poison status effects
- **Ice** `#22d3ee` - For ice/cold status effects
- **Fire** `#f97316` - For fire/burning status effects
- **Curse** `#7e22ce` - For curse/magic status effects

## Typography

### Font Family
- **Primary Font**: 'IM Fell English' for headings and thematic text
- **Secondary Font**: 'Inter' for body text and UI elements

### Typography Hierarchy
- **H1**: 2.5rem/3rem, Primary Font, var(--primary), text-shadow, normal weight
- **H2**: 2rem, Primary Font, var(--primary), text-shadow, normal weight
- **H3**: 1.5rem, Primary Font, var(--foreground), normal weight
- **H4**: 1.25rem, Primary Font, var(--foreground), normal weight
- **Large Body**: 1.125rem, Secondary Font, var(--foreground)
- **Body**: 1rem, Secondary Font, var(--foreground)
- **Small**: 0.875rem, Secondary Font, var(--muted-foreground)
- **Extra Small**: 0.75rem, Secondary Font, var(--muted-foreground)

### Text Effects
- **Quote**: Border-left 4px solid var(--primary), padding-left 1rem, italic style
- **Background Quote**: Background var(--secondary), padding 1rem, rounded corners, italic style

## Components

### Cards
\`\`\`css
.card {
  background: var(--card);
  border-radius: var(--radius);
  padding: 1.5rem;
}

.card-header {
  margin-bottom: 1rem;
}

.card-title {
  font-family: 'IM Fell English', serif;
  font-size: 1.5rem;
}

.card-description {
  color: var(--muted-foreground);
  font-size: 0.875rem;
}

.card-content {
  padding: 1.5rem;
}
\`\`\`

### Buttons
\`\`\`css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius);
  font-weight: 500;
  transition: all 0.2s ease;
}

.button-primary {
  background: var(--primary);
  color: var(--primary-foreground);
}

.button-secondary {
  background: var(--secondary);
  color: var(--secondary-foreground);
}

.button-outline {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--foreground);
}

.button-ghost {
  background: transparent;
  color: var(--foreground);
}

.button-destructive {
  background: var(--destructive);
  color: var(--destructive-foreground);
}

.button-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

.button-default {
  padding: 0.5rem 1rem;
}

.button-lg {
  padding: 0.75rem 1.5rem;
  font-size: 1.125rem;
}

.button-icon {
  padding: 0.5rem;
  width: 2rem;
  height: 2rem;
}
\`\`\`

### Badges
\`\`\`css
.badge {
  display: inline-flex;
  align-items: center;
  border-radius: 9999px;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.badge-default {
  background: var(--primary);
  color: var(--primary-foreground);
}

.badge-secondary {
  background: var(--secondary);
  color: var(--secondary-foreground);
}

.badge-outline {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--foreground);
}

.badge-destructive {
  background: var(--destructive);
  color: var(--destructive-foreground);
}
\`\`\`

### Status Effect Tags
\`\`\`css
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  border-radius: 9999px;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.status-badge-stunned {
  background: #ca8a04;
  color: white;
}

.status-badge-poisoned {
  background: #16a34a;
  color: white;
}

.status-badge-frozen {
  background: #0891b2;
  color: white;
}

.status-badge-burning {
  background: #ea580c;
  color: white;
}

.status-badge-cursed {
  background: #7e22ce;
  color: white;
}
\`\`\`

### Select Fields
\`\`\`css
.select {
  background: var(--accent);
  color: var(--foreground);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 0.5rem;
  font-size: 1rem;
  appearance: none;
}

.select:focus {
  outline: none;
  border-color: var(--ring);
  box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.2);
}
\`\`\`

## Dice Design

### Standard Dice
\`\`\`css
.dice {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  border-radius: 0.5rem;
  font-weight: bold;
  font-size: 1.5rem;
}

.dice-small {
  width: 2.5rem;
  height: 2.5rem;
  font-size: 1rem;
}
\`\`\`

### Dice States
\`\`\`css
.dice-miss {
  background: #4b5563;
  color: white;
}

.dice-hit {
  background: #dc2626;
  color: white;
}

.dice-critical {
  background: #f59e0b;
  color: black;
}

.dice-block {
  background: #2563eb;
  color: white;
}

.dice-shield {
  background: #0891b2;
  color: white;
}

.dice-armor {
  background: #6b7280;
  color: white;
}

.dice-critical-block {
  background: #7e22ce;
  color: white;
}
\`\`\`

## Icons

### Icon System
- Lucide icons for consistent styling across the application
- SVG-based icons for optimal scalability and customization

### Icon Sizes
- **Small**: 14px (h-3.5 w-3.5) for badges and compact UI
- **Medium**: 16px (h-4 w-4) for buttons and inline use
- **Standard**: 20px (h-5 w-5) for general UI elements
- **Large**: 24px (h-6 w-6) for featured UI elements

### Interactive Icons
\`\`\`css
.interactive-icon {
  color: var(--foreground);
  transition: all 0.3s ease;
}

.interactive-icon:hover {
  color: var(--primary);
  transform: translateY(-2px);
}
\`\`\`

## Layout

### Container
- Maximum width: 1200px for large components, 800px for content pages
- Horizontal centering with padding on smaller screens

### Grid Layout
\`\`\`css
.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 1rem;
}
\`\`\`

### Flex Layout
\`\`\`css
.flex {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.flex-col {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
\`\`\`

## Effects

### Hover Effects

#### Scale on Hover
\`\`\`css
.hover-scale {
  transition: transform 0.2s ease;
}

.hover-scale:hover {
  transform: scale(1.05);
}
\`\`\`

#### Background Change on Hover
\`\`\`css
.hover-bg {
  transition: background-color 0.2s ease;
}

.hover-bg:hover {
  background-color: rgba(220, 38, 38, 0.1);
}
\`\`\`

### Glow Effects

#### Red Glow
\`\`\`css
.glow-red {
  box-shadow: 0 0 10px 2px rgba(220, 38, 38, 0.3);
  transition: box-shadow 0.3s ease;
}

.glow-red:hover {
  box-shadow: 0 0 15px 5px rgba(220, 38, 38, 0.5);
}
\`\`\`

#### Gold Glow
\`\`\`css
.glow-gold {
  box-shadow: 0 0 10px 2px rgba(245, 158, 11, 0.3);
  transition: box-shadow 0.3s ease;
}

.glow-gold:hover {
  box-shadow: 0 0 15px 5px rgba(245, 158, 11, 0.5);
}
\`\`\`

### Selection Effects
\`\`\`css
.selection-border {
  position: relative;
}

.selection-border::after {
  content: "";
  position: absolute;
  inset: 0;
  border: 2px solid transparent;
  border-radius: var(--radius);
  transition: border-color 0.2s ease;
}

.selection-border:hover::after {
  border-color: var(--primary);
}

.gold-border:hover::after {
  border-color: var(--gold);
}
\`\`\`

## Content Styling

### Info Boxes
\`\`\`css
.info-box {
  border-radius: var(--radius);
  padding: 1rem;
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.info-box-blue {
  background-color: rgba(30, 58, 138, 0.5);
  border: 1px solid #1e40af;
}

.info-box-red {
  background-color: rgba(153, 27, 27, 0.5);
  border: 1px solid #991b1b;
}

.info-box-yellow {
  background-color: rgba(161, 98, 7, 0.5);
  border: 1px solid #a16207;
}

.info-box-green {
  background-color: rgba(22, 101, 52, 0.5);
  border: 1px solid #166534;
}
\`\`\`

### Lists
\`\`\`css
.list {
  margin-left: 1.5rem;
  margin-bottom: 1.5rem;
}

.list li {
  margin-bottom: 0.5rem;
}
\`\`\`

### Tables
\`\`\`css
table {
  width: 100%;
  border-collapse: collapse;
}

th {
  text-align: left;
  padding: 0.75rem;
  background-color: var(--secondary);
  font-weight: 600;
}

td {
  padding: 0.75rem;
  border-bottom: 1px solid var(--border);
}

tr:hover {
  background-color: rgba(255, 255, 255, 0.03);
}

caption {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: var(--muted-foreground);
  text-align: left;
}
\`\`\`

### Model Stats
\`\`\`css
.stat-card {
  background-color: var(--secondary);
  padding: 1rem;
  border-radius: var(--radius);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.stat-description {
  font-size: 0.75rem;
  color: var(--muted-foreground);
}

.stat-value {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-top: 0.25rem;
}

.model-stat .stat-name {
  font-family: 'IM Fell English', serif;
  font-size: 1.25rem;
  color: var(--gold);
}

.weapon-stat .stat-name {
  font-family: 'IM Fell English', serif;
  font-size: 1.25rem;
  color: var(--primary);
}

.stat-number {
  font-weight: bold;
  font-size: 1.5rem;
}
\`\`\`

## Best Practices

### Spacing
- Consistent spacing using the spacing scale (0.25rem, 0.5rem, 1rem, 1.5rem, 2rem)
- Padding for containers: 1.5rem
- Gap between grid/flex items: 1rem
- Margin between sections: 2rem

### Animations
- Subtle transitions for hover effects (0.2s-0.3s)
- Use ease or ease-in-out timing functions
- Avoid animations that block user interaction

### Borders
- Border radius: var(--radius) (0.5rem by default)
- Border color: var(--border)
- Border width: 1px for subtle borders, 2px for emphasis

### Interactivity
- Clear hover states for all interactive elements
- Focus states for keyboard navigation
- Disabled states with reduced opacity (0.5)

### Responsive Design
- Mobile-first approach
- Breakpoints at 640px, 768px, 1024px, 1280px
- Stack elements vertically on mobile
- Use grid/flex for responsive layouts

