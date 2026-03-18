---
$schema: ../.schemas/swimlane-ticket.json
title: Build meal overview page
priority: p2
status: todo
ready: true
blocked_by:
  - 01KM1MN10N0000000000000000-initialize-astro-project
subtasks: []
tags: []
---

# Build meal overview page

Create the meal overview page showing courses and recipes.

## Requirements

- Display meal name and date
- Display service time (e.g., "Service: 19:00")
- List all courses (visible courses only, skip hidden like Intermezzo)
- For each course: show name, description, service offset (e.g., "T+10min", "T+2hr"), and list of recipes
- Include links to schedule and shopping list pages

## Example output

```
/meals/march-vegetarian/
  index.html      - Meal overview page
  schedule.html   - Link
  shopping-list.html - Link
  recipes/
```

## Blocks

- Build shopping list page (needs meal context)
- Build schedule page with Gantt chart (needs meal context)
- Build recipe detail page (needs meal context)