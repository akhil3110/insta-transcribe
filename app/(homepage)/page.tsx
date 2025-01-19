"use client";

import HeroSection from "@/components/hero-section";
import Pricing from "@/components/pricing";
import Footer from "@/components/footer";
import HowitWorks from "@/components/how-it-works";
import UploadSection from "@/components/uploadSection";
import { motion } from "framer-motion";
import DemoButton from "@/components/demo-button";


const Home = () => {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-7xl mx-auto flex flex-col justify-center"
      >
        <HeroSection />
        <UploadSection />
      </motion.div>
      <div>
        <HowitWorks />
      </div>
      <div>
        <Pricing />
      </div>
      <div>
        <Footer />
      </div>
      <DemoButton /> {/* Add DemoButton here */}
    </section>
  );
};

export default Home;
