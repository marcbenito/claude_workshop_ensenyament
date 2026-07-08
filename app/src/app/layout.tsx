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

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://reserva-sessions.app";
const SITE_NAME = "Reserva de Sessions de Treball";
const SITE_DESCRIPTION =
  "Reserva sessions 1-a-1 amb els professors i mentors interns del centre.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ca_ES",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
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
