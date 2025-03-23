/**
 * ASCII Art utility for displaying project structure
 */

/**
 * Project structure representation as ASCII art
 */
export const projectStructureAscii = `
grimheim-simulator
├── public/              # Static assets
├── src/                 # Source code
│   ├── components/      # UI Components
│   │   ├── combat/      # Combat-related components
│   │   └── ui/          # Reusable UI components
│   ├── constants/       # Application constants
│   ├── data/            # Game data and definitions
│   ├── screens/         # Main application screens
│   ├── store/           # State management
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main application component
│   ├── index.css        # Global styles
│   └── main.tsx         # Application entry point
├── grimheim-style-guide/ # Style guide documentation
├── memory-bank/         # Documentation files
├── dist/                # Build output
├── .git/                # Git repository
├── node_modules/        # Dependencies
├── .cursorcolors        # Cursor IDE color settings
├── .cursorrules         # Cursor IDE rules
├── .gitignore           # Git ignore patterns
├── package.json         # Project metadata and dependencies
├── package-lock.json    # Dependency lock file
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── README.md            # Project documentation
`;

/**
 * Returns an ASCII representation of the project components structure
 */
export const componentStructureAscii = `
src/components/
├── combat/
│   ├── CombatScreen.tsx     # Main combat interface
│   ├── DiceDisplay.tsx      # Dice visualization
│   ├── ModelCard.tsx        # Character card display
│   ├── ModelSelection.tsx   # Character selection interface
│   ├── RangedCombatScreen.tsx # Ranged combat interface
│   ├── RangedDiceDisplay.tsx # Ranged dice visualization
│   └── RangedModelCard.tsx  # Ranged character card
└── ui/
    ├── Button.tsx           # Button component
    ├── Card.tsx             # Card container
    ├── Tooltip.tsx          # Tooltip component
    └── ... (other UI components)
`;

/**
 * Returns an ASCII representation of the screens structure
 */
export const screenStructureAscii = `
src/screens/
├── BattleScreen.tsx     # Main battle screen
├── CombatTestScreen.tsx # Combat testing screen
├── MapScreen.tsx        # Game map screen
└── RangedTestScreen.tsx # Ranged combat testing
`;

/**
 * Display project structure in the console
 */
export function displayProjectStructure(): void {
  console.log('\x1b[33m%s\x1b[0m', 'Grimheim Simulator - Project Structure');
  console.log(projectStructureAscii);
}

/**
 * Display component structure in the console
 */
export function displayComponentStructure(): void {
  console.log('\x1b[33m%s\x1b[0m', 'Grimheim Simulator - Component Structure');
  console.log(componentStructureAscii);
}

/**
 * Display screen structure in the console
 */
export function displayScreenStructure(): void {
  console.log('\x1b[33m%s\x1b[0m', 'Grimheim Simulator - Screen Structure');
  console.log(screenStructureAscii);
}

/**
 * Generate a custom ASCII art tree structure from a nested object
 * @param structure - Object representing folder/file structure
 * @param prefix - Current line prefix (used for recursion)
 * @param isLast - Whether current item is last in its branch
 * @returns String with ASCII tree representation
 */
export function generateTreeStructure(
  structure: Record<string, any>,
  prefix = '',
  isLast = true
): string {
  const keys = Object.keys(structure);
  let result = '';

  if (!prefix) {
    result += `${keys[0]}\n`;
    prefix = '';
    keys.shift();
  }

  keys.forEach((key, index) => {
    const isLastItem = index === keys.length - 1;
    const item = structure[key];
    const hasChildren = typeof item === 'object' && Object.keys(item).length > 0;
    
    // Current item line
    result += `${prefix}${isLast ? '└── ' : '├── '}${key}`;
    
    // Add comment if it exists
    if (typeof item === 'string') {
      result += ` # ${item}`;
    }
    
    result += '\n';
    
    // Process children if they exist
    if (hasChildren) {
      const newPrefix = `${prefix}${isLast ? '    ' : '│   '}`;
      result += generateTreeStructure(item, newPrefix, isLastItem);
    }
  });

  return result;
}

export default {
  displayProjectStructure,
  displayComponentStructure,
  displayScreenStructure,
  projectStructureAscii,
  componentStructureAscii,
  screenStructureAscii,
  generateTreeStructure
}; 