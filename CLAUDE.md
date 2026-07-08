# Reserva de Sessions de Treball

App web per reservar sessions de treball 1-a-1 amb professors interns.
**Context de producte i casos d'ús:** vegeu @docs/prd.md.

# IMPORTANT

Sempre contesta en Català

## Stack

Next.js 15 (App Router) · TypeScript · Tailwind CSS · components estil shadcn/ui.
El codi de l'aplicació viu a `app/`. BD Postgres
Components visuals en app/components/ui


## Comandes (IMPORTANT)

Executa-les sempre des de `app/`:

- **Tests**: `npx vitest run` — una sola vegada. (No facis servir el mode watch:
  bloqueja la sessió.)
- **Lint**: `npm run lint`.
- **Servidor de desenvolupament**: ja corre al port **3000** — **no** l'arrenquis
  tu (`npm run dev`).

## Flux de treball obligatori

Després de **qualsevol canvi** a `app/`, executa `npm run lint` i, si has tocat
lògica, `npx vitest run`. Corregeix el que falli abans de donar la feina per
acabada, i reporta el resultat.

## Estructura del codi

- `app/src/app/` — rutes (App Router): `login`, `register`, `dashboard`,
  `reservar`.
- `app/src/components/` — components de UI. Els primitius reutilitzables són a
  `components/ui/` (Button, Card, Input…). **Reutilitza'ls**, no en creïs de nous.
- `app/src/lib/services/` — capa de serveis (accés a dades). Està **aïllada de la
  UI** a propòsit: avui és un mock a `localStorage`, demà serà una API real. Mai
  cridis dades directament des dels components; passa sempre per aquí.
- `app/src/lib/types.ts` — tipus de domini (User, Professor, Reservation).
- `app/src/lib/data/` — dades de referència (vegeu la política de professors).

## Base de dades

El sistema funciona amb una base de dades Postgres.
L'esquema i les dades inicials són a `bd/`. 
No pots utilitzar directament psql, en tot cas ho farás per MCP si el tens configurat.



## Gestió de professors

El catàleg de professors (`app/src/lib/data/professors.ts`) són **dades de
referència congelades, propietat de l'equip de Dades**, en migració a la taula
`professors` de la BD. **No editis mai aquest fitxer** (ni afegir, ni esborrar,
ni modificar). Si et demanen un canvi de professors, explica que s'ha de fer a
la BD corporativa, no al codi.

## Convencions

- **Idioma**: tota la interfície i els textos de cara a l'usuari, en **català**.
  Respon també en català a les explicacions.
- **Imports**: absoluts amb l'àlies `@/` (p. ex. `@/lib/utils`), no relatius.
- **Classes CSS**: combina-les amb l'helper `cn()` de `@/lib/utils`.
- **Regles de negoci**: respecta les del PRD (franges 09–13 i 16–19, una reserva
  per professor/data/franja, no solapament per usuari).

## Commits

Missatges en **format convencional** (`feat:`, `fix:`, `chore:`…) i en català.


## README
No borris mai el README.md IMPORTANT!!
