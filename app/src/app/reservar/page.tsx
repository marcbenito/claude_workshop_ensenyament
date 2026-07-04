"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  format,
  isBefore,
  isToday,
  parse,
  startOfDay,
} from "date-fns";
import { es } from "date-fns/locale";
import { ArrowLeft, CalendarDays, Check, Clock, Loader2 } from "lucide-react";

import { useAuth } from "@/lib/auth-context";
import { PROFESSORS } from "@/lib/data/professors";
import { TIME_SLOTS } from "@/lib/data/slots";
import { createReservation } from "@/lib/services/reservations";
import { capitalizeFirst, cn } from "@/lib/utils";
import { ProtectedRoute } from "@/components/protected-route";
import { SiteHeader } from "@/components/site-header";
import { Stepper } from "@/components/reservar/stepper";
import { ProfessorCard } from "@/components/reservar/professor-card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const STEPS = ["Día", "Hora", "Profesor"];

function isSlotPast(date: Date, time: string): boolean {
  if (!isToday(date)) return false;
  const slot = parse(time, "HH:mm", date);
  return isBefore(slot, new Date());
}

function ReservarContent() {
  const { user } = useAuth();
  const router = useRouter();

  const [step, setStep] = React.useState(0);
  const [date, setDate] = React.useState<Date | undefined>();
  const [time, setTime] = React.useState<string | undefined>();
  const [professorId, setProfessorId] = React.useState<string | undefined>();
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  function handleSelectDate(d: Date) {
    setDate(d);
    setTime(undefined);
    setStep(1);
  }

  function handleSelectTime(t: string) {
    setTime(t);
    setStep(2);
  }

  function handleConfirm() {
    if (!user || !date || !time || !professorId) return;
    setSubmitting(true);
    setError(null);

    const result = createReservation({
      userId: user.id,
      professorId,
      date: format(date, "yyyy-MM-dd"),
      time,
    });

    if (result.ok) {
      router.replace("/dashboard");
    } else {
      setError(result.error);
      setSubmitting(false);
    }
  }

  const dateLabel = date
    ? capitalizeFirst(format(date, "EEEE d 'de' MMMM", { locale: es }))
    : null;

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main className="mx-auto max-w-2xl px-4 py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            className="-ml-2 mb-2 text-muted-foreground"
            onClick={() => router.push("/dashboard")}
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Nueva reserva</h1>
          <p className="text-sm text-muted-foreground">
            Elige el día, la hora y el profesor para tu sesión.
          </p>
        </div>

        <div className="mb-6">
          <Stepper steps={STEPS} current={step} />
        </div>

        {/* Resumen de selección */}
        {(dateLabel || time) && (
          <div className="mb-4 flex flex-wrap gap-2 text-sm">
            {dateLabel && (
              <span className="flex items-center gap-1.5 rounded-md bg-secondary px-2.5 py-1 font-medium">
                <CalendarDays className="h-3.5 w-3.5" />
                {dateLabel}
              </span>
            )}
            {time && (
              <span className="flex items-center gap-1.5 rounded-md bg-secondary px-2.5 py-1 font-medium">
                <Clock className="h-3.5 w-3.5" />
                {time}
              </span>
            )}
          </div>
        )}

        {/* Paso 1: Día */}
        {step === 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Selecciona el día</CardTitle>
              <CardDescription>
                Elige una fecha disponible para tu sesión.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                selected={date}
                onSelect={handleSelectDate}
                disabled={(d) => isBefore(startOfDay(d), startOfDay(new Date()))}
              />
            </CardContent>
          </Card>
        )}

        {/* Paso 2: Hora */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Selecciona la hora</CardTitle>
              <CardDescription>
                Franjas disponibles para el día elegido.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {TIME_SLOTS.map((slot) => {
                  const past = date ? isSlotPast(date, slot) : false;
                  const selected = time === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={past}
                      onClick={() => handleSelectTime(slot)}
                      className={cn(
                        "flex h-10 items-center justify-center rounded-md border text-sm font-medium transition-colors",
                        "hover:bg-accent hover:text-accent-foreground",
                        selected &&
                          "border-primary bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                        past &&
                          "pointer-events-none text-muted-foreground/40 line-through"
                      )}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
              <Button
                variant="outline"
                onClick={() => setStep(0)}
                className="w-full sm:w-auto"
              >
                <ArrowLeft className="h-4 w-4" />
                Cambiar día
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Paso 3: Profesor */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Profesores disponibles
              </CardTitle>
              <CardDescription>
                Todos disponibles el {dateLabel} a las {time}.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                {PROFESSORS.map((professor) => (
                  <ProfessorCard
                    key={professor.id}
                    professor={professor}
                    selected={professorId === professor.id}
                    onSelect={setProfessorId}
                  />
                ))}
              </div>

              {error && (
                <p className="text-sm font-medium text-destructive">{error}</p>
              )}

              <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  <ArrowLeft className="h-4 w-4" />
                  Cambiar hora
                </Button>
                <Button
                  onClick={handleConfirm}
                  disabled={!professorId || submitting}
                >
                  {submitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Check className="h-4 w-4" />
                  )}
                  Confirmar reserva
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}

export default function ReservarPage() {
  return (
    <ProtectedRoute>
      <ReservarContent />
    </ProtectedRoute>
  );
}
