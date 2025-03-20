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
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { UserLogo, LogoIcon } from "@/components/userLogo";

const UserRoutesLayout = ({ children }: { children: React.ReactNode }) => {
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

  const [open, setOpen] = useState(false);
  const router = useRouter();

  const { data: session, status } = useSession();

  // Redirect if the user is not logged in
  useEffect(() => {
    if (status === "unauthenticated") {
      toast.error("You need to Login first");
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="h-full w-full bg-gray-900 flex justify-center items-center text-3xl font-extrabold">
        Loading {""}
        {[0, 1, 2].map((i) => (
            <motion.span
                key={i}
                className="text-5xl font-semibold"
                variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 },
                }}
                initial="hidden"
                animate="visible"
                transition={{
                    delay: i * 0.3,
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 1.5,
                  }}
            >
                .
            </motion.span>))}
    </div>;
  }

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row w-full flex-1 border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <UserLogo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-y-4">
            <div
              onClick={() => {
                signOut({ callbackUrl: "/" });
                router.push("/");
              }}
              className="flex flex-row overflow-x-hidden"
            >
              <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
              <motion.div
                className="overflow-x-hidden flex flex-row cursor-pointer"
                whileHover={{ x: 10 }} // Move right by 10px on hover
                transition={{
                  type: "spring", // Use a spring animation for bounce effect
                  stiffness: 300, // Adjust stiffness for bounce intensity
                  damping: 15, // Control damping for a smoother effect
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
};

export default UserRoutesLayout;
