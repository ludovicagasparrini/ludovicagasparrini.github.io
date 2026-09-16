// Verifica che il sito compilato sia pubblicabile a qualunque URL.
// Fallisce se un riferimento punta a un file inesistente o usa un percorso
// assoluto: è il caso che ha rotto il sito dopo la rinomina del repository.
import { readdir, readFile, access } from "node:fs/promises";
import { join, dirname, resolve, relative, sep } from "node:path";

const dist = "dist";
const errors = [];

async function pages(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await pages(full)));
    else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

const exists = async (p) => access(p).then(() => true, () => false);

for (const file of await pages(dist)) {
  const html = await readFile(file, "utf8");
  const refs = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map((m) => m[1]);
  for (const ref of refs) {
    if (/^(?:[a-z]+:|\/\/|#)/i.test(ref)) continue;
    if (ref.startsWith("/")) {
      errors.push(`${file}: percorso assoluto "${ref}" (usare percorsi relativi)`);
      continue;
    }
    const target = resolve(dirname(file), ref.split(/[?#]/)[0]);
    if (relative(resolve(dist), target).startsWith("..")) {
      errors.push(`${file}: "${ref}" esce da ${dist}/`);
      continue;
    }
    const candidate = ref.endsWith("/") ? join(target, "index.html") : target;
    if (!(await exists(candidate)))
      errors.push(`${file}: "${ref}" non esiste in ${dist}/`);
  }
  if (!/<link rel="canonical"/.test(html))
    errors.push(`${file}: manca il link canonical`);
  if (!/<title>/.test(html)) errors.push(`${file}: manca il title`);
}

for (const required of ["sitemap.xml", "robots.txt", ".nojekyll", "index.html"])
  if (!(await exists(join(dist, required))))
    errors.push(`manca ${dist}${sep}${required}`);

if (errors.length) {
  console.error(`Build non valida:\n- ${errors.join("\n- ")}`);
  process.exit(1);
}
console.log(`Build verificata: ${(await pages(dist)).length} pagina/e, riferimenti tutti risolti.`);
