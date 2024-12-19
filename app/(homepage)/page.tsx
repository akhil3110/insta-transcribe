import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import Pricing from "@/components/pricing";


const Home = () => {

  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div className="w-full flex justify-center">
        <HeroSection />
      </div>
      <div>

      </div>
      <div>
        <Pricing />
      </div>
    </section>
  );
}

export default Home
