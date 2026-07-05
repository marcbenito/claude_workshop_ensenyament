## Context

La capacitat de franges horàries ja està implementada al codi (`GET /api/timeslots`, repositori i capa de servei). Aquest canvi és purament documental: no es modifica cap comportament, només es formalitza com a spec OpenSpec el que ja existeix.

## Goals / Non-Goals

**Goals:**
- Capturar els dos modes de consulta de l'endpoint (`sense filtre` i `amb data+professor`) com a requeriments comprovables
- Completar la triada de capacitats de què depenen les reserves (`reservations`, `professors`, `timeslots`)

**Non-Goals:**
- No es canvia cap regla de negoci ni codi
- No es documenta aquí la gestió de l'atribut `is_active` (activar/desactivar franges), ja que no hi ha cap endpoint que ho exposi actualment

## Decisions

### Decisió 1: Un requeriment per mode de consulta, com a `professors`

L'endpoint `GET /api/timeslots` combina dos comportaments segons els paràmetres rebuts (`date` + `professorId`, o cap). Es mantén la mateixa convenció aplicada a la spec de `professors`: un requeriment per mode, no un de sol amb diversos escenaris, perquè cada mode evolucioni de forma independent.

## Risks / Trade-offs

- **Risc**: la spec no cobreix com es determina quines franges són `is_active` (dada de configuració, no lògica de negoci consultable) → **Mitigació**: acceptable; és fora d'abast d'aquesta capacitat tal com està exposada avui
