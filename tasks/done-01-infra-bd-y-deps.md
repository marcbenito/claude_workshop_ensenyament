# Tasca 01 — Infra BD i dependències

## Objectiu
Verificar que la BD Postgres és accessible i té l'esquema + seed aplicats, i instal·lar
NextAuth v5.

## Fitxers afectats
- `app/package.json` (afegir `next-auth@^5`).
- Cap canvi de codi d'app en aquesta tasca.

## Passos
1. Verificar connectivitat i seed contra la BD de `app/.env` (`DATABASE_URL`):
   - `SELECT count(*) FROM professors;` → ha de ser **5**.
   - `SELECT count(*) FROM time_slots;` → ha de ser **9**.
   - Si les taules no existeixen o estan buides, aplicar `bd/01_schema.sql`, `bd/02_grants.sql`
     i `bd/03_seed.sql` (vegeu `bd/README.md`).
2. `cd app && npm install next-auth@^5`.

## Criteris d'acceptació
- `next-auth` (v5) a `dependencies` de `app/package.json`.
- La BD retorna 5 professors i 9 franges.
- `npx vitest run` (des de `app/`) segueix en verd.

## Verificació
- `npm run lint` i `npx vitest run` des de `app/`.
- Consulta manual dels counts anteriors.
