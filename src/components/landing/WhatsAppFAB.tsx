import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/components/Header";
import { trackWhatsAppClick } from "@/lib/analytics";

export function WhatsAppFAB() {
  return (
    <a
      href={whatsappUrl("fab")}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick("fab")}
      aria-label="Falar no WhatsApp (abre em nova aba)"
      className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-whatsapp text-white grid place-items-center shadow-[0_10px_40px_-5px_rgba(37,211,102,0.6)] hover:scale-110 transition-transform"
    >
      <MessageCircle className="h-7 w-7" aria-hidden="true" />
      <span className="absolute inset-0 rounded-full bg-whatsapp animate-ping opacity-30" aria-hidden="true" />
    </a>
  );
}
