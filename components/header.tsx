"use client";
import { useRouter } from "next/navigation";
import { Logo } from "./logo";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import toast from "react-hot-toast";

const Header = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = element.offsetTop;
      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-900/80 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="cursor-pointer" onClick={() => router.push("/")}>
            <Logo />
          </div>
          <div className="flex items-center space-x-4">
            {session?.user?.email && (
              <Link
                href="/dashboard"
                className="hidden sm:block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Dashboard
              </Link>
            )}
            <button
              onClick={() => scrollToSection("pricing")}
              className="hidden sm:block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              Pricing
            </button>
            {session?.user?.name ? (
              <Button
                variant={"destructive"}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                onClick={() => {
                  signOut({ callbackUrl: process.env.CALLBACK_URL_AFTER_SIGN_OUT });
                  toast.success("LogOut Successful");
                }}
              >
                Log Out
              </Button>
            ) : (
              <Link
                href="/sign-in"
                className="whitespace-nowrap border hover:scale-105 transition text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white py-1 px-4 text-sm font-medium rounded-md"
              >
                Sign in
              </Link>
            )}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="block sm:hidden rounded-full p-2 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 w-64 p-0">
                <div className="h-full flex flex-col">
                  {/* Header */}
                  <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <Logo />
                  </div>
                  {/* Menu Items */}
                  <div className="flex-1 overflow-y-auto">
                    <nav className="px-6 py-4 space-y-2">
                      {session?.user?.email && (
                        <Link
                          href="/dashboard"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg px-3 py-2 transition"
                        >
                          Dashboard
                        </Link>
                      )}
                      <button
                        onClick={() => scrollToSection("pricing")}
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg px-3 py-2 transition"
                      >
                        Pricing
                      </button>
                    </nav>
                  </div>
                  {/* Footer */}
                  <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      © {new Date().getFullYear()} {"   "}
                      <span className="text-md font-bold text-gray-900 dark:text-white">
                        Insta<span className="text-indigo-600">Transcribe</span>
                      </span>
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
