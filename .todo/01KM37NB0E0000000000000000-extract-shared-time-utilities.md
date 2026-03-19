---
$schema: ../.schemas/swimlane-ticket.json
title: 'Extract Shared Time Utilities'
priority: p1
blocked_by: ["01KM37MRGF0000000000000000"]
status: todo
ready: true
blocked_by: []
subtasks: []
tags: [typescript, refactor]

---

## Context

`formatDuration`, `parseDurationMs`, `formatNumeric`, `getPhaseOffsetStr`, and `getPhaseTimeStr` are duplicated across `schedule.astro`, `shopping-list.astro`, and `recipes/[recipe].astro`. Extract them into a shared module.

## Tasks

1. **Create `src/utils/time.ts`**

2. **Extract and type all utility functions**:
   ```typescript
   export function parseDurationMs(durationStr: string | undefined | null): number
   export function formatDuration(durationStr: string | undefined | null): string | null
   export function formatNumeric(value: number): string
   export function getPhaseOffsetStr(phaseTime: string, serviceTime: number): string | null
   export function getPhaseTimeStr(phaseTime: string): string | null
   ```

3. **Import from `src/utils/time.ts`** in all three pages, replacing the duplicated local definitions:
   - `src/pages/meals/[slug]/schedule.astro`
   - `src/pages/meals/[slug]/shopping-list.astro`
   - `src/pages/recipes/[slug]/[recipe].astro`

4. **Remove the old local definitions** from each page.

5. **Verify** each page still compiles and the output is identical.

## Exit Criteria

- `src/utils/time.ts` exists with all 5 typed functions
- No duplicate definitions in any `.astro` page
- Build passes with no errors
---

