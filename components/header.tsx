"use client"
import { useRouter } from "next/navigation";
import { Logo } from "./logo";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";

const Header = () => {

    const router = useRouter()

    return ( 
        <header className=" fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4 ">
                    <div className="cursor-pointer" onClick={() =>router.push("/")} > <Logo/> </div>
                    <div className="flex items-center space-x-4">
                        <ModeToggle />
                        <Link href="#pricing" className="hidden  sm:block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                            Pricing
                        </Link>
                        <Link href="/signIn" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </header>
     );
}
 
export default Header;