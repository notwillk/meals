---
$schema: ../.schemas/swimlane-ticket.json
title: 'TypeScript Cleanup'
priority: p2
status: todo
ready: true
blocked_by: ["01KM37NB0J0000000000000000"]
subtasks: []
tags: [cleanup, typescript, astro, easy]

---

## Context

Post-TypeScript migration cleanup — remove dead code, fix config issues, and address code quality debts identified during the review.

## Tasks

1. **`astro.config.mjs`**: Set `trailingSlash: 'never'`

2. **`package.json`**:
   - Change `"type": "commonjs"` → `"type": "module"` (Astro 6 ESM default)

3. **`src/pages/meals/[slug]/schedule.astro`**:
   - Remove dead Gantt CSS (the `.gantt-*` styles and `.gantt-container` class are orphaned since the chart is commented out)
   - Remove `getGanttMarkers()` function (unused)
   - Remove `getGanttMarkers` call from template

4. **Final build verification**: `npm run build` succeeds with zero errors.

## Exit Criteria

- `astro.config.mjs` has `trailingSlash: 'never'`
- `package.json` has `"type": "module"`
- `schedule.astro` has no orphaned Gantt CSS or `getGanttMarkers` function
- Build passes cleanly
---

