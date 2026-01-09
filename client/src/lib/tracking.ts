/**
 * Função para registrar a conversão no BeMob e redirecionar para o WhatsApp
 * @param message - A mensagem personalizada que definimos (. , .. , !)
 * @param buttonLabel - O nome do botão para identificar no relatório do BeMob (txid)
 */
export const handleWhatsAppConversion = (message: string, buttonLabel: string) => {
  // 1. Recupera o Click ID que guardamos no localStorage lá no Home.tsx
  const cid = localStorage.getItem('bemob_click_id');
  const phoneNumber = "351928209613";

  // 2. Se existir um ID de rastreio, avisa o BeMob antes de sair do site
  if (cid) {
    // Usando a sua URL específica: 54lwi.bemobtrcks.com
    // Substituímos o REPLACE pelo ID real e o OPTIONAL pelo nome do botão
    const postbackUrl = `https://54lwi.bemobtrcks.com/postback?cid=${cid}&txid=${buttonLabel}`;
    
    // O fetch envia o sinal de forma "silenciosa" para o BeMob
    fetch(postbackUrl, { 
      mode: 'no-cors',
      cache: 'no-cache'
    }).catch((err) => console.error("Erro ao rastrear:", err));
  } else {
    console.warn("Aviso: Nenhum Click ID encontrado. A conversão não será registrada no BeMob, mas o WhatsApp abrirá.");
  }

  // 3. Abre o WhatsApp com a mensagem personalizada em uma nova aba
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
};