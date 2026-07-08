"use client";

import * as React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

/** Clau de `localStorage` on es desa la decisió de l'usuari. */
export const COOKIE_CONSENT_KEY = "cookie-consent";

type Consent = "accepted" | "rejected";

/**
 * Banner de consentiment de cookies (RGPD).
 *
 * Apareix només a la primera visita (mentre no hi hagi cap decisió desada a
 * `localStorage`). En triar "Accepto" o "Rebutjo" es desa la decisió i el banner
 * no torna a aparèixer.
 */
export function CookieBanner() {
  // `null` = encara no sabem (SSR / abans de llegir localStorage).
  const [visible, setVisible] = React.useState(false);
  const acceptRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem(COOKIE_CONSENT_KEY);
      if (stored !== "accepted" && stored !== "rejected") {
        setVisible(true);
      }
    } catch {
      // Si localStorage no és accessible, no mostrem res per no molestar.
    }
  }, []);

  // Porta el focus al banner quan apareix (accessibilitat).
  React.useEffect(() => {
    if (visible) acceptRef.current?.focus();
  }, [visible]);

  function decide(consent: Consent) {
    try {
      window.localStorage.setItem(COOKIE_CONSENT_KEY, consent);
    } catch {
      // Ignora errors d'escriptura (mode privat, etc.).
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Consentiment de cookies"
      className="fixed inset-x-0 bottom-0 z-50 p-4"
    >
      <Card className="mx-auto max-w-3xl border-border shadow-lg">
        <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Fem servir una cookie tècnica necessària per mantenir la teva sessió
            iniciada. Consulta la{" "}
            <Link
              href="/politica-privacitat"
              className="font-medium text-primary underline underline-offset-2"
            >
              política de cookies
            </Link>
            .
          </p>
          <div className="flex shrink-0 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => decide("rejected")}
            >
              Rebutjo
            </Button>
            <Button ref={acceptRef} size="sm" onClick={() => decide("accepted")}>
              Accepto
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
