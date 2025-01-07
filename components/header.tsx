"use client"
import { useRouter } from "next/navigation";
import { Logo } from "./logo";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react"
import { Button } from "./ui/button";
import toast from "react-hot-toast";

const Header = () => {

    const router = useRouter()
    const { data: session } = useSession()


    return ( 
        <header className=" fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4 ">
                    <div className="cursor-pointer" onClick={() =>router.push("/")} > <Logo/> </div>
                    <div className="flex items-center space-x-4">
                        <Link href="#pricing" className="hidden  sm:block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                            Pricing
                        </Link>
                        {session?.user?.name ? (
                            <Button 
                                variant={"destructive"}  
                                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" 
                                onClick={() => {
                                    signOut({ callbackUrl: process.env.CALLBACK_URL_AFTER_SIGN_OUT })
                                    toast.success("LogOut Succesfull")
                                }}
                            >
                                Log Out
                            </Button>
                        ) : (
                            <Link 
                                href="/sign-in" 
                                className="border hover:scale-110 transition text-gray-300 hover:text-gray-900 dark:hover:text-white py-1 px-3 font-bold rounded-md "
                            >
                                Sign in
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
     );
}
 
export default Header;