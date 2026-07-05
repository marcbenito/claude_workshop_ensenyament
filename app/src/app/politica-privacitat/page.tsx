import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Política de privacitat",
  description: "Política de privacitat de Reserva de Sessions de Treball.",
};

export default function PoliticaPrivacitatPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">
        Política de privacitat
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Última actualització: 5 de juliol de 2026
      </p>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>1. Responsable del tractament</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 text-sm text-muted-foreground">
          <p>Nom: Marc Benito Pujante</p>
          <p>DNI: X444332211</p>
          <p>Email de contacte: marc@marcbenito.com</p>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>2. Dades que recollim</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <p>
            En utilitzar l&apos;aplicació de Reserva de Sessions de Treball
            recollim les dades necessàries per gestionar el teu compte i les
            teves reserves: nom, adreça electrònica, i la informació relativa
            a les sessions reservades amb els professors (professor, data i
            franja horària).
          </p>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>3. Finalitat del tractament</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <p>
            Les dades es fan servir exclusivament per gestionar el registre
            d&apos;usuaris, permetre la reserva de sessions de treball amb
            professors interns i mostrar-te l&apos;historial de les teves
            reserves des del teu tauler.
          </p>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>4. Conservació de les dades</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <p>
            Conservem les teves dades mentre mantinguis un compte actiu a
            l&apos;aplicació. Pots sol·licitar la supressió de les teves dades
            en qualsevol moment contactant amb el responsable indicat més
            amunt.
          </p>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>5. Els teus drets</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <p>
            Pots exercir els teus drets d&apos;accés, rectificació, supressió,
            oposició, limitació i portabilitat de les teves dades enviant un
            correu a{" "}
            <a
              href="mailto:marc@marcbenito.com"
              className="font-medium text-foreground underline underline-offset-4"
            >
              marc@marcbenito.com
            </a>
            .
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
