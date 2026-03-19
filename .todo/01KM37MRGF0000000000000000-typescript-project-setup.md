---
$schema: ../.schemas/swimlane-ticket.json
title: 'TypeScript Project Setup'
priority: p0
status: todo
ready: true
blocked_by: []
subtasks: []
tags: [typescript, astro, easy]

---

## Context

The project has no TypeScript configuration and uses plain JS throughout. Astro 6 defaults to ESM. All type safety must be established before other TypeScript work begins.

## Tasks

1. **Create `tsconfig.json`** extending `astro/tsconfigs/strict`:
   - Set `baseUrl: "."` and `paths: { "@/*": ["src/*"] }`
   - Include `["src/**/*", ".astro/**/*"]`
   - `allowJs: true` for incremental migration

2. **Rename `src/data/loader.js` → `src/data/loader.ts`**
   - Change file extension (no content changes yet — types come in "Type the Data Loader")

3. **Update all imports** of `loader.js` to `loader.ts` across all pages:
   - `src/pages/index.astro`
   - `src/pages/meals/[slug]/index.astro`
   - `src/pages/meals/[slug]/schedule.astro`
   - `src/pages/meals/[slug]/shopping-list.astro`
   - `src/pages/recipes/[slug]/[recipe].astro`

4. **Verify** `npm run build` succeeds after changes.

## Exit Criteria

- `tsconfig.json` exists and is valid
- `loader.ts` is the only data loader file (no `loader.js`)
- All pages import from `loader.ts`
- Build passes with no new errors
---

