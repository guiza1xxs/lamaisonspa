import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { handleWhatsAppConversion } from "@/lib/tracking"; // Importando a função de rastreio

export default function FloatingWhatsApp() {
  // Mensagem específica do Widget Flutuante (com 2 pontos)
  const message = "Oi! Vi o SPA no site e gostaria de agendar..";

  return (
    <motion.button
      onClick={() => handleWhatsAppConversion(message, "floating_widget")}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#20bd5a] transition-colors duration-300 flex items-center justify-center cursor-pointer border-none"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <MessageCircle size={32} fill="white" className="text-white" />
      </motion.div>
    </motion.button>
  );
}