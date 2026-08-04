> This document exists to reduce unnecessary repository scanning.
> Always consult this file before exploring the codebase.
> Only inspect files directly related to the requested task.

# AI Knowledge System (`memory/`)

## Purpose
The `memory/` folder is a persistent AI knowledge base designed to eliminate unnecessary codebase scanning, reduce token consumption, and maintain long-term alignment across development sessions. It acts as the single source of truth for all project context, architectural rules, visual tokens, active progress, and historical decisions.

## When AI Should Read It
- **Before inspecting application code (`src/`):** Always read the relevant memory file(s) corresponding to the assigned task.
- **At the start of a session:** Read `brain.md` and `progress.md` to establish situational context.

## When AI Should Update It
- **After completing work:** Immediately update the appropriate memory document(s) to reflect new features, component additions, bug fixes, or architecture updates.

---

## Global AI Operating Rules

- **Read only relevant memory files:** Consult specific `memory/*.md` files before diving into source code.
- **Never scan the whole repository:** Only inspect files directly related to the requested task unless explicitly required.
- **Update documentation after completing work:** Keep memory files synchronized with codebase changes.
- **Never rewrite entire documentation files:** Append changes or update relevant sections selectively.
- **Preserve formatting:** Maintain Markdown structures, section headers, and table schemas.
- **Keep documentation concise:** Use clear, bulleted, and structured technical language.
- **Single Source of Truth:** Treat the `memory/` folder as the primary authority for project context.

---

## Memory Update Matrix (Work Workflow Guide)

When you complete a specific type of task, update the corresponding memory file(s) as detailed in the matrix below:

| Type of Work Completed | Files to Update | Primary Actions Required |
| :--- | :--- | :--- |
| **New Component Created** | `components.md`, `progress.md`, `changelog.md` | Add component entry (name, purpose, props, deps, status); update active progress; log change. |
| **New Page / Route Added** | `pages.md`, `components.md`, `progress.md`, `changelog.md` | Document route, components used, and backend requirements; log progress. |
| **Architectural / Stack Change** | `architecture.md`, `decisions.md`, `brain.md`, `changelog.md` | Create new ADR entry with Problem, Decision, Reason, Date; update architecture & stack. |
| **Bug Fixed / Discovered** | `bugs.md`, `progress.md`, `changelog.md` | Update bug status (Priority, Workaround, Solution); log resolution in changelog. |
| **Design System Token Added** | `design-system.md`, `changelog.md` | Add color, typography, spacing, or animation rule; record update in changelog. |
| **Database / Data Model Altered** | `database.md`, `api.md`, `changelog.md` | Update conceptual tables, indexes, policies, or bucket descriptions without raw SQL. |
| **API Endpoint Added / Modified** | `api.md`, `pages.md`, `changelog.md` | Document endpoint path, purpose, auth, inputs, outputs, and dependencies. |
| **Feature Development Progress** | `progress.md`, `roadmap.md` | Move items across Completed, In Progress, Next, or Blocked lists. |
| **Coding Convention Established** | `conventions.md` | Document naming, folder, import, or testing rules. |
| **Prompt Template Refined** | `prompts.md` | Add or update reusable workflow prompt templates. |

---

## Quick Reference File Directory

| File | Primary Purpose | Key Contents |
| :--- | :--- | :--- |
| [`brain.md`](file:///c:/Users/shubh/OneDrive/Desktop/Ai%20agency/student%20os/memory/brain.md) | Master AI Memory & Overview | Project summary, business goals, tech stack, AI operating rules |
| [`architecture.md`](file:///c:/Users/shubh/OneDrive/Desktop/Ai%20agency/student%20os/memory/architecture.md) | System Architecture | Directory responsibilities, data flow, rendering, dependency graph |
| [`design-system.md`](file:///c:/Users/shubh/OneDrive/Desktop/Ai%20agency/student%20os/memory/design-system.md) | Visual & Styling Rules | Color palette, typography, spacing, breakpoints, glass effects |
| [`components.md`](file:///c:/Users/shubh/OneDrive/Desktop/Ai%20agency/student%20os/memory/components.md) | Component Inventory | Component list with props, dependencies, usage, and status |
| [`pages.md`](file:///c:/Users/shubh/OneDrive/Desktop/Ai%20agency/student%20os/memory/pages.md) | Pages & Routes Catalog | Page inventory, routes, component mapping, backend dependencies |
| [`database.md`](file:///c:/Users/shubh/OneDrive/Desktop/Ai%20agency/student%20os/memory/database.md) | Database Structure (No SQL) | Tables, relationships, indexes, RLS policies, storage buckets |
| [`api.md`](file:///c:/Users/shubh/OneDrive/Desktop/Ai%20agency/student%20os/memory/api.md) | API Contracts & Schemas | Endpoints, auth, request inputs, response outputs, dependencies |
| [`progress.md`](file:///c:/Users/shubh/OneDrive/Desktop/Ai%20agency/student%20os/memory/progress.md) | Living Status Tracker | Completed, In Progress, Next, and Blocked task items |
| [`roadmap.md`](file:///c:/Users/shubh/OneDrive/Desktop/Ai%20agency/student%20os/memory/roadmap.md) | Strategic Product Roadmap | Phase 1, Phase 2, Phase 3 milestones, and future feature ideas |
| [`decisions.md`](file:///c:/Users/shubh/OneDrive/Desktop/Ai%20agency/student%20os/memory/decisions.md) | Architecture Decision Records | Log of architectural choices (Problem, Decision, Reason, Date) |
| [`bugs.md`](file:///c:/Users/shubh/OneDrive/Desktop/Ai%20agency/student%20os/memory/bugs.md) | Bug & Issue Tracker | Priority, status, temporary workarounds, permanent solutions |
| [`changelog.md`](file:///c:/Users/shubh/OneDrive/Desktop/Ai%20agency/student%20os/memory/changelog.md) | Historical Changes Log | Chronological entries (Date, Files, Reason, Result) |
| [`prompts.md`](file:///c:/Users/shubh/OneDrive/Desktop/Ai%20agency/student%20os/memory/prompts.md) | AI Workflow Templates | Reusable prompts for components, bugs, refactoring, code review |
| [`conventions.md`](file:///c:/Users/shubh/OneDrive/Desktop/Ai%20agency/student%20os/memory/conventions.md) | Development Standards | Naming, imports, comments, git commit rules, testing guidelines |
| [`README.md`](file:///c:/Users/shubh/OneDrive/Desktop/Ai%20agency/student%20os/memory/README.md) | Memory System Meta Guide | Purpose, workflow update matrix, quick reference, global rules |

---

## Future Additions
- [ ] Memory file automated validation script
- [ ] Integration with workspace search indexes
