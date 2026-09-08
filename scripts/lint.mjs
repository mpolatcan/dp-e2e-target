import { readdirSync, readFileSync } from 'node:fs'
let bad = 0
for (const f of readdirSync('src')) {
  const s = readFileSync(`src/${f}`, 'utf8')
  if (/\t/.test(s)) { console.error(`${f}: tab character`); bad++ }
}
process.exit(bad ? 1 : 0)
