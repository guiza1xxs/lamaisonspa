import AboutSpa from "@/components/AboutSpa";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TherapistGallery from "@/components/TherapistGallery";
import TherapyMenu from "@/components/TherapyMenu";
import { useEffect } from "react";

export default function Home() {
  
  useEffect(() => {
    // Smooth scroll behavior for anchor links
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      <main className="flex-grow">
        <Hero />
        <TherapistGallery />
        <TherapyMenu />
        <AboutSpa />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
