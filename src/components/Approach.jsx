import React from "react";
import Icon from "./Icon.jsx";
export default function Approach({ section }) {
  return (
    <section className="section wrap" id={section.id}>
      <div className="section-heading">
        <p className="eyebrow">IL MIO APPROCCIO</p>
        <h2>{section.title}</h2>
      </div>
      <div className="steps">
        {section.items.map((x, i) => (
          <article key={x.title}>
            <div className="card-top">
              <Icon name={x.icon} variant="badge" />
              <span className="step-number">0{i + 1}</span>
            </div>
            <h3>{x.title}</h3>
            <p>{x.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
