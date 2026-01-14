import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react"; 
import { handleWhatsAppConversion } from "@/lib/tracking";

export default function Hero() {
  const { t } = useTranslation();
  const heroMessage = "Quero mais informações!";

  return (
    <section className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-black">
      
      {/* ANNOUNCEMENT BAR - Renderização Estática para aparecer instantaneamente */}
      <div className="fixed top-0 left-0 w-full z-[100] bg-wine/90 backdrop-blur-md py-2.5 px-4 shadow-xl">
        <p className="text-white text-center text-[10px] md:text-[11px] uppercase tracking-[0.12em] font-semibold leading-tight drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          {t('hero_disclaimer')}
        </p>
      </div>

      {/* Background Image - Otimizada */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
          src="images/backgroundfoto.jpg" 
          alt={t('hero_img_alt')} 
          className="w-full h-full object-cover opacity-80"
          loading="eager"
          fetchPriority="high" // Prioridade máxima de carregamento
        />
      </div>
        
      <div className="container relative z-20 px-4 text-center">
        {/* REMOVIDO: motion.div com initial opacity 0 (causava o flash branco) */}
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center -mt-24 md:mt-0">
          
          <img 
            src="images/logo.png" 
            alt="La Maison SPA Logo"
            className="w-28 md:w-48 lg:w-56 mb-6 drop-shadow-2xl"
            // Mantemos apenas uma animação muito leve ou removemos de vez
          />

          <h1 className="font-serif text-3xl md:text-6xl lg:text-7xl text-white mb-4 italic leading-tight drop-shadow-md">
            <span>{t('hero_title')}</span>
          </h1>
          
          <p className="font-sans font-light text-sm md:text-xl text-white/90 mb-8 max-w-2xl mx-auto tracking-wide drop-shadow-sm px-4">
            <span>{t('hero_subtitle')}</span>
          </p>

          <div className="flex flex-col items-center">
            <Button 
              onClick={() => handleWhatsAppConversion(heroMessage, "hero_top_button")}
              className="bg-wine hover:bg-wine/90 text-white text-xs md:text-lg px-8 py-7 rounded-none uppercase tracking-[0.2em] font-normal transition-all duration-500 shadow-2xl cursor-pointer"
            >
              <span>{t('hero_cta')}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* INDICADOR DE SCROLL - Reduzido o delay de 2s para 0.5s */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute bottom-24 md:bottom-10 left-0 right-0 mx-auto z-20 flex flex-col items-center cursor-pointer w-full px-4"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="text-white/95 text-[12px] md:text-sm uppercase tracking-[0.15em] md:tracking-[0.2em] mb-3 font-medium whitespace-nowrap text-center block w-full drop-shadow-lg">
          {t('hero_scroll_text')}
        </span>
        
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <ChevronDown className="text-white/60 w-5 h-5 -mb-2" />
          <ChevronDown className="text-white w-7 h-7" />
        </motion.div>
      </motion.div>
    </section>
  );
}