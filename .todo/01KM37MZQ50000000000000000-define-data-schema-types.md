---
$schema: ../.schemas/swimlane-ticket.json
title: 'Define Data Schema Types'
priority: p1
status: todo
ready: true
blocked_by: []
subtasks: []
tags: [typescript]

---

## Context

The project uses a custom YAML data model with no type safety. Types must accurately reflect the YAML schema in `meals/march-vegetarian/` and be strict enough to catch mismatches during development.

## Tasks

1. **Create `src/types/index.ts`** with the following types (interfaces for object shapes, type aliases for unions):

   - **`Qty`** — `number | string` (handles `"1/4"`, `"1-1/4"` fraction strings)
   - **`Ingredient`** — `{ name: string; qty?: Qty; unit?: string; note?: string; source?: string; preparation?: string; homemade?: boolean }`
   - **`Step`** — `{ instruction: string; ingredients?: Ingredient[]; equipment?: string[]; note?: string }`
   - **`Phase`** — `{ id: string; description?: string; time?: string; duration?: string; follows?: string[]; final?: boolean; storage?: string; ingredients?: Ingredient[]; steps?: Step[] }`
   - **`Recipe`** — `{ id: string; slug: string; description: string; inspiration?: string[]; phases?: Phase[] }`
   - **`RecipeRef`** — unresolved recipe reference (before full load): `{ slug: string; description: string }`
   - **`Course`** — `{ name: string; description?: string; plating?: string; recipes: RecipeRef[]; duration?: string; hidden?: boolean; first_course?: boolean }`
   - **`Errand`** — `{ name: string; time?: string; duration?: string }`
   - **`Meal`** — `{ name: string; start_time?: string; slug?: string; date?: string; courses: Course[]; errands?: Errand[] }`

2. **Use `export interface` for object shapes**, `export type` for type aliases.

3. **Add a type guard** `isMeal(v: unknown): v is Meal` to narrow `yaml.load()` output.

4. **Export from `src/types/index.ts`** all types so pages can `import type { Meal, Recipe, ... }`.

## Exit Criteria

- `src/types/index.ts` exists with all types defined
- Type guard `isMeal` compiles without errors
- All types accurately match the YAML schema
---

