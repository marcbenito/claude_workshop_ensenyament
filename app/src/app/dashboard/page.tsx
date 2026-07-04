"use client";

import * as React from "react";
import Link from "next/link";
import { CalendarPlus, CalendarX2, Loader2 } from "lucide-react";

import { useSession } from "next-auth/react";
import type { Professor, Reservation } from "@/lib/types";
import {
  cancelReservation,
  listReservations,
} from "@/lib/services/reservations";
import { listProfessors } from "@/lib/services/professors";
import { SiteHeader } from "@/components/site-header";
import { ReservationCard } from "@/components/reservation-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function DashboardContent() {
  const { data: session } = useSession();
  const user = session?.user;
  const [reservations, setReservations] = React.useState<Reservation[]>([]);
  const [professors, setProfessors] = React.useState<Professor[]>([]);
  const [professorFilter, setProfessorFilter] = React.useState<string | null>(
    null
  );
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const refresh = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [reservationsList, professorsList] = await Promise.all([
        listReservations(),
        listProfessors(),
      ]);
      setReservations(reservationsList);
      setProfessors(professorsList);
    } catch {
      setError("No s'han pogut carregar les reserves.");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    refresh();
  }, [refresh]);

  async function handleCancel(id: string) {
    await cancelReservation(id);
    await refresh();
  }

  const professorsById = React.useMemo(
    () => new Map(professors.map((p) => [p.id, p])),
    [professors]
  );

  const professorsInList = React.useMemo(() => {
    const ids = Array.from(new Set(reservations.map((r) => r.professorId)));
    return ids
      .map((id) => professorsById.get(id))
      .filter((p): p is Professor => Boolean(p));
  }, [reservations, professorsById]);

  React.useEffect(() => {
    if (
      professorFilter &&
      !professorsInList.some((p) => p.id === professorFilter)
    ) {
      setProfessorFilter(null);
    }
  }, [professorFilter, professorsInList]);

  const filteredReservations = professorFilter
    ? reservations.filter((r) => r.professorId === professorFilter)
    : reservations;

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Les meves reserves
            </h1>
            <p className="text-sm text-muted-foreground">
              Hola, {user?.name}. Aquestes són les teves sessions reservades.
            </p>
          </div>
          <Button asChild>
            <Link href="/reservar">
              <CalendarPlus className="h-4 w-4" />
              <span className="hidden sm:inline">Nova reserva</span>
            </Link>
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center gap-2 py-16 text-center">
              <p className="text-sm font-medium text-destructive">{error}</p>
            </CardContent>
          </Card>
        ) : reservations.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center gap-4 py-16 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <CalendarX2 className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">Encara no tens reserves</p>
                <p className="text-sm text-muted-foreground">
                  Crea la teva primera sessió amb un professor.
                </p>
              </div>
              <Button asChild>
                <Link href="/reservar">
                  <CalendarPlus className="h-4 w-4" />
                  Crear reserva
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {professorsInList.length > 1 && (
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Filtra per professor:
                </span>
                <Button
                  variant={professorFilter === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setProfessorFilter(null)}
                >
                  Tots
                </Button>
                {professorsInList.map((professor) => (
                  <Button
                    key={professor.id}
                    variant={
                      professorFilter === professor.id ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setProfessorFilter(professor.id)}
                  >
                    {professor.name}
                  </Button>
                ))}
              </div>
            )}

            {filteredReservations.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                  <p className="text-sm text-muted-foreground">
                    No hi ha reserves per a aquest professor.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {filteredReservations.map((r) => (
                  <ReservationCard
                    key={r.id}
                    reservation={r}
                    professor={professorsById.get(r.professorId)}
                    onCancel={handleCancel}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default function DashboardPage() {
  return <DashboardContent />;
}
