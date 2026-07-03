// Generates static/llms-full.txt: the entire docs tree concatenated into one
// plain-markdown file so AI assistants (Claude, ChatGPT, Codex, etc.) can
// ingest the whole documentation in a single fetch.
// Runs automatically before every `npm run build` (see package.json).
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const DOCS = join(ROOT, 'docs');
const OUT = join(ROOT, 'static', 'llms-full.txt');

// Deterministic reading order: intro and plain-words first, then grouped.
const ORDER = ['intro.md', 'plain-words.md', 'trust/', 'platform/', 'api/', 'trust-center/'];

function collect(dir) {
  const out = [];
  for (const name of readdirSync(dir).sort()) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...collect(p));
    else if (/\.mdx?$/.test(name)) out.push(p);
  }
  return out;
}

const rank = (p) => {
  const rel = relative(DOCS, p);
  const i = ORDER.findIndex((o) => (o.endsWith('/') ? rel.startsWith(o) : rel === o));
  return i === -1 ? ORDER.length : i;
};

const files = collect(DOCS).sort((a, b) => rank(a) - rank(b) || a.localeCompare(b));

let body = `# zkAGI — full documentation (auto-generated)

> Privacy-preserving AI infrastructure. You define the trust domain (silicon,
> mathematics, or hybrid); the Altaica compiler assembles the stack that
> enforces it; every call returns a verifiable receipt. Swiss-governed, built
> for peaceful civilian use in regulated industries.

Canonical docs: https://docs.zkagi.ai · Main site: https://zkagi.ai
This file concatenates every documentation page for LLM ingestion.

`;

for (const f of files) {
  const rel = relative(DOCS, f);
  let src = readFileSync(f, 'utf8');
  // strip MDX imports/exports and JSX component blocks the LLM can't use
  src = src
    .replace(/^import .*$/gm, '')
    .replace(/^export .*$/gm, '')
    .trim();
  const url = 'https://docs.zkagi.ai/docs/' + rel.replace(/\.mdx?$/, '').replace(/\/index$/, '').replace(/^intro$/, '');
  body += `\n\n----------------------------------------\nSOURCE: ${rel} (${url})\n----------------------------------------\n\n${src}\n`;
}

writeFileSync(OUT, body);
console.log(`llms-full.txt: ${files.length} pages, ${(body.length / 1024).toFixed(0)} KB`);
