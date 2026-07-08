# Workshop de Claude Code — App de Reserva de Sessions

Benvingut/da al taller pràctic de **Claude Code**. Aquest repositori és el punt
de partida: una app **Next.js + TypeScript + Tailwind** de reserva de sessions
de treball amb professors. Durant el dia la farem evolucionar amb Claude, pas a
pas.

## Estructura

| Carpeta / fitxer | Què és |
|---|---|
| `app/` | L'aplicació Next.js (aquí viu el codi) |
| `bd/` | Els scripts SQL de la base de dades (Postgres) |
| `docs/` | Documentació de context (p. ex. l'especificació del login) |
| `ACTIVITAT.md` | **La fitxa de l'exercici de l'estadi actual** — comença per aquí |
| `mcp.json` | Servidors MCP preconfigurats (inactius fins a l'hora 3) |
| `.claude/` | Configuració del projecte + skills del curs (`/next`, `/activitat`) |

## Requisits

Consulta la invitació del curs. En resum: Node 20+, git, Claude Code (compte
Pro/Max), Claude Desktop, GitHub CLI i un compte de Vercel. **Tot l'entorn ve
configurat** (`.env`, `mcp.json`): no cal muntar res.

## Com començar

```bash
cd app
npm install
npm run dev
```

Després, a l'arrel del repo, arrenca Claude Code:

```bash
claude
```

I fes servir les skills del curs:

- **`/activitat`** — t'explica i t'acompanya en l'exercici de l'estadi actual.
- **`/next`** — et porta a l'estadi següent (o et re-enganxa si t'has perdut).

Cada estadi del curs és una **branca** de checkpoint. Si una demo falla o et
perds, sempre pots saltar a la branca corresponent i continuar.

## Desplegament a Vercel

El codi de l'app viu a `app/`, **no** a l'arrel del repo. Si Vercel construeix
des de l'arrel no troba el `package.json` i serveix un **404 NOT_FOUND**. Per
evitar-ho:

1. Al projecte de Vercel → **Settings → Build & Deployment → Root Directory**,
   posa-hi **`app`**. Amb això Vercel detecta Next.js i llegeix `app/vercel.json`.
2. Afegeix les variables d'entorn (**Settings → Environment Variables**):
   - `DATABASE_URL` — la cadena de connexió a Postgres.
   - `AUTH_SECRET` — genera'l amb `npx auth secret` (obligatori en producció).
   - `NEXT_PUBLIC_SITE_URL` *(opcional)* — l'URL pública (SEO).

> Nota: no s'afegeix un `vercel.json` a l'arrel perquè, en ser una app amb SSR i
> rutes d'API, cal que Vercel detecti el framework Next.js dins de `app/`; això
> només s'aconsegueix amb el *Root Directory*, no amb un build des de l'arrel.

---

*App de demostració per a formació. La base de dades és de proves i efímera;
no hi posis dades reals.*
