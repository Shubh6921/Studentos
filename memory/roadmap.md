> This document exists to reduce unnecessary repository scanning.
> Always consult this file before exploring the codebase.
> Only inspect files directly related to the requested task.

# Product Roadmap

## Purpose
This document maps out the strategic long-term vision, development phases, feature milestones, and future expansion ideas for Student OS.

## When AI Should Read It
- When planning multi-step features or scoping upcoming development work.
- When determining whether a requested feature belongs in current or future development phases.

## When AI Should Update It
- When feature scopes, priorities, or phase targets shift.
- When a phase is completed or new strategic initiatives are introduced.

---

## Strategic Phases

### Phase 1: Foundation & Core UI Setup (Current Phase)
- **Goal:** Establish a fast, responsive, single-page UI foundation with core navigation and task tracking capabilities.
- **Key Milestones:**
  - Project configuration with Vite 8 + React 19 + Oxlint.
  - Comprehensive AI Memory System setup (`memory/`).
  - Core Design System & layout components (Sidebar, Topbar, Glass panels).
  - Main Dashboard overview page with statistics and upcoming deadlines preview.
  - Basic Tasks management page with filtering and status toggles.
  - LocalStorage data persistence layer for offline usability.

### Phase 2: Academic Workflows & Feature Expansion
- **Goal:** Provide specialized student tools for schedules, courses, notes, and study focus.
- **Key Milestones:**
  - Interactive Timetable & Schedule calendar module (`/schedule`).
  - Course hub with syllabus details, professor info, and GPA grade calculator (`/courses`).
  - Markdown-based lecture note-taking module linked to specific courses (`/notes`).
  - Built-in Pomodoro focus timer widget with customizable work/rest intervals.
  - Global Command Palette (`Cmd+K` / `Ctrl+K`) for quick navigation and task creation.

### Phase 3: Cloud Sync, Auth & Analytics
- **Goal:** Enable multi-device synchronization, backend persistence, and study analytics.
- **Key Milestones:**
  - Secure User Authentication (Sign up, Sign in, Password reset, Profile management).
  - Cloud database integration with row-level security (RLS).
  - Realtime task & schedule synchronization across devices.
  - Visual analytics dashboard for tracking study time, task completion velocity, and GPA projections.
  - Dark / Light mode theme toggling with custom accent presets.

### Future Ideas
- **AI Study Assistant:** Automated flashcard generation from lecture notes using LLM APIs.
- **Google Calendar / Outlook Sync:** Two-way synchronization for class schedules and assignment due dates.
- **Collaborative Study Groups:** Peer task sharing and shared course notes repository.
- **Mobile PWA Support:** Installable Progressive Web App package for mobile device access.

---

## Future Additions
- [ ] Integration with university LMS portals (Canvas / Blackboard / Moodle API export format)
- [ ] Custom browser extension for clipping study links directly into Student OS
