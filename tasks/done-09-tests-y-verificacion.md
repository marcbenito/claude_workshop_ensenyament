# Tasca 09 — Tests i verificació end-to-end

## Objectiu
Cobrir la lògica migrada amb tests unitaris i verificar el producte de punta a punta.

## Fitxers afectats
- Tests unitaris nous per a `app/src/lib/server/mappers.ts` (bigint→string, `time`→`"HH:mm"`)
  i per als validadors purs de regles de negoci (1-a-1, no-solapament) si s'han extret.
- Mantenir `app/src/lib/utils.test.ts`.

## Detall
- Prioritzar funcions **pures** (no depenen de la BD) per als tests automàtics. Els tests
  que toquen Postgres no s'automatitzen contra el remot (fràgils); es verifiquen manualment.

## Criteris d'acceptació
- `npm run lint` verd.
- `npx vitest run` (des de `app/`) verd.

## Verificació end-to-end (manual, dev server al port 3000 — ja corrent)
1. Registrar un usuari nou → sessió iniciada automàticament, arriba al dashboard buit.
2. Refrescar la pàgina → la sessió es manté (cookie JWT).
3. `/dashboard` sense sessió → redirecció a `/login` (middleware).
4. `/reservar`: triar dia → hora → professor (només disponibles) → confirmar.
5. Tornar a `/reservar` mateixa data+franja → el professor reservat ja no apareix.
6. Intentar reservar una franja ocupada (carrera) → error de domini, no excepció.
7. Cancel·lar una reserva → la franja torna a quedar lliure.
8. Logout des del header → torna a `/` sense sessió.
9. DevTools: la cookie de sessió és `HttpOnly` i no queda res a `localStorage`.
