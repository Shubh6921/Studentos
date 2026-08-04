> This document exists to reduce unnecessary repository scanning.
> Always consult this file before exploring the codebase.
> Only inspect files directly related to the requested task.

# Architecture Decision Records (ADR)

## Purpose
This document logs significant architectural, structural, technology stack, and design decisions made throughout the lifecycle of the project. It provides historical context and reasoning behind key trade-offs.

## When AI Should Read It
- Before questioning or altering established architectural patterns or library choices.
- When evaluating trade-offs for new tech stack additions.

## When AI Should Update It
- Immediately when a key architectural, structural, or tooling decision is agreed upon.

---

## ADR Record Format

```markdown
### ADR-[ID]: [Title of Decision]
- **Date:** YYYY-MM-DD
- **Problem:** What challenge or requirement prompted this decision?
- **Decision:** What solution or path was chosen?
- **Reason:** Why was this specific decision made over alternative options? What are the key benefits and acceptable trade-offs?
```

---

## Decision History Log

### ADR-001: Adoption of React 19 with Vite 8 Build Tool
- **Date:** 2026-08-04
- **Problem:** Needed a fast, modern frontend framework and bundler setup that delivers sub-second Hot Module Replacement (HMR) and lightweight production bundles without complex configuration.
- **Decision:** Selected React 19 paired with Vite 8 using native ESM modules.
- **Reason:** Vite provides instant server start, extremely rapid HMR, and straightforward configuration compared to legacy tools (CRA, Webpack). React 19 brings performance improvements, enhanced hooks support, and an extensive ecosystem.

### ADR-002: Code Quality Enforcement via Oxlint
- **Date:** 2026-08-04
- **Problem:** Needed high-speed JavaScript/JSX linting that catches common bugs and formatting issues without slowing down developer build workflows.
- **Decision:** Integrated Oxlint (`oxlint`) as the primary code linter.
- **Reason:** Oxlint is significantly faster than traditional ESLint setups while executing essential syntax and static code analysis checks out of the box.

### ADR-003: Lucide React for UI Iconography
- **Date:** 2026-08-04
- **Problem:** Required a comprehensive, lightweight, consistent icon library for navigation, status badges, and interactive controls.
- **Decision:** Chosen `lucide-react`.
- **Reason:** Lucide React offers highly customizable SVG vector icons with tree-shaking support, ensuring minimal impact on production bundle sizes while keeping visual style clean and uniform.

### ADR-004: Persistent AI Knowledge System (`memory/`)
- **Date:** 2026-08-04
- **Problem:** AI assistants frequently spend unnecessary tokens and time recursively scanning codebases to re-discover project structure, design rules, and active state.
- **Decision:** Created a structured `memory/` directory containing dedicated Markdown context files (`brain.md`, `architecture.md`, `design-system.md`, etc.).
- **Reason:** Eliminates repository crawling, standardizes development conventions, maintains single-source-of-truth project context, and improves task execution speed.

---

## Future Additions
- [ ] ADR-005: Choice of backend service (Supabase vs Firebase vs Custom Node backend)
- [ ] ADR-006: Global state management approach (React Context vs Zustand vs Redux Toolkit)
