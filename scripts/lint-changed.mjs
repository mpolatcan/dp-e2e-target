// Lints ONLY the files named in the list file (CI's changed-files scope).
import { readFileSync } from 'node:fs'
const list = readFileSync(process.argv[2], 'utf8').split('\n').filter(Boolean)
let bad = 0
for (const f of list) {
  if (/\t/.test(readFileSync(f, 'utf8'))) { console.error(`${f}: tab character`); bad++ }
}
process.exit(bad ? 1 : 0)
