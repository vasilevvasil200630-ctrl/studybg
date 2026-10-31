// Проверка след билд: в публичния dist/ не бива да има API ключове.
// Gemini/Google ключ в браузъра заобикаля gemini-proxy (сесия + дневни лимити) и е публичен.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = 'dist';
const PATTERNS = [
  { name: 'Google API ключ (AIza…)', re: /AIza[0-9A-Za-z_-]{30,}/ },
  { name: 'Google API ключ (AQ.…)', re: /AQ\.[0-9A-Za-z_-]{30,}/ },
  { name: 'OpenAI ключ (sk-…)', re: /sk-(?:proj-)?[0-9A-Za-z_-]{32,}/ },
  { name: 'Supabase service/secret ключ', re: /sb_secret_[0-9A-Za-z_-]{20,}/ },
  { name: 'Resend API ключ (re_…)', re: /\bre_[0-9A-Za-z_]{24,}\b/ }
];
const TEXT_EXT = /\.(?:js|mjs|css|html|json|txt|xml|webmanifest|map)$/;

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });

const findings = [];
for (const file of walk(DIST).filter((f) => TEXT_EXT.test(f))) {
  const text = readFileSync(file, 'utf8');
  for (const { name, re } of PATTERNS) {
    if (re.test(text)) findings.push(`${relative(DIST, file)}: ${name}`);
  }
}

if (findings.length > 0) {
  console.error('✖ В публичния бъндъл има таен ключ (стойностите не се показват):');
  for (const f of findings) console.error(`  - ${f}`);
  console.error('Махнете VITE_*_API_KEY от средата на билда (Vercel → Settings → Environment Variables).');
  process.exit(1);
}
console.log('✓ check:secrets — в dist/ няма API ключове');
