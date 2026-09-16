import { readFile, writeFile, mkdir } from "node:fs/promises";
import { render } from "../.ssr/render.js";
const data = JSON.parse(await readFile("content/site.json", "utf8"));
const template = await readFile("dist/index.html", "utf8");
const escape = (s) =>
  s
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
const json = (s) => JSON.stringify(s).replaceAll("<", "\\u003c");
const root = new URL(process.env.SITE_URL || data.siteUrl);
const paths = new Set();
for (const page of data.pages) {
  if (!/^\/(?:[a-z0-9-]+\/)*$/.test(page.path) || paths.has(page.path))
    throw new Error(`Invalid or duplicate path ${page.path}`);
  paths.add(page.path);
  const ids = new Set();
  for (const section of page.sections) {
    if (ids.has(section.id)) throw new Error("Duplicate section ID");
    ids.add(section.id);
  }
  const url = new URL(page.path.slice(1), root).href;
  // Vite emette riferimenti relativi ("./assets/..."): per le pagine annidate
  // vanno riscritti con il numero di "../" corrispondente alla profondità.
  const depth = page.path.split("/").filter(Boolean).length;
  const pageTemplate = depth
    ? template.replaceAll('="./', `="${"../".repeat(depth)}`)
    : template;
  const person = {
    "@type": "Person",
    "@id": `${root}#person`,
    name: data.person.name,
    jobTitle: data.person.jobTitle,
    url: root.href,
    email: data.person.email,
    telephone: data.person.telephone,
    workLocation: { "@type": "Place", name: "Macerata, Marche" },
    memberOf: {
      "@type": "Organization",
      name: "Ordine degli Psicologi delle Marche, Sezione A",
    },
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "Laurea magistrale in Psicologia Clinica e Neuropsicologia nel Ciclo di Vita",
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "Master in Neuropsicologia dei Disturbi del Neurosviluppo",
      },
    ],
  };
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      person,
      {
        "@type": "WebSite",
        "@id": `${root}#website`,
        url: root.href,
        name: "Ludovica Gasparrini · Psicologa",
        inLanguage: "it-IT",
        publisher: { "@id": person["@id"] },
      },
      {
        "@type": "WebPage",
        "@id": url,
        url,
        name: page.title,
        description: page.description,
        inLanguage: "it-IT",
        about: { "@id": person["@id"] },
        isPartOf: { "@id": `${root}#website` },
      },
      ...page.sections
        .filter((s) => s.type === "services")
        .flatMap((s) =>
          s.items.map((item) => ({
            "@type": "Service",
            name: item.title,
            description: item.description,
            provider: { "@id": person["@id"] },
            areaServed: { "@type": "City", name: "Macerata" },
          })),
        ),
    ],
  };
  const seo = `<title>${escape(page.title)}</title><meta name="description" content="${escape(page.description)}"/><link rel="canonical" href="${escape(url)}"/><meta name="robots" content="index,follow,max-image-preview:large"/><meta property="og:type" content="website"/><meta property="og:locale" content="it_IT"/><meta property="og:title" content="${escape(page.title)}"/><meta property="og:description" content="${escape(page.description)}"/><meta property="og:url" content="${escape(url)}"/><script type="application/ld+json">${json(schema)}</script>`;
  const html = pageTemplate
    .replace("<!--seo-->", seo)
    .replace("<!--app-->", render(page.path))
    .replace(
      "</head>",
      `<script>window.__PAGE__=${json({ path: page.path })}</script></head>`,
    );
  const dir = `dist${page.path}`;
  await mkdir(dir, { recursive: true });
  await writeFile(`${dir}index.html`, html);
}
await writeFile(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${data.pages.map((p) => `<url><loc>${escape(new URL(p.path.slice(1), root).href)}</loc></url>`).join("")}</urlset>`,
);
await writeFile(
  "dist/robots.txt",
  `User-agent: *\nAllow: /\nSitemap: ${root}sitemap.xml\n`,
);
await writeFile("dist/.nojekyll", "");
console.log(`Prerendered ${paths.size} page(s), JSON-LD and sitemap: ${root}`);
