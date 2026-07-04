import type { Metadata } from "next";
import "./globals.css";

import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Reserva de Sesiones",
  description: "Sistema de reserva de sesiones de trabajo con profesores.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="antialiased">
      <body className="min-h-screen bg-muted/30">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
