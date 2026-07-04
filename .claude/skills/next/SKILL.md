---
name: next
description: Navega a l'estadi següent del curs. Usa-la quan l'alumne digui "next", "següent pas", "següent estadi", "m'he perdut" o vulgui re-enganxar-se al fil del workshop.
---

# Passar a l'estadi següent del curs

Aquest repo és el material d'un workshop amb estadis encadenats per branques.
El mapa (en ordre) és:

`main` → `01-fonaments-final` → `02-perf` → `02-perf-solucio` → `03-backend`
→ `03-login` → `04-skills` → `05-landing` → `06-autobuild` / `06-openspec`
→ `07-final` (extres: `extra/deploy-vercel`, `extra/seo`)

Nota: `02-perf` és un estat INICIAL (porta un problema a resoldre); la resta
són estats finals de cada activitat.

## Procediment

1. Executa `git branch --show-current` i `git status --short` per saber on és
   l'alumne i si té feina sense desar.
2. Si hi ha canvis sense commitejar, **no els destrueixis mai**: ofereix dues
   opcions i pregunta — (a) commitejar-los a una branca personal
   (`el-meu-<estadi>`), o (b) `git stash` amb un missatge descriptiu.
3. Determina la branca següent segons el mapa. Si l'alumne està en una branca
   personal, dedueix l'estadi per la branca de la qual va sortir.
4. `git checkout <branca-següent>` i, si `app/package.json` ha
   canviat, recorda-li fer `cd app && npm install`.
5. Llegeix `ACTIVITAT.md` de la branca nova i fes-ne un resum de 3-4
   línies: objectiu, primer pas i com es verifica.
6. Si l'alumne venia perdut d'una activitat a mig fer, tranquil·litza'l: les
   branques de checkpoint existeixen exactament per a això.

No facis mai push de les branques del curs ni les modifiquis; la feina de
l'alumne viu a les seves branques personals.
