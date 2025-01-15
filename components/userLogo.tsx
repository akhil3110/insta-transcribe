import { Smartphone } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export const UserLogo = () => {
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
        href="/"
        className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
      >
        <div className="relative">
            <Smartphone className="w-6 h-6 text-indigo-600" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
        </div>
      </Link>
    );
  };