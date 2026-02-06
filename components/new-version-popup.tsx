"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRightLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface SwitchToNewVersionPopupProps {
  videoId: string;
}

const SwitchToNewVersionPopup = ({
  videoId,
}: SwitchToNewVersionPopupProps) => {
  const [showPopup, setShowPopup] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(false), 5000);
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
        className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-emerald-600 transition"
      >
        <ArrowRightLeft size={22} />
      </motion.div>

      {/* POPUP */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="bg-white text-gray-900 shadow-lg rounded-lg p-4 w-64 mb-2 text-center"
          >
            <p className="text-sm mb-3">
              Want to switch to the new UI?
            </p>

            <button
              onClick={() => router.push(`/videos/${videoId}`)}
              className="px-4 py-2 bg-emerald-500 text-white text-sm rounded hover:bg-emerald-600 transition"
            >
              Switch to New Version
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SwitchToNewVersionPopup;
