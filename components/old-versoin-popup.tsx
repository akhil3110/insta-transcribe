"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowLeftRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface OldVersionPopupProps {
  videoId: string;
}

const OldVersionPopup = ({ videoId }: OldVersionPopupProps) => {
  const [showPopup, setShowPopup] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="fixed top-8 right-8 z-50 flex flex-col items-end"
      onMouseEnter={() => setShowPopup(true)}
      onMouseLeave={() => setShowPopup(false)}
    >
      {/* FLOATING BUTTON */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-blue-600"
      >
        <ArrowLeftRight size={22} />
      </motion.div>

      {/* POPUP */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="bg-white shadow-lg rounded-lg p-4 w-64 mb-2 text-center"
          >
            <p className="text-sm text-gray-700 mb-3">
              Want to switch to the old UI?
            </p>

            <button
              onClick={() => router.push(`/videos/old/${videoId}`)}
              className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition"
            >
              Switch to Old Version
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OldVersionPopup;
