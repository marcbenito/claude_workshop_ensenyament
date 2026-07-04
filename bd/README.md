# Base de dades — workshop_reservas

Scripts SQL per crear la base de dades Postgres del projecte de **Reserva de
Sessions de Treball**, un usuari compartit per a consultes/edició i les dades
inicials.

L'esquema està pensat per migrar després la capa de serveis (`app/src/lib/services/`)
de `localStorage` a Postgres/Supabase sense canviar la UI.

## Contingut

| Fitxer | Què fa | On connectar |
|--------|--------|--------------|
| `00_create_db_and_roles.sql` | Crea els rols (`reservas_owner`, `reservas_app`) i la BD `workshop_reservas` | BD `postgres` |
| `01_schema.sql` | Taules, constraints, índexs i triggers | BD `workshop_reservas` |
| `02_grants.sql` | Permisos DML per a `reservas_app` + default privileges | BD `workshop_reservas` |
| `03_seed.sql` | Seed dels 5 professors i les 9 franges horàries | BD `workshop_reservas` |

## Rols

- **`reservas_owner`** — rol propietari, *sense login*. Posseeix l'esquema i les
  taules. No s'hi connecta ningú directament.
- **`reservas_app`** — usuari compartit *amb login*. Permisos de **consulta i
  edició** (SELECT, INSERT, UPDATE, DELETE). **No** pot alterar l'esquema.

## Ordre d'execució

> Abans de res, edita `00_create_db_and_roles.sql` i canvia
> `CHANGE_ME_strong_password` per una contrasenya forta (p. ex.
> `openssl rand -base64 24`).

Com a superusuari `postgres`:

```bash
psql -U postgres -d postgres          -f bd/00_create_db_and_roles.sql
psql -U postgres -d workshop_reservas -f bd/01_schema.sql
psql -U postgres -d workshop_reservas -f bd/02_grants.sql
psql -U postgres -d workshop_reservas -f bd/03_seed.sql
```

## Verificació

Comprova que l'usuari compartit es connecta i veu les dades:

```bash
psql "postgresql://reservas_app:LA_CONTRASENYA@HOST:5432/workshop_reservas" \
  -c "SELECT count(*) FROM professors;" \
  -c "SELECT count(*) FROM time_slots;"
# -> 5 i 9
```

Prova també que pot editar (DML) però no alterar l'esquema (DDL):

```bash
# Hauria de FUNCIONAR (DML):
psql "postgresql://reservas_app:LA_CONTRASENYA@HOST:5432/workshop_reservas" \
  -c "INSERT INTO users (name, email, password_hash) VALUES ('Test', 'test@example.com', 'x') RETURNING id;"

# Hauria de FALLAR (DDL no permès):
psql "postgresql://reservas_app:LA_CONTRASENYA@HOST:5432/workshop_reservas" \
  -c "CREATE TABLE hack (id int);"   # -> permission denied for schema public
```

## Model de dades (resum)

```
users 1───N reservations N───1 professors
                  │
                  N
                  │
                  1
              time_slots
```

- **`users`** — `id, name, email (únic, case-insensitive), password_hash, created_at, updated_at`.
- **`professors`** — `id, name, subject, initials, bio`.
- **`time_slots`** — `id, slot_time (únic), is_active`.
- **`reservations`** — `id, user_id, professor_id, reservation_date, time_slot_id,
  status (confirmed|cancelled), created_at, updated_at`.

Regla **1-a-1**: índex únic parcial sobre `(professor_id, reservation_date,
time_slot_id) WHERE status = 'confirmed'` — una franja d'un professor només la
pot reservar una persona. Les reserves cancel·lades alliberen la franja.

## Notes

- `password_hash`: el backend real ha de guardar-hi un *hash* (bcrypt/argon2),
  mai la contrasenya en clar.
- Per esborrar-ho tot i tornar a començar:
  ```sql
  DROP DATABASE IF EXISTS workshop_reservas;
  DROP ROLE IF EXISTS reservas_app;
  DROP ROLE IF EXISTS reservas_owner;
  ```
