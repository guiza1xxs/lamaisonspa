import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { therapists as initialTherapists } from "@/lib/therapists";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { handleWhatsAppConversion } from "@/lib/tracking";
import { X } from "lucide-react";

// --- Slider de Imagens ---
function TherapistImageSlider({ images, name }: { images: string[], name: string }) {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, duration: 30 }, 
    [Autoplay({ delay: 3500, stopOnInteraction: false })]
  );

  return (
    <div className="relative w-full h-full overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
      <div className="flex h-full">
        {images.map((img, index) => (
          <div className="flex-[0_0_100%] min-w-0 h-full select-none" key={`${name}-img-${index}`}>
            <img src={img} alt={`${name}`} className="w-full h-full object-cover pointer-events-none" loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TherapistGallery() {
  const { t, i18n } = useTranslation();
  
  const [shuffledTherapists, setShuffledTherapists] = useState<any[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedTherapist, setSelectedTherapist] = useState<any | null>(null);

  useEffect(() => {
    const shuffled = [...initialTherapists].sort(() => Math.random() - 0.5);
    setShuffledTherapists(shuffled);
  }, []);

  return (
    <section className="py-24 bg-white relative">
      <div className="container px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-6xl text-wine mb-4 italic">
            <span>{t('gallery_title')}</span>
          </h2>
          <div className="w-24 h-[1px] bg-wine mx-auto mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {shuffledTherapists.slice(0, visibleCount).map((therapist) => (
              <motion.div
                key={therapist.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="border-none shadow-none bg-transparent group overflow-hidden rounded-none">
                  <CardContent 
                    className="p-0 relative aspect-[3/4] overflow-hidden cursor-pointer"
                    onClick={() => setSelectedTherapist(therapist)}
                  >
                    <TherapistImageSlider images={therapist.images} name={therapist.name} />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                    <div className="absolute bottom-0 left-0 w-full p-6 z-20 bg-gradient-to-t from-black/80 to-transparent">
                      <h3 className="font-serif text-3xl text-white italic">{therapist.name}</h3>
                      <p className="font-sans text-white/90 text-[10px] uppercase tracking-[0.2em] mt-1">
                        {t('location_lisbon')} • {therapist.location}
                      </p>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="p-0 mt-4">
                    <Button 
                      variant="outline" 
                      className="w-full border-wine text-wine hover:bg-wine hover:text-white rounded-none py-6 uppercase tracking-widest font-light transition-all cursor-pointer"
                      onClick={() => {
                        const baseMessage = i18n.language.startsWith('pt') ? t('wa_message', { lng: 'pt' }) : t('wa_message', { lng: 'en' });
                        handleWhatsAppConversion(`${baseMessage} ${therapist.name}`, `card_${therapist.name.toLowerCase()}`);
                      }}
                    >
                      <span>{t('btn_availability')}</span>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {visibleCount < shuffledTherapists.length && (
          <div className="mt-16 text-center">
            <Button 
              onClick={() => setVisibleCount(prev => prev + 6)}
              className="bg-wine text-white hover:bg-wine/90 rounded-none px-12 py-8 uppercase tracking-widest font-light cursor-pointer"
            >
              {t('btn_load_more')}
            </Button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedTherapist && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedTherapist(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto relative flex flex-col md:flex-row shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedTherapist(null)} 
                className="absolute top-4 right-4 z-[110] text-wine p-2 bg-white/80 hover:bg-white rounded-full transition-colors cursor-pointer"
              >
                <X size={24} />
              </button>

              <div className="w-full md:w-1/2 aspect-[3/4] md:aspect-auto">
                <TherapistImageSlider images={selectedTherapist.images} name={selectedTherapist.name} />
              </div>

              <div className="p-8 md:p-12 flex-1 flex flex-col justify-center">
                <h2 className="font-serif text-5xl text-wine italic mb-2">{selectedTherapist.name}</h2>
                <p className="text-stone-400 uppercase tracking-widest text-xs mb-8">
                  {t('location_lisbon')} - {selectedTherapist.location}
                </p>
                
                {/* INFORMAÇÕES TÉCNICAS DA TERAPEUTA */}
                <div className="space-y-3 mb-10 text-stone-600 font-light border-t border-stone-100 pt-6">
                  <div className="flex justify-between border-b border-stone-50 pb-2">
                    <span className="font-medium text-wine/80">{t('label_nationality')}:</span>
                    <span>{selectedTherapist.nationality}</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-50 pb-2">
                    <span className="font-medium text-wine/80">{t('label_age')}:</span>
                    <span>{selectedTherapist.age}</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-50 pb-2">
                    <span className="font-medium text-wine/80">{t('label_height')}:</span>
                    <span>{selectedTherapist.height}</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-50 pb-2">
                    <span className="font-medium text-wine/80">{t('label_languages')}:</span>
                    <span>{selectedTherapist.languages}</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-wine text-white hover:bg-wine/90 rounded-none py-8 uppercase tracking-widest transition-all cursor-pointer shadow-lg"
                  onClick={() => {
                    const baseMessage = i18n.language.startsWith('pt') ? t('wa_message', { lng: 'pt' }) : t('wa_message', { lng: 'en' });
                    handleWhatsAppConversion(`${baseMessage} ${selectedTherapist.name}`, `modal_${selectedTherapist.name.toLowerCase()}`);
                  }}
                >
                  {t('btn_availability')}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}