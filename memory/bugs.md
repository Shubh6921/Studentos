> This document exists to reduce unnecessary repository scanning.
> Always consult this file before exploring the codebase.
> Only inspect files directly related to the requested task.

# Known Bugs & Issue Tracker

## Purpose
This document tracks known issues, runtime defects, browser quirks, workarounds, and permanent solutions across the codebase.

## When AI Should Read It
- Before investigating reported errors or unexpected behaviors.
- When working on components or modules that have known temporary workarounds applied.

## When AI Should Update It
- Immediately when discovering a new bug during development or testing.
- When applying a temporary workaround for an open issue.
- When implementing and verifying a permanent fix.

---

## Bug Entry Template

```markdown
### BUG-[ID]: [Short Bug Description]
- **Priority:** [ Low | Medium | High | Critical ]
- **Status:** [ Open | In Progress | Workaround Applied | Resolved ]
- **Temporary Workaround:** Description of the interim fix or fallback mechanism.
- **Permanent Solution:** Detailed explanation of the root cause fix.
```

---

## Bug Log

### BUG-001: Mobile Layout Overflow on Small Viewports (<360px)
- **Priority:** Low
- **Status:** Open
- **Temporary Workaround:** Add `overflow-x: hidden` to the main layout wrapper container.
- **Permanent Solution:** Re-architect Sidebar and navigation header grid system using fluid CSS flex containers and responsive media queries.

### BUG-002: Date Format Mismatch in Task Due Date Selector
- **Priority:** Medium
- **Status:** Workaround Applied
- **Temporary Workaround:** Coerce all input dates using `new Date(dateString).toISOString().split('T')[0]` before passing to state.
- **Permanent Solution:** Implement centralized date utility functions in `src/utils/date.js` using strict ISO date standards.

---

## Resolved Bugs Log

### BUG-000: Initial Vite Setup HMR Warning
- **Priority:** Low
- **Status:** Resolved
- **Temporary Workaround:** Restart Vite dev server.
- **Permanent Solution:** Configured `@vitejs/plugin-react` plugin correctly in `vite.config.js`.

---

## Future Additions
- [ ] Automated error logging integration (e.g. Sentry / LogRocket)
- [ ] Triage guidelines and bug replication templates
