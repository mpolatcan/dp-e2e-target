# dp-e2e-target

Tiny ESM string utility library. No dependencies. Tests use node:test under test/. Lint forbids tab characters in src/.

`node scripts/gen-exports.mjs` — regenerate `src/exports.generated.mjs` after adding/removing any `export function` in `src/`; it's a generated manifest (marked do-not-edit) and lint runs over every file in src/, so don't hand-edit it.
