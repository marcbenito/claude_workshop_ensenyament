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

L'app Next.js viu al subdirectori `app/` (no hi ha `package.json` a l'arrel del
repo). Si Vercel fa el build des de l'arrel, el desplegament acaba en un
**404 NOT_FOUND**. Hi ha dues maneres de solucionar-ho:

1. **Opció recomanada — Root Directory al dashboard de Vercel.**
   A *Project → Settings → Build and Deployment → Root Directory*, posa-hi
   **`app`** i redesplega. Amb això Vercel detecta el projecte Next.js
   automàticament i no cal cap configuració extra. (Atenció: amb aquesta opció,
   si mai cal un `vercel.json`, Vercel el buscarà dins de `app/`, no a l'arrel.)

2. **Alternativa — `vercel.json` a l'arrel del repo (ja inclòs).**
   Si no toques el Root Directory (es queda a l'arrel), el fitxer
   [`vercel.json`](./vercel.json) d'aquest repo ja redirigeix el build cap a
   `app/`:

   ```json
   {
     "framework": "nextjs",
     "installCommand": "npm install --prefix app",
     "buildCommand": "npm run build --prefix app",
     "outputDirectory": "app/.next"
   }
   ```

En tots dos casos, recorda definir a Vercel les **variables d'entorn** de l'app
(les del `.env` de `app/`: connexió a Postgres, secrets d'auth…), o el runtime
fallarà encara que el build passi.

**Criteri de validació:** el desplegament ha de servir la home (`/`) sense 404.

---

*App de demostració per a formació. La base de dades és de proves i efímera;
no hi posis dades reals.*
