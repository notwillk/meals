# Meals

A project for managing meal plans, recipes, and generating cooking documentation.

## Getting Started

This project uses **devcontainers** for a consistent development environment.

1. Open this project in a devcontainer (VS Code will prompt you)
2. Run `just doctor` to check environment health
3. Run `just doctor --fix` to automatically fix any issues

## Commands

- `just doctor` - Check environment health
- `just doctor --fix` - Check environment and auto-fix issues
- `just build` - Build the static site
- `just build --watch` - Build and watch for changes
- `just dev` - Start development server
- `just format` - Format code
- `just static` - Run static checks

## Static Site

The project includes an Astro-based static site generator for meal documentation.

To run the dev server:

```bash
just dev
# or: pnpm run dev
```

To build for production:

```bash
just build
# or: pnpm run build
```

The built site will be in the `dist/` directory.

### Site Structure

- `/` - Landing page with all meals
- `/meals/[slug]` - Meal overview with courses
- `/meals/[slug]/schedule` - Schedule with Gantt chart
- `/meals/[slug]/shopping-list` - Consolidated shopping list
- `/recipes/[meal-slug]/[recipe-slug]` - Recipe detail with steps