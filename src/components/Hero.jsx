import React from "react";
export default function Hero({ section, base = "./" }) {
  return (
    <section className="hero wrap" id={section.id}>
      <div className="hero-copy">
        <p className="eyebrow">PSICOLOGA · MACERATA</p>
        <h1>
          {section.title}
          <br />
          <em>{section.emphasis}</em>
        </h1>
        <p className="lead">{section.description}</p>
        <a className="button" href="#contatti">
          Parliamone insieme <span aria-hidden="true">↗</span>
        </a>
        <p className="small">
          Bambini, adulti, anziani e chi se ne prende cura.
        </p>
      </div>
      <aside className="intro-panel">
        <div className="portrait-row">
          <img
            src={`${base}portrait.png`}
            alt="Ludovica Gasparrini"
            width="112"
            height="112"
          />
          <span>
            Dott.ssa
            <br />
            <strong>
              Ludovica
              <br />
              Gasparrini
            </strong>
          </span>
        </div>
        <div className="panel-rule" />
        <p className="panel-title">
          Ogni persona ha
          <br />
          il proprio percorso.
        </p>
        <p>
          Ascolto, valutazione e interventi personalizzati per accompagnare le
          risorse di ciascuno, in ogni fase della vita.
        </p>
        <div className="panel-bottom">NEUROPSICOLOGIA</div>
      </aside>
    </section>
  );
}
