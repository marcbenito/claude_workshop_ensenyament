import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de cookies · Reserva de Sessions de Treball",
  description:
    "Informació sobre les cookies que utilitza l'aplicació de Reserva de Sessions de Treball.",
};

export default function PoliticaCookiesPage() {
  return (
    <main className="mx-auto max-w-3xl space-y-6 px-4 py-12">
      <h1 className="font-serif text-3xl font-semibold tracking-tight">
        Política de cookies
      </h1>
      <p className="text-muted-foreground">
        Aquesta aplicació utilitza únicament cookies tècniques necessàries per
        al seu funcionament. No fem servir cookies analítiques ni de màrqueting.
      </p>
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Cookie de sessió</h2>
        <p className="text-muted-foreground">
          Fem servir una cookie tècnica de sessió (gestionada per NextAuth) per
          mantenir la teva sessió iniciada mentre navegues per l&apos;aplicació.
          És imprescindible per poder reservar sessions i accedir al teu
          compte.
        </p>
      </section>
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Gestió del consentiment</h2>
        <p className="text-muted-foreground">
          A la primera visita et demanem que acceptis o rebutgis l&apos;ús de
          cookies. La teva decisió es desa localment al navegador. Pots
          esborrar-la en qualsevol moment netejant les dades del navegador.
        </p>
      </section>
      <Link
        href="/"
        className="inline-block text-primary underline-offset-4 hover:underline"
      >
        Torna a l&apos;inici
      </Link>
    </main>
  );
}
