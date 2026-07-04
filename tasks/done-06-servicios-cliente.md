# Tasca 06 — Serveis client async

## Objectiu
Reescriure la capa de serveis client perquè cridi l'API via `fetch`, eliminant el mock de
localStorage.

## Fitxers afectats
Modificats:
- `app/src/lib/services/reservations.ts` → async. Firmes:
  - `listReservations(): Promise<Reservation[]>` (sense `userId`; el servidor el deriva).
  - `createReservation({professorId, date, time}): Promise<CreateResult>` (**sense `userId`**).
  - `cancelReservation(id): Promise<void>`.

Nous:
- `app/src/lib/services/professors.ts` → `listProfessors()`, `listAvailableProfessors(date, time)`.
- `app/src/lib/services/timeslots.ts` → `listTimeSlots()`.

Eliminats:
- `app/src/lib/services/storage.ts`.
- `app/src/lib/services/auth.ts` (substituït per NextAuth a la tasca 04).

## Detall
- `fetch` amb `credentials: 'same-origin'`. Conservar el patró de resultat
  `{ok:true,...}|{ok:false,error}` com a `Promise`.
- Cap referència a `localStorage` ni a `data/*`.

## Criteris d'acceptació
- Els serveis no importen `storage.ts` ni `data/professors.ts`/`data/slots.ts`.
- `createReservation` ja no rep `userId`.

## Verificació
- `npx tsc --noEmit` verd.
- `grep -rn "localStorage" app/src/lib/services` sense resultats.
