export function slugify(input) {
  return String(input)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function padTo(text, width, fill = ' ') {
  // Count characters as a user sees them: iterate by code point so a surrogate
  // pair stays a single unit and is never split when the final copy of `fill`
  // is truncated to land the result on `width` exactly.
  const chars = [...String(text)]
  if (chars.length >= width) return String(text)
  const fillChars = [...String(fill)]
  if (fillChars.length === 0) return String(text)
  const result = chars.slice()
  let i = 0
  while (result.length < width) {
    result.push(fillChars[i % fillChars.length])
    i++
  }
  return result.join('')
}
