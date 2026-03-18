---
$schema: ../.schemas/swimlane-ticket.json
title: Initialize Astro project
priority: p2
status: todo
ready: true
blocked_by:
  - 01KM1MN0640000000000000000-update-schemas-for-static-site
subtasks: []
tags: []
---

# Initialize Astro project

Set up Astro project for the static site generator.

## Tasks

1. Initialize new Astro project (or add Astro to existing project)
2. Set up routing structure:
   - `/` - Landing page
   - `/meals/[meal-slug]` - Meal overview
   - `/meals/[meal-slug]/schedule` - Schedule page
   - `/meals/[meal-slug]/shopping-list` - Shopping list
   - `/meals/[meal-slug]/recipes/[recipe-slug]` - Recipe detail
3. Add YAML parsing (using a library like `js-yaml` or similar)
4. Set up responsive layout/template for cooking-friendly display

## Blocks

- Build landing page
- Build meal overview page
- Build shopping list page
- Build schedule page with Gantt chart
- Build recipe detail page