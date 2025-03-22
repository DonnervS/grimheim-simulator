# Grimheim Combat Simulator Style Guide

## Visual Design System

### Colors
```css
/* Primary Colors */
--primary-bg: #1a1a2e;          /* Dark blue background */
--secondary-bg: #2a2a4a;        /* Lighter blue background */
--accent-color: #8a8aff;        /* Bright blue accent */
--text-primary: #e6e6fa;        /* Light lavender text */
--text-secondary: #b0b0d0;      /* Muted lavender text */

/* UI Elements */
--border-color: #4a4a8a;        /* Border blue */
--hover-color: #6a6aaa;         /* Hover state blue */
--active-color: #7a7aba;        /* Active state blue */
--disabled-color: #3a3a5a;      /* Disabled state */

/* Status Colors */
--success-color: #50fa7b;       /* Green for success */
--warning-color: #ffb86c;       /* Orange for warnings */
--error-color: #ff5555;         /* Red for errors */
--info-color: #8be9fd;         /* Cyan for information */

/* Combat Colors */
--hit-color: #ff79c6;          /* Pink for hits */
--crit-color: #ff5555;         /* Red for crits */
--save-color: #50fa7b;         /* Green for saves */
--block-color: #8be9fd;        /* Cyan for blocks */
```

### Typography
```css
/* Font Families */
--primary-font: 'Press Start 2P', cursive;  /* Main retro font */
--secondary-font: 'Roboto Mono', monospace; /* Secondary monospace font */

/* Font Sizes */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */

/* Line Heights */
--leading-none: 1;
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.75;
```

### Spacing
```css
/* Spacing Scale */
--space-1: 0.25rem;    /* 4px */
--space-2: 0.5rem;     /* 8px */
--space-3: 0.75rem;    /* 12px */
--space-4: 1rem;       /* 16px */
--space-5: 1.25rem;    /* 20px */
--space-6: 1.5rem;     /* 24px */
--space-8: 2rem;       /* 32px */
--space-10: 2.5rem;    /* 40px */
```

### Layout
```css
/* Container Sizes */
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1200px;

/* Border Radius */
--radius-sm: 0.125rem;  /* 2px */
--radius-md: 0.25rem;   /* 4px */
--radius-lg: 0.5rem;    /* 8px */
--radius-xl: 1rem;      /* 16px */
```

## Component Styles

### Buttons
```css
.button {
  font-family: var(--primary-font);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  border: 2px solid var(--border-color);
  background: var(--secondary-bg);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.button:hover {
  background: var(--hover-color);
}

.button:active {
  background: var(--active-color);
}

.button:disabled {
  background: var(--disabled-color);
  cursor: not-allowed;
}
```

### Cards
```css
.card {
  background: var(--secondary-bg);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  margin: var(--space-2);
}

.model-card {
  min-width: 300px;
  max-width: 350px;
}

.weapon-card {
  width: 100%;
  max-width: 400px;
}
```

### Combat Elements
```css
.dice {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--primary-font);
  font-size: var(--text-xl);
  cursor: pointer;
}

.dice.hit { background: var(--hit-color); }
.dice.crit { background: var(--crit-color); }
.dice.save { background: var(--save-color); }
.dice.block { background: var(--block-color); }
```

## Animation Guidelines

### Transitions
```css
/* Default Transitions */
--transition-fast: 150ms ease;
--transition-normal: 250ms ease;
--transition-slow: 350ms ease;

/* Usage Examples */
.button {
  transition: all var(--transition-normal);
}

.card {
  transition: transform var(--transition-fast);
}

.dice {
  transition: 
    transform var(--transition-fast),
    background-color var(--transition-normal);
}
```

### Animations
```css
@keyframes dice-roll {
  0% { transform: rotate(0deg); }
  25% { transform: rotate(90deg); }
  50% { transform: rotate(180deg); }
  75% { transform: rotate(270deg); }
  100% { transform: rotate(360deg); }
}

@keyframes highlight {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

## Responsive Design

### Breakpoints
```css
/* Breakpoint Variables */
--screen-sm: 640px;
--screen-md: 768px;
--screen-lg: 1024px;
--screen-xl: 1200px;

/* Media Query Mixins */
@media (min-width: 640px) {
  /* Small devices */
}

@media (min-width: 768px) {
  /* Medium devices */
}

@media (min-width: 1024px) {
  /* Large devices */
}

@media (min-width: 1200px) {
  /* Extra large devices */
}
```

### Grid System
```css
.grid {
  display: grid;
  gap: var(--space-4);
}

/* Grid Templates */
.grid-cols-1 { grid-template-columns: repeat(1, 1fr); }
.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid-cols-4 { grid-template-columns: repeat(4, 1fr); }

/* Responsive Grid */
@media (min-width: 768px) {
  .md\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
  .md\:grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
}
```

## Accessibility Guidelines

### Focus States
```css
/* Focus Styles */
:focus {
  outline: 2px solid var(--accent-color);
  outline-offset: 2px;
}

/* Focus-visible (for better UX) */
:focus:not(:focus-visible) {
  outline: none;
}

:focus-visible {
  outline: 2px solid var(--accent-color);
  outline-offset: 2px;
}
```

### ARIA Labels
```html
<!-- Button Examples -->
<button aria-label="Roll Dice">Roll</button>
<button aria-label="End Turn" aria-disabled="true">End Turn</button>

<!-- Interactive Elements -->
<div role="button" aria-pressed="false">Select Die</div>
<div role="alert" aria-live="polite">Combat Result</div>
```

## Best Practices

### Component Structure
1. Use styled-components with consistent naming
2. Maintain component hierarchy
3. Keep components focused and single-responsibility
4. Document props and state

### Styling Rules
1. Use CSS variables for consistency
2. Maintain responsive design principles
3. Follow accessibility guidelines
4. Keep animations subtle and purposeful

### Code Organization
1. Group related styles together
2. Use consistent naming conventions
3. Document complex styles
4. Maintain separation of concerns 