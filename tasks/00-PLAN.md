# Pla: Backend real amb Postgres + NextAuth

## Context

L'app de **Reserva de Sessions de Treball** (Next.js 15, App Router) funciona avui com a
prototip: **tota la persistència és un mock síncron a `localStorage`** i els
professors/franges estan **hardcodejats** al codi. La infraestructura de BD real ja està
preparada però **sense cablejar**: `pg` instal·lat, `app/src/lib/db.ts` amb `getPool()`,
`app/.env` amb `DATABASE_URL` (Postgres remot real) i `AUTH_SECRET`, i `bd/` amb l'esquema
Postgres complet + seed (5 professors idèntics als hardcodejats, 9 franges). L'objectiu és
**implementar un backend real** perquè el producte funcioni contra aquesta BD, eliminant el
mock i les dades hardcodejades.

Repte central: `pg` només corre al servidor, però els serveis actuals són **síncrons i es
criden des de components client**. Migrar obliga a introduir una capa servidor
(repositoris + Route Handlers) i a convertir els serveis en **async**.

## Decisions (confirmades amb l'usuari)

1. **Capa de dades: Route Handlers REST** sota `app/src/app/api/**`. Els serveis client
   passen a async amb `fetch`.
2. **Auth: NextAuth (Auth.js) v5**, seguint `docs/login-corporatiu.md` **al peu de la
   lletra**: provider **Credentials**, sessió **JWT** (cookie, secret `AUTH_SECRET`), sense
   adapter ni taules noves. ⚠️ Contrasenya **en pla** a `password_hash` amb un
   `// TODO: bcrypt` (decisió temporal — BD efímera de proves).
3. **Legacy: eliminar el mock i els hardcodejats** (`storage.ts`, `services/auth.ts`,
   `data/professors.ts`, `data/slots.ts`, `auth-context.tsx`, `protected-route.tsx`).

## Notes tècniques clau

- **IDs**: node-postgres retorna `bigint`/`int8` com a **string** → encaixa amb els ids
  `string` del domini. `professorId` passa de `"prof-1"` a `"1"`.
- **`slot_time`**: Postgres `time` retorna `"09:00:00"` → mapejar a `"HH:mm"`.
- **Regla 1-a-1 (professor/data/franja)**: la imposa l'índex únic parcial
  `reservations_slot_unique`. A l'`INSERT`, capturar l'error `23505` i retornar error de
  domini.
- **No solapament per usuari** (PRD §4): la BD **NO** ho imposa. Validar al repositori
  abans d'inserir (dins la mateixa transacció).
- **Cancel·lar**: canviar de esborrat físic a `UPDATE status='cancelled'`.
- **Disponibilitat**: al pas «professor», mostrar només els professors lliures.
- **`createReservation` perd `userId`**: el servidor el deriva de la sessió NextAuth
  (`auth()`); mai es confia en un `userId` enviat pel client.

## Arquitectura

```
UI (client components)                    ← useSession(), estats loading/error
  └─ src/lib/services/*  (async, fetch)   ← wrappers client de l'API
       └─ src/app/api/**/route.ts         ← Route Handlers; llegeixen sessió amb auth()
            └─ src/lib/server/**          ← repositoris pg (SQL) + mappers  [server-only]
                 └─ src/lib/db.ts         ← getPool() (ja existeix)
                      └─ Postgres (bd/)
```

## Ordre de tasques

| # | Tasca | Depèn de |
|---|-------|----------|
| 01 | Infra BD i deps | — |
| 02 | Capa repositori (pg) | 01 |
| 03 | Tipus de domini | — |
| 04 | NextAuth | 01, 02 |
| 05 | API Route Handlers de dades | 02, 04 |
| 06 | Serveis client async | 05 |
| 07 | UI wiring | 04, 06 |
| 08 | Neteja hardcoded | 07 |
| 09 | Tests i verificació | tot |

Recordatori (CLAUDE.md): després de cada canvi a `app/`, `npm run lint` i, si toca lògica,
`npx vitest run`. El dev server ja corre al port **3000** — no l'arrenquis.

## Riscos / decisions obertes

- Regles de negoci noves respecte al mock (1-a-1 global i no-solapament per usuari) — s'afegeixen (PRD §4).
- `docs/login-corporatiu.md` menciona `npm run test:unit`, però `package.json` només té
  `test`. S'usa `npx vitest run` (CLAUDE.md).
- S'assumeix que `bd/*.sql` ja està aplicat al Postgres remot; la tasca 01 ho verifica.
- Tests d'integració contra el Postgres remot no s'automatitzen (fràgil); la lògica
  testejable s'extreu a funcions pures.
