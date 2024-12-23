
import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import Pricing from "@/components/pricing";
import Footer from "@/components/footer";
import HowitWorks from "@/components/how-it-works";
import UploadSection from "@/components/uploadSection";


const Home = () => {

  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div className="max-w-7xl mx-auto flex flex-col  justify-center">
        <HeroSection />
        <UploadSection />
      </div>
      <div>
        <HowitWorks />
      </div>
      <div>
        <Pricing />
      </div>
      <div>
        <Footer />
      </div>
    </section>
  );
}

export default Home
