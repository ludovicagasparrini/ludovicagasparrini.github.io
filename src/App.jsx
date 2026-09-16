import TextSection from "./components/TextSection.jsx";
import Contact from "./components/Contact.jsx";
import Approach from "./components/Approach.jsx";
import About from "./components/About.jsx";
import Services from "./components/Services.jsx";
import Hero from "./components/Hero.jsx";
import React, { useState } from "react";
import data from "../content/site.json";
import { baseFor, linkTo } from "./base.js";
const registry = {
  hero: Hero,
  services: Services,
  about: About,
  approach: Approach,
  contact: Contact,
  text: TextSection,
};
export default function App({ path = "/" }) {
  const page = data.pages.find((x) => x.path === path) || data.pages[0];
  const base = baseFor(page.path);
  const [open, setOpen] = useState(false);
  return (
    <>
      <a className="skip" href="#contenuto">
        Vai al contenuto
      </a>
      <header className="header wrap">
        <a className="brand" href={base} aria-label="Ludovica Gasparrini, home">
          <span className="monogram">lg.</span>
          <span>
            Ludovica Gasparrini<small>PSICOLOGA</small>
          </span>
        </a>
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="navigation"
          onClick={() => setOpen(!open)}
        >
          Menu <span aria-hidden="true">{open ? "−" : "+"}</span>
        </button>
        <nav
          id="navigation"
          aria-label="Navigazione principale"
          className={open ? "open" : ""}
        >
          {data.navigation.map((x) => (
            <a
              key={x.href}
              href={linkTo(base, x.href)}
              onClick={() => setOpen(false)}
            >
              {x.label}
            </a>
          ))}
          <a
            className="nav-contact"
            href={linkTo(base, "#contatti")}
            onClick={() => setOpen(false)}
          >
            Contattami <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>
      <main id="contenuto">
        {page.sections
          .filter((x) => x.enabled !== false)
          .map((section) => {
            const Component = registry[section.type];
            if (!Component)
              throw new Error(
                `Tipo di sezione non supportato: ${section.type}`,
              );
            return (
              <Component key={section.id} section={section} base={base} />
            );
          })}
      </main>
      <footer className="wrap footer">
        <div>
          <strong>Dott.ssa Ludovica Gasparrini</strong>
          <p>Psicologa · Ordine degli Psicologi delle Marche, Sezione A</p>
        </div>
        <span>Macerata, Italia</span>
      </footer>
    </>
  );
}
