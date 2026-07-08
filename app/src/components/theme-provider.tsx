"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/** Proveïdor de tema (clar/fosc) basat en `next-themes` amb estratègia per classe. */
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
