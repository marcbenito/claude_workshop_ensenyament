"use client";

import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarDays, Clock, Trash2 } from "lucide-react";

import type { Reservation } from "@/lib/types";
import { getProfessorById } from "@/lib/data/professors";
import { capitalizeFirst } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ReservationCardProps {
  reservation: Reservation;
  onCancel: (id: string) => void;
}

export function ReservationCard({
  reservation,
  onCancel,
}: ReservationCardProps) {
  const professor = getProfessorById(reservation.professorId);
  const dateLabel = capitalizeFirst(
    format(parseISO(reservation.date), "EEEE d 'de' MMMM", { locale: es })
  );

  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-4">
        <Avatar className="h-11 w-11">
          <AvatarFallback>{professor?.initials ?? "?"}</AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate font-medium">
              {professor?.name ?? "Profesor"}
            </p>
            <Badge variant="success">Confirmada</Badge>
          </div>
          <p className="truncate text-sm text-muted-foreground">
            {professor?.subject}
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" />
              {dateLabel}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {reservation.time}
            </span>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          aria-label="Cancelar reserva"
          onClick={() => onCancel(reservation.id)}
          className="text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
