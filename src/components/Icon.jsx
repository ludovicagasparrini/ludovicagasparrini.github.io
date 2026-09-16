import React from "react";
// Icone decorative a tratto sottile su griglia 24×24, colore ereditato dal
// contenitore. Il testo della scheda porta il significato: restano aria-hidden.
const icons = {
  // Ambiti di intervento
  assessment: (
    <>
      <circle cx="10.5" cy="10.5" r="7.5" />
      <path d="m16 16 5 5" />
      <path d="M5.4 10.8h1.7l1.3-3.1 2 5.6 1.4-3.5h3.3" />
    </>
  ),
  growth: (
    <>
      <path d="M12 21v-6.6" />
      <path d="M12 14.5C8.4 14.5 5.5 11.6 5.5 8c3.6 0 6.5 2.9 6.5 6.5Z" />
      <path d="M12 12.6c0-3.3 2.7-6 6-6 0 3.3-2.7 6-6 6Z" />
    </>
  ),
  renew: (
    <>
      <path d="M20 12a8 8 0 1 1-2.34-5.66" />
      <path d="M17.7 6.3h4v-4" />
      <circle cx="12" cy="12" r="2.1" fill="currentColor" stroke="none" />
    </>
  ),
  dialogue: (
    <>
      <path d="M5 4h9a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-4l-4 3.2V13H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
      <path d="M18 8.5h1a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-.6v2.4L15.5 17.5" />
      <circle cx="6.9" cy="8.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="9.5" cy="8.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="12.1" cy="8.5" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  care: (
    <>
      <path d="M12 13.2 8.2 9.4a2.7 2.7 0 0 1 3.8-3.8 2.7 2.7 0 0 1 3.8 3.8L12 13.2Z" />
      <path d="M4 15.4a8 8 0 0 0 16 0" />
    </>
  ),
  // Approccio
  listen: (
    <>
      <path d="M6.8 10.2a5.2 5.2 0 0 1 10.4 0c0 2.1-1 3.2-2 4.2s-1.8 2-1.8 3.3a2.3 2.3 0 0 1-4.6 0c0-1.3-.5-2.1-1.3-3" />
      <path d="M10.2 10.4a1.9 1.9 0 0 1 3.7.3c0 1.3-1.1 1.7-1.6 2.5" />
    </>
  ),
  tune: (
    <>
      <path d="M3.5 9h3.6M11.3 9h9.2" />
      <circle cx="9.2" cy="9" r="2.1" />
      <path d="M3.5 15h7.6M15.3 15h5.2" />
      <circle cx="13.2" cy="15" r="2.1" />
    </>
  ),
  journey: (
    <>
      <path d="M3.8 19.6c2.7 0 3.3-2.8 5.3-4.8 2-2 4.2-2.5 7.1-2.5" />
      <circle cx="3.8" cy="19.6" r="1.6" fill="currentColor" stroke="none" />
      <path d="M16.2 12.8V4.6" />
      <path d="M16.2 5.2h4.6l-1.4 2.1 1.4 2.1h-4.6" />
    </>
  ),
  // Formazione e professione
  certificate: (
    <>
      <circle cx="12" cy="9.3" r="5.3" />
      <path d="M8.7 13.6 7.6 21l4.4-2.6 4.4 2.6-1.1-7.4" />
    </>
  ),
  badge: (
    <>
      <path d="M12 3 5 6v5.4c0 4.2 2.9 7.5 7 8.4 4.1-.9 7-4.2 7-8.4V6l-7-3Z" />
      <path d="m9.2 11.6 2 2 3.6-3.8" />
    </>
  ),
  graduation: (
    <>
      <path d="m12 4 9 4.4-9 4.4-9-4.4L12 4Z" />
      <path d="M6.6 10.5v4.3c0 1.8 2.4 3.2 5.4 3.2s5.4-1.4 5.4-3.2v-4.3" />
    </>
  ),
  // Contatti
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2.2" />
      <path d="m3.8 7 8.2 5.8L20.2 7" />
    </>
  ),
  phone: (
    <>
      <path d="M8.1 3.5H5.6A2.6 2.6 0 0 0 3 6.3C3 14.4 9.6 21 17.7 21a2.6 2.6 0 0 0 2.8-2.6v-2.5a1 1 0 0 0-.8-1l-3.6-.7a1 1 0 0 0-1 .4l-1 1.4a13.2 13.2 0 0 1-5.1-5.1l1.4-1a1 1 0 0 0 .4-1l-.7-3.6a1 1 0 0 0-1-.8Z" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" />
      <circle cx="12" cy="9.8" r="2.6" />
    </>
  ),
};
export default function Icon({ name, variant }) {
  if (!name) return null;
  if (!icons[name])
    throw new Error(
      `Icona non disponibile: ${name}. Disponibili: ${Object.keys(icons).join(", ")}`,
    );
  return (
    <span className={variant ? `icon icon-${variant}` : "icon"} aria-hidden="true">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        focusable="false"
      >
        {icons[name]}
      </svg>
    </span>
  );
}
