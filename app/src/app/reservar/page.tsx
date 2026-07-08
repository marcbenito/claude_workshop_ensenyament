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
import { ca } from "date-fns/locale";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Clock,
  Loader2,
  User,
} from "lucide-react";

import type { Professor, TimeSlot } from "@/lib/types";
import { createReservation } from "@/lib/services/reservations";
import { listProfessorsWithAvailability } from "@/lib/services/professors";
import { listAvailableTimeSlots } from "@/lib/services/timeslots";
import { capitalizeFirst, cn } from "@/lib/utils";
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

const STEPS = ["Dia", "Professor", "Hora"];

function isSlotPast(date: Date, time: string): boolean {
  if (!isToday(date)) return false;
  const slot = parse(time, "HH:mm", date);
  return isBefore(slot, new Date());
}

function ReservarContent() {
  const router = useRouter();

  const [step, setStep] = React.useState(0);
  const [date, setDate] = React.useState<Date | undefined>();
  const [time, setTime] = React.useState<string | undefined>();
  const [professorId, setProfessorId] = React.useState<string | undefined>();
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [professors, setProfessors] = React.useState<Professor[]>([]);
  const [loadingProfessors, setLoadingProfessors] = React.useState(false);

  const [timeSlots, setTimeSlots] = React.useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = React.useState(false);

  function handleSelectDate(d: Date) {
    setDate(d);
    setProfessorId(undefined);
    setTime(undefined);
    setStep(1);
    setLoadingProfessors(true);
    listProfessorsWithAvailability(format(d, "yyyy-MM-dd"))
      .then(setProfessors)
      .finally(() => setLoadingProfessors(false));
  }

  function handleSelectProfessor(id: string) {
    if (!date) return;
    setProfessorId(id);
    setTime(undefined);
    setStep(2);
    setLoadingSlots(true);
    listAvailableTimeSlots(format(date, "yyyy-MM-dd"), id)
      .then(setTimeSlots)
      .finally(() => setLoadingSlots(false));
  }

  function handleSelectTime(t: string) {
    setTime(t);
  }

  async function handleConfirm() {
    if (!date || !time || !professorId) return;
    setSubmitting(true);
    setError(null);

    const result = await createReservation({
      professorId,
      date: format(date, "yyyy-MM-dd"),
      time,
    });

    if (result.ok) {
      router.replace("/dashboard?created=1");
    } else {
      setError(result.error);
      setSubmitting(false);
    }
  }

  const dateLabel = date
    ? capitalizeFirst(format(date, "EEEE d 'de' MMMM", { locale: ca }))
    : null;

  const professorLabel = professorId
    ? professors.find((p) => p.id === professorId)?.name ?? null
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
            Tornar
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Nova reserva</h1>
          <p className="text-sm text-muted-foreground">
            Tria el dia, l&apos;hora i el professor per a la teva sessió.
          </p>
        </div>

        <div className="mb-6">
          <Stepper steps={STEPS} current={step} />
        </div>

        {/* Resumen de selección */}
        {(dateLabel || professorLabel || time) && (
          <div className="mb-4 flex flex-wrap gap-2 text-sm">
            {dateLabel && (
              <span className="flex items-center gap-1.5 rounded-md bg-secondary px-2.5 py-1 font-medium">
                <CalendarDays className="h-3.5 w-3.5" />
                {dateLabel}
              </span>
            )}
            {professorLabel && (
              <span className="flex items-center gap-1.5 rounded-md bg-secondary px-2.5 py-1 font-medium">
                <User className="h-3.5 w-3.5" />
                {professorLabel}
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
              <CardTitle className="text-lg">Selecciona el dia</CardTitle>
              <CardDescription>
                Tria una data disponible per a la teva sessió.
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

        {/* Paso 2: Profesor */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Selecciona el professor</CardTitle>
              <CardDescription>
                Professors amb disponibilitat el {dateLabel}.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {loadingProfessors ? (
                <div className="flex items-center justify-center py-6">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              ) : professors.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Cap professor disponible aquest dia.
                </p>
              ) : (
                <div className="space-y-2">
                  {professors.map((professor) => (
                    <ProfessorCard
                      key={professor.id}
                      professor={professor}
                      selected={professorId === professor.id}
                      onSelect={handleSelectProfessor}
                    />
                  ))}
                </div>
              )}

              <Button
                variant="outline"
                onClick={() => setStep(0)}
                className="w-full sm:w-auto"
              >
                <ArrowLeft className="h-4 w-4" />
                Canviar dia
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Paso 3: Hora */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Selecciona l&apos;hora</CardTitle>
              <CardDescription>
                Franges lliures amb {professorLabel} el {dateLabel}.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {loadingSlots ? (
                <div className="flex items-center justify-center py-6">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              ) : timeSlots.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No queda cap franja lliure amb aquest professor.
                </p>
              ) : (
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {timeSlots.map((slot) => {
                    const past = date ? isSlotPast(date, slot.time) : false;
                    const selected = time === slot.time;
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        disabled={past}
                        onClick={() => handleSelectTime(slot.time)}
                        className={cn(
                          "flex h-10 items-center justify-center rounded-md border text-sm font-medium transition-colors",
                          "hover:bg-accent hover:text-accent-foreground",
                          selected &&
                            "border-primary bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                          past &&
                            "pointer-events-none text-muted-foreground/40 line-through"
                        )}
                      >
                        {slot.time}
                      </button>
                    );
                  })}
                </div>
              )}

              {error && (
                <p className="text-sm font-medium text-destructive">{error}</p>
              )}

              <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  <ArrowLeft className="h-4 w-4" />
                  Canviar professor
                </Button>
                <Button
                  onClick={handleConfirm}
                  disabled={!time || submitting}
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
  return <ReservarContent />;
}
