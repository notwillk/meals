---
$schema: ../.schemas/swimlane-ticket.json
title: Update schemas for static site
priority: p2
status: todo
ready: true
blocked_by: []
subtasks: []
tags: []
---

# Update schemas for static site

Update existing JSON schemas and create new errand schema to support the static site generator.

## Tasks

### 1. Update meal schema (`.schemas/meal.schema.json`)

Add `service_time` field:
```yaml
service_time: "19:00"  # ISO 24-hour format
```

### 2. Update course schema (`.schemas/meal.schema.json`)

Add `service_offset` field:
```yaml
service_offset: "T+10min"  # Relative to service (e.g., T-20min, T+2hr)
```

### 3. Update recipe phase schema (`.schemas/recipe.schema.json`)

Add to phase properties:
```yaml
time: "08:00"        # ISO 24-hour format - when phase starts
duration: 60         # Minutes - how long phase takes
day: 1               # Optional - for multi-day events (default: 1)
```

### 4. Create errands schema (`.schemas/errand.schema.json`)

Create new schema:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Errand",
  "type": "object",
  "required": ["name"],
  "properties": {
    "name": {
      "type": "string",
      "description": "Name of the errand (e.g., 'Go grocery shopping')"
    },
    "time": {
      "type": "string",
      "description": "ISO 24-hour format - when errand starts (e.g., '09:00')"
    },
    "duration": {
      "type": "number",
      "description": "Duration in minutes (e.g., 60)"
    },
    "day": {
      "type": "number",
      "description": "Optional - for multi-day events (default: 1)"
    },
    "notes": {
      "type": "string",
      "description": "Additional notes about the errand"
    }
  }
}
```

## Blocks

- Initialize Astro project
- Build landing page
- Build meal overview page
- Build shopping list page
- Build schedule page with Gantt chart
- Build recipe detail page