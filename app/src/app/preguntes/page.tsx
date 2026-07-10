import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "Quant dura una sessió?",
    a: "Les sessions estàndard duren 30 minuts. Alguns professors ofereixen també blocs de 60 minuts per a projectes.",
  },
  {
    q: "Té algun cost?",
    a: "No. El servei està inclòs per a tot l'alumnat matriculat al centre.",
  },
  {
    q: "Puc cancel·lar o moure una sessió?",
    a: "Sí, fins a 12 hores abans. El buit tornarà a quedar lliure perquè altres companys el puguin aprofitar.",
  },
  {
    q: "Les sessions són presencials o en línia?",
    a: "Cada professor ho indica al seu perfil: la majoria ofereixen les dues modalitats.",
  },
  {
    q: "Quants professors puc reservar per setmana?",
    a: "No hi ha un límit fix, però prioritza les matèries on més ho necessitis perquè hi hagi buits per a tothom.",
  },
  {
    q: "Què passa si no em presento a una sessió?",
    a: "El buit es marca com a no assistit. Si es repeteix sovint, la secretaria es posarà en contacte amb tu.",
  },
  {
    q: "Com sé si un professor és el més adequat per a mi?",
    a: "Cada perfil mostra la matèria, l'especialitat i valoracions d'altres alumnes per ajudar-te a triar.",
  },
  {
    q: "Puc reservar amb el mateix professor cada setmana?",
    a: "Sí, sempre que hi hagi disponibilitat. Molts alumnes reserven una franja fixa setmanal amb el mateix mentor.",
  },
  {
    q: "Rebré algun recordatori de la sessió?",
    a: "Sí, rebràs una confirmació immediata i un recordatori abans de l'hora acordada.",
  },
  {
    q: "Què faig si no trobo cap buit disponible?",
    a: "Els professors publiquen nova disponibilitat cada setmana; torna a consultar el calendari o prova amb un altre mentor de la mateixa matèria.",
  },
];

function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground",
        className
      )}
    >
      S
    </span>
  );
}

export default function PreguntesPage() {
  return (
    <div className="bg-background text-foreground">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 sm:px-14">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo />
          <span className="text-lg font-semibold">Sessions de Treball</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium text-muted-foreground sm:gap-7">
          <Link href="/#com-funciona" className="hidden hover:text-foreground sm:inline">
            Com funciona
          </Link>
          <Link href="/#professors" className="hidden hover:text-foreground sm:inline">
            Professors
          </Link>
          <Link href="/preguntes" className="hidden text-foreground sm:inline">
            Preguntes
          </Link>
          <ThemeToggle />
          <Button asChild className="rounded-full">
            <Link href="/reservar">Reserva ara</Link>
          </Button>
        </nav>
      </header>

      <section className="mx-auto max-w-3xl px-6 py-16 sm:px-14">
        <h1 className="mb-3 text-center text-3xl font-semibold sm:text-4xl">
          Preguntes freqüents
        </h1>
        <p className="mb-10 text-center text-muted-foreground">
          Les 10 preguntes que més ens fa l&apos;alumnat sobre la reserva de sessions.
        </p>
        <div className="flex flex-col gap-3.5">
          {FAQS.map((f) => (
            <div key={f.q} className="rounded-2xl bg-secondary p-6">
              <h2 className="mb-2 text-base font-bold">{f.q}</h2>
              <p className="text-[0.95rem] leading-relaxed text-muted-foreground">
                {f.a}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Button asChild size="lg" className="rounded-full px-7">
            <Link href="/reservar">Reserva la teva sessió</Link>
          </Button>
        </div>
      </section>

      <footer className="bg-[#2d2a26] text-[#c9c2b8]">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-10 px-6 py-12 sm:flex-row sm:px-14">
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2.5">
              <Logo className="h-8 w-8 text-sm" />
              <span className="text-base font-semibold text-[#faf7f2]">
                Sessions de Treball
              </span>
            </div>
            <p className="max-w-[34ch] text-sm leading-relaxed">
              Mentoria 1-a-1 amb els professors i mentors del centre.
            </p>
          </div>
          <div className="flex gap-16 text-sm">
            <div className="flex flex-col gap-1">
              <span className="font-bold text-[#faf7f2]">Enllaços</span>
              <Link href="/#com-funciona" className="hover:text-[#faf7f2]">
                Com funciona
              </Link>
              <Link href="/#professors" className="hover:text-[#faf7f2]">
                Professors
              </Link>
              <Link href="/preguntes" className="hover:text-[#faf7f2]">
                Preguntes
              </Link>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-bold text-[#faf7f2]">Contacte</span>
              <span>sessions@escola.cat</span>
              <span>93 000 00 00</span>
              <span>Secretaria · planta 1</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
