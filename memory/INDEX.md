> This document exists to reduce unnecessary repository scanning.
> Always consult this file before exploring the codebase.
> Only inspect files directly related to the requested task.

# System Index & Knowledge Map

## Purpose
This document provides a single-page index and high-level summary of the Student OS codebase structure, technology choices, operational features, visual rules, and AI execution principles.

## When AI Should Read It
- At the start of a session or task to get a quick, comprehensive snapshot of the system without loading multiple individual documentation files.

## When AI Should Update It
- When there are significant changes to the core tech stack, overall folder layout, high-level project status, or major active features.

---

## 1. Tech Stack
- **Library/Framework:** React 19 (ESM)
- **Build System:** Vite 8
- **Styling:** Custom CSS variables with responsive design and modern glassmorphism panels
- **State Management:** React Context API (`AppContext` / `AppProvider`)
- **Persistence:** LocalStorage API for sync-free offline-first experience
- **Code Quality:** Oxlint (`oxlint`) linting engine
- **Iconography:** Lucide Icons (`lucide-react`)

---

## 2. Folder Structure
```
c:\Users\shubh\OneDrive\Desktop\Ai agency\student os/
├── memory/               # Persistent AI Knowledge System docs
├── public/               # Static assets served direct
└── src/                  # Source files
    ├── assets/           # Media & visual files
    ├── components/       # Reusable layout and interactive widgets
    ├── context/          # Application context state providers
    ├── styles/           # Global styles and design system variables
    ├── tabs/             # Primary sub-views (Dashboard, Planner, Journal, etc.)
    ├── App.jsx           # Tab routing and core interface layout wrapper
    └── main.jsx          # Entry point mounting to DOM
```

---

## 3. Current Project Status
- **Development Stage:** Feature-rich working prototype with full offline dashboard modules.
- **Active Focus:** Continuous styling polish, responsive navigation refinement, code health checks with `oxlint`.
- **System Health:** Stable dev environment, builds successfully without errors.

---

## 4. Active Features
- **Dashboard:** Core landing view highlighting academic status summary, quick actions, attendance warnings, and study timelines.
- **Planner:** Tasks and classes tracker with schedule logs, status toggles, and date sorting.
- **Journal:** Markdown-like diary logger with calendar tags, emotion tags, and historical entry view.
- **Study / Focus:** Built-in customizable Pomodoro focus timer with elapsed/remaining timers.
- **Habits Manager:** Visual habit grids letting students create, toggle, and audit daily habits.
- **Analytics:** Data metrics page showing class attendance rates, study logs, average GPA, and habit streak charts.
- **Profile:** Configuration space for student major, course units, and target academic metrics.

---

## 5. Design System Highlights
- **Palette:** Slate dark backgrounds (`#0F172A`), primary blue accent (`#3B82F6`), indigo accent (`#6366F1`), emerald success (`#10B981`), amber warnings (`#F59E0B`).
- **Aesthetic:** High-end glassmorphism panel panels using `backdrop-filter: blur(12px)` and subtle transparent borders.
- **Typography:** Modern clean sans-serif styles using `Inter` or `Outfit` fonts.
- **Responsive Adaptability:** Bottom navigation dock tailored to emulate mobile application environments.

---

## 6. Global AI Operating Rules
- **Read only relevant memory files:** Consult specific `memory/*.md` files before diving into source code.
- **Never scan the whole repository:** Only inspect files directly related to the requested task.
- **Update documentation after completing work:** Keep memory files synchronized with codebase changes.
- **Never rewrite entire documentation files:** Append changes or update relevant sections selectively.
- **Preserve formatting:** Maintain Markdown structures, section headers, and table schemas.
- **Keep documentation concise:** Use clear, bulleted, and structured technical language.
- **Single Source of Truth:** Treat the `memory/` folder as the primary authority for project context.

---

## Future Additions
- [ ] Automated index sync checking tool
- [ ] Section showing current database schema relations (high-level)
