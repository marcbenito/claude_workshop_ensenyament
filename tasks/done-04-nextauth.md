# Tasca 04 — Autenticació amb NextAuth (Auth.js) v5

## Objectiu
Substituir l'auth mock (localStorage) per un login real amb NextAuth v5 contra la taula
`users`, seguint `docs/login-corporatiu.md` **al peu de la lletra**.

## Fitxers afectats
Nous:
- `app/auth.ts` (arrel de l'app): config de NextAuth, provider **Credentials**. `authorize`
  busca l'usuari per `lower(email)` (via `users.repo`) i compara la contrasenya **en pla**
  amb `password_hash`. Deixar un `// TODO: bcrypt`.
- `app/src/app/api/auth/[...nextauth]/route.ts`: exporta `GET`/`POST` des de `auth.ts`.
- `app/middleware.ts` (arrel): protegeix `/dashboard` i `/reservar`; sense sessió → `/login`.
- `app/src/app/api/register/route.ts`: `POST /api/register` (name, email, password) →
  insereix a `users` (email normalitzat `trim().toLowerCase()`, via `users.repo`); després
  de registrar, iniciar sessió.

Modificats:
- `app/src/app/layout.tsx`: embolcallar amb `SessionProvider`.
- `app/src/app/login/page.tsx` i `register/page.tsx`: usar `signIn()`/`signOut()` de
  NextAuth **mantenint el disseny actual**.
- `app/src/components/site-header.tsx`: `useSession()` + `signOut()` (logout → `/`).

Eliminats:
- `app/src/lib/auth-context.tsx` (substituït per `SessionProvider` + `useSession()`).
- `app/src/components/protected-route.tsx` (substituït pel `middleware.ts`).

## Detall
- Estratègia de sessió **JWT** (cookie), secret `AUTH_SECRET` (ja a `app/.env`). Cap adapter,
  cap taula nova.
- Reutilitzar `users.repo` de la tasca 02 per a `authorize` i per al registre.

## Criteris d'acceptació (de `docs/login-corporatiu.md`)
- Registre d'un usuari nou → sessió iniciada automàticament.
- Login amb credencials correctes → entra; contrasenya incorrecta → error al formulari (no
  excepció).
- La sessió sobreviu a un refresc de pàgina (cookie JWT).
- `/dashboard` sense sessió → redirecció a `/login` (via middleware).
- Logout des del header → torna a `/` sense sessió.

## Verificació
- `npm run lint` verd.
- Flux manual a `:3000`: registrar → dashboard; login amb password erroni → error.
