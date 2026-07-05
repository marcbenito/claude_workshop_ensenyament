## Context

La capacitat d'usuaris ja està implementada al codi (`POST /api/register`, autenticació via NextAuth amb provider de credencials a `auth.ts`, repositori a `users.repo.ts`). Aquest canvi és purament documental: no es modifica cap comportament, només es formalitza com a spec OpenSpec el que ja existeix.

## Goals / Non-Goals

**Goals:**
- Capturar el comportament observable de registre i autenticació (què retorna el sistema, no com ho calcula per dins)
- Documentar que la sessió exposa l'`id` de l'usuari, ja que és la base que consumeixen altres capacitats (p. ex. `reservations`)

**Non-Goals:**
- No es canvia cap regla de negoci ni codi
- No es documenta aquí la comparació de contrasenyes en pla (hi ha un TODO explícit a `users.repo.ts` sobre bcrypt, marcat com a decisió temporal per a la BD efímera de proves) — és un detall d'implementació de seguretat, no un requeriment de comportament de negoci
- No es documenten les pàgines de UI (`login`, `register`), només el comportament dels endpoints i de la sessió

## Decisions

### Decisió 1: Modelar el "no autenticat" com un únic resultat, no com un error específic

El provider de credencials de NextAuth retorna `null` tant si l'email no existeix com si la contrasenya no coincideix (per disseny, per no revelar quins emails estan registrats). La spec reflecteix això amb dos escenaris que arriben al mateix resultat ("denega l'autenticació"), en lloc d'inventar-se una distinció de resposta que el codi no fa.

### Decisió 2: Tractar la sessió com a requeriment propi

Encara que la sessió és un detall de NextAuth, es documenta com a requeriment explícit perquè altres capacitats (com `reservations`) en depenen directament (`session?.user?.id`). Fer-la explícita evita que un canvi futur trenqui aquest contracte sense adonar-se'n.

## Risks / Trade-offs

- **Risc**: la spec no cobreix la seguretat de l'emmagatzematge de contrasenyes (comparació en pla) → **Mitigació**: és una decisió ja documentada al codi com a temporal; no és objecte d'aquest canvi
