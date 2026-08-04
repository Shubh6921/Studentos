> This document exists to reduce unnecessary repository scanning.
> Always consult this file before exploring the codebase.
> Only inspect files directly related to the requested task.

# API Specifications & Contracts

## Purpose
This document specifies all internal service functions, external REST/GraphQL API endpoints, authentication requirements, input schemas, response structures, and dependencies for Student OS.

## When AI Should Read It
- Before connecting frontend components to backend endpoints or local mock services.
- When creating new API integration functions or data fetching hooks.
- When verifying request payload formats or error handling rules.

## When AI Should Update It
- Whenever an API route or endpoint schema is created, modified, or deprecated.
- When payload input/output structures change.
- When adding new external service integrations or auth headers.

---

## API Endpoint Entry Template

```markdown
### [METHOD] `/api/endpoint-path`
- **Endpoint:** `METHOD /api/v1/resource`
- **Purpose:** Brief description of what the endpoint does.
- **Authentication:** [ None | Bearer Token / Session Cookie ]
- **Inputs:**
  - Headers: `Authorization: Bearer <token>`
  - Body / Query Params: `{ fieldName: type }`
- **Outputs:**
  - Status `200 OK`: `{ success: true, data: { ... } }`
  - Status `400 / 401 / 500`: Error payload format
- **Dependencies:** Database service, external notification worker.
```

---

## Active API Inventory

### GET `/api/v1/tasks`
- **Endpoint:** `GET /api/v1/tasks`
- **Purpose:** Fetches filtered list of assignments and tasks for the logged-in user.
- **Authentication:** Bearer Token (Required)
- **Inputs:**
  - Query Params: `status` (optional: `todo` | `completed`), `courseId` (optional: `uuid`)
- **Outputs:**
  - `200 OK`: `[ { "id": "t1", "title": "Math Quiz", "dueDate": "2026-08-10", "priority": "high", "completed": false } ]`
- **Dependencies:** `tasks` database table

### POST `/api/v1/tasks`
- **Endpoint:** `POST /api/v1/tasks`
- **Purpose:** Creates a new task or assignment entry.
- **Authentication:** Bearer Token (Required)
- **Inputs:**
  - Request Body: `{ "title": "string", "courseId": "string", "dueDate": "ISOString", "priority": "low"|"med"|"high" }`
- **Outputs:**
  - `201 Created`: `{ "id": "t2", "title": "string", "status": "todo", "created_at": "ISOString" }`
- **Dependencies:** `tasks` database table, Validation middleware

### PUT `/api/v1/tasks/:id`
- **Endpoint:** `PUT /api/v1/tasks/:id`
- **Purpose:** Updates status, title, due date, or details of an existing task.
- **Authentication:** Bearer Token (Required)
- **Inputs:**
  - Path Param: `id` (string)
  - Request Body: `{ "completed": boolean, "title"?: string, "dueDate"?: string }`
- **Outputs:**
  - `200 OK`: `{ "success": true, "updatedTask": { ... } }`
- **Dependencies:** `tasks` database table

### GET `/api/v1/courses`
- **Endpoint:** `GET /api/v1/courses`
- **Purpose:** Retrieves all active courses for the current academic term.
- **Authentication:** Bearer Token (Required)
- **Inputs:** None
- **Outputs:**
  - `200 OK`: `[ { "id": "c1", "code": "CS101", "name": "Intro to Computer Science", "color": "#3B82F6" } ]`
- **Dependencies:** `courses` database table

### GET `/api/v1/schedule`
- **Endpoint:** `GET /api/v1/schedule`
- **Purpose:** Retrieves student class timetable and scheduled study events.
- **Authentication:** Bearer Token (Required)
- **Inputs:**
  - Query Params: `weekOffset` (number)
- **Outputs:**
  - `200 OK`: `[ { "id": "s1", "title": "CS101 Lecture", "day": "Monday", "startTime": "09:00", "endTime": "10:30" } ]`
- **Dependencies:** `schedules` database table

---

## Future Additions
- [ ] `POST /api/v1/ai/summarize-notes`: AI endpoint for generating study flashcards from lecture notes.
- [ ] `GET /api/v1/analytics/gpa`: Calculates current semester GPA projections based on graded assignments.
