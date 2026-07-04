"use client";

import * as React from "react";
import Link from "next/link";
import { CalendarPlus, CalendarX2 } from "lucide-react";

import { useAuth } from "@/lib/auth-context";
import type { Reservation } from "@/lib/types";
import {
  cancelReservation,
  listReservations,
} from "@/lib/services/reservations";
import { ProtectedRoute } from "@/components/protected-route";
import { SiteHeader } from "@/components/site-header";
import { ReservationCard } from "@/components/reservation-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function DashboardContent() {
  const { user } = useAuth();
  const [reservations, setReservations] = React.useState<Reservation[]>([]);

  const refresh = React.useCallback(() => {
    if (user) setReservations(listReservations(user.id));
  }, [user]);

  React.useEffect(() => {
    refresh();
  }, [refresh]);

  function handleCancel(id: string) {
    if (!user) return;
    cancelReservation(user.id, id);
    refresh();
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Mis reservas</h1>
            <p className="text-sm text-muted-foreground">
              Hola, {user?.name}. Estas son tus sesiones reservadas.
            </p>
          </div>
          <Button asChild>
            <Link href="/reservar">
              <CalendarPlus className="h-4 w-4" />
              <span className="hidden sm:inline">Nueva reserva</span>
            </Link>
          </Button>
        </div>

        {reservations.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center gap-4 py-16 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <CalendarX2 className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">Todavía no tienes reservas</p>
                <p className="text-sm text-muted-foreground">
                  Crea tu primera sesión con un profesor.
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
          <div className="space-y-3">
            {reservations.map((r) => (
              <ReservationCard
                key={r.id}
                reservation={r}
                onCancel={handleCancel}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
