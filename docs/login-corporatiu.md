# Especificació: login corporatiu (equip de Plataforma)

> Document de context per a la implementació de l'autenticació de l'app de
> Reserva de Sessions de Treball. Conté tot el que cal saber. La implementació
> ha de seguir aquest document al peu de la lletra.

## Objectiu

Substituir l'autenticació mock (basada en `localStorage`, vegeu
`app/src/lib/auth-context.tsx` i `app/src/lib/services/auth.ts`) per un login
real amb **NextAuth (Auth.js) versió 5** contra la base de dades corporativa.

## Base de dades

- La taula és `users` (ja existeix a la BD Postgres configurada a
  `app/.env` → `DATABASE_URL`):
  - `id` (bigint, identity), `name` (text), `email` (text, únic
    case-insensitive via índex `users_email_lower_uidx`), `password_hash`
    (text), `created_at`, `updated_at`.
- **No s'ha de crear cap taula nova.** El patró triat (Credentials + JWT) no
  necessita les taules d'adapter de NextAuth.
- ⚠️ Decisió temporal del projecte: la contrasenya es guarda **en pla** al camp
  `password_hash` (l'entorn és una BD efímera de proves). NO fer hash de
  moment; deixar un `// TODO: bcrypt` al codi.

## Llibreria i patró

- `npm install next-auth@^5` (dins de `app/`).
- Provider: **Credentials** (email + contrasenya) validant contra la taula
  `users` amb el client `pg` ja disponible al projecte.
- Estratègia de sessió: **JWT** (cookie). Cap adapter.
- El secret és `AUTH_SECRET`, ja definit a `app/.env`.

## Fitxers a crear o substituir (dins de `app/`)

1. `auth.ts` (arrel de l'app): configuració de NextAuth amb el provider
   Credentials. La funció `authorize` busca l'usuari per email
   (`lower(email)`) i compara la contrasenya en pla amb `password_hash`.
2. `src/app/api/auth/[...nextauth]/route.ts`: el handler (exporta GET i POST
   des de `auth.ts`).
3. `middleware.ts` (arrel de l'app): protegeix `/dashboard` i `/reservar`;
   sense sessió → redirigir a `/login`. **Substitueix i elimina**
   `src/components/protected-route.tsx`.
4. `SessionProvider` al layout + `useSession()` als components.
   **Substitueix i elimina** `src/lib/auth-context.tsx`.
5. `src/app/api/register/route.ts`: endpoint propi `POST /api/register`
   (name, email, password) que insereix a `users` (email normalitzat amb
   `trim().toLowerCase()`); després de registrar, iniciar sessió.
6. Adaptar les pàgines `/login` i `/register` per usar `signIn()`/`signOut()`
   de NextAuth mantenint el disseny actual.

## Criteris d'acceptació

- Registre d'un usuari nou → sessió iniciada automàticament.
- Login amb credencials correctes → entra; amb contrasenya incorrecta → error
  al formulari (no exception).
- La sessió sobreviu a un refresc de pàgina (cookie JWT).
- `/dashboard` sense sessió → redirecció a `/login` (via middleware).
- Logout des del header → torna a `/` sense sessió.
- `npm run lint` i `npm run test:unit` en verd.

Implementa el login a la base de dades