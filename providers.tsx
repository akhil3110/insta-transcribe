"use client"
import { ThemeProvider } from "@/components/theme-provider"
import { SessionProvider } from "next-auth/react"
import { Toaster } from "react-hot-toast";
import {RecoilRoot} from "recoil"

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
    <Toaster />
        <RecoilRoot>
          {children}
        </RecoilRoot>
    </ThemeProvider>
    </SessionProvider>
  );
}
