---
name: tests
description: Escriu i executa tests (Vitest) per a l'app de Reserva de Sessions de Treball, seguint les convencions del projecte. Usa-la quan es demani "escriu tests", "cobreix amb tests", "/tests", o després d'afegir/canviar lògica a `app/src/lib/server`, `app/src/app/api` o `app/src/lib`.
---

# Escriure tests d'aquest projecte

Aquest projecte fa servir **Vitest**. Segueix aquestes convencions al peu de la
lletra i no reinventis res.

## Comandes

- Executa els tests **sempre** amb `cd app && npm test` (equival a `vitest run`,
  una sola passada; **no** facis servir el mode watch).
- Passa també `npm run lint` abans de donar la feina per acabada.

## On van i quin estil

- Els tests viuen **al costat del fitxer**, amb el mateix nom + `.test.ts`
  (p. ex. `reservations.repo.ts` → `reservations.repo.test.ts`).
- Config: `app/vitest.config.ts` (inclou `src/**/*.test.ts`, àlies `@`).
- Estil: `import { describe, expect, it, vi } from "vitest";`, imports amb
  l'àlies `@/…`, i descripcions dels `it(...)` **en català**. Mira
  `app/src/lib/server/mappers.test.ts` com a referència d'estil.

## Com testejar cada capa

1. **Funcions pures** (`lib/server/mappers.ts`, `lib/utils.ts`): crida-les
   directament amb dades d'exemple i comprova el resultat. Sense mocks.
2. **Repositoris** (`lib/server/*.repo.ts`): fan servir `getPool().query(...)`.
   **No toquis la BD real**; mocka el pool:
   ```ts
   import { vi } from "vitest";
   const query = vi.fn();
   vi.mock("@/lib/db", () => ({ getPool: () => ({ query }) }));
   ```
   Configura `query.mockResolvedValueOnce({ rows: [...] })` per simular el que
   torna Postgres, i verifica: (a) el SQL / paràmetres amb què es crida, i
   (b) que el resultat es mapeja bé.
3. **Route handlers** (`app/src/app/api/**/route.ts`): mocka el mòdul del
   repositori corresponent (`vi.mock("@/lib/server/reservations.repo", …)`),
   crida el handler amb un `Request` construït a mà, i comprova l'`status` i el
   `body` de la `Response`.

## Cobertura mínima de les reserves

Quan cobreixis les reserves, inclou:
- **Crear** una reserva correctament.
- **Llistar** les reserves d'un usuari.
- **Cancel·lar** una reserva.
- **Conflicte de solapament** → l'endpoint ha de respondre **409** quan la
  franja d'un professor ja està ocupada (i el mateix usuari no pot solapar-se).

## En acabar

Executa `npm test` i reporta quants tests passen. Si algun falla, arregla el
codi o el test segons correspongui i torna a executar fins que passi net.
