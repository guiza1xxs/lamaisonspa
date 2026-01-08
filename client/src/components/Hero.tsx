import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();

  return (
    // Mudamos para h-screen para garantir que nada passe do limite da tela inicial
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-white/30 z-10" />
        <img 
          src="images/backgroundfoto.jpg" 
          alt={t('hero_img_alt')} 
          className="w-full h-full object-cover opacity-90"
          loading="eager"
        />
      </div>
        
      <div className="container relative z-20 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl mx-auto flex flex-col items-center justify-center"
        >
          {/* LOGO - Reduzi um pouco o tamanho e a margem inferior (mb-4) */}
          <motion.img 
            src="images/logo.png" 
            alt="La Maison SPA Logo"
            className="w-32 md:w-48 lg:w-56 mb-4 drop-shadow-sm" 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />

          {/* TITULO - Diminuímos um pouco o tamanho no desktop e a margem (mb-4) */}
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-wine mb-4 italic leading-tight">
            <span>{t('hero_title')}</span>
          </h1>
          
          {/* SUBTITULO - Margem reduzida (mb-8) */}
          <p className="font-sans font-light text-base md:text-xl text-black mb-8 max-w-2xl mx-auto tracking-wide">
            <span>{t('hero_subtitle')}</span>
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* BOTÃO - Padding reduzido (py-6) para ganhar espaço vertical */}
            <Button 
              asChild 
              className="bg-wine hover:bg-wine/90 text-white text-base md:text-lg px-8 py-6 rounded-none uppercase tracking-widest font-normal transition-all duration-500 shadow-lg hover:shadow-xl"
            >
              <a href="https://wa.me/351928209613" target="_blank" rel="noopener noreferrer">
                <span>{t('hero_cta')}</span>
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* INDICADOR DE SCROLL (O risquinho que piscava) */}
      {/* Colocamos bottom-6 para garantir que ele apareça mesmo em telas menores */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="w-[1px] h-12 bg-wine/30 mx-auto overflow-hidden">
          <motion.div 
            animate={{ y: [-48, 48] }} // Animação do risquinho de cima para baixo
            transition={{ 
              repeat: Infinity, 
              duration: 1.5, 
              ease: "linear" 
            }}
            className="w-full h-full bg-wine"
          />
        </div>
      </motion.div>
    </section>
  );
}