## Context

La capacitat de reserves ja està implementada al codi (route handlers, repositori i capa de servei). Aquest canvi és purament documental: no es modifica cap comportament, només es formalitza com a spec OpenSpec el que ja existeix.

## Goals / Non-Goals

**Goals:**
- Capturar fidelment el comportament actual dels endpoints de reserves com a requeriments comprovables
- Reflectir l'ordre de validació real (autenticació → dades → franja vàlida → conflictes) perquè la spec sigui una font de veritat útil per a futurs canvis

**Non-Goals:**
- No es canvia cap regla de negoci ni codi
- No es documenten aquí les altres capacitats (auth, professors, franges horàries) — queden per a canvis futurs

## Decisions

### Decisió 1: Modelar els dos tipus de conflicte (409) com a escenaris separats

El codi distingeix dues causes de conflicte: no-solapament per usuari (comprovat explícitament abans de l'INSERT) i exclusivitat per professor (garantida per un índex únic a BD, capturada via `catch` de violació d'unicitat). Tot i que ambdós retornen 409, són regles de negoci diferents i mereixen escenaris propis a la spec perquè quedin comprovables per separat.

### Decisió 2: No crear delta specs per a `professors` ni `timeslots`

Aquestes capacitats ja existeixen com a codi però encara no tenen spec pròpia. Documentar-les no és objecte d'aquest canvi (vegeu Non-Goals); es referencien només com a dependències implícites (una reserva necessita un professor i una franja vàlids).

## Risks / Trade-offs

- **Risc**: la spec podria quedar desactualitzada si el codi canvia sense actualitzar-la → **Mitigació**: cap canvi futur a `reservations.repo.ts` o als route handlers hauria d'anar acompanyat d'una delta spec corresponent
- **Risc**: al no cobrir `professors`/`timeslots`, la spec de `reservations` depèn de capacitats no documentades → **Mitigació**: acceptable per a aquest primer cicle; queda com a treball futur
