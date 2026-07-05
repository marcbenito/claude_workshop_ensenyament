# Projecte: Reserva de Sessions de Treball

Prototip funcional (Next.js + TypeScript + Tailwind + components estil shadcn).
El codi de l'aplicació viu a `app/`.

## Idioma de les respostes

- Respon **SEMPRE en català**, en totes les explicacions i comunicacions amb
  l'usuari, independentment de l'idioma en què et parlin.
- Mantén la correcció ortogràfica completa (accents, dièresi, l·l geminada, etc.).
- Els termes tècnics i els identificadors de codi es mantenen en la seva forma
  original (noms de variables, funcions, llibreries…).

## Workflow obligatori: lint després de cada canvi

- Després de **qualsevol canvi** a fitxers dins de `app/` (crear, editar o
  esborrar), executa el linter abans de donar la feina per acabada:

  ```bash
  cd app && npm run lint
  ```

- Reporta el resultat del lint a l'usuari.
- Si el lint detecta errors, **corregeix-los** i torna a executar-lo fins que
  passi net (exit 0) abans de tancar la tasca.

## Regles de treball

- **No toquis mai** els fitxers de `app/src/lib/data/` (són dades de demo del curs).
- **No executis mai `npm run dev`**: el servidor ja corre al port 3000.

## Commits

- Missatges de commit en **format convencional** (`feat:`, `fix:`, `chore:`…) i en català.

## Notes del projecte

- La persistència és **falsa (mock)** a `localStorage`; no hi ha base de dades real.
  La capa de serveis (`app/src/lib/services/`) està aïllada per poder migrar a
  Supabase més endavant sense tocar la UI.
- La llista de professors està hardcodejada a `app/src/lib/data/professors.ts`.
