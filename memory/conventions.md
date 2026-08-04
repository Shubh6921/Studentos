> This document exists to reduce unnecessary repository scanning.
> Always consult this file before exploring the codebase.
> Only inspect files directly related to the requested task.

# Development & Coding Conventions

## Purpose
This document establishes code style, naming standards, directory structure rules, import organization, comment practices, Git workflows, and testing guidelines for Student OS.

## When AI Should Read It
- Before writing, editing, refactoring, or reviewing any code files in the repository.
- When creating new files, components, functions, or branches.

## When AI Should Update It
- When adopting new coding standards, style rules, or workflow practices agreed upon by the engineering team.

---

## Conventions & Standards

### Naming Conventions
- **Components:** `PascalCase` (e.g. `TaskCard.jsx`, `CourseProgress.jsx`)
- **Hooks:** `camelCase` starting with `use` (e.g. `useTasks.js`, `useLocalStorage.js`)
- **Utilities & Helpers:** `camelCase` (e.g. `formatDate.js`, `calculateGpa.js`)
- **Variables & Functions:** `camelCase` (e.g. `activeCourseId`, `handleTaskComplete`)
- **Constants:** `UPPER_SNAKE_CASE` (e.g. `MAX_FILE_SIZE`, `DEFAULT_THEME`)
- **CSS Classes / Custom Properties:** `kebab-case` (e.g. `.task-card-header`, `--color-primary`)

### Folder Structure
```
src/
├── assets/       # Static media, icons, logo SVGs
├── components/   # Reusable UI components
├── pages/        # Top-level page views mapped to routes
├── hooks/        # Custom React hooks
├── context/      # React Context providers (State/Auth)
├── utils/        # Pure helper functions
└── styles/       # CSS tokens, globals, reset rules
```

### File Naming Guidelines
- Match component name exactly with filename (`TaskCard.jsx` exports `TaskCard`).
- Keep names descriptive and concise; avoid ambiguous acronyms.

### Imports Organization
Group imports in the following sequential order with line breaks between groups:
1. **React & Core Framework Libraries:** `react`, `react-dom`
2. **Third-Party Libraries:** `lucide-react`, router packages
3. **Internal Contexts & Custom Hooks:** `../context/...`, `../hooks/...`
4. **Components & Layouts:** `../components/...`
5. **Utilities & Constants:** `../utils/...`
6. **Styles & Assets:** `./TaskCard.css`, `../assets/...`

*Example:*
```javascript
import React, { useState, useEffect } from 'react';
import { Check, Clock, AlertTriangle } from 'lucide-react';

import { useAuth } from '../context/AuthContext';
import { useTasks } from '../hooks/useTasks';

import { Button } from '../components/Button';
import { formatDate } from '../utils/date';

import './TaskCard.css';
```

### Comments & JSDoc Standards
- Use JSDoc annotations for complex helper functions or shared hooks:
  ```javascript
  /**
   * Calculates overall semester GPA based on course grades and credits.
   * @param {Array<{grade: number, credits: number}>} courses 
   * @returns {number} Weighted GPA rounded to 2 decimal places.
   */
  ```
- Avoid redundant inline comments that restate what the code clearly expresses. Focus comments on *why* non-obvious logic exists.

### Git Commits
Use Conventional Commits syntax:
- `feat: add task creation modal component`
- `fix: resolve date formatting timezone offset bug`
- `docs: update memory/components.md inventory`
- `style: refine card hover micro-animations`
- `refactor: extract date logic into utils/date.js`
- `chore: update dependencies in package.json`

### Branch Naming
- Features: `feature/short-description` (e.g., `feature/task-filters`)
- Fixes: `fix/issue-description` (e.g., `fix/mobile-overflow`)
- Refactoring: `refactor/component-name` (e.g., `refactor/sidebar-nav`)

### Testing Strategy & Standards
- **Linting:** Run `npm run lint` (`oxlint`) before committing changes.
- **Component Integrity:** Ensure components render predictably without throwing runtime prop/null reference errors.
- **Build Verification:** Run `npm run build` to verify clean bundle generation without syntax or compilation errors.

---

## Future Additions
- [ ] Automated pre-commit git hooks via Husky
- [ ] TypeScript migration conventions if TypeScript is introduced
