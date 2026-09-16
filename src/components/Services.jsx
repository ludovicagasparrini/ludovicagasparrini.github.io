import React from "react";
import Icon from "./Icon.jsx";
export default function Services({ section }) {
  return (
    <section className="section wrap" id={section.id}>
      <div className="section-heading">
        <p className="eyebrow">COME POSSO AIUTARTI</p>
        <h2>{section.title}</h2>
        <p>{section.description}</p>
      </div>
      <div className="services">
        {section.items.map((x) => (
          <article key={x.title}>
            <div className="card-top">
              <Icon name={x.icon} variant="badge" />
            </div>
            <h3>{x.title}</h3>
            <p>{x.description}</p>
            <ul>
              {x.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
