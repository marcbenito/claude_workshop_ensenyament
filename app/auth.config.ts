import type { NextAuthConfig } from "next-auth";

/**
 * Configuració compartida entre `auth.ts` (Node, amb accés a Postgres) i
 * `middleware.ts` (Edge). No pot importar res que depengui de `pg`.
 */
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth }) {
      return Boolean(auth?.user);
    },
  },
  providers: [],
} satisfies NextAuthConfig;
