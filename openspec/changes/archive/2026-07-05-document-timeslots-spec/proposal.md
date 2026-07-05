## Why

La capacitat de franges horàries (consulta de franges actives i càlcul de disponibilitat per professor) ja existeix i funciona al codi, però mai s'ha documentat com a spec d'OpenSpec. Sense una spec, les regles de disponibilitat només viuen implícites al codi, cosa que dificulta detectar regressions i completa la documentació de les capacitats de què depenen `reservations` i `professors`.

## What Changes

- Documentar la capacitat `timeslots` com a spec OpenSpec, capturant el comportament ja implementat (no s'afegeix cap funcionalitat nova al codi)
- Definir els requeriments i escenaris de: llistar franges actives, llistar franges lliures d'un professor en una data

## Capabilities

### New Capabilities
- `timeslots`: consulta de les franges horàries actives i càlcul de la seva disponibilitat per a un professor concret segons reserves confirmades existents

### Modified Capabilities

## Impact

- Cap canvi de codi — només documentació de spec (`openspec/specs/timeslots/spec.md`)
