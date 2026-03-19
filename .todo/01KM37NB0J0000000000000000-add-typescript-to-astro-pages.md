---
$schema: ../.schemas/swimlane-ticket.json
title: 'Add TypeScript to Astro Pages'
priority: p2
status: todo
ready: true
blocked_by: ["01KM37N5SW0000000000000000", "01KM37NB0E0000000000000000"]
subtasks: []
tags: [typescript, astro, hard]

---

## Context

All 5 Astro pages use plain JS in their frontmatter. Convert to TypeScript with explicit types on all functions, parameters, and variables. Per the TypeScript skill: annotate all callback params explicitly, avoid `filter(Boolean)`, use `as const` for literal types.

## Tasks

1. **Convert frontmatter language** from JS to TypeScript in all 5 pages:
   - `src/pages/index.astro` — `getAllMeals()` return type, `formatDate` return type
   - `src/pages/meals/[slug]/index.astro` — `getStaticPaths` return type, all helper function signatures, course offset calculations
   - `src/pages/meals/[slug]/schedule.astro` — type all helper functions, type phase/errand lookup structures
   - `src/pages/meals/[slug]/shopping-list.astro` — type `parseQty`, `collectIngredientsBySource`, `addIngredientBySource`; type all internal maps and arrays
   - `src/pages/recipes/[slug]/[recipe].astro` — type `getPhaseOffset`, `formatDuration`, `getPhaseEquipment`, `getStepIngredients`

2. **Add `import type` statements** for all schema types used in each page.

3. **Per the TypeScript skill guidelines**:
   - Annotate every callback parameter explicitly (e.g., `.filter((item: unknown): item is T => ...)` instead of `.filter(Boolean)`)
   - Use `const` for literal type preservation, `as const` for object literals
   - Avoid `any` — use `unknown` where the type is genuinely unknown

4. **Verify** each page compiles under `strict: true`.

## Exit Criteria

- All 5 pages use TypeScript in frontmatter
- No `any` types in any frontmatter
- No `console.log` calls in any page
- Build passes with no errors
---

