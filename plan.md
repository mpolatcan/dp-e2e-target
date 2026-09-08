# Add truncateWords

Repos: dp-e2e-target

Add `truncateWords(text, maxWords)` to `src/slugify.mjs` (export it next to `slugify`). It returns the first `maxWords` whitespace-separated words joined by single spaces, with `…` appended when words were dropped. `maxWords` below 1 returns an empty string. Add tests in `test/slugify.test.mjs` covering: no truncation, truncation with ellipsis, and maxWords 0.
