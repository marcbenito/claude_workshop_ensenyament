# Tasca 05 — API Route Handlers de dades i reserves

## Objectiu
Exposar els repositoris com a endpoints REST protegits per sessió.

## Fitxers afectats (nous)
- `app/src/app/api/professors/route.ts` — `GET`. Sense params → tots; amb `?date=&slot=` →
  només els disponibles (via `professors.repo.listAvailable`).
- `app/src/app/api/timeslots/route.ts` — `GET` franges actives.
- `app/src/app/api/reservations/route.ts` — `GET` (reserves de l'usuari de la sessió),
  `POST` (crear).
- `app/src/app/api/reservations/[id]/route.ts` — `DELETE` (cancel·lar).

## Detall
- Tots els handlers de reserves obtenen l'usuari amb `auth()` (NextAuth). **Sense sessió →
  401.** Mai s'accepta un `userId` del client.
- `POST /api/reservations`: rep `{professorId, date, time}`; deriva `userId` de la sessió;
  crida `reservations.repo.create`; error de domini (franja ocupada / solapament) →
  `{ok:false, error}` amb codi HTTP adequat (409/400).
- `DELETE /api/reservations/[id]`: cancel·la només si la reserva és de l'usuari.
- Errors com a JSON en **català**.

## Criteris d'acceptació
- Endpoints protegits retornen 401 sense sessió.
- Crear/llistar/cancel·lar funcionen amb la cookie de NextAuth.
- Intentar reservar una franja ja ocupada retorna error de domini, no una excepció.

## Verificació
- `npm run lint` verd.
- `curl` (amb cookie de sessió) o DevTools: crear reserva → llistar → duplicar (error) →
  cancel·lar → recrear (ok).
