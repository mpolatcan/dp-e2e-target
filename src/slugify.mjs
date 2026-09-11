// formatted by e2e-format
export function slugify(input) {
  return String(input)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function truncate(text, max) {
  if (max < 1) return ''
  const str = String(text)
  const chars = [...str]
  if (chars.length <= max) return str
  return chars.slice(0, max - 1).join('') + '…'
}
