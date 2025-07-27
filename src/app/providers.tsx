'use client';

import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { TRPCProvider } from "./_trpc/Provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TRPCProvider>
      <SessionProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </SessionProvider>
    </TRPCProvider>
  );
} 