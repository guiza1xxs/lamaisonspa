import { motion } from "framer-motion";
import { useTranslation } from "react-i18next"; // 1. Importar o hook

export default function AboutSpa() {
  const { t } = useTranslation(); // 2. Inicializar

  const spaImages = [
    "images/IMG_5454-Web-Fill.jpg",
    "images/IMG_5492-Web-Fill.jpg",
    "images/IMG_5482-Web-Fill.jpg",
    "images/IMG_5500-Web-Fill.jpg"
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-4xl md:text-6xl text-wine mb-8 italic">
              <span>{t('spa_title')}</span>
            </h2>
            <div className="w-16 h-[1px] bg-wine mb-8"></div>
            
            <div className="font-sans font-light text-gray-700 text-lg leading-relaxed space-y-6">
              <p>
                <span>{t('spa_text_1')}</span>
              </p>
              <p>
                <span>{t('spa_text_2')}</span>
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {spaImages.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative overflow-hidden ${index % 2 === 1 ? 'mt-8' : 'mb-8'}`}
              >
                <img 
                  src={img} 
                  alt={`${t('spa_img_alt')} ${index + 1}`} 
                  className="w-full h-64 object-cover hover:scale-110 transition-transform duration-1000 ease-out"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}