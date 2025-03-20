import useLoadingStore from "@/store/loading-store";
import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  const { loading } = useLoadingStore();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="flex flex-col items-center text-center">
        {/* Spinner */}
        <div className="w-20 h-20 border-8 border-t-transparent animate-spin border-white rounded-full"></div>
        
        {/* Text */}
        <p className="mt-4 text-white text-3xl font-bold">
          {loading.loadingType !== null ? loading.loadingType : "Loading"}
          <span className="ml-2">
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
              </motion.span>
            ))}
          </span>
        </p>
        <p className="mt-1 text-white text-lg font-semibold">
          {loading.loadingSubHeading}
        </p>
      </div>
    </div>
  );
};

export default Loading;
