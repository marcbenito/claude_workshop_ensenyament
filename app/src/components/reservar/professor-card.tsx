"use client";

import { Check } from "lucide-react";

import type { Professor } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ProfessorCardProps {
  professor: Professor;
  selected: boolean;
  onSelect: (id: string) => void;
}

export function ProfessorCard({
  professor,
  selected,
  onSelect,
}: ProfessorCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(professor.id)}
      aria-pressed={selected}
      className={cn(
        "flex w-full items-center gap-4 rounded-xl border bg-card p-4 text-left transition-colors hover:bg-accent/50",
        selected && "border-primary ring-1 ring-primary"
      )}
    >
      <Avatar className="h-11 w-11">
        <AvatarFallback>{professor.initials}</AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate font-medium">{professor.name}</p>
          <Badge variant="success">Disponible</Badge>
        </div>
        <p className="truncate text-sm font-medium text-muted-foreground">
          {professor.subject}
        </p>
        <p className="mt-0.5 truncate text-xs text-muted-foreground">
          {professor.bio}
        </p>
      </div>

      <span
        className={cn(
          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors",
          selected
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border"
        )}
      >
        {selected && <Check className="h-4 w-4" />}
      </span>
    </button>
  );
}
