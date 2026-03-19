---
$schema: ../.schemas/swimlane-ticket.json
title: Update/create documentation skills for swimlane and skills installation
priority: p1
status: todo
ready: true
blocked_by: []
subtasks: []
tags: [documentation, skills, swimlane]

---

## Context

Three documentation gaps were identified during a recent session:

1. **Skills installation** — No guidance existed on project-level vs. global installation. Global installation was done by default, causing skills to not be git-tracked.
2. **swimlane task management** — No skill documented how to use `swimlane create` correctly (it only sets title at creation time; priority and `blocked_by` must be patched in).
3. **ULID format** — Initial attempts used 28–29 char strings instead of the required 26-character ULIDs.

## Tasks

### 1. Update `create-skill/SKILL.md`

Clarify that skills install **only at the project level**:

- Skills must install to `.opencode/skills/` (project level), never globally
- When using the marketplace CLI, always pass `--dir /workspaces/meals/.opencode/skills`
- Global skills (`~/.openclaw/skills/`, `~/.opencode/skills/`, etc.) are not git-tracked and not shared across machines
- If the user requests a skill installation without specifying `--dir`, confirm the target directory first

### 2. Create `task-management/SKILL.md`

Document the swimlane task management workflow:

**When to use:**
- Use swimlane for any task requiring more than one step to complete
- Do not use swimlane for one-off questions, research, or trivial fixes
- Use the `.todo/` directory for all swimlane task files

**`swimlane create` limitations:**
- `swimlane create "<title>"` only sets the title
- It creates `priority: p2` and `blocked_by: []` by default
- **It cannot set `blocked_by` or custom `priority` at creation time**
- After `swimlane create`, always manually edit the frontmatter to:
  - Set the correct `priority` (p0 = critical, p1 = important, p2 = average)
  - Add `blocked_by: ["<ULID>"]` entries if the task depends on others
  - Add task description/content

**ULID format constraint:**
- ULIDs must be exactly 26 characters
- Filename format: `[26-char-ulid]-[slug].md`
- If generating ULIDs manually, use Crockford base32 encoding (10 timestamp + 16 random chars)
- Use `swimlane create` to get valid ULIDs rather than generating them manually

**Common commands:**
- `swimlane ls` — list all tasks
- `swimlane ls --status todo` — filter by status
- `swimlane ls --priority p0` — filter by priority
- `swimlane static` — validate all task YAML/frontmatter
- `swimlane start <title>` — move to in-progress
- `swimlane complete <title>` — mark done
- `swimlane activate <title>` — set ready = true
- `swimlane deactivate <title>` — set ready = false
- `swimlane claim` — assign to current user
- `swimlane unclaim` — remove assignment
- `swimlane assign <title> <user>` — assign to user
- `swimlane next` — return the next ready task to implement

**Proper task creation workflow:**
1. `swimlane create "<descriptive title>"` — creates file with valid ULID
2. Edit frontmatter: set `priority`, `blocked_by`, `tags`
3. Write task description with: Context, Tasks, Exit Criteria
4. Run `swimlane static` to validate

**Task file location:** All task files live in `.todo/` at the project root. Do not use subdirectories.

### 3. Update `project-structure/SKILL.md`

Add `.todo/` to the directory documentation:

```markdown
- `.todo/` — swimlane task files. Each file is a Markdown ticket with YAML frontmatter. See `task-management` skill for workflow.
```

### 4. Update `CLAUDE.md`

Update the skills installation section to be more explicit:

```markdown
## Skills Installation

Install skills **only at the project level** (`/workspaces/meals/.opencode/skills/`), never globally.

**Why:**
- Global skills (`~/.openclaw/skills/`) are not git-tracked
- They are lost when the container is rebuilt
- Project-level installation ensures skills are version-controlled and shared across machines

**How:**
```bash
npx -y @lobehub/market-cli skills install <identifier> --dir /workspaces/meals/.opencode/skills
```

**Important:** Never run `skills install` without `--dir /workspaces/meals/.opencode/skills`. Always confirm the target before installing.

**For task management**, see the `task-management` skill.
```

## Exit Criteria

- `create-skill/SKILL.md` documents project-level-only installation
- `task-management/SKILL.md` exists with complete swimlane workflow documentation
- `project-structure/SKILL.md` references `.todo/` directory
- `CLAUDE.md` skills section is updated with project-level guidance
- `swimlane static` passes for all task files

