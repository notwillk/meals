---
$schema: ../.schemas/swimlane-ticket.json
title: Build shopping list page
priority: p2
status: todo
ready: true
blocked_by:
  - 01KM1MN45R0000000000000000-build-meal-overview-page
subtasks: []
tags: []
---

# Build shopping list page

Create the shopping list page with consolidated ingredients.

## Requirements

- Collect ALL ingredients from ALL steps of ALL recipes in the meal
- Sum quantities where the same ingredient appears multiple times (e.g., if honey appears in 3 steps as 20g, 225g, and 25g, show as 270g total)
- Make the list alphabetical by ingredient name
- Include quantities, units, and any notes or preparation instructions
- Mark items that are homemade with "(homemade)" note

## Example output

```
/meals/march-vegetarian/
  shopping-list.html - Consolidated ingredient list
```

## Blocks

- (No downstream tasks - final deliverable)