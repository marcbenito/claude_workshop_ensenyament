# Activitat — Part 3: Construir i Plan Mode (des de `02-backend-base`)

**Objectiu:** completar el backend de reserves i canviar el flux de reserva,
tot amb **mode pla** (shift+tab). Aquí no construïm de zero: **estenem un codi
que ja existeix**, seguint el seu patró.
**Temps:** ~40 min.
**On:** `git checkout 02-backend-base` i arrenca `claude` a l'arrel.

## D'on venim

Fins ara l'app era un mock a `localStorage`. **Hem llançat un pla de migració**
amb Claude en mode pla i l'ha executat sencer: ha muntat tot el backend contra
la base de dades **Postgres** real — route handlers, capa de repositoris,
mappers i la migració de la capa de serveis — connectat professors, franges i
login, i deixat l'app llesta per treballar amb dades de veritat.

Aquesta migració és **massa llarga per fer-la en directe**, així que ja la tens
feta a la branca. **Falta només una peça**: els dos route handlers de reserves.
Com que el servei de reserves ja crida `/api/reservations` (que encara no
existeix), en arrencar l'app les **reserves fallaran** — la resta funciona. La
teva feina és completar-la, seguint el patró que la migració ja ha deixat.

---

## Pas 1 — Completar les reserves (Plan Mode + Opus)

1. **Ve-ho fallar primer**: `npm run dev`, entra a l'app i intenta reservar.
   Mira l'error a la consola / network (un `fetch` a un endpoint que no existeix).
2. Canvia de model i activa el mode pla: `/model opus`, després **shift+tab**.
3. Demana-li (pots copiar-ho tal qual):
   > Les reserves de l'app fallen: el servei `app/src/lib/services/reservations.ts`
   > crida `/api/reservations` però aquests route handlers no existeixen. El
   > repositori ja està fet a `app/src/lib/server/reservations.repo.ts` i els
   > altres endpoints (professors, franges) segueixen un patró clar a
   > `app/src/app/api/`. Seguint **exactament el mateix patró**, crea els dos
   > route handlers que falten:
   > - `app/src/app/api/reservations/route.ts`: `GET` (les meves reserves) i
   >   `POST` (crear; si la franja ja està ocupada → 409).
   > - `app/src/app/api/reservations/[id]/route.ts`: `DELETE` (cancel·lar).
   > Usa el repositori existent. No toquis res més ni escriguis tests.
4. **Revisa el pla** abans d'aprovar-lo: ha de ser curt (2 fitxers) i calcat al
   patró de `api/professors`. Negocia'l si cal, i aprova.
5. **Verifica**: crea una reserva des de l'app → ara funciona i es desa a la BD.
   Prova de reservar una franja que un company ja hagi agafat → hauries de rebre
   un error de conflicte (409).

---

## Pas 2 — Canviar el flux de reserva (Plan Mode)

Ara que les reserves són reals, fem la disponibilitat real. Volem **invertir el
flux**: primer es tria el professor, i després es mostren **només els seus buits**.

1. En mode pla:
   > Vull canviar el flux de reserva. Ara les franges surten fixes. Canvia-ho perquè primer se seleccioni la data, despres el profesor  i després es mostrin només les franges lliures
2. Revisa el pla (toca backend + frontend), negocia'l i aprova.
3. **Verifica**: reserva una franja d'un professor, torna a entrar al flux amb
   aquell professor → aquella franja ja no ha d'aparèixer.

---

## Verificació final

- Es pot crear i cancel·lar una reserva, i persisteix a la base de dades.
- El flux demana primer el professor i mostra només els seus buits reals.
- `cd app && npm run lint` en verd.

## En acabar

Valida que tot funcioni i.. Recordali que actualitzi la documentació i el CLAUDE.md

