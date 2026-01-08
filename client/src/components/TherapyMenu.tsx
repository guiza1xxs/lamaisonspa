import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { therapies } from "@/lib/therapies";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next"; // 1. Importar

export default function TherapyMenu() {
  const { t } = useTranslation(); // 2. Inicializar

  return (
    <section className="py-24 bg-muted/30">
      <div className="container px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-6xl text-wine mb-4 italic">
            {/* 3. Traduzir título fixo */}
            <span>{t('menu_title')}</span>
          </h2>
          <div className="w-24 h-[1px] bg-wine mx-auto mt-6"></div>
        </motion.div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {therapies.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <AccordionItem value={`item-${index}`} className="border border-wine/20 bg-white px-4 md:px-8 rounded-none data-[state=open]:border-wine transition-colors duration-300">
                <AccordionTrigger className="font-serif text-2xl md:text-3xl text-brown hover:text-wine hover:no-underline py-6 italic">
                  {/* 4. Traduzir Categoria dinâmica */}
                  <span>{t(category.category.trim())}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="space-y-8 mt-4">
                    {category.items.map((item, idx) => (
                      <div key={idx} className="flex flex-col md:flex-row md:justify-between md:items-baseline border-b border-wine/10 pb-4 last:border-0 last:pb-0">
                        <div className="md:w-3/4 pr-4">
                          <h4 className="font-serif text-xl text-wine mb-2">
                            {/* 5. Traduzir Nome do Item dinâmico */}
                            <span>{t(item.name.trim())}</span>
                          </h4>
                          <p className="font-sans text-gray-600 font-light leading-relaxed text-sm md:text-base">
                            {/* 6. Traduzir Descrição dinâmica */}
                            <span>{t(item.description.trim())}</span>
                          </p>
                        </div>
                        <div className="md:w-1/4 mt-2 md:mt-0 text-right">
                          <span className="font-sans font-medium text-brown text-lg block">
                            {/* 7. Lógica de tradução para Preço */}
                            <span>
                              {item.price
                                .replace("Desde", t('price_from'))
                                .replace("Sob Consulta", t('price_consult'))}
                            </span>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
}