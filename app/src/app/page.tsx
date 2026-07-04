import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-2xl font-semibold">Reserva de tutorías</h1>
      <Button asChild>
        <Link href="/login">Iniciar sesión</Link>
      </Button>
    </main>
  );
}
