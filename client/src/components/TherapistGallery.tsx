import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { therapists } from "@/lib/therapists";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function TherapistGallery() {
  // Pegamos 't' para traduzir textos e 'i18n' para checar o idioma atual
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
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
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img 
                    src={therapist.image} 
                    alt={therapist.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 w-full p-6 z-20 bg-gradient-to-t from-black/70 to-transparent">
                    <h3 className="font-serif text-3xl text-white italic">{therapist.name}</h3>
                    <p className="font-sans text-white/90 text-sm font-light uppercase tracking-wider mt-1">{t('location_lisbon')}</p>
                  </div>
                </CardContent>
                <CardFooter className="p-0 mt-4">
                  <Button 
                    asChild 
                    variant="outline" 
                    className="w-full border-wine text-wine hover:bg-wine hover:text-white rounded-none py-6 uppercase tracking-widest font-light transition-all duration-300"
                  >
                    <a 
                      href={`https://wa.me/351928209613?text=${
                        // LÓGICA DE ATENDIMENTO: 
                        // Se começar com 'pt', envia em português. Senão, força o envio em Inglês.
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