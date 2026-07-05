---
name: issue
description: Agafa una issue oberta del GitHub del projecte i la implementa de punta a punta — llegeix els criteris, fa el canvi seguint les convencions, passa lint i tests, i obre una PR que la tanqui. Usa-la quan es demani "/issue", "agafa una issue", "resol el backlog", "implementa la següent issue", o dins d'un loop/`/goal` per buidar issues.
---

# Resoldre una issue del backlog

Aquesta skill implementa **una** issue oberta del repositori de principi a fi.
Per buidar el backlog sencer, executa-la en bucle o combina-la amb un `/goal`
(p. ex. "no queda cap issue oberta amb l'etiqueta `auto`").

## Passos

1. **Tria la issue.** Llista les obertes i agafa la **més antiga** (o la que
   t'indiquin per número, o filtrada per etiqueta):
   ```bash
   gh issue list --state open --sort created --order asc
   # filtrada:  gh issue list --state open --label auto --sort created --order asc
   ```
   Si no en queda cap, atura't i informa-ho ("no hi ha issues obertes").
   Llegeix-la sencera per entendre els **criteris d'acceptació**:
   ```bash
   gh issue view <num>
   ```
2. **(Opcional) Marca-la en curs.** Si hi ha un GitHub Project associat, mou la
   issue a "In progress". Si no en trobes o falla, continua sense bloquejar-te.
3. **Branca:** `git checkout -b feat/issue-<num>-<descripcio-curta>`.
4. **Implementa** el canvi complint els criteris d'acceptació. Segueix les
   convencions del projecte (vegeu `CLAUDE.md`): reutilitza el patró existent
   (route handler + repositori + servei per a backend; components de
   `components/ui` per a UI), textos en català, imports amb `@/`. Si la issue
   demana tests, escriu-los (o fes servir la skill `/tests`).
5. **Verifica:** `cd app && npm run lint` i `cd app && npm test`. Corregeix el
   que falli abans de continuar.
6. **Puja i obre la PR** que tanqui la issue (pots delegar en la skill `/ship`):
   ```bash
   git add -A && git commit -m "feat: <resum> (closes #<num>)"
   git push -u origin feat/issue-<num>-<descripcio-curta>
   gh pr create --fill --body "Closes #<num>"
   ```
   El `Closes #<num>` fa que en fer merge la issue es tanqui sola.

## En acabar

Reporta: número de la issue, què has implementat i la **URL de la PR**. No
mergegis la PR; deixa-la per a revisió. Si t'han demanat processar-ne més d'una,
torna al pas 1 amb la següent.
