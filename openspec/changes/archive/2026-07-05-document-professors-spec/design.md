## Context

La capacitat de professors ja està implementada al codi (`GET /api/professors`, repositori i capa de servei). Aquest canvi és purament documental: no es modifica cap comportament, només es formalitza com a spec OpenSpec el que ja existeix.

## Goals / Non-Goals

**Goals:**
- Capturar els tres modes de consulta de l'endpoint (`sense filtre`, `amb data`, `amb data i franja`) com a requeriments comprovables
- Reflectir que el catàleg de professors (`app/src/lib/data/professors.ts`) és dada de referència congelada, propietat de l'equip de Dades, i que la disponibilitat és l'única lògica de negoci real d'aquesta capacitat

**Non-Goals:**
- No es canvia cap regla de negoci ni codi
- No es documenta aquí la capacitat `timeslots`, tot i que hi ha una dependència implícita (calcular disponibilitat requereix conèixer les franges actives)

## Decisions

### Decisió 1: Un únic requeriment per mode de consulta, no per l'endpoint sencer

L'endpoint `GET /api/professors` combina tres comportaments diferents segons els paràmetres rebuts (`date`, `slot`). Modelar-los com a tres requeriments separats (en lloc d'un de sol amb tres escenaris) fa que cadascun sigui evolucionable de forma independent si en el futur canvia només un dels modes.

### Decisió 2: No documentar aquí la migració del catàleg a BD

CLAUDE.md indica que el catàleg de professors està en migració cap a la taula `professors` de la BD. Com que aquesta spec documenta el comportament *actual* (ja consultant Postgres via `professors.repo.ts`), no cal esmentar l'estat de migració — és un detall d'implementació, no un requeriment de comportament.

## Risks / Trade-offs

- **Risc**: la spec no cobreix la relació amb `timeslots` (com es determinen les franges actives) → **Mitigació**: acceptable per a aquest cicle; queda com a treball futur documentar `timeslots`
