---
$schema: ../.schemas/swimlane-ticket.json
title: Build schedule page with Gantt chart
priority: p2
status: todo
ready: true
blocked_by:
  - 01KM1MN45R0000000000000000-build-meal-overview-page
subtasks: []
tags: []
---

# Build schedule page with Gantt chart

Create the schedule page with Gantt chart visualization.

## Requirements

- Display meal name, date, and service time
- For each recipe phase AND errand that has a time and duration, display as a Gantt chart:
  - X-axis: Time of day (24hr format)
  - Y-axis: Recipe phases and errands grouped by recipe or category
  - Each bar shows phase/errand name, start time, end time
- Service time is T=0, with earlier times shown as T-XXmin/T-XXhr and later times as T+XXmin/T+XXhr
- Show separate Gantt chart for each day if the meal spans multiple days

## Warning sections at top of page

1. **Dependency violations (RED):** List phases where `follows` is not satisfied
   - If a phase with `follows` is scheduled to end AFTER the dependent phase ends, include in this list
   - Example: Phase B follows Phase A, but Phase B's start time is before Phase A's end time

2. **Unscheduled items (YELLOW):** List phases and errands that don't have time or duration defined
   - These cannot be displayed in the Gantt chart
   - Include name, source (recipe name or "errands"), and "missing time or duration"

## Example output

```
/meals/march-vegetarian/
  schedule.html   - Gantt chart with warnings
```

## Blocks

- (No downstream tasks - final deliverable)