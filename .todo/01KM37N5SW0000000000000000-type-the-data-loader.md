---
$schema: ../.schemas/swimlane-ticket.json
title: 'Type the Data Loader'
priority: p1
status: todo
ready: true
blocked_by: ["01KM37MRGF0000000000000000", "01KM37MZQ50000000000000000"]
subtasks: []
tags: [typescript, data-loader, normal]

---

## Context

`src/data/loader.ts` is plain JS. It parses YAML files, derives computed fields (`slug`, `date`), and loads recipes into meals. All exported functions must have explicit return types matching the schema types from "Define Data Schema Types".

## Tasks

1. **Add `import type` statements** for `Meal`, `Recipe`, `RecipeRef`, `Course`, `Errand`, `isMeal`.

2. **Type all exported functions** with explicit signatures:
   - `normalizeSlug(str: string): string`
   - `getAllMeals(): Meal[]`
   - `getMeal(slug: string): Meal | null`
   - `getRecipe(mealSlug: string, recipeSlug: string): Recipe | null`

3. **Type internal helper variables** where inference is ambiguous (e.g., `const meals: Meal[] = []`).

4. **Use the `isMeal` type guard** after `yaml.load()` to narrow the parsed YAML to `Meal` before pushing to the array.

5. **Verify TypeScript compilation** — no `any`, no `unknown` leaking out of the public API.

## Exit Criteria

- `loader.ts` compiles under `strict: true` with no errors
- No `any` types in function signatures
- All exported functions return explicitly typed values
---

