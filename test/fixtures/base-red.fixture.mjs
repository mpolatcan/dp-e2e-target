// Base-health fixture: two unavoidable failures, so the unit suite records real evidence in the
// same measurement where the lint command times out.
//
// STRUCTURALLY OUT OF REACH OF THE ORDINARY SUITE. The repository pins
// `node --test test/*.test.mjs`, which this path and extension cannot match. The measurement run
// appends this file to its own pinned test command, so the armed run's pinnedTest differs from
// every ordinary run's — the same property scripts/lint-slow.mjs gets from its pinned lint. That
// is what keeps the base-health cache record the armed run writes from ever validating for an
// ordinary run, and it holds even if DP_FIXTURE_BASE_RED is left set in a shell.
//
// The env gate below is a second line of defence for direct invocation, not the primary one.
// scripts/lint-slow.mjs carries the full HOW TO MEASURE procedure.
import test from 'node:test'
import assert from 'node:assert/strict'

const armed = !process.env.GITHUB_ACTIONS && process.env.DP_FIXTURE_BASE_RED === '1'
const skip = !armed && 'base-red fixture is not armed (set DP_FIXTURE_BASE_RED=1 for a base-health measurement)'

test('the base records a first real failure', { skip }, () => {
  assert.equal(1, 2, 'deliberate base-health fixture failure')
})

test('the base records a second real failure', { skip }, () => {
  assert.equal('a', 'b', 'deliberate base-health fixture failure')
})
