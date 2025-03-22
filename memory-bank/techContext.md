# Grimheim Combat Simulator Technical Context

## Technology Stack
1. Core Technologies
   - React 18+
   - TypeScript 5+
   - Vite
   - Styled-components

2. Development Tools
   - ESLint
   - Prettier
   - Git
   - VS Code/Cursor

## Dependencies
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "styled-components": "^6.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "@vitejs/plugin-react": "^4.0.0",
    "eslint": "^8.0.0",
    "typescript": "^5.0.0",
    "vite": "^5.0.0"
  }
}
```

## Development Setup
1. Environment Requirements
   - Node.js 18+
   - npm 9+
   - Git

2. Installation Steps
   ```bash
   git clone https://github.com/DonnervS/grimheim-simulator.git
   cd grimheim-simulator
   npm install
   npm run dev
   ```

## Project Structure
```
grimheim-simulator/
├── src/
│   ├── components/
│   │   ├── combat/
│   │   └── ui/
│   ├── screens/
│   ├── types/
│   └── data/
├── public/
├── dist/
├── node_modules/
└── package.json
```

## Build and Deployment
1. Development
   ```bash
   npm run dev
   ```

2. Production Build
   ```bash
   npm run build
   ```

3. Preview Production
   ```bash
   npm run preview
   ```

## Code Standards
1. TypeScript Configuration
   ```json
   {
     "compilerOptions": {
       "target": "ES2020",
       "useDefineForClassFields": true,
       "lib": ["ES2020", "DOM", "DOM.Iterable"],
       "module": "ESNext",
       "skipLibCheck": true,
       "moduleResolution": "bundler",
       "allowImportingTsExtensions": true,
       "resolveJsonModule": true,
       "isolatedModules": true,
       "noEmit": true,
       "jsx": "react-jsx",
       "strict": true,
       "noUnusedLocals": true,
       "noUnusedParameters": true,
       "noFallthroughCasesInSwitch": true
     },
     "include": ["src"],
     "references": [{ "path": "./tsconfig.node.json" }]
   }
   ```

2. ESLint Configuration
   ```json
   {
     "root": true,
     "env": {
       "browser": true,
       "es2020": true
     },
     "extends": [
       "eslint:recommended",
       "plugin:@typescript-eslint/recommended",
       "plugin:react-hooks/recommended"
     ],
     "ignorePatterns": ["dist", ".eslintrc.cjs"],
     "parser": "@typescript-eslint/parser",
     "plugins": ["react-refresh"],
     "rules": {
       "react-refresh/only-export-components": [
         "warn",
         { "allowConstantExport": true }
       ]
     }
   }
   ```

## Testing Strategy
1. Unit Testing
   - Component testing
   - Game logic testing
   - Type validation

2. Integration Testing
   - Combat flow testing
   - Rule interaction testing
   - State management testing

3. End-to-End Testing
   - User flow testing
   - Combat scenario testing
   - Edge case validation

## Performance Considerations
1. Component Optimization
   - Memoization
   - Lazy loading
   - Code splitting

2. State Management
   - Efficient updates
   - Minimal re-renders
   - State normalization

3. Asset Management
   - Image optimization
   - Code minification
   - Bundle optimization 