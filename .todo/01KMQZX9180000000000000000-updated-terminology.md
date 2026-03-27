---
$schema: ../.schemas/swimlane-ticket.json
title: Updated terminology
priority: p2
status: todo
ready: true
blocked_by: []
subtasks: []
tags: []
---

Update the data model, content format, and downstream rendering to rename and restructure the culinary hierarchy as follows:

## Goal

Replace the old hierarchy:

- meal
- course
- recipe
- phase
- step

With the new hierarchy:

- menu
- course
- dish
- component
- preparation
- step

This change should be applied consistently across:

- schema definitions
- YAML content files
- parsers/loaders
- validation
- static site generation
- templates/rendering
- any derived types/interfaces
- any docs/examples/tests/fixtures

## Semantic intent of the new hierarchy

Use these definitions as the source of truth:

- **Menu**: the full meal or overall dining experience
- **Course**: a course within the menu
- **Dish**: the smallest complete, nameable food concept that could stand alone on a menu
- **Component**: a distinct part of a dish (sauce, dough, garnish, filling, purée, etc.)
- **Preparation**: a distinct unit of culinary work that transforms ingredients into a usable intermediate or final element; often something that can be made and reserved for later
- **Step**: an individual instruction/action within a preparation

Important:
- A dish may have one or many components
- A component may have one or many preparations
- In rendering, singleton layers may be collapsed for readability, but the underlying schema should still support the full hierarchy cleanly
- “Recipe” should no longer be the primary modeled serving unit; use “dish” instead
- “Phase” should be replaced by “preparation”
