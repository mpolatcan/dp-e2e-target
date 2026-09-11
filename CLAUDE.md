# dp-e2e-target

Tiny ESM string utility library. No dependencies. Tests use node:test under test/. Lint forbids tab characters in src/.

- `src/exports.generated.mjs` is generated from `src/slugify.mjs`'s exports by `node scripts/gen-exports.mjs` (the `.dev-pipeline.json` preCommit step) — put new exported functions in `src/slugify.mjs` (the only file it scans, names emitted sorted) and never hand-edit the generated file.
- `src/` code style: 2-space indent, single quotes, no semicolons — match it; lint only enforces the no-tab rule, so a reviewer (not lint) catches style drift.
