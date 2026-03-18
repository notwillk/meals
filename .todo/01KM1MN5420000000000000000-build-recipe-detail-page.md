---
$schema: ../.schemas/swimlane-ticket.json
title: Build recipe detail page
priority: p2
status: todo
ready: true
blocked_by:
  - 01KM1MN45R0000000000000000-build-meal-overview-page
subtasks: []
tags: []
---

# Build recipe detail page

Create the recipe detail page with phases and steps.

## Requirements

- Recipe name as page title
- Sections for each phase
- Each phase section includes:
  - Phase name and description
  - Equipment list (all equipment used in the phase)
  - Enumerated steps (numbered 1, 2, 3...)
  - Each step has TWO ALIGNED SECTIONS:
    - Left column: ingredients used in that step (with qty, unit, prep, notes)
    - Right column: instruction text for the step
  - All ingredient columns should align with each other across steps
  - All step instruction columns should align with each other across steps

## Example output

```
/meals/march-vegetarian/recipes/
  celeriac-veloute.html
  watercress-salad.html
  ...
```

## Blocks

- (No downstream tasks - final deliverable)