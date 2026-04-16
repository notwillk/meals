---
name: task-management
description: Use swimlane for task tracking with proper workflow
compatibility: opencode
---

## When to use swimlane

Use swimlane for any task requiring more than one step to complete. Do not use swimlane for one-off questions, research, or trivial fixes.

All task files live in `.todo/` at the project root. Do not use subdirectories.

## `swimlane create` limitations

`swimlane create "<title>"` only sets the title. It creates `priority: p2` and `blocked_by: []` by default. **It cannot set `blocked_by` or custom `priority` at creation time.**

After `swimlane create`, always manually edit the frontmatter to:

- Set the correct `priority` (p0 = critical, p1 = important, p2 = average)
- Add `blocked_by: ["<ULID>"]` entries if the task depends on others
- Add `tags` such as `easy`, `normal`, or `hard` to describe implementation complexity

## ULID format constraint

ULIDs must be exactly 26 characters. Filename format: `[26-char-ulid]-[slug].md`. Use `swimlane create` to get valid ULIDs rather than generating them manually.

## Common commands

| Command                          | Description                             |
| -------------------------------- | --------------------------------------- |
| `swimlane ls`                    | List all tasks                          |
| `swimlane ls --status todo`      | Filter by status                        |
| `swimlane ls --priority p0`      | Filter by priority                      |
| `swimlane ls --tag easy`         | Filter by tag                           |
| `swimlane static`                | Validate all task YAML/frontmatter      |
| `swimlane start <title>`         | Move to in-progress                     |
| `swimlane complete <title>`      | Mark done                               |
| `swimlane activate <title>`      | Set ready = true                        |
| `swimlane deactivate <title>`    | Set ready = false                       |
| `swimlane claim`                 | Assign to current user                  |
| `swimlane unclaim`               | Remove assignment                       |
| `swimlane assign <title> <user>` | Assign to user                          |
| `swimlane next`                  | Return the next ready task to implement |

Note: `swimlane next --tag` does not respect the `--tag` filter — it returns the oldest ready task regardless of tag. Filter manually with `swimlane ls --tag <tag>` instead.

## Proper task creation workflow

1. `swimlane create "<descriptive title>"` — creates file with valid ULID
2. Edit frontmatter: set `priority`, `blocked_by`, `tags`
3. Write task description with: Context, Tasks, Exit Criteria
4. Run `swimlane static` to validate

## Priority levels

- **p0** — Critical. Blocks all downstream work. Do first.
- **p1** — Important. Should be done soon.
- **p2** — Average. Can be deferred.

## Tag guidelines

- **easy** — Straightforward implementation, minimal reasoning, low failure risk.
- **normal** — Moderate complexity. Some decisions needed but limited scope.
- **hard** — Complex implementation or high risk of getting wrong. Requires careful reasoning. Blocks other work.
