import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/components/Header";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { trackWhatsAppClick } from "@/lib/analytics";

export function FinalCTA() {
  return (
    <section className="py-24 bg-primary-dark relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-primary/40 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-whatsapp/40 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <RevealOnScroll>
          <span className="inline-block text-primary text-sm font-semibold uppercase tracking-widest">
            Vamos conversar
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Precisa comprar, vender, trocar ou consertar seu celular?
          </h2>
          <p className="mt-6 text-lg md:text-xl text-white/85 max-w-2xl mx-auto">
            Conte com atendimento rápido, garantia e profissionais especializados.
          </p>
          <a
            href={whatsappUrl("final_cta_orcamento")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("final_cta")}
            className="mt-10 inline-flex items-center gap-3 btn-whatsapp rounded-full px-8 py-4 text-base font-semibold shadow-2xl"
          >
            <MessageCircle className="h-6 w-6" aria-hidden="true" />
            Solicitar orçamento pelo WhatsApp
          </a>
        </RevealOnScroll>
      </div>
    </section>
  );
}
