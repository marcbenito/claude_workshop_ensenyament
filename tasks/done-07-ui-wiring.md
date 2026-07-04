# Tasca 07 — Adaptar la UI als serveis async

## Objectiu
Connectar els components als serveis async amb estats de loading/error, i mostrar només
professors disponibles.

## Fitxers afectats
- `app/src/app/reservar/page.tsx`: pas «Hora» carrega franges amb `listTimeSlots()`; pas
  «Professor» carrega només els **disponibles** amb `listAvailableProfessors(date, time)`;
  `handleConfirm` async (mostra error de domini si la franja s'ha ocupat per carrera).
- `app/src/app/dashboard/page.tsx`: `listReservations()` (sense `userId`) amb loading/error;
  `handleCancel` async + refresh; obtenir dades de professor via servei/API (no `data/*`).
- `app/src/components/reservation-card.tsx`: rebre el professor resolt per **props** (o
  inclòs a la resposta de `/api/reservations`), en lloc de `getProfessorById` síncron.

## Detall
- Afegir estats `loading`/`error` on calgui; reutilitzar el patró `submitting` existent.
- Textos de UI en **català** (CLAUDE.md).
- Imports absoluts amb l'àlies `@/`; combinar classes amb `cn()`.

## Criteris d'acceptació
- Cap import de `data/professors.ts` ni `data/slots.ts` als components.
- Un professor ja reservat en una data+franja no apareix com a disponible.
- Cancel·lar actualitza la llista sense recarregar la pàgina.

## Verificació
- `npm run lint` verd.
- Flux manual a `:3000` (vegeu tasca 09).
