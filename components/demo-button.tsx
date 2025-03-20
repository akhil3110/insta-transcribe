"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Download } from "lucide-react"; // Import Download icon

const DemoButton = () => {
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    // Automatically hide the popup after 5 seconds
    const timer = setTimeout(() => setShowPopup(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="fixed bottom-8 right-8 z-50 flex flex-col items-end"
      onMouseEnter={() => setShowPopup(true)} // Show popup when hovered
      onMouseLeave={() => setShowPopup(false)} // Hide popup when mouse leaves
    >
      {/* Popup div */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white shadow-lg rounded-lg p-4 w-64 mb-2 text-center"
          >
            <p className="text-sm text-gray-700 mb-2">
              Are you testing the project? Download a demo video now!
            </p>
            {/* Download button */}
            <a
              href="/Insta_Transcribe_demo_video.mp4  " // Path to your public video file
              download="Insta_Transcribe_demo_video.mp4" // File name when downloaded
              className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 inline-block"
            >
              Download
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-blue-600"
      >
        <Download size={24} /> {/* Lucide Download Icon */}
      </motion.div>
    </div>
  );
};

export default DemoButton;
