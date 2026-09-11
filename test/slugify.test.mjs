import { test } from 'node:test'
import assert from 'node:assert/strict'
import { slugify, wordWrap } from '../src/slugify.mjs'

test('slugify lowercases and joins with dashes', () => {
  assert.equal(slugify('Hello World!'), 'hello-world')
})

test('wordWrap keeps text shorter than width on a single line', () => {
  assert.deepEqual(wordWrap('hi there', 20), ['hi there'])
})

test('wordWrap fills up to width then breaks across several lines', () => {
  assert.deepEqual(wordWrap('alpha beta gamma delta', 11), ['alpha beta', 'gamma delta'])
})

test('wordWrap gives a word longer than width its own unbroken line', () => {
  assert.deepEqual(wordWrap('supercalifragilistic', 5), ['supercalifragilistic'])
})

test('wordWrap produces no lines for empty input', () => {
  assert.deepEqual(wordWrap('', 10), [])
})
