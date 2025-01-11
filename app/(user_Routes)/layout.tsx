"use client"
import  { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconHome,
  IconSettings,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Smartphone } from "lucide-react";
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


const UserRoutesLayout = ({
    children
}: {
    children: React.ReactNode
}) => {

    const links = [
        {
          label: "Home Page",
          href: "/",
          icon: (
            <IconHome className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
          ),
        },
        {
          label: "Dashboard",
          href: "/dashboard",
          icon: (
            <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
          ),
        },
        {
          label: "Settings",
          href: "#",
          icon: (
            <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
          ),
        },
        
    ];

    const [open,setOpen] = useState(false)
    const { data: session } = useSession()
    const router = useRouter()


    if(!session){
      toast.error("You need to Login first")
      return router.push("/")
    }
    
   

    return ( 
        <div
            className={cn(
                " flex flex-col md:flex-row w-full flex-1  border border-neutral-200 dark:border-neutral-700 overflow-hidden ",
                "h-screen" // for your use case, use `h-screen` instead of `h-[60vh]`
            )}
        >
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                        {open ? <Logo /> : <LogoIcon />}
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-4">
                       
                        <div 
                            onClick={() => {
                                signOut({ callbackUrl: "/" })
                                return router.push("/") 
                            }}
                            className="flex flex-row overflow-x-hidden"
                        >
                            <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"/>
                            <motion.div
                                className="overflow-x-hidden flex flex-row cursor-pointer"
                                whileHover={{ x: 10 }} // Move right by 10px on hover
                                transition={{
                                type: "spring", // Use a spring animation for bounce effect
                                stiffness: 300, // Adjust stiffness for bounce intensity
                                damping: 15,    // Control damping for a smoother effect
                                }}
                            >
                                <span className="pl-2 text-sm text-white">LogOut</span>
                            </motion.div>
                        </div>
                        <SidebarLink
                            link={{
                                label: `${session?.user?.name}`,
                                href: "#",
                                icon: (
                                    <img
                                        src={session?.user?.image || undefined}
                                        className="h-7 w-7 flex-shrink-0 rounded-full"
                                        width={50}
                                        height={50}
                                        alt="Avatar"
                                    />
                                ),
                            }}
                        />
                    </div>
                </SidebarBody>
            </Sidebar>
            {children}
        </div>
     );
}
 
export default UserRoutesLayout;

export const Logo = () => {
    return (
      <Link
        href="/"
        className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
      >
        <div className="relative">
            <Smartphone className="w-6 h-6 text-indigo-600" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
        </div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-medium text-black dark:text-white whitespace-pre"
        >
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            Insta<span className="text-indigo-600">Transcribe</span>
          </span>
        </motion.span>
      </Link>
    );
  };
  export const LogoIcon = () => {
    return (
      <Link
        href="#"
        className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
      >
        <div className="relative">
            <Smartphone className="w-6 h-6 text-indigo-600" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
        </div>
      </Link>
    );
  };