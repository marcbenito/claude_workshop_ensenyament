"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // El tema real només es coneix al client. Fins que no muntem, renderitzem
  // un placeholder estable idèntic al del servidor per evitar el desajust
  // d'hidratació (aria-label/icona/onClick depenen del tema resolt).
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Canvia el tema"
        className={cn("rounded-full", className)}
      >
        <Sun className="h-4 w-4" />
      </Button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={isDark ? "Activa el mode clar" : "Activa el mode fosc"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn("rounded-full", className)}
    >
      {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </Button>
  );
}
