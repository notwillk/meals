---
name: create-skill
description: Create a new repo-local OpenCode skill scaffold
compatibility: opencode
---

## What I do

- Create a new skill under `.opencode/skills/<name>/SKILL.md`
- Add valid frontmatter
- Scaffold basic sections

## Skills Installation

Skills must install **only at the project level** (`/workspaces/meals/.opencode/skills/`), never globally.

**Why:**
- Global skills (`~/.openclaw/skills/`, `~/.opencode/skills/`, etc.) are not git-tracked
- They are lost when the container is rebuilt
- Project-level installation ensures skills are version-controlled and shared across machines

**How:**
```bash
npx -y @lobehub/market-cli skills install <identifier> --dir /workspaces/meals/.opencode/skills
```

**Important:** Never run `skills install` without `--dir /workspaces/meals/.opencode/skills`. Always confirm the target before installing.

## When to use me

Use this when you want to add a new reusable OpenCode skill to this repository.
