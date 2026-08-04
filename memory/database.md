> This document exists to reduce unnecessary repository scanning.
> Always consult this file before exploring the codebase.
> Only inspect files directly related to the requested task.

# Database Structure & Data Models

## Purpose
This document provides a comprehensive conceptual overview of the database schema, data relationships, indexing strategies, access policies, storage buckets, and realtime sync usage for Student OS. *(Note: High-level architectural specification only — no raw SQL scripts).*

## When AI Should Read It
- Before creating or altering data structures, models, or local storage schemas.
- When evaluating entity relationships, data constraints, or query indexing needs.
- When implementing file storage, security rules (RLS), or realtime event subscriptions.

## When AI Should Update It
- Whenever data entities, field structures, or table relationships are modified.
- When new indexes, policies, or storage buckets are configured.
- When updating realtime data publication channels.

---

## Data Schema & Entity Overview

### Tables & Entities

#### Users Entity (`users`)
- **Purpose:** Stores user profile details and academic settings.
- **Fields:** `id`, `email`, `full_name`, `avatar_url`, `university`, `major`, `current_semester`, `created_at`, `updated_at`

#### Courses Entity (`courses`)
- **Purpose:** Stores academic courses registered by the student.
- **Fields:** `id`, `user_id`, `course_code`, `course_name`, `instructor`, `credits`, `color_hex`, `building_room`, `created_at`

#### Tasks & Assignments Entity (`tasks`)
- **Purpose:** Tracks assignments, exams, homework, and study tasks.
- **Fields:** `id`, `user_id`, `course_id`, `title`, `description`, `due_date`, `priority` (low/med/high), `status` (todo/in_progress/completed), `created_at`

#### Schedules & Events Entity (`schedules`)
- **Purpose:** Stores recurring timetable entries and single academic events.
- **Fields:** `id`, `user_id`, `course_id`, `title`, `day_of_week`, `start_time`, `end_time`, `location`, `is_recurring`

#### Notes Entity (`notes`)
- **Purpose:** Lecture notes and study summaries linked to courses.
- **Fields:** `id`, `user_id`, `course_id`, `title`, `content_markdown`, `tags`, `updated_at`

### Relationships
- `users` (1) ───< `courses` (N) [Cascade Delete]
- `users` (1) ───< `tasks` (N) [Cascade Delete]
- `courses` (1) ───< `tasks` (N) [Set Null on Delete]
- `users` (1) ───< `schedules` (N)
- `courses` (1) ───< `notes` (N)

### Indexes
- Primary Key Index on `id` across all entities.
- Composite Index on `tasks(user_id, due_date, status)` for fast task dashboard queries.
- Index on `courses(user_id)` for rapid course list filtering.
- Index on `schedules(user_id, day_of_week)` for timetable rendering.

### Policies (Security & Row-Level Access)
- **User Isolation Policy:** All queries enforce `user_id = auth.uid()` to prevent unauthorized data access across accounts.
- **Read/Write Access:** Only authenticated users can perform CRUD operations on records bound to their `user_id`.

### Storage Buckets
- `avatars/`: Public bucket for user profile pictures.
- `attachments/`: Private bucket for assignment PDF attachments and lecture slides (max 25MB per file).

### Realtime Usage
- `tasks` table: Subscription enabled for instant task sync across open browser tabs/devices.
- `schedules` table: Realtime push updates when calendar events are modified.

---

## Future Additions
- [ ] Flashcard entity for study review system
- [ ] Group study sessions entity for collaborative study groups
- [ ] GPA calculation weights entity
