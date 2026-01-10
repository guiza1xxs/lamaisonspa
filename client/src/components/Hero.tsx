import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react"; 
import { handleWhatsAppConversion } from "@/lib/tracking";

export default function Hero() {
  const { t } = useTranslation();

  const heroMessage = "Quero mais informações!";

  return (
    /* Ajuste para Dynamic Viewport Height (dvh) */
    <section className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
          src="images/backgroundfoto.jpg" 
          alt={t('hero_img_alt')} 
          className="w-full h-full object-cover opacity-80"
          loading="eager"
        />
      </div>
        
      <div className="container relative z-20 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          /* Subimos o conteúdo principal no mobile para não amontoar com as setas */
          className="max-w-4xl mx-auto flex flex-col items-center justify-center -mt-32 md:mt-0"
        >
          <motion.img 
            src="images/logo.png" 
            alt="La Maison SPA Logo"
            className="w-28 md:w-48 lg:w-56 mb-6 drop-shadow-2xl" 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />

          <h1 className="font-serif text-3xl md:text-6xl lg:text-7xl text-white mb-4 italic leading-tight drop-shadow-md">
            <span>{t('hero_title')}</span>
          </h1>
          
          <p className="font-sans font-light text-sm md:text-xl text-white/90 mb-8 max-w-2xl mx-auto tracking-wide drop-shadow-sm px-4">
            <span>{t('hero_subtitle')}</span>
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={() => handleWhatsAppConversion(heroMessage, "hero_top_button")}
              className="bg-wine hover:bg-wine/90 text-white text-xs md:text-lg px-8 py-7 rounded-none uppercase tracking-[0.2em] font-normal transition-all duration-500 shadow-2xl cursor-pointer"
            >
              <span>{t('hero_cta')}</span>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* INDICADOR DE SCROLL POSICIONADO MAIS ALTO NO MOBILE */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        /* bottom-24 para mobile para fugir das barras do iPhone, bottom-10 para desktop */
        className="absolute bottom-24 md:bottom-10 left-0 right-0 mx-auto z-20 flex flex-col items-center cursor-pointer w-full px-4"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="text-white/95 text-[12px] md:text-sm uppercase tracking-[0.15em] md:tracking-[0.2em] mb-3 font-medium whitespace-nowrap text-center block w-full drop-shadow-lg">
          {t('hero_scroll_text')}
        </span>
        
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5, 
            ease: "easeInOut" 
          }}
          className="flex flex-col items-center"
        >
          <ChevronDown className="text-white/60 w-5 h-5 -mb-2" />
          <ChevronDown className="text-white w-7 h-7" />
        </motion.div>
      </motion.div>
    </section>
  );
}