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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://reserva-sessions.example.com";

const siteTitle = "Reserva de Sessions de Treball";
const siteDescription =
  "Reserva sessions 1-a-1 amb els professors i mentors interns del centre.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s · ${siteTitle}`,
  },
  description: siteDescription,
  applicationName: siteTitle,
  keywords: [
    "reserva de sessions",
    "professors",
    "mentors",
    "tutories",
    "sessions 1-a-1",
    "centre educatiu",
  ],
  authors: [{ name: siteTitle }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ca_ES",
    url: siteUrl,
    siteName: siteTitle,
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
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
