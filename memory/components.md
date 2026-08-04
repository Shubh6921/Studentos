> This document exists to reduce unnecessary repository scanning.
> Always consult this file before exploring the codebase.
> Only inspect files directly related to the requested task.

# Components Inventory

## Purpose
This document maintains an accurate inventory of all reusable UI components across the codebase. It tracks component purpose, prop interfaces, dependency chains, usage, and implementation status to prevent component duplication.

## When AI Should Read It
- Before creating a new UI element to verify if an existing component can be reused or extended.
- When refactoring existing UI components or updating props interfaces.
- When auditing component usage or reviewing dependencies.

## When AI Should Update It
- Immediately after creating a new component.
- When adding, removing, or modifying component props or dependencies.
- When updating component implementation status (e.g. Draft -> Production).

---

## Component Entry Template

```markdown
### [ComponentName]
- **Name:** `ComponentName`
- **Purpose:** Brief description of what the component renders and handles.
- **Props:**
  - `propName` (`type`): Description (Required / Optional)
- **Dependencies:** `lucide-react`, child components, custom hooks.
- **Used By:** List of pages or parent components consuming this component.
- **Status:** [ Planned | In Development | Active | Deprecated ]
```

---

## Active Components Inventory

### Sidebar
- **Name:** `Sidebar`
- **Purpose:** Primary navigation drawer providing access to core student OS pages (Dashboard, Schedule, Tasks, Courses, Analytics).
- **Props:**
  - `activeRoute` (`string`): Identifies the currently active route for highlight states.
  - `onNavigate` (`function`): Callback function triggered when a nav item is clicked.
- **Dependencies:** `lucide-react` icons (LayoutDashboard, Calendar, CheckSquare, BookOpen, Settings)
- **Used By:** `App.jsx`, main layout wrapper
- **Status:** Active

### Header / Navbar
- **Name:** `Navbar`
- **Purpose:** Top bar displaying user profile summary, search trigger, notifications indicator, and global actions.
- **Props:**
  - `user` (`object`): Active user profile metrics and avatar info.
  - `onOpenSearch` (`function`): Callback to open global command palette.
- **Dependencies:** `lucide-react` icons (Bell, Search, User)
- **Used By:** Main application layout
- **Status:** Active

### TaskCard
- **Name:** `TaskCard`
- **Purpose:** Displays individual assignment or study task details including priority badge, due date, course tag, and completion checkbox.
- **Props:**
  - `task` (`object`): Task data object (id, title, dueDate, priority, course, completed).
  - `onToggleComplete` (`function`): Function to toggle task completion.
  - `onEdit` (`function`): Callback to trigger task edit modal.
- **Dependencies:** `lucide-react` (Clock, CheckCircle, AlertCircle)
- **Used By:** `DashboardPage`, `TasksPage`
- **Status:** Active

### StatWidget
- **Name:** `StatWidget`
- **Purpose:** Card widget highlighting key quantitative metrics (GPA, pending tasks, upcoming exams, study hours).
- **Props:**
  - `title` (`string`): Widget title label.
  - `value` (`string | number`): Main metric value.
  - `change` (`string`): Percentage or text change indicator.
  - `icon` (`React.Component`): Lucide icon component.
- **Dependencies:** `lucide-react`
- **Used By:** `DashboardPage`
- **Status:** Active

### Modal
- **Name:** `Modal`
- **Purpose:** Reusable backdrop overlay modal dialog for task creation, course setup, and settings.
- **Props:**
  - `isOpen` (`boolean`): Controls modal visibility.
  - `onClose` (`function`): Handler to close modal.
  - `title` (`string`): Modal header text.
  - `children` (`ReactNode`): Inner modal content.
- **Dependencies:** `lucide-react` (X)
- **Used By:** Global forms & dialogs
- **Status:** Active

---

## Future Additions
- [ ] `CalendarView`: Interactive month/week calendar grid component.
- [ ] `CommandPalette`: Global shortcut search overlay.
- [ ] `CourseProgressCard`: Visual progress card for active semester courses.
- [ ] `TimerWidget`: Pomodoro / focus study timer block.
