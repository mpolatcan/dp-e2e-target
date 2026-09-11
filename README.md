# dp-e2e-target

A small utility repository of pure helper functions. Everything ships from `src/`.

## Helpers

- `slugify(input)` — lowercases `input`, trims it, and joins runs of non-alphanumeric characters with dashes to produce a URL-safe slug.
- `wordWrap(text, width)` — breaks `text` on spaces into an array of lines so that no line exceeds `width` characters; a single word longer than `width` gets its own unbroken line, and empty input produces no lines.
