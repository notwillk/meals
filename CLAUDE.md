# Project Instructions

## Temporary Files

When working with temporary files during development, use the `.tmp` directory in the workspace root, NOT `/tmp`.

**Why:**
- Files in `/tmp` may be lost between sessions
- Using `.tmp` keeps all workspace-related files together
- Better for debugging and continuity across agent sessions

**Usage:**
```bash
# Good
node /workspaces/meals/.tmp/script.js

# Bad
node /tmp/script.js
```

**Notes:**
- The `.tmp` directory is in `.gitignore` - do not commit files there
- Clean up temporary files when no longer needed

## Skills Installation

Install skills **only at the project level** (`/workspaces/meals/.opencode/skills/`), never globally. This ensures skills are version-controlled and shared across machines.

```bash
npx -y @lobehub/market-cli skills install <identifier> --dir /workspaces/meals/.opencode/skills
```