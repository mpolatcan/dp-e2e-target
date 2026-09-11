export function slugify(input) {
  return String(input)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function padTo(text, width, fill = ' ') {
  // Count by code point (what a user sees), so a surrogate pair is one unit.
  const chars = [...text]
  if (fill === '' || chars.length >= width) return text
  const fillChars = [...fill]
  const out = [...chars]
  while (out.length < width) {
    for (const ch of fillChars) {
      if (out.length >= width) break
      out.push(ch)
    }
  }
  return out.join('')
}
