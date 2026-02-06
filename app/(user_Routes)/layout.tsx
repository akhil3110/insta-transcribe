"use client";

import { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconHome,
  IconSettings,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { UserLogo, LogoIcon } from "@/components/userLogo";

const UserRoutesLayout = ({ children }: { children: React.ReactNode }) => {
  const links = [
    {
      label: "Home Page",
      href: "/",
      icon: <IconHome className="h-5 w-5" />,
    },
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <IconBrandTabler className="h-5 w-5" />,
    },
    {
      label: "Settings",
      href: "#",
      icon: <IconSettings className="h-5 w-5" />,
    },
  ];

  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      toast.error("You need to Login first");
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="h-screen w-full flex justify-center items-center text-3xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full">
      {/* SIDEBAR */}
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between">
          {/* TOP */}
          <div className="flex flex-col flex-1 overflow-y-auto">
            {open ? <UserLogo /> : <LogoIcon />}

            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>

          {/* BOTTOM */}
          <div className="flex flex-col gap-y-4">
            {/* LOGOUT */}
            <button
              onClick={() => {
                signOut({ callbackUrl: "/" });
                router.push("/");
              }}
              className="flex items-center gap-2 text-white hover:text-red-400 transition"
            >
              <IconArrowLeft className="h-5 w-5 flex-shrink-0" />

              {/* TEXT ONLY WHEN OPEN */}
              {open && (
                <motion.span
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-sm whitespace-nowrap"
                >
                  Logout
                </motion.span>
              )}
            </button>

            {/* USER */}
            <SidebarLink
              link={{
                label: open ? session?.user?.name ?? "User" : "",
                href: "#",
                icon: (
                  <img
                    src={session?.user?.image || undefined}
                    className="h-7 w-7 rounded-full"
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default UserRoutesLayout;
