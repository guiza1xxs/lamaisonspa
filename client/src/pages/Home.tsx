import AboutSpa from "@/components/AboutSpa";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TherapistGallery from "@/components/TherapistGallery";
import TherapyMenu from "@/components/TherapyMenu";
import { useEffect } from "react";

export default function Home() {
  
  useEffect(() => {
    // 1. Smooth scroll
    document.documentElement.style.scrollBehavior = "smooth";

    // 2. Captura do Click ID do BeMob
    const urlParams = new URLSearchParams(window.location.search);
    const cid = urlParams.get('cid');
    if (cid) {
      localStorage.setItem('bemob_click_id', cid);
      console.log("BeMob ID capturado:", cid);
    }

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