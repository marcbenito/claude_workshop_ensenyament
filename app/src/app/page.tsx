import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* Dades de contingut de la landing (marketing). Els professors reals
   viuen a la BD; aquí només il·lustrem la pàgina d'entrada. */
const PASSOS = [
  {
    n: "1",
    t: "Tria el professor",
    d: "Explora el perfil de cada professor i mentor: matèria, especialitat i valoracions de l'alumnat.",
  },
  {
    n: "2",
    t: "Mira els seus buits",
    d: "El calendari mostra en temps real les hores lliures de cada setmana. Tria la que et vagi millor.",
  },
  {
    n: "3",
    t: "Confirma la sessió",
    d: "Rebràs la confirmació i un recordatori. Si canvien els plans, pots moure la sessió fàcilment.",
  },
];

const PROFESSORS = [
  {
    nom: "Marta Vidal",
    materia: "Matemàtiques",
    blurb: "Especialista en preparació d'exàmens i raonament lògic.",
    buit: "Proper buit: dilluns 10.00",
    foto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&auto=format&fit=crop",
  },
  {
    nom: "Jordi Serra",
    materia: "Física i Química",
    blurb: "Fa senzill el que sembla impossible: pràctica i exemples reals.",
    buit: "Proper buit: dilluns 12.30",
    foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop",
  },
  {
    nom: "Núria Bosch",
    materia: "Llengua i Literatura",
    blurb: "Comentari de text, expressió escrita i preparació de proves.",
    buit: "Proper buit: dimarts 9.00",
    foto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80&auto=format&fit=crop",
  },
  {
    nom: "Pau Ferrer",
    materia: "Programació",
    blurb: "Mentor de projectes: des del primer «hola món» fins al portafolis.",
    buit: "Proper buit: dimarts 16.00",
    foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&auto=format&fit=crop",
  },
  {
    nom: "Laia Camps",
    materia: "Anglès",
    blurb: "Conversa, gramàtica i preparació de certificats oficials.",
    buit: "Proper buit: dimecres 11.00",
    foto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80&auto=format&fit=crop",
  },
  {
    nom: "Oriol Puig",
    materia: "Disseny",
    blurb: "Revisió de portafolis, crítica constructiva i orientació creativa.",
    buit: "Proper buit: dijous 10.30",
    foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80&auto=format&fit=crop",
  },
];

const CALENDARI = [
  { dia: "Dl 6", buits: [{ h: "10.00", lliure: true }, { h: "12.30", lliure: false }] },
  { dia: "Dt 7", buits: [{ h: "9.00", lliure: false }, { h: "16.00", lliure: true }] },
  { dia: "Dc 8", buits: [{ h: "11.00", lliure: true }, { h: "17.30", lliure: true }] },
  { dia: "Dj 9", buits: [{ h: "10.30", lliure: false }, { h: "15.00", lliure: true }] },
  { dia: "Dv 10", buits: [{ h: "9.30", lliure: true }, { h: "13.00", lliure: true }] },
];

const TESTIMONIS = [
  {
    text: "Amb dues sessions amb la Marta vaig entendre el que no havia entès en tot el trimestre.",
    autor: "Aina, 2n de Batxillerat",
  },
  {
    text: "Reservar és rapidíssim. Veus els buits, cliques i llestos. Ja no cal perseguir ningú pel passadís.",
    autor: "Marc, 4t d'ESO",
  },
  {
    text: "Les sessions amb en Pau m'han ajudat a acabar el meu primer projecte de programació.",
    autor: "Júlia, 1r de Batxillerat",
  },
];

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

