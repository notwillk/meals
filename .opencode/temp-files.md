# Temporary Files

When working with temporary files during development, use the `.tmp` directory in the workspace root, NOT `/tmp`.

## Why

- Files in `/tmp` may be lost between sessions
- Using `.tmp` keeps all workspace-related files together
- Better for debugging and continuity across agent sessions

## Usage

```bash
# Good
node /workspaces/meals/.tmp/html-to-pdf.js input.html output.pdf

# Bad
node /tmp/script.js input.html output.pdf
```

## Notes

- The `.tmp` directory is in `.gitignore` - do not commit files there
- Clean up temporary files when no longer needed
