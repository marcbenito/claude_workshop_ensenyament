"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { es } from "date-fns/locale";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface CalendarProps {
  selected?: Date;
  onSelect?: (date: Date) => void;
  disabled?: (date: Date) => boolean;
  className?: string;
}

const WEEK_DAYS = ["lu", "ma", "mi", "ju", "vi", "sá", "do"];

export function Calendar({
  selected,
  onSelect,
  disabled,
  className,
}: CalendarProps) {
  const [month, setMonth] = React.useState<Date>(
    startOfMonth(selected ?? new Date())
  );

  const days = React.useMemo(() => {
    const start = startOfWeek(startOfMonth(month), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(month), { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  }, [month]);

  return (
    <div className={cn("w-full p-3", className)}>
      <div className="flex items-center justify-between pb-4">
        <button
          type="button"
          aria-label="Mes anterior"
          onClick={() => setMonth((m) => subMonths(m, 1))}
          className={cn(
            buttonVariants({ variant: "outline", size: "icon" }),
            "h-7 w-7"
          )}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="text-sm font-medium capitalize">
          {format(month, "LLLL yyyy", { locale: es })}
        </div>
        <button
          type="button"
          aria-label="Mes siguiente"
          onClick={() => setMonth((m) => addMonths(m, 1))}
          className={cn(
            buttonVariants({ variant: "outline", size: "icon" }),
            "h-7 w-7"
          )}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {WEEK_DAYS.map((d) => (
          <div
            key={d}
            className="text-center text-[0.7rem] font-medium uppercase text-muted-foreground"
          >
            {d}
          </div>
        ))}

        {days.map((day) => {
          const isDisabled = disabled?.(day) ?? false;
          const isSelected = selected ? isSameDay(day, selected) : false;
          const outside = !isSameMonth(day, month);

          return (
            <button
              type="button"
              key={day.toISOString()}
              disabled={isDisabled}
              onClick={() => onSelect?.(day)}
              className={cn(
                "flex h-9 w-full items-center justify-center rounded-md text-sm transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                outside && "text-muted-foreground/40",
                isSelected &&
                  "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                isDisabled &&
                  "pointer-events-none text-muted-foreground/30 line-through"
              )}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
}
