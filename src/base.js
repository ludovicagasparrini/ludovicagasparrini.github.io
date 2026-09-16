// Prefisso relativo per raggiungere la radice del sito da una pagina.
// "/" -> "./", "/informazioni/" -> "../". Identico nel browser e nel prerender,
// quindi l'hydration non produce differenze.
export function baseFor(path = "/") {
  const depth = path.split("/").filter(Boolean).length;
  return depth ? "../".repeat(depth) : "./";
}
// Gli ancoraggi restano puri frammenti, tutto il resto è relativo alla radice.
export function linkTo(base, href) {
  return href.startsWith("#") ? href : `${base}${href}`;
}
