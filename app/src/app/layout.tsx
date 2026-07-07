import type { Metadata } from "next";
import { Karla, Source_Serif_4 } from "next/font/google";
import "./globals.css";

import { SessionProvider } from "next-auth/react";

import { ThemeProvider } from "@/components/theme-provider";

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

export const metadata: Metadata = {
  title: "Reserva de Sessions de Treball",
  description:
    "Reserva sessions 1-a-1 amb els professors i mentors interns del centre.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ca"
      suppressHydrationWarning
      className={`${karla.variable} ${sourceSerif.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>{children}</SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
