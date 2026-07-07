# Activitat — H2: Introducció a Claude Code (des de `main`)

**Objectiu:** conèixer les comandes bàsiques, veure com el context (CLAUDE.md)
canvia el comportament de Claude, i fer el primer canvi de codi real.
**Temps:** ~45 min de treball dins de l'hora 2.
**On:** arrenca `claude` a l'**arrel del clon** (aquest directori).

## Passos

1. **Trencagel** (sense tocar res):
   > Explica'm que veus en aquest repositori
   o: 
   > Fesme un resum explicant la arquitectura d'aquest projecte, crea un artefacte

   Els meus resultats:
   Haiku: https://claude.ai/code/artifact/33257870-aa24-4e1e-8b7a-1d4037fb90e6?via=auto_preview
   Sonet: https://claude.ai/code/artifact/89d13dce-7579-4bca-8ea1-fecba1e9fa3a?via=auto_preview
   Opus: https://claude.ai/code/artifact/80441072-ec5d-4bc3-a37b-18b50ca75a88
   fable: https://claude.ai/code/artifact/118f7e94-7f39-4d2c-b003-48da44557e0f?via=auto_preview



2. **Comandes**: prova `/model`, `/cost`, `/clear`, el mode pla (shift+tab) i
   observa el sistema de permisos.
3. **Un encàrrec real** (encara sense CLAUDE.md actiu):
   /canvia a model Haiku
   > Esborra el professor David Ortega de l'aplicació.

   Fixa't **on** fa el canvi. No avancis fins que l'instructor ho comenti.
4. **Activa el context del projecte**: aquest repo ja porta un `CLAUDE.md`
   professional preparat, però desactivat. Activa'l:

   >Crea un CLAUDE.md amb el fitxer docs/informacion-extra.ts

5. Reinicia Claude Code (o fes `/clear`) perquè el llegeixi.

6. **Repeteix l'encàrrec del pas 3** (mateix prompt) i compara el comportament
   amb abans:
   > Esborra el professor David Ortega de l'aplicació.

7. **Explora el context**: obre el `CLAUDE.md` i mira el PRD que referencia
   (`@docs/prd.md`). Entén què li estàs donant a Claude.


8. **Primera feature** (mode pla, amb el model que et toqui — `/model`):
   > Afegeix al dashboard un filtre per professor a la llista de reserves. Fes servir els components ui/ existents.

9. Compara amb els companys: temps, qualitat i `/cost`.


9. Utilitzant el mode plan.
   > Actualment l'aplicació utilitza localStorage com a backend. Volem implementar un backend utilitzant  una API. Fes l'Analisi i prepara un pla d'implementació per fases. Guardaho a tasques. Pregunta'm els dubtes que tinguis

## Verificació

- Existeix un `CLAUDE.md` a l'arrel (l'has activat al pas 4).
- Compara el resultat del pas 3 abans i després d'activar el context.
- El filtre per professor funciona a `/dashboard`.
- `cd app && npm run lint` en verd.

## En acabar
 
Checkpoint de referència: branca `01-fonaments-final`. Per continuar o
re-enganxar-te: executa la skill `/next`.



