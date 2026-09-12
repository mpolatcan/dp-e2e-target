# Add truncateWords

Add `truncateWords(text, maxWords)` to `src/slugify.mjs` and export it next to `slugify`.

It returns the first `maxWords` whitespace-separated words of `text`, joined by single spaces,
with `…` appended when words were dropped. A `maxWords` below 1 returns an empty string.

Add tests in `test/slugify.test.mjs` covering three cases: text shorter than `maxWords` is
returned unchanged, longer text is truncated and carries the ellipsis, and `maxWords` of 0
returns an empty string.
