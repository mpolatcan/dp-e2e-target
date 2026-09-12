// Base-health fixture: the repository's real lint check, followed by a hang past the per-command
// budget, so the base-health stage reports a lint timeout in the SAME measurement where the unit
// suite reports real failures. That is the only way to observe, end to end, which of the two wins.
//
// NOTHING IN THE COMMITTED CONFIG POINTS AT THIS FILE. The base branch keeps commands.lint on
// scripts/lint.mjs and declares no baseHealth budget; the measurement run supplies both as launch
// arguments, which win over the file. That is what keeps the fixture from leaking:
//
//   * An ordinary run pins `node scripts/lint.mjs`; the armed run pins `node scripts/lint-slow.mjs`,
//     and appends test/fixtures/base-red.fixture.mjs to its pinned test command — a path the
//     committed `test/*.test.mjs` glob cannot match.
//     The base-health cache record is keyed on the pinned commands, so the degraded record the
//     armed run writes can NEVER validate for an ordinary run. No delete-afterwards step, and no
//     window in which an unrelated run is aborted for a reason that is not its own.
//   * The base branch never carries a tightened budget or a lint entry point CLAUDE.md does not
//     document, so there is no restore step that can be left half-done.
//
// The hang additionally requires DP_FIXTURE_BASE_RED=1 and is always off under GitHub Actions, so
// running this file directly cannot hang a developer's terminal or a CI job.
//
// HOW TO MEASURE: delete $HOME/.claude/dev-pipeline/base-branch-health/<repo-key>-<base-sha>.json,
// then launch with DP_FIXTURE_BASE_RED=1, DP_FIXTURE_BUDGET_MIN set to the same budget passed as
// baseHealth.timeoutMin, commands.lint pointing here, and commands.test extended with
// test/fixtures/base-red.fixture.mjs. Only the FIRST run on a given base sha
// is valid evidence: the timeout is recorded as a degraded entry that a second armed run would be
// answered from, with an empty failure set.
//
// The lint rules live in scripts/lint.mjs and are NOT copied here, so a rule added there still
// reaches whichever gate is pointed at this file.
import { spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const lint = spawnSync(process.execPath, [fileURLToPath(new URL('./lint.mjs', import.meta.url))], { stdio: 'inherit' })
if (lint.error) {
  console.error(`lint-slow: could not run lint.mjs: ${lint.error.message}`)
  process.exit(1)
}
if (lint.signal) {
  console.error(`lint-slow: lint.mjs was terminated by ${lint.signal}`)
  process.exit(1)
}
if (lint.status !== 0) process.exit(lint.status)

if (process.env.GITHUB_ACTIONS || process.env.DP_FIXTURE_BASE_RED !== '1') process.exit(0)

// The budget is resolved at LAUNCH time and the launch argument wins over any committed file, so
// reading the base tree's .dev-pipeline.json alone can yield a different number than the deadline
// actually in force — and a hang shorter than the deadline records lint GREEN, destroying the
// measurement. DP_FIXTURE_BUDGET_MIN carries the launch value; the file is only a fallback. Both
// are validated the way the pipeline validates them (an integer in 1..600), falling back to the
// pipeline's own builtin default, which is longer than any budget a measurement would pin.
const BUILTIN_DEFAULT_MIN = 45
const valid = (v) => (Number.isInteger(v) && v >= 1 && v <= 600 ? v : null)
let budgetMin = valid(Number(process.env.DP_FIXTURE_BUDGET_MIN))
if (budgetMin === null) {
  try {
    budgetMin = valid(JSON.parse(readFileSync(new URL('../.dev-pipeline.json', import.meta.url), 'utf8')).baseHealth?.timeoutMin)
  } catch (e) {
    console.error(`lint-slow: could not read the configured budget (${e.message})`)
  }
}
if (budgetMin === null) {
  if (process.env.DP_FIXTURE_BUDGET_MIN) console.error(`lint-slow: ignoring DP_FIXTURE_BUDGET_MIN=${process.env.DP_FIXTURE_BUDGET_MIN} (not an integer in 1..600)`)
  console.error(`lint-slow: no valid budget found; using the pipeline default of ${BUILTIN_DEFAULT_MIN} minutes`)
  budgetMin = BUILTIN_DEFAULT_MIN
}
// 30 seconds past the deadline: long enough to be killed by the budget, short enough that a stray
// local run is not left hanging far beyond it.
await new Promise((resolve) => setTimeout(resolve, budgetMin * 60_000 + 30_000))

// Reaching this line means the deadline never fired, so the hang was mis-timed. Exit red rather
// than green: a passing record for this base sha would be cached and would silently replace the
// measurement this fixture exists to take.
console.error('lint-slow: the per-command deadline never fired — the fixture is mis-timed, failing loudly instead of recording a false green')
process.exit(1)
