# dp-e2e-target

Tiny ESM string utility library. No dependencies. Tests use node:test under test/. Lint forbids tab characters in src/.

- `node scripts/gen-exports.mjs` — regenerates the generated, name-sorted `src/exports.generated.mjs`; run it after adding/removing an `export` in `src/slugify.mjs` (its only source file), and never hand-edit that generated file.
