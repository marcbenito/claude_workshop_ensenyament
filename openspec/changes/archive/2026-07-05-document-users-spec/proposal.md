## Why

La capacitat d'usuaris (registre, autenticació i sessió) ja existeix i funciona al codi, però mai s'ha documentat com a spec d'OpenSpec. Sense una spec, regles com la unicitat de l'email o les condicions per iniciar sessió només viuen implícites al codi, cosa que dificulta detectar regressions.

## What Changes

- Documentar la capacitat `users` com a spec OpenSpec, capturant el comportament ja implementat (no s'afegeix cap funcionalitat nova al codi)
- Definir els requeriments i escenaris de: registre d'un compte nou, inici de sessió amb credencials, sessió autenticada disponible a la resta de l'aplicació

## Capabilities

### New Capabilities
- `users`: registre de comptes nous i autenticació d'usuaris mitjançant email i contrasenya, amb gestió de sessió

### Modified Capabilities

## Impact

- Cap canvi de codi — només documentació de spec (`openspec/specs/users/spec.md`)
