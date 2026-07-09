"use client";

import * as React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    try {
      const decision = window.localStorage.getItem(STORAGE_KEY);
      if (!decision) {
        setVisible(true);
      }
    } catch {
      // Si localStorage no està disponible, mostrem el banner igualment.
      setVisible(true);
    }
  }, []);

  const decidir = React.useCallback((valor: "accepted" | "rejected") => {
    try {
      window.localStorage.setItem(STORAGE_KEY, valor);
    } catch {
      // Ignorem errors d'emmagatzematge (mode privat, etc.).
    }
    setVisible(false);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 flex justify-center p-4",
        "pointer-events-none"
      )}
    >
      <Card
        role="dialog"
        aria-modal="false"
        aria-labelledby="cookie-banner-title"
        aria-describedby="cookie-banner-desc"
        className={cn(
          "pointer-events-auto flex w-full max-w-3xl flex-col gap-4 p-5",
          "shadow-lg sm:flex-row sm:items-center sm:justify-between"
        )}
      >
        <div className="space-y-1">
          <h2
            id="cookie-banner-title"
            className="font-semibold leading-none tracking-tight"
          >
            Consentiment de cookies
          </h2>
          <p
            id="cookie-banner-desc"
            className="text-sm text-muted-foreground"
          >
            Fem servir una cookie tècnica per mantenir la teva sessió. Pots
            acceptar-la o rebutjar-la. Consulta la{" "}
            <Link
              href="/politica-cookies"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              política de cookies
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => decidir("rejected")}
          >
            Rebutjo
          </Button>
          <Button size="sm" autoFocus onClick={() => decidir("accepted")}>
            Accepto
          </Button>
        </div>
      </Card>
    </div>
  );
}
