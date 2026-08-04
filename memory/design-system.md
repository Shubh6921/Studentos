> This document exists to reduce unnecessary repository scanning.
> Always consult this file before exploring the codebase.
> Only inspect files directly related to the requested task.

# Design System

## Purpose
This document defines the visual language, design tokens, styling conventions, animation guidelines, and UI component principles for Student OS.

## When AI Should Read It
- Before creating or styling new UI components or pages.
- When selecting colors, fonts, spacing, shadows, glass effects, or responsive layout rules.
- When implementing transitions, animations, or icon usage.

## When AI Should Update It
- When introducing new design tokens, color variables, or font styles.
- When modifying responsive breakpoints, spacing scales, or animation standards.
- When creating new reusable visual component patterns.

---

## Design System Tokens & Rules

### Color Palette
- **Primary / Brand:**
  - Accent Blue: `#3B82F6` (hsl(217, 91%, 60%))
  - Indigo / Accent Secondary: `#6366F1` (hsl(239, 84%, 67%))
  - Emerald Success: `#10B981` (hsl(160, 84%, 39%))
  - Amber Warning: `#F59E0B` (hsl(38, 92%, 50%))
  - Rose Danger: `#EF4444` (hsl(0, 84%, 60%))
- **Dark Mode Backgrounds:**
  - Main Surface: `#0F172A` (Slate 900)
  - Card / Panel Surface: `#1E293B` (Slate 800)
  - Elevated Surface: `#334155` (Slate 700)
- **Text & Content:**
  - Text Primary: `#F8FAFC` (Slate 50)
  - Text Secondary: `#94A3B8` (Slate 400)
  - Text Muted: `#64748B` (Slate 500)
  - Border Subdued: `rgba(255, 255, 255, 0.08)`

### Typography
- **Font Family:** `Inter`, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
- **Font Sizes & Scale:**
  - `xs`: `0.75rem` (12px) - Captions, tags
  - `sm`: `0.875rem` (14px) - Secondary text, body small
  - `base`: `1rem` (16px) - Body default, inputs
  - `lg`: `1.125rem` (18px) - Subheadings, card titles
  - `xl`: `1.25rem` (20px) - Section headers
  - `2xl`: `1.5rem` (24px) - Page titles
  - `3xl`: `1.875rem` (30px) - Hero headlines
- **Font Weights:** Regular (`400`), Medium (`500`), Semi-bold (`600`), Bold (`700`)

### Spacing Scale
- Base unit: `4px` (`0.25rem`)
- `space-1`: `0.25rem` (4px)
- `space-2`: `0.5rem` (8px)
- `space-3`: `0.75rem` (12px)
- `space-4`: `1rem` (16px)
- `space-6`: `1.5rem` (24px)
- `space-8`: `2rem` (32px)
- `space-12`: `3rem` (48px)

### Border Radius
- `radius-sm`: `6px` (Small buttons, tag badges)
- `radius-md`: `10px` (Cards, input fields)
- `radius-lg`: `16px` (Modals, large containers)
- `radius-full`: `9999px` (Pills, circular avatars)

### Animation Rules
- **Easing:** `cubic-bezier(0.4, 0, 0.2, 1)` (Standard smooth transition)
- **Durations:**
  - Fast: `150ms` (Micro-interactions, hover states)
  - Base: `250ms` (Modals, dropdown toggles, tab switches)
  - Slow: `400ms` (Page transitions, drawer slide-ins)
- **Hover Micro-animations:** Subtle scale (`transform: translateY(-2px)` or `scale(1.02)`) on active cards and buttons.

### Component Styling Guidelines
- Favor CSS custom properties / utility classes for consistent theme enforcement.
- Ensure all interactive elements include visible hover, active, and focus-visible states.
- Maintain adequate visual contrast for text overlays and input labels.

### Responsive Breakpoints
- `sm`: `640px` (Mobile landscape)
- `md`: `768px` (Tablets)
- `lg`: `1024px` (Small laptops / desktops)
- `xl`: `1280px` (Large displays)

### Icon System
- **Library:** `lucide-react`
- **Standard Sizes:**
  - Small: `16px` (`size={16}`)
  - Medium: `20px` (`size={20}`)
  - Large: `24px` (`size={24}`)
- **Usage Rule:** Keep stroke width consistent (`strokeWidth={2}` by default).

### Shadows
- `shadow-sm`: `0 1px 2px 0 rgba(0, 0, 0, 0.2)`
- `shadow-md`: `0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.15)`
- `shadow-lg`: `0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.2)`
- `shadow-glow`: `0 0 15px rgba(59, 130, 246, 0.35)`

### Glass Effects
- **Glass Panel:** `background: rgba(30, 41, 59, 0.7); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.08);`
- **Glass Header/Nav:** `background: rgba(15, 23, 42, 0.8); backdrop-filter: blur(16px);`

---

## Future Additions
- [ ] Light mode color palette mappings
- [ ] Theme switcher design tokens
- [ ] Custom keyframe animation utilities catalog
