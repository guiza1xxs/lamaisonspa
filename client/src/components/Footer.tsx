import { locations } from "@/lib/locations";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next"; // 1. Importar

export default function Footer() {
  const { t } = useTranslation(); // 2. Inicializar

  return (
    <footer className="bg-brown text-white py-20 border-t border-wine/30">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <h3 className="font-serif text-3xl italic mb-6 text-wine">La Maison SPA</h3>
            <p className="font-sans font-light text-white/70 text-sm leading-relaxed mb-6">
              <span>{t('footer_desc')}</span>
            </p>
            <div className="font-sans text-sm text-white/60">
              <p className="mb-2"><span>{t('footer_hours_label')}</span></p>
              <p className="text-white font-medium"><span>{t('footer_hours')}</span></p>
            </div>
          </div>

          {/* Locations Columns */}
          {locations.map((loc, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="lg:col-span-1"
            >
              <h4 className="font-serif text-xl mb-4 text-wine/90 italic">{loc.name}</h4>
              <p className="font-sans font-light text-white/80 text-sm mb-4 leading-relaxed">
                {loc.address}
              </p>
              <a 
                href={`tel:${loc.phone}`} 
                className="inline-block font-sans text-sm border border-white/20 px-4 py-2 hover:bg-wine hover:border-wine transition-colors duration-300"
              >
                {loc.displayPhone}
              </a>
            </motion.div>
          ))}

        </div>

        <div className="border-t border-white/10 mt-16 pt-8 text-center font-sans font-light text-xs text-white/40">
          <p>&copy; {new Date().getFullYear()} La Maison SPA. <span>{t('footer_rights')}</span></p>
        </div>
      </div>
    </footer>
  );
}