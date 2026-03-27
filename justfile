[no-exit-message]
build *args:
    @case "{{args}}" in \
        "") pnpm run build ;; \
        "--watch") pnpm run dev ;; \
        *) echo "Usage: just build [--watch]" >&2; exit 1 ;; \
    esac

[no-exit-message]
dev:
    pnpm run dev

[no-exit-message]
clean *args:
    @case "{{args}}" in \
        "") echo "cleaning..." ;; \
        "--deep") echo "cleaning..." && echo "deep cleaning..." && rm -rf node_modules && rm -rf .pnpm-store ;; \
        *) echo "Usage: just clean [--deep]" >&2; exit 1 ;; \
    esac

[no-exit-message]
doctor *args:
    @case "{{args}}" in \
        ""|"--fix"|--check-severity=*) checksy --config=doctor.checksy.yaml diagnose {{args}} ;; \
        *) echo "Usage: just doctor [--fix] [--check-severity=debug|info|warn|error]" >&2; exit 1 ;; \
    esac

[no-exit-message]
format *args:
    #!/bin/bash
    FILTER_FILE=$(mktemp)
    sed -e '/^#/d' -e '/^$/d' .formatignore > "$FILTER_FILE"
    case "{{args}}" in \
        "") git ls-files -- "*.yaml" | grep -v -F -f "$FILTER_FILE" | xargs prettier --write ;; \
        "--check") git ls-files -- "*.yaml" | grep -v -F -f "$FILTER_FILE" | xargs prettier --check ;; \
        *) echo "Usage: just format [--check]" >&2; exit 1 ;; \
    esac
    rm -f "$FILTER_FILE"

[no-exit-message]
static *args:
    @case "{{args}}" in \
        "") checksy --config=static.checksy.yaml diagnose ;; \
        "--fix") checksy --config=static.checksy.yaml diagnose --fix ;; \
        *) echo "Usage: just static [--fix]" >&2; exit 1 ;; \
    esac

[no-exit-message]
test *args:
    @case "{{args}}" in \
        "--watch") watchexec $([ -f .testignore ] && echo '--ignore-file .testignore') -- just test ;; \
        *) checksy --config=test.checksy.yaml diagnose ;; \
    esac

help:
    @printf "%-24s %s\n" "build" "compile the project"
    @printf "%-24s %s\n" "build --watch" "compile and watch for changes"
    @printf "%-24s %s\n" "clean" "remove build artifacts"
    @printf "%-24s %s\n" "clean --deep" "remove build artifacts and generated files"
    @printf "%-24s %s\n" "doctor" "check environment health"
    @printf "%-24s %s\n" "doctor --fix" "check environment health and auto-fix"
    @printf "%-24s %s\n" "doctor --check-severity=xxx" "check with custom severity filter (debug|info|warn|error)"
    @printf "%-24s %s\n" "format" "format code in-place"
    @printf "%-24s %s\n" "format --check" "check formatting without modifying files"
    @printf "%-24s %s\n" "static" "run static checks including format check"
    @printf "%-24s %s\n" "static --fix" "run static checks and auto-fix including format"
    @printf "%-24s %s\n" "test" "run tests"
    @printf "%-24s %s\n" "test --watch" "run tests and watch for changes"
    @printf "%-24s %s\n" "help" "show this help"
