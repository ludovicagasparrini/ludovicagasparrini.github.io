import { defineConfig } from "vite";
export default defineConfig({
  // Percorsi relativi: il sito funziona a qualsiasi URL (utente, progetto,
  // sottocartella o dominio personalizzato) senza ricompilare dopo una
  // rinomina del repository.
  base: "./",
  build: { target: "es2020" },
});
