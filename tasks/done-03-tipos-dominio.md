# Tasca 03 — Tipus de domini

## Objectiu
Actualitzar els tipus per reflectir el model real de BD.

## Fitxers afectats
- `app/src/lib/types.ts`

## Detall
- Separar el tipus servidor (amb `passwordHash`) del `PublicUser` que s'exposa a la UI.
- Afegir `TimeSlot { id: string; time: string }`.
- Mantenir tots els ids com a `string`.
- Documentar que `professorId` és l'id de BD com a string (`"1"`, no `"prof-1"`).
- Eliminar comentaris obsolets («Supabase», «solo para el mock»).

## Criteris d'acceptació
- `Reservation`, `Professor`, `PublicUser`, `TimeSlot` alineats amb l'esquema `bd/01_schema.sql`.
- Cap referència a contrasenya en pla dins de `PublicUser`.

## Verificació
- `npx tsc --noEmit` verd.
