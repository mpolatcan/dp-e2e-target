import { test } from 'node:test'
import assert from 'node:assert/strict'
import { slugify } from '../src/slugify.mjs'

test('slugify lowercases and joins with dashes', () => {
  assert.equal(slugify('Hello World!'), 'hello-world')
})
