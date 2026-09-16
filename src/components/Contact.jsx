import React from "react";
import Icon from "./Icon.jsx";
import data from "../../content/site.json";
export default function Contact({ section }) {
  return (
    <section className="contact" id={section.id}>
      <div className="wrap contact-grid">
        <div>
          <p className="eyebrow">UN PRIMO CONTATTO</p>
          <h2>{section.title}</h2>
          <p>{section.description}</p>
        </div>
        <div className="contact-links">
          <a href={`mailto:${data.person.email}`}>
            <span>SCRIVIMI</span>
            <Icon name="mail" />
            <strong>{data.person.email}</strong>
            <span aria-hidden="true">↗</span>
          </a>
          <a href={`tel:${data.person.telephone}`}>
            <span>CHIAMAMI</span>
            <Icon name="phone" />
            <strong>{data.person.displayPhone}</strong>
            <span aria-hidden="true">↗</span>
          </a>
          <p className="contact-place">
            <Icon name="pin" />
            <span>
              {data.person.city}, {data.person.region}
              <br />
              <small>
                Contattami per informazioni sulle modalità e sulla
                disponibilità degli incontri.
              </small>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
