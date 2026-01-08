import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image with STRONGER Overlay */}
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
          className="max-w-4xl mx-auto flex flex-col items-center justify-center -mt-20 md:mt-0"
        >
          <motion.img 
            src="images/logo.png" 
            alt="La Maison SPA Logo"
            className="w-28 md:w-48 lg:w-56 mb-6 drop-shadow-2xl" 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />

          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-4 italic leading-tight drop-shadow-md">
            <span>{t('hero_title')}</span>
          </h1>
          
          <p className="font-sans font-light text-base md:text-xl text-white/90 mb-8 max-w-2xl mx-auto tracking-wide drop-shadow-sm">
            <span>{t('hero_subtitle')}</span>
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              asChild 
              className="bg-wine hover:bg-wine/90 text-white text-sm md:text-lg px-8 py-7 rounded-none uppercase tracking-[0.2em] font-normal transition-all duration-500 shadow-2xl"
            >
              <a href="https://wa.me/351928209613" target="_blank" rel="noopener noreferrer">
                <span>{t('hero_cta')}</span>
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* INDICADOR DE SCROLL - AJUSTADO */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        // Diminuímos o 'bottom' de 10 para 16 ou 20 para aproximar do botão
        className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center gap-2">
          {/* Aumentamos a altura (h-24) para o risco ficar bem longo e elegante */}
          <div className="w-[1px] h-24 bg-white/20 relative overflow-hidden">
            <motion.div 
              // Ajustamos o deslocamento para condizer com a nova altura de 96px (h-24)
              animate={{ y: [-96, 96] }}
              transition={{ 
                repeat: Infinity, 
                duration: 2.5, 
                ease: "easeInOut" 
              }}
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-white to-transparent"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}