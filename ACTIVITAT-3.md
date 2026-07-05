# Activitat — Part 4: MCPs (connectar Claude amb el món)

**Objectiu:** donar-li a Claude **ulls** amb MCP per veure i verificar el sistema
que acabem de construir: el navegador i la base de dades.
**Temps:** ~35 min.
**On:** arrenca `claude` a l'arrel del repo.

## D'on venim

A la part 3 vam construir el backend real. Fins ara Claude treballava "a
cegues". Amb **MCP (Model Context Protocol)** el connectem a eines externes: el
repo ja porta un `mcp.json` amb dos servidors preparats (Chrome DevTools i
Postgres), però **desactivat**.

---

## Pas 0 — Activar el MCP i instal·lar els servidors

1. **Activa la configuració MCP** (Claude Code només llegeix `.mcp.json`, amb
   punt al davant):
   ```bash
   mv mcp.json .mcp.json
   ```
   Obre `.mcp.json` i comprova que hi ha els **dos servidors** (chrome-devtools
   i postgres) i que cap línia està comentada.

   ```
   
3. **Reinicia Claude Code** perquè carregui els servidors. Comprova amb `/mcp`
   que apareixen `chrome-devtools` i `postgres` connectats.

---

## Pas 1 — Ulls al navegador: rendiment amb Chrome DevTools

1. Demana-li (pots copiar-ho tal qual):
   > L'app va lenta. Obre-la al navegador, mira el rendiment (network, traces,
   > re-renders), troba les causes i arregla-les. Verifica la millora.
2. Observa com Claude **navega de veritat**, llegeix mètriques reals, arregla i
   torna a mesurar. Ara veu el que veu l'usuari.

---

## Pas 2 — Ulls a la base de dades: Postgres per MCP

Ara que el backend escriu a la BD real, fem servir el MCP de Postgres per
**verificar dades vives** (no cal obrir cap client de BD):
> Connecta't a la base de dades i ensenya'm les últimes reserves que s'han
> creat. Comprova que la regla de l'índex únic funciona: hi ha cap professor
> amb dues reserves confirmades a la mateixa franja? Quants professors hi ha?

Claude consulta la **font de veritat** directament. Fixa't que el rol de la BD
és de mínims privilegis: prova de demanar-li un `DROP TABLE` i mira com falla.

---

## Resum

- `/mcp` mostra `chrome-devtools` i `postgres` connectats.
- Claude ha diagnosticat i arreglat el problema de rendiment amb el navegador.
- Claude ha consultat reserves reals directament a la base de dades.


