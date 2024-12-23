"use client"
import { ThemeProvider } from "@/components/theme-provider"
import { SessionProvider } from "next-auth/react"

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
    <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
    > 
        {children}
    </ThemeProvider>
    </SessionProvider>
  );
}
