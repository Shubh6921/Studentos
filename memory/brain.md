> This document exists to reduce unnecessary repository scanning.
> Always consult this file before exploring the codebase.
> Only inspect files directly related to the requested task.

# Brain (Master AI Memory)

## Purpose
This document serves as the centralized brain and single source of truth for AI agents operating on this repository. It provides high-level alignment on project vision, core business goals, tech stack decisions, fundamental coding rules, and active project status.

## When AI Should Read It
- At the start of any new session or before taking on any major development task.
- When seeking understanding of overall project goals, constraints, or technology stack.
- Before making architectural or scope decisions that affect the project.

## When AI Should Update It
- When high-level business goals or technical stack decisions change.
- When new global coding guidelines or working instructions are established.
- When updating current high-level project status milestones.

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

## Master AI Memory & Overview

### Project Summary
**Student OS** is a productivity and dashboard workspace designed for students to manage academic schedules, track assignments, organize study materials, and monitor goals within a clean, performant web interface.

### Business Goals
1. Provide an intuitive, distraction-free operating system tailored for student workflows.
2. Enable seamless tracking of tasks, deadlines, courses, and personal metrics.
3. Deliver fast load times and responsive performance using modern web architecture.
4. Maintain scalable and modular architecture allowing easy feature expansion.

### Tech Stack
- **Framework:** React 19 (ESM)
- **Build Tool:** Vite 8
- **Icons:** Lucide React
- **Linter:** Oxlint
- **Language/Runtime:** JavaScript (Node.js ecosystem with Vite dev environment)

### Coding Rules
- Use modern React functional components with hooks.
- Follow modular UI component structure (keep components focused and single-purpose).
- Maintain CSS tokenized styling without unnecessary dependencies.
- Write clean, self-documenting code with concise comments where logic is complex.
- Preserve linting rules enforced by `oxlint`.

### AI Working Instructions
1. Check `memory/` files to understand context before opening `src/` files.
2. Maintain strict separation of concerns between state management, layout components, and utility functions.
3. When creating new components or pages, update `components.md` and `pages.md` accordingly.
4. Document all architectural changes in `decisions.md` and keep `progress.md` updated.

### Project Status
- **Current Phase:** Initial Core Setup & Component Foundation
- **Active Focus:** Building core workspace layouts and essential student management tools.
- **Health:** Stable dev environment running on Vite with Oxlint linting setup.

---

## Future Additions
- [ ] Integration with external calendar APIs
- [ ] Local storage & offline sync mechanisms
- [ ] User customization themes & layout widgets
