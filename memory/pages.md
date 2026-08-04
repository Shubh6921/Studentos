> This document exists to reduce unnecessary repository scanning.
> Always consult this file before exploring the codebase.
> Only inspect files directly related to the requested task.

# Pages Directory

## Purpose
This document catalogs every page in the application, mapping routes, purpose, UI components, backend service dependencies, implementation status, and planned enhancements.

## When AI Should Read It
- Before creating a new view or page component.
- When inspecting route parameters, page structures, or feature availability.
- When determining which components are integrated into specific application routes.

## When AI Should Update It
- Whenever a new page component or route is added.
- When modifying components consumed by a page.
- When updating backend dependencies, route parameters, or page statuses.

---

## Page Entry Template

```markdown
### [Page Title]
- **Route:** `/path`
- **Purpose:** Primary objective of this page.
- **Components Used:** List of sub-components rendered on this page.
- **Backend Dependency:** API endpoints or local storage keys used.
- **Status:** [ Planned | In Progress | Production ]
- **Future Improvements:** Planned visual or functional upgrades.
```

---

## Active Pages Inventory

### Dashboard Overview
- **Route:** `/` or `/dashboard`
- **Purpose:** Central hub displaying daily academic summary, upcoming deadlines, quick actions, focus metrics, and active course overviews.
- **Components Used:** `Sidebar`, `Navbar`, `StatWidget`, `TaskCard`, `CourseProgressCard`
- **Backend Dependency:** `TasksAPI`, `CoursesAPI`, `UserPreferences` local storage
- **Status:** Production
- **Future Improvements:** Add customizable drag-and-drop dashboard widgets.

### Tasks & Assignments
- **Route:** `/tasks`
- **Purpose:** Complete assignment tracker allowing sorting, filtering by course/priority, status toggling, and assignment creation.
- **Components Used:** `TaskCard`, `Modal`, `FilterBar`, `Button`
- **Backend Dependency:** `TasksAPI`, local storage sync
- **Status:** Production
- **Future Improvements:** Batch selection and bulk status updating.

### Academic Schedule
- **Route:** `/schedule`
- **Purpose:** Timetable display for course lectures, exams, assignment deadlines, and personal study blocks.
- **Components Used:** `CalendarView`, `TimeSlotCard`, `Modal`
- **Backend Dependency:** `ScheduleAPI`, Google Calendar export service (planned)
- **Status:** In Progress
- **Future Improvements:** Integration with iCal / Google Calendar sync feed.

### Courses & Notes
- **Route:** `/courses`
- **Purpose:** Course management view storing syllabus details, professor office hours, grades tracker, and linked lecture notes.
- **Components Used:** `CourseCard`, `NoteEditor`, `GradesCalculator`
- **Backend Dependency:** `CoursesAPI`, `NotesStorage`
- **Status:** In Progress
- **Future Improvements:** Markdown note editor with export capabilities.

### Settings & Profile
- **Route:** `/settings`
- **Purpose:** User profile configuration, academic term setup, theme toggle, and data backup/export options.
- **Components Used:** `FormInput`, `ToggleSwitch`, `Button`
- **Backend Dependency:** `UserSettings`, local storage options
- **Status:** Production
- **Future Improvements:** Data import/export via JSON backup file.

---

## Future Additions
- [ ] `/analytics`: Visual study time analytics and GPA tracker.
- [ ] `/focus`: Dedicated fullscreen Pomodoro study session timer page.
- [ ] `/resources`: Reference material bookmarking and PDF manager page.
