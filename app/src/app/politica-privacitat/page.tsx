import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Política de privacitat — Reserva de Sessions de Treball",
};

const SECCIONS = [
  {
    t: "1. Responsable del tractament",
    cos: (
      <ul className="list-inside list-disc space-y-1">
        <li>
          <span className="font-semibold">Nom:</span> Marc Benito Pujante
        </li>
        <li>
          <span className="font-semibold">DNI:</span> X444332211
        </li>
        <li>
          <span className="font-semibold">Email de contacte:</span>{" "}
          <a href="mailto:marc@marcbenito.com" className="text-primary hover:underline">
            marc@marcbenito.com
          </a>
        </li>
      </ul>
    ),
  },
  {
    t: "2. Dades que recollim",
    cos: (
      <p>
        Per gestionar les reserves de sessions de treball tractem el nom,
        l&apos;adreça de correu electrònic, i l&apos;historial de reserves
        (professor, data i franja horària) de l&apos;alumnat que utilitza
        l&apos;aplicació.
      </p>
    ),
  },
  {
    t: "3. Finalitat del tractament",
    cos: (
      <p>
        Les dades es fan servir exclusivament per gestionar el registre
        d&apos;usuaris, la creació i el seguiment de reserves de sessions amb
        els professors i mentors del centre, i per enviar-te confirmacions o
        recordatoris relacionats amb les teves sessions.
      </p>
    ),
  },
  {
    t: "4. Conservació de les dades",
    cos: (
      <p>
        Conservem les teves dades mentre mantinguis un compte actiu a
        l&apos;aplicació. Pots sol·licitar-ne la supressió en qualsevol moment
        contactant amb el responsable indicat més amunt.
      </p>
    ),
  },
  {
    t: "5. Drets de les persones interessades",
    cos: (
      <p>
        Pots exercir els teus drets d&apos;accés, rectificació, supressió,
        oposició, limitació i portabilitat de les dades enviant un correu a{" "}
        <a href="mailto:marc@marcbenito.com" className="text-primary hover:underline">
          marc@marcbenito.com
        </a>
        .
      </p>
    ),
  },
  {
    t: "6. Cessió a tercers",
    cos: (
      <p>
        Les teves dades no se cedeixen a tercers, excepte quan hi hagi una
        obligació legal que ho requereixi.
      </p>
    ),
  },
];

export default function PoliticaPrivacitatPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:px-14">
      <Link href="/" className="text-sm font-semibold text-primary hover:underline">
        ← Torna a l&apos;inici
      </Link>

      <h1 className="mb-2 mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
        Política de privacitat
      </h1>
      <p className="mb-10 text-muted-foreground">
        Aquesta política explica com tractem les teves dades personals a
        l&apos;aplicació de Reserva de Sessions de Treball.
      </p>

      <div className="flex flex-col gap-5">
        {SECCIONS.map((s) => (
          <Card key={s.t}>
            <CardHeader>
              <CardTitle className="text-lg">{s.t}</CardTitle>
            </CardHeader>
            <CardContent className="text-[0.95rem] leading-relaxed text-muted-foreground">
              {s.cos}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
