# Tasca 08 — Neteja de dades hardcodejades

## Objectiu
Eliminar el mock i els datos hardcodejats orfes, deixant la BD com a única font de veritat.

## Fitxers afectats
Eliminats:
- `app/src/lib/data/professors.ts`
- `app/src/lib/data/slots.ts`

Modificats:
- `app/src/lib/utils.test.ts`: avui importa `PROFESSORS`; adaptar-lo perquè no depengui dels
  hardcodejats (moure aquestes assercions o eliminar-les; mantenir els tests de `cn` i
  `capitalizeFirst`).
- Revisar comentaris obsolets que mencionin «Supabase» o «mock».

## Criteris d'acceptació
- `grep -rn "data/professors\|data/slots\|services/storage\|services/auth\|auth-context\|protected-route" app/src` sense resultats en codi d'app.
- No queden imports penjats.

## Verificació
- `npx tsc --noEmit` i `npm run build` verds.
- `npm run lint` i `npx vitest run` verds.
