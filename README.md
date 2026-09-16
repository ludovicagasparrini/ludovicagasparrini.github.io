# Ludovica Gasparrini · Psicologa

Landing page React in JavaScript, responsive, generata dai contenuti JSON e prerenderizzata in HTML per motori di ricerca e crawler senza JavaScript.

Sito: https://ludovicagasparrini.github.io/ludovica_gasparrini.github.io/

## Sviluppo

Node.js 22 o successivo.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

## Aggiornare contenuti e sezioni

Modificare `content/site.json`. `person` contiene i contatti; `navigation` le voci del menu; `pages` le pagine. Ogni pagina ha `path`, `title`, `description` e `sections`. I tipi disponibili sono `hero`, `services`, `about`, `approach`, `contact` e `text`. Cambiare l'ordine degli oggetti per riordinare le sezioni; usare `enabled: false` per nasconderle. Usare ID univoci per gli ancoraggi.

Esempio di nuova sezione:

```json
{
  "type": "text",
  "id": "informazioni",
  "title": "Informazioni utili",
  "paragraphs": ["Testo della sezione."]
}
```

Per una nuova pagina, aggiungere un oggetto a `pages`, per esempio con `path: "/informazioni/"`, titolo, descrizione e sezioni. Il build genera automaticamente `/informazioni/index.html`, canonical, metadati e sitemap; ogni URL è quindi apribile direttamente su GitHub Pages. Nel menu usare `href: "informazioni/"`. I path devono iniziare e finire con `/` e contenere solo lettere minuscole, numeri e trattini.

I componenti sono separati in `src/components/`. Il registro in `src/App.jsx` associa `type` ai componenti React. Per un nuovo tipo di layout, creare un componente, importarlo e aggiungerlo al registro. I contenuti JSON sono interpretati dallo stesso renderer React sia nel browser sia durante il prerender; gli aggiornamenti richiedono un nuovo build, eseguito automaticamente ad ogni push su `main`. Non è necessario un server applicativo.

## Pubblicazione

Il workflow `.github/workflows/pages.yml` compila e pubblica su GitHub Pages ad ogni push su `main` (o manualmente da Actions → Publish website → Run workflow). La sorgente in Settings → Pages deve essere **GitHub Actions**; il workflow prova ad attivarla da solo.

Gli asset usano percorsi relativi, quindi il sito funziona a qualsiasi indirizzo: sito utente, pagina di progetto, sottocartella o dominio personalizzato. Dopo una rinomina o un trasferimento del repository è comunque necessario **rilanciare il workflow**, perché canonical, Open Graph e sitemap usano l'URL reale (`SITE_URL`, calcolato da `configure-pages`). Per un dominio personalizzato, configurarlo su GitHub Pages e aggiornare `siteUrl` nel JSON, che è il valore usato nei build locali.

`npm run check` (eseguito in CI dopo ogni build) verifica che ogni riferimento delle pagine generate esista in `dist/` e non usi percorsi assoluti: è il controllo che intercetta i link rotti prima della pubblicazione. Il workflow `.github/workflows/ci.yml` esegue build e verifica su ogni pull request e su ogni branch diverso da `main`.

## SEO e ricerca AI

- HTML completo iniziale, senza dipendenza dall'esecuzione di JavaScript per leggere i contenuti.
- Titolo, description, canonical e Open Graph specifici per ogni pagina.
- JSON-LD Person, WebSite, WebPage e Service coerenti con i contenuti visibili.
- Sitemap XML, robots.txt, lingua italiana e struttura semantica dei titoli.
- Nessun embedding, testo nascosto, recensione inventata o promessa di posizionamento.
- Font di sistema, immagine locale, nessun tracker e nessuna mappa incorporata.

Riferimenti ufficiali: [Google: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features), [Google: JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics), [GitHub Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

L'indicizzazione e la presenza nelle risposte AI non sono garantite. Dopo la pubblicazione, verificare la proprietà in Google Search Console e inviare `sitemap.xml`. Questa operazione richiede l'account Google del titolare e non viene simulata dal codice.

## Provenienza dei contenuti

Servizi, qualifiche, ritratto e contatti derivano dal CV fornito. Il CV integrale e i dati non pertinenti (data di nascita, patente, ecc.) non sono inclusi nel repository. Non sono stati inventati indirizzo dello studio, numero di iscrizione, partita IVA, disponibilità online, tariffe o specializzazione in psicoterapia. I dati professionali mancanti possono essere aggiunti dal titolare quando disponibili.
