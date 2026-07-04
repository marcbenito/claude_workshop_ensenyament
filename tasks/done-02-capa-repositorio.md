# Tasca 02 — Capa repositori server-side (pg)

## Objectiu
Crear la capa d'accés a dades amb SQL parametritzat sobre `getPool()`, aïllada de la UI i
només server-side.

## Fitxers afectats (nous)
- `app/src/lib/server/mappers.ts`
- `app/src/lib/server/professors.repo.ts`
- `app/src/lib/server/timeslots.repo.ts`
- `app/src/lib/server/reservations.repo.ts`
- `app/src/lib/server/users.repo.ts`

## Detall
- **`mappers.ts`**: converteix files SQL (snake_case) a tipus de domini. `bigint`→`string`
  (node-pg ja retorna int8 com a string), `slot_time` `"09:00:00"`→`"HH:mm"`. Extreure com
  a funcions **pures** (testejables sense BD).
- **`professors.repo.ts`**: `listAll()` (ordre per id), `getById(id)`,
  `listAvailable(date, slotId)` (professors SENSE reserva `confirmed` en aquesta
  data+franja, via `NOT EXISTS`).
- **`timeslots.repo.ts`**: `listActive()` (només `is_active`, ordre per hora),
  `idByTime(time)`, `timeById(id)`.
- **`reservations.repo.ts`**:
  - `listByUser(userId)` (JOIN a `time_slots` i `professors`, ordre data+hora).
  - `create({userId, professorId, date, time})`: dins una **transacció** — (a) validar
    que l'usuari no té ja una reserva `confirmed` en la mateixa data+franja (regla PRD de
    no-solapament); (b) traduir `time`→`time_slot_id`; (c) `INSERT`; capturar l'error
    Postgres `23505` (índex `reservations_slot_unique`) → retornar error de domini.
  - `cancel(userId, id)`: `UPDATE status='cancelled'` **només** si la reserva és de
    l'usuari (no esborrar; l'índex parcial allibera la franja).
- **`users.repo.ts`**: `findByEmail(email)` (via `lower(email)`), `create({name, email,
  password})` amb `RETURNING`, `findById(id)`. No exposar mai `password_hash` cap a la UI.

## Criteris d'acceptació
- Tot el SQL parametritzat (`$1, $2…`), mai concatenació de strings.
- Cap fitxer importable des de client (`next/headers`/`pg` només aquí i a `app/api/**`).
- Els mappers són funcions pures amb tests unitaris possibles.

## Verificació
- `npx tsc --noEmit` verd.
- Comprovació manual amb `psql`: dues reserves `confirmed` mateix professor/data/franja →
  error `23505`; després de `cancel`, un nou insert en aquesta franja té èxit.
