---
name: ship
description: Prepara i publica un canvi a GitHub — branca, lint, tests, commit convencional i Pull Request amb `gh`. Usa-la quan es demani "/ship", "puja això", "obre una PR", "prepara el canvi per pujar".
---

# Publicar un canvi (branch → PR)

Automatitza el cicle de pujada d'aquest projecte. Fes els passos **en ordre** i
atura't si algun falla, informant del motiu.

## Passos

1. **Branca**: si estàs a `main` o en una branca de checkpoint del curs, crea
   una branca nova descriptiva:
   ```bash
   git checkout -b feat/<descripcio-curta>
   ```
   (usa `fix/…` si és una correcció). Si ja ets en una branca de treball, segueix.
2. **Lint**: `cd app && npm run lint`. Si falla, **corregeix-ho** i repeteix.
3. **Tests**: `cd app && npm test` (Vitest, una passada). Si falla, arregla-ho
   abans de continuar.
4. **Commit**: afegeix els canvis i fes un commit amb **format convencional i en
   català**:
   ```bash
   git add -A
   git commit -m "feat: <resum en català>"
   ```
   Tipus habituals: `feat`, `fix`, `chore`, `refactor`, `test`, `docs`.
5. **Push**: `git push -u origin <branca>`.
6. **Pull Request** amb `gh`:
   ```bash
   gh pr create --fill
   ```
   Assegura't que el títol segueix el format convencional. Al cos, resumeix
   **què** s'ha fet i **com verificar-ho** (2-4 línies). Si el canvi tanca una
   issue, afegeix `Closes #<num>` al cos.

## En acabar

Reporta la **URL de la PR** creada. No mergegis la PR tu mateix; deixa-la
llesta per a revisió humana.
