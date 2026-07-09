import type { Metadata } from "next";
import { Karla, Source_Serif_4 } from "next/font/google";
import "./globals.css";

import { SessionProvider } from "next-auth/react";

const karla = Karla({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-serif",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Reserva de Sessions de Treball",
  description:
    "Reserva sessions 1-a-1 amb els professors i mentors interns del centre.",
  openGraph: {
    type: "website",
    locale: "ca_ES",
    url: siteUrl,
    siteName: "Reserva de Sessions de Treball",
    title: "Reserva de Sessions de Treball",
    description:
      "Reserva sessions 1-a-1 amb els professors i mentors interns del centre.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reserva de Sessions de Treball",
    description:
      "Reserva sessions 1-a-1 amb els professors i mentors interns del centre.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ca"
      className={`${karla.variable} ${sourceSerif.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
