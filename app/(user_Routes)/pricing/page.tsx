"use client"
import Pricing from "@/components/pricing";
import { motion } from "framer-motion"; 

const PricingDashboard = () => {
    return ( 
        <motion.div
        initial={{ scale: 0.8, opacity: 0 }}  // Start with smaller scale and invisible
        animate={{ scale: 1, opacity: 1 }}   // End with normal scale and full opacity
        transition={{ duration: 1, ease: "easeOut" }} // Slow transition with ease-out effect
            className="max-w-7xl mx-auto flex flex-col justify-center h-full w-full items-center  bg-gray-900 text-white"
        >
        <Pricing />
        </motion.div>
     );
}
 
export default PricingDashboard;