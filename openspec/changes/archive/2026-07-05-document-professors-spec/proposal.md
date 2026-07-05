## Why

La capacitat de professors (consulta del catàleg i càlcul de disponibilitat) ja existeix i funciona al codi, però mai s'ha documentat com a spec d'OpenSpec. Sense una spec, les regles de disponibilitat (professor lliure per data/franja) només viuen implícites al codi, cosa que dificulta detectar regressions.

## What Changes

- Documentar la capacitat `professors` com a spec OpenSpec, capturant el comportament ja implementat (no s'afegeix cap funcionalitat nova al codi)
- Definir els requeriments i escenaris de: llistar tots els professors, llistar professors amb disponibilitat en una data, llistar professors disponibles en una data i franja concretes

## Capabilities

### New Capabilities
- `professors`: consulta del catàleg de professors i càlcul de la seva disponibilitat segons reserves confirmades existents

### Modified Capabilities

## Impact

- Cap canvi de codi — només documentació de spec (`openspec/specs/professors/spec.md`)
