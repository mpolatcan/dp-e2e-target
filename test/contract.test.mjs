// Repository contract for wrapping helpers. These properties are not restated in any plan: the
// repository owns them, and a helper that ignores them is wrong however well it matches its brief.
//
// The contract arms itself only once the helper exists, so this file is green on a base branch that
// does not have it yet. A static `import { wordWrap }` would fail to link there and turn the whole
// base red, which says nothing about the helper and blocks every unrelated change.
//
// The helper is resolved across the whole src/ surface rather than one hard-coded module. Binding
// the probe to a single file would let a helper added to a NEW module leave the contract skipped
// forever, so the suite would report success while testing nothing.
//
// Both assertions live in ONE test block on purpose. node:test stops a block at its first failed
// assertion, so a helper that violates both is told about them one at a time. That is the intended
// developer experience here — fix what you were told, run again, learn the next rule.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync } from 'node:fs'
import { sep } from 'node:path'

const SRC = new URL('../src/', import.meta.url)

// A near miss is a failure, never a skip: a helper exported under a differently-cased name is a
// helper that exists, and reporting "not implemented" for it is the silent green this file exists
// to prevent. The pattern stays deliberately tight. Matching every wrap-ish name would catch
// `unwrap`, `wrapper` and any default export, so an unrelated future module would red the base
// branch and abort every run in this repository — the opposite failure, and the worse one.
const WRAP_SHAPED = /^(?:word|Word)?[wW]rap(?:[A-Z_]|$)/

async function resolveWordWrap() {
  let nearMiss = ''
  for (const name of readdirSync(SRC, { recursive: true }).sort()) {
    if (!String(name).endsWith('.mjs') || String(name).endsWith('.generated.mjs')) continue
    const mod = await import(new URL(String(name).split(sep).join('/'), SRC))
    if (typeof mod.wordWrap === 'function') return { fn: mod.wordWrap, nearMiss: '' }
    for (const key of Object.keys(mod)) {
      if (typeof mod[key] === 'function' && key !== 'default' && WRAP_SHAPED.test(key)) nearMiss = `${name} exports ${key}`
    }
  }
  return { fn: null, nearMiss }
}

const { fn: wordWrap, nearMiss } = await resolveWordWrap()

test('a wrapping helper is exported as wordWrap', { skip: wordWrap !== null && 'the exact export is present' }, () => {
  assert.equal(nearMiss, '', `expected a wordWrap export, found ${nearMiss} instead`)
})

test('wordWrap honours the repository wrapping contract', { skip: wordWrap === null && 'wordWrap is not implemented yet' }, () => {
  // Every wrapping helper in this repository returns its lines, never a pre-joined string: the
  // caller owns the line separator, because the panel renderer and the CLI disagree about it.
  const lines = wordWrap('alpha beta gamma', 11)
  assert.ok(Array.isArray(lines), `wordWrap must return an array of lines, got ${typeof lines}`)

  // Assert the wrapping itself, not only the return shape: a helper that ignores `width` entirely
  // and returns every word on one line satisfies an Array.isArray check and overflows every caller.
  assert.deepEqual(lines, ['alpha beta', 'gamma'], 'lines must be filled up to width, then broken')

  // A run of consecutive spaces is whitespace, not an empty word. Collapsing it is the contract;
  // emitting empty lines for it breaks every caller that counts lines to size a viewport.
  const collapsed = wordWrap('alpha    beta', 11)
  assert.deepEqual(collapsed, ['alpha beta'], 'consecutive spaces must collapse, never become empty lines')
})
