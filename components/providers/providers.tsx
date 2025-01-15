"use client"
import { ThemeProvider } from "@/components/theme-provider"
import { SessionProvider } from "next-auth/react"
import { Toaster } from "react-hot-toast";
import {RecoilRoot} from "recoil"
import useLoadingStore from "../../store/loading-store";
import Loading from "../loading";
import ModalProvider from "./ModalProvider";


export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const {loading} = useLoadingStore()

  return (
    <SessionProvider>
    <ModalProvider />
    <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
    >
    <Toaster />
        <RecoilRoot>
        {loading.isLoading && <Loading />}
          {children}
        </RecoilRoot>
    </ThemeProvider>
    </SessionProvider>
  );
}
