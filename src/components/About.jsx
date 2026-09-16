import React from "react";
import Icon from "./Icon.jsx";
export default function About({ section }) {
  return (
    <section className="about" id={section.id}>
      <div className="wrap about-grid">
        <div>
          <p className="eyebrow">CHI SONO</p>
          <h2>{section.title}</h2>
          <p className="lead">{section.intro}</p>
          {section.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className="qualifications">
          <p className="eyebrow">FORMAZIONE E PROFESSIONE</p>
          {section.qualifications.map((x) => (
            <div className="qualification" key={x.title}>
              <div className="qualification-top">
                <Icon name={x.icon} />
                <span>{x.year}</span>
              </div>
              <h3>{x.title}</h3>
              <p>{x.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
