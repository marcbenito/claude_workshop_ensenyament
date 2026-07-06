import type { Metadata } from "next";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Política de privacitat | Sessions de Treball",
  description:
    "Informació sobre el tractament de dades personals a l'aplicació de Reserva de Sessions de Treball.",
};

const RESPONSABLE = {
  nom: "Marc Benito Pujante",
  dni: "X444332211",
  email: "marc@marcbenito.com",
};

function Seccio({
  titol,
  children,
  className,
}: {
  titol: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("flex flex-col gap-2.5", className)}>
      <h2 className="text-xl font-semibold tracking-tight">{titol}</h2>
      <div className="flex flex-col gap-2.5 text-[0.97rem] leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

export default function PoliticaPrivacitatPage() {
  return (
    <div className="bg-background text-foreground">
      <header className="mx-auto flex max-w-3xl items-center justify-between px-6 py-6">
        <Link href="/" className="text-sm font-semibold text-primary hover:underline">
          ← Torna a l&apos;inici
        </Link>
      </header>

      <main className="mx-auto max-w-3xl px-6 pb-20">
        <h1 className="mb-3 text-4xl font-semibold tracking-tight">
          Política de privacitat
        </h1>
        <p className="mb-10 text-lg text-muted-foreground">
          A continuació t&apos;expliquem qui és responsable de les teves dades
          personals, amb quina finalitat les tractem i quins drets tens sobre
          elles.
        </p>

        <Card className="mb-10">
          <CardHeader>
            <CardTitle>Responsable del tractament</CardTitle>
            <CardDescription>
              Persona responsable de les dades recollides a través d&apos;aquesta
              aplicació.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <dl className="grid gap-3 sm:grid-cols-[8rem_1fr]">
              <dt className="font-medium text-foreground">Nom</dt>
              <dd className="text-muted-foreground">{RESPONSABLE.nom}</dd>
              <dt className="font-medium text-foreground">DNI/NIE</dt>
              <dd className="text-muted-foreground">{RESPONSABLE.dni}</dd>
              <dt className="font-medium text-foreground">Contacte</dt>
              <dd className="text-muted-foreground">
                <a
                  href={`mailto:${RESPONSABLE.email}`}
                  className="text-primary hover:underline"
                >
                  {RESPONSABLE.email}
                </a>
              </dd>
            </dl>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-9">
          <Seccio titol="Quines dades tractem">
            <p>
              Recollim únicament les dades necessàries per gestionar el teu
              compte i les teves reserves de sessions de treball: el teu nom, el
              teu correu electrònic, les credencials d&apos;accés i la informació
              de les sessions que reserves (professor, data i franja horària).
            </p>
          </Seccio>

          <Seccio titol="Amb quina finalitat">
            <p>
              Tractem les teves dades per permetre&apos;t registrar-te, iniciar
              sessió i reservar, consultar o cancel·lar sessions de treball 1-a-1
              amb els professors i mentors del centre, així com per enviar-te els
              recordatoris i confirmacions associats.
            </p>
          </Seccio>

          <Seccio titol="Base legal">
            <p>
              La base legal del tractament és l&apos;execució de la relació que
              s&apos;estableix quan et registres i utilitzes el servei, i el teu
              consentiment, que pots retirar en qualsevol moment.
            </p>
          </Seccio>

          <Seccio titol="Conservació de les dades">
            <p>
              Conservem les teves dades mentre mantinguis el compte actiu i,
              posteriorment, durant el temps necessari per complir les
              obligacions legals aplicables. Un cop deixin de ser necessàries,
              les eliminarem de manera segura.
            </p>
          </Seccio>

          <Seccio titol="Els teus drets">
            <p>
              Pots exercir els drets d&apos;accés, rectificació, supressió,
              oposició, limitació del tractament i portabilitat de les teves
              dades. També tens dret a presentar una reclamació davant
              l&apos;autoritat de control competent.
            </p>
            <p>
              Per exercir qualsevol d&apos;aquests drets, escriu-nos a{" "}
              <a
                href={`mailto:${RESPONSABLE.email}`}
                className="text-primary hover:underline"
              >
                {RESPONSABLE.email}
              </a>
              .
            </p>
          </Seccio>
        </div>
      </main>
    </div>
  );
}
