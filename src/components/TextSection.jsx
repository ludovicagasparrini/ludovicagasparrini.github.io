import React from "react";
export default function TextSection({ section }) {
  return (
    <section className="section wrap prose" id={section.id}>
      <h2>{section.title}</h2>
      {section.paragraphs.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </section>
  );
}
