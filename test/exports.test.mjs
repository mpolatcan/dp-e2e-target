import { test } from 'node:test'
import assert from 'node:assert/strict'
import { EXPORTS } from '../src/exports.generated.mjs'
import * as mod from '../src/slugify.mjs'

test('the generated export list matches the module', () => {
  assert.deepEqual(EXPORTS, Object.keys(mod).sort())
})