export default function HomePage() {
  return (
    <div className="bg-background text-foreground">
      {/* ---------- Nav ---------- */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 sm:px-14">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo />
          <span className="text-lg font-semibold">Sessions de Treball</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium text-muted-foreground sm:gap-7">
          <a href="#com-funciona" className="hidden hover:text-foreground sm:inline">
            Com funciona
          </a>
          <a href="#professors" className="hidden hover:text-foreground sm:inline">
            Professors
          </a>
          <a href="#preguntes" className="hidden hover:text-foreground sm:inline">
            Preguntes
          </a>
          <Button asChild className="rounded-full">
            <Link href="/reservar">Reserva ara</Link>
          </Button>
        </nav>
      </header>

      {/* ---------- Hero ---------- */}
      <section className="mx-auto grid max-w-6xl items-center gap-14 px-6 pb-20 pt-8 sm:px-14 lg:grid-cols-[1.05fr_1fr]">
        <div className="flex flex-col gap-6">
          <span className="self-start rounded-full bg-accent px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent-foreground">
            Mentoria 1-a-1
          </span>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-[3.4rem]">
            Reserva sessions de treball amb els teus professors
          </h1>
          <p className="max-w-[46ch] text-lg text-muted-foreground">
            Tria el professor o mentor, mira els seus buits disponibles i
            confirma la teva sessió en pocs clics. Sense correus, sense esperes.
          </p>
          <div className="mt-1 flex flex-wrap gap-3.5">
            <Button asChild size="lg" className="rounded-full px-7">
              <Link href="/reservar">Troba el teu professor</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-border px-7 hover:border-primary hover:text-primary"
            >
              <a href="#com-funciona">Com funciona</a>
            </Button>
          </div>
          <div className="mt-3 flex flex-wrap gap-x-7 gap-y-2 text-sm font-medium text-muted-foreground">
            <span>✓ 6 mentors interns</span>
            <span>✓ Confirmació immediata</span>
            <span>✓ Gratuït per a l&apos;alumnat</span>
          </div>
        </div>
        <div className="relative h-[440px] w-full">
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80&auto=format&fit=crop"
            alt="Sessió professor–alumne"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="rounded-3xl object-cover"
          />
        </div>
      </section>

      {/* ---------- Com funciona ---------- */}
      <section id="com-funciona" className="bg-secondary py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-14">
          <h2 className="mb-10 text-center text-3xl font-semibold sm:text-4xl">
            Com funciona
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {PASSOS.map((pas) => (
              <div
                key={pas.n}
                className="flex flex-col gap-3 rounded-2xl bg-background p-8"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  {pas.n}
                </div>
                <h3 className="text-lg font-bold">{pas.t}</h3>
                <p className="text-[0.97rem] leading-relaxed text-muted-foreground">
                  {pas.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Professors ---------- */}
      <section id="professors" className="mx-auto max-w-6xl px-6 py-20 sm:px-14">
        <div className="mb-9 flex items-baseline justify-between">
          <h2 className="text-3xl font-semibold sm:text-4xl">
            Els nostres professors i mentors
          </h2>
          <Link
            href="/reservar"
            className="hidden text-sm font-semibold text-primary hover:underline sm:inline"
          >
            Veure&apos;ls tots →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROFESSORS.map((p) => (
            <div
              key={p.nom}
              className="flex flex-col gap-3.5 rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg"
            >
              <Image
                src={p.foto}
                alt={p.nom}
                width={88}
                height={88}
                className="h-[88px] w-[88px] rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-bold">{p.nom}</h3>
                <p className="text-sm font-medium text-primary">{p.materia}</p>
              </div>
              <p className="text-[0.9rem] leading-relaxed text-muted-foreground">
                {p.blurb}
              </p>
              <span className="self-start rounded-full bg-success-foreground px-3 py-1.5 text-xs font-semibold text-success">
                {p.buit}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Calendari ---------- */}
      <section className="bg-[#2d2a26] py-20 text-[#faf7f2]">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 sm:px-14 lg:grid-cols-[1fr_1.3fr]">
          <div className="flex flex-col gap-5">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Els buits, sempre a la vista
            </h2>
            <p className="text-[1.05rem] leading-relaxed text-[#c9c2b8]">
              Cada professor publica la seva disponibilitat setmanal. Els buits
              lliures es reserven amb un sol clic i desapareixen per a la resta a
              l&apos;instant.
            </p>
            <Button asChild className="mt-1 self-start rounded-full">
              <Link href="/reservar">Obre el calendari</Link>
            </Button>
          </div>

          <div className="rounded-2xl bg-[#faf7f2] p-7 text-[#2d2a26]">
            <div className="mb-4 flex items-baseline justify-between">
              <span className="font-bold">Marta Vidal · Setmana del 6 de juliol</span>
              <span className="text-sm text-muted-foreground">‹ ›</span>
            </div>
            <div className="mb-2 grid grid-cols-5 gap-2.5 text-center text-[0.8rem] font-semibold text-muted-foreground">
              {CALENDARI.map((c) => (
                <span key={c.dia}>{c.dia}</span>
              ))}
            </div>
            <div className="grid grid-cols-5 gap-2.5">
              {CALENDARI.map((c) => (
                <div key={c.dia} className="flex flex-col gap-2">
                  {c.buits.map((b) =>
                    b.lliure ? (
                      <span
                        key={b.h}
                        className="cursor-pointer rounded-[10px] border border-[#cfe3d2] bg-success-foreground py-2 text-center text-[0.8rem] font-semibold text-success transition-colors hover:bg-success hover:text-success-foreground"
                      >
                        {b.h}
                      </span>
                    ) : (
                      <span
                        key={b.h}
                        className="rounded-[10px] bg-[#f0ebe3] py-2 text-center text-[0.8rem] font-semibold text-[#b3aa9d] line-through"
                      >
                        {b.h}
                      </span>
                    )
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-5 text-[0.8rem] font-medium text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-success" />
                Lliure
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#b3aa9d]" />
                Ocupat
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Testimonis ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-14">
        <h2 className="mb-10 text-center text-3xl font-semibold sm:text-4xl">
          Què en diu l&apos;alumnat
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {TESTIMONIS.map((t) => (
            <div
              key={t.autor}
              className="flex flex-col gap-4 rounded-2xl bg-secondary p-8"
            >
              <span className="font-serif text-2xl text-primary">“</span>
              <p className="leading-relaxed">{t.text}</p>
              <span className="text-sm font-semibold text-muted-foreground">
                {t.autor}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section id="preguntes" className="bg-secondary py-20">
        <div className="mx-auto max-w-3xl px-6 sm:px-14">
          <h2 className="mb-9 text-center text-3xl font-semibold sm:text-4xl">
            Preguntes freqüents
          </h2>
          <div className="flex flex-col gap-3.5">
            {FAQS.map((f) => (
              <div key={f.q} className="rounded-2xl bg-background p-6">
                <h3 className="mb-2 text-base font-bold">{f.q}</h3>
                <p className="text-[0.95rem] leading-relaxed text-muted-foreground">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
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
              <a href="#com-funciona" className="hover:text-[#faf7f2]">
                Com funciona
              </a>
              <a href="#professors" className="hover:text-[#faf7f2]">
                Professors
              </a>
              <a href="#preguntes" className="hover:text-[#faf7f2]">
                Preguntes
              </a>
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
