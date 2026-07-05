import Link from "next/link";

import { Button } from "@/components/ui/button";
import { PromoImages } from "@/components/promo-images";
import { FeaturedBanner } from "@/components/featured-banner";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/img/hero-big.svg"
        alt="Il·lustració de fons"
        className="mb-10 h-56 w-full rounded-xl object-cover"
      />

      <FeaturedBanner />

      <section className="mt-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Reserva de Sessions de Treball
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Reserva sessions 1-a-1 amb els nostres professors i mentors interns.
          Tria el professor, mira els seus buits i confirma la teva sessió en
          pocs clics.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button asChild>
            <Link href="/login">Iniciar sessió</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/register">Crear compte</Link>
          </Button>
        </div>
      </section>

      <section className="mt-14">
        <PromoImages />
      </section>

      <section className="mt-14 grid gap-6 sm:grid-cols-3">
        {[
          { n: "1", t: "Tria el professor", d: "Explora els professors i la seva especialitat." },
          { n: "2", t: "Mira els seus buits", d: "Veuràs només les franges lliures per a la data." },
          { n: "3", t: "Confirma la sessió", d: "Reserva i gestiona-la des del teu dashboard." },
        ].map((pas) => (
          <div key={pas.n} className="rounded-lg border bg-card p-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
              {pas.n}
            </div>
            <h3 className="mt-3 font-semibold">{pas.t}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{pas.d}</p>
          </div>
        ))}
      </section>

      <footer className="mt-16 border-t pt-6 text-center text-xs text-muted-foreground">
        © 2026 Reserva de Sessions de Treball
      </footer>
    </main>
  );
}
