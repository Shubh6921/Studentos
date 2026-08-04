> This document exists to reduce unnecessary repository scanning.
> Always consult this file before exploring the codebase.
> Only inspect files directly related to the requested task.

# Application Architecture

## Purpose
This document details the high-level architecture, directory layout, rendering strategies, data flow mechanisms, and state management patterns of the application.

## When AI Should Read It
- Before introducing new directory structures, architectural patterns, or state stores.
- When planning multi-component interactions or refactoring data flows.
- When evaluating performance, rendering strategy, or security models.

## When AI Should Update It
- When folder structures or architectural responsibilities change.
- When adding or modifying authentication mechanisms, state contexts, or API routing layer architectures.
- When altering data flow diagrams or dependency relationships.

---

## Architecture Overview

### Overall Application Architecture
Student OS follows a modern client-centric Single Page Application (SPA) architecture built with React and Vite. It utilizes component-driven design with modular layouts, centralized context/state managers, and localized custom hooks for side effects and data operations.

```
[ Browser / User Interface ]
           │
     (React Router / Nav)
           │
     [ Page Layouts ] ────► [ Reusable UI Components ]
           │                         │
    [ Custom Hooks ] ◄───────────────┘
           │
   [ State / Context ]
           │
    [ API / LocalStorage Layer ]
```

### Folder Responsibilities
- `src/`: Root source code directory.
  - `src/assets/`: Static assets such as images, brand vectors, and global stylesheets.
  - `src/components/`: Reusable, layout-agnostic UI elements (buttons, cards, inputs, modals).
  - `src/pages/`: Main page components corresponding to primary application routes.
  - `src/hooks/`: Custom React hooks encapsulating business logic, data fetching, and state interaction.
  - `src/context/` or `src/store/`: React Context or state management providers.
  - `src/utils/`: Pure helper functions, formatting utilities, and date calculators.
  - `src/styles/`: Global CSS styling tokens, theme variables, and reset scripts.
- `public/`: Unbundled static files served directly by Vite.
- `memory/`: AI system knowledge base and persistent project memory.

### Data Flow
1. **User Action:** Events triggered in UI components.
2. **Hook / Handler Invocation:** Components delegate logic to custom hooks or context actions.
3. **State Mutation:** State updates trigger reactive re-renders across dependent components.
4. **Persistence:** Data updates are synchronized to local storage or backend service endpoints asynchronously.

### Authentication Flow
- *Placeholder:* Authentication architecture (Local session / JWT / OAuth Provider integration).
- Unauthenticated users are redirected to login/onboarding views.
- Auth state is held in an AuthContext provider wrapping top-level routes.

### Rendering Strategy
- **Client-Side Rendering (CSR):** Vite bundles React assets for client execution.
- **Fast Refresh:** Vite HMR enabled during development.
- **Optimized Re-renders:** Component memoization (`React.memo`, `useMemo`, `useCallback`) applied to performance-sensitive UI components.

### State Management
- **Local State:** `useState` / `useReducer` for component-specific interactive state.
- **Global / Shared State:** React Context API for themes, user session context, and workspace configuration.
- **Persistent State:** Web LocalStorage API wrapper for user preferences and draft data.

### Dependency Graph
```
App.jsx
  ├── Context Providers (Theme, Auth, Data)
  └── Router / Main Layout
        ├── Navbar / Sidebar Navigation
        ├── Dynamic Page Containers (Dashboard, Tasks, Schedule, Courses)
        │     └── Reusable UI Components (Cards, Lists, Modals, Forms)
        └── Shared Utilities & Lucide Icons
```

---

## Future Additions
- [ ] Service Worker setup for offline access (PWA capabilities)
- [ ] Backend API client integration layer
- [ ] Global state library integration if state complexity scales beyond React Context
