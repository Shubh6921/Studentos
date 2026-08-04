> This document exists to reduce unnecessary repository scanning.
> Always consult this file before exploring the codebase.
> Only inspect files directly related to the requested task.

# Reusable AI Prompts & Workflow Templates

## Purpose
This document provides standardized, high-efficiency prompt templates for AI agents and human developers working on common engineering tasks (component creation, bug fixing, performance optimization, feature development, code refactoring, and code review).

## When AI Should Read It
- When executing complex or recurring development workflows to ensure step-by-step adherence to project standards.
- When generating structured prompts or instructions for specialized agent tasks.

## When AI Should Update It
- When creating new prompt patterns or refining existing templates to improve task execution accuracy.

---

## Workflow Prompt Templates

### 1. Create Component Prompt
```markdown
Context: Consult `memory/design-system.md` and `memory/components.md` before starting.
Task: Create a new reusable UI component named `<ComponentName>`.

Requirements:
1. File location: `src/components/<ComponentName>.jsx` (or `.tsx` if applicable).
2. Props Interface: Define props clearly with defaults and JSDoc comments.
3. Styling: Use CSS design tokens matching the project palette in `memory/design-system.md`.
4. Accessibility: Include ARIA labels and focus state keyboard accessibility.
5. Icons: Use `lucide-react` icons exclusively.
6. Documentation: Update `memory/components.md` with the component name, purpose, props, dependencies, used by, and status.
```

### 2. Fix Bug Prompt
```markdown
Context: Consult `memory/bugs.md` and `memory/architecture.md`.
Task: Investigate and resolve bug BUG-<ID> (<Short Description>).

Instructions:
1. Locate the bug source without scanning unrelated project directories.
2. Identify the root cause and document it in `memory/bugs.md`.
3. Apply a permanent solution without patching superficial symptoms.
4. Verify the fix by building/testing the project.
5. Update `memory/bugs.md` status to "Resolved" and record the fix details in `memory/changelog.md`.
```

### 3. Optimize Performance Prompt
```markdown
Context: Consult `memory/architecture.md` rendering strategy and state management rules.
Task: Optimize performance for `<Page or Component Name>`.

Requirements:
1. Identify unnecessary re-renders or heavy computations.
2. Apply targeted memoization (`useMemo`, `useCallback`, `React.memo`) where beneficial.
3. Code-split heavy dependencies or sub-routes if applicable.
4. Ensure layout shifts (CLS) and component mounting times are minimized.
5. Log optimization findings and results in `memory/changelog.md`.
```

### 4. Add Feature Prompt
```markdown
Context: Check `memory/roadmap.md`, `memory/progress.md`, and `memory/architecture.md`.
Task: Implement feature `<Feature Name>`.

Instructions:
1. Review feature requirements and verify target phase alignment in `memory/roadmap.md`.
2. Implement required custom hooks, components, and pages according to coding conventions in `memory/conventions.md`.
3. Update `memory/progress.md`, `memory/pages.md`, and `memory/components.md`.
4. Log completed feature details in `memory/changelog.md`.
```

### 5. Refactor Code Prompt
```markdown
Context: Review `memory/conventions.md` and `memory/decisions.md`.
Task: Refactor `<Module / File Path>`.

Requirements:
1. Improve code readability, modularity, and adherence to modern React standards without breaking existing API contracts.
2. Maintain existing functionality and test coverage.
3. Preserve all non-obvious docstrings and comments.
4. Record refactoring reason and result in `memory/changelog.md`.
```

### 6. Review Code Prompt
```markdown
Context: Read `memory/conventions.md`, `memory/design-system.md`, and `memory/brain.md`.
Task: Review pull request / proposed changes in `<File Path>`.

Checklist:
- [ ] Conforms to design system tokens and styling rules.
- [ ] No direct state mutations or anti-patterns.
- [ ] Proper error handling and non-null safety checks.
- [ ] Oxlint passes cleanly without warnings.
- [ ] Corresponding `memory/*.md` files updated.
```

---

## Future Additions
- [ ] API integration prompt template
- [ ] State management migration prompt template
- [ ] E2E / Unit testing prompt template
