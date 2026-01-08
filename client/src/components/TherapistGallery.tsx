import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { therapists } from "@/lib/therapists";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

function TherapistImageSlider({ images, name }: { images: string | string[] | undefined, name: string }) {
  const [emblaRef] = useEmblaCarousel(
    { 
      loop: true, 
      duration: 30,
      skipSnaps: false,
      watchDrag: true // Garante que o arrasto manual funcione
    }, 
    [Autoplay({ delay: 3500, stopOnInteraction: false })]
  );

  const imagesArray = Array.isArray(images) ? images : typeof images === 'string' ? [images] : [];

  if (imagesArray.length === 0) {
    return (
      <div className="w-full h-full bg-stone-100 flex items-center justify-center">
        <span className="text-wine/30 font-serif italic text-sm">La Maison SPA</span>
      </div>
    );
  }

  return (
    // Removi o z-index daqui para não conflitar com as camadas superiores do card
    <div className="relative w-full h-full overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
      <div className="flex h-full">
        {imagesArray.map((img, index) => (
          <div className="flex-[0_0_100%] min-w-0 h-full select-none" key={`${name}-img-${index}`}>
            <img 
              src={img} 
              alt={`${name} - ${index + 1}`}
              className="w-full h-full object-cover pointer-events-none" 
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Bolinhas - z-20 para ficar acima de tudo */}
      {imagesArray.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
          {imagesArray.map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/60 shadow-sm" />
          ))}
        </div>
      )}
    </div>
  );
}

export default function TherapistGallery() {
  const { t, i18n } = useTranslation();

  return (
    <section className="py-24 bg-white">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-6xl text-wine mb-4 italic">
            <span>{t('gallery_title')}</span>
          </h2>
          <div className="w-24 h-[1px] bg-wine mx-auto mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-8 lg:gap-12">
          {therapists.map((therapist, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="border-none shadow-none bg-transparent group overflow-hidden rounded-none">
                <CardContent className="p-0 relative aspect-[3/4] overflow-hidden">
                  
                  {/* SLIDER - Agora ele é a base principal */}
                  <TherapistImageSlider images={therapist.images} name={therapist.name} />
                  
                  {/* OVERLAY - O segredo: usei 'pointer-events-none'. 
                      Assim o visual escuro aparece, mas o toque "atravessa" ele e chega no carrossel. */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                  
                  {/* INFORMAÇÕES - Também com pointer-events-none para não bloquear o toque lateral */}
                  <div className="absolute bottom-0 left-0 w-full p-6 z-20 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
                    <h3 className="font-serif text-3xl text-white italic">{therapist.name}</h3>
                    <p className="font-sans text-white/90 text-sm font-light uppercase tracking-wider mt-1">{t('location_lisbon')}</p>
                  </div>
                </CardContent>
                
                <CardFooter className="p-0 mt-4">
                  <Button 
                    asChild 
                    variant="outline" 
                    className="w-full border-wine text-wine hover:bg-wine hover:text-white rounded-none py-6 uppercase tracking-widest font-light transition-all duration-300 shadow-sm"
                  >
                    <a 
                      href={`https://wa.me/351928209613?text=${
                        i18n.language.startsWith('pt') 
                          ? t('wa_message', { lng: 'pt' }) 
                          : t('wa_message', { lng: 'en' })
                      } ${therapist.name}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <span>{t('btn_availability')}</span>
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}