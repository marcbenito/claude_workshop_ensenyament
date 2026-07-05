## Why

La capacitat de reserves (endpoints, regles de negoci i validacions) ja existeix i funciona al codi, però mai s'ha documentat com a spec d'OpenSpec. Sense una spec, el coneixement de negoci (no-solapament, exclusivitat per professor, cancel·lació) només viu implícit al codi font, cosa que dificulta detectar regressions o comunicar-lo a l'equip.

## What Changes

- Documentar la capacitat `reservations` com a spec OpenSpec, capturant el comportament ja implementat (no s'afegeix cap funcionalitat nova al codi)
- Definir els requeriments i escenaris de: llistar reserves, crear reserva (amb validacions), cancel·lar reserva

## Capabilities

### New Capabilities
- `reservations`: gestió de reserves de sessions 1-a-1 (crear, llistar, cancel·lar), amb regles de no-solapament per usuari i exclusivitat per professor/data/franja

### Modified Capabilities

## Impact

- Cap canvi de codi — només documentació de spec (`openspec/specs/reservations/spec.md`)
