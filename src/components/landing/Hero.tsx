import { MessageCircle, ArrowRight, ShieldCheck, Zap, Wrench, Award } from "lucide-react";
import { whatsappUrl } from "@/components/Header";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { trackWhatsAppClick } from "@/lib/analytics";


const trust = [
  { icon: ShieldCheck, label: "Garantia" },
  { icon: Zap, label: "Atendimento Rápido" },
  { icon: Wrench, label: "Peças de Qualidade" },
  { icon: Award, label: "Técnicos Especializados" },
];

export function Hero() {
  return (
    <section id="inicio" className="relative pt-28 md:pt-32 pb-20 overflow-hidden bg-primary-dark isolate">
      <div className="absolute inset-0 z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary-dark to-primary/10" />
        
        {/* Decorative glowing orbs */}
        <div className="absolute -top-1/4 -right-1/4 w-[60rem] h-[60rem] rounded-full bg-primary/20 blur-[120px] opacity-60" />
        <div className="absolute top-1/2 -left-1/4 w-[40rem] h-[40rem] rounded-full bg-whatsapp/10 blur-[100px] opacity-50" />
        <div className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] rounded-full bg-primary/15 blur-[90px] opacity-40" />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `linear-gradient(var(--color-hero-grid) 1px, transparent 1px), linear-gradient(90deg, var(--color-hero-grid) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Floating decorative rings */}
        <div className="absolute top-1/4 right-[15%] w-64 h-64 border border-hero-ring rounded-full" />
        <div className="absolute top-1/4 right-[15%] w-48 h-48 border border-hero-ring rounded-full mt-8 ml-8" />
        <div className="absolute bottom-1/4 left-[10%] w-32 h-32 border border-primary/20 rounded-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">

        <div className="max-w-3xl">
          <RevealOnScroll>
            <span className="inline-flex items-center gap-2 rounded-full bg-hero-subtle backdrop-blur px-4 py-1.5 text-xs font-medium text-hero-foreground border border-hero-subtle">
              <span className="h-2 w-2 rounded-full bg-whatsapp animate-pulse" />
              Atendimento online agora
            </span>
          </RevealOnScroll>

          <RevealOnScroll delay={100}>
            <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-hero-foreground leading-[1.1]">
              Tecnologia, confiança e praticidade em um só lugar.
            </h1>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <p className="mt-6 text-lg text-hero-muted max-w-2xl leading-relaxed">
              Venda, troca e manutenção de celulares, além de acessórios e produtos de
              informática, com qualidade, garantia e atendimento de confiança.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={300}>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={whatsappUrl("hero")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("hero")}
                aria-label="Falar no WhatsApp (abre em nova aba)"
                className="inline-flex items-center gap-2 btn-whatsapp rounded-full px-7 py-3.5 text-sm font-semibold"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                Falar no WhatsApp
              </a>
              <a
                href="#servicos"
                className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 text-sm font-semibold hover:brightness-95 transition-all hover:-translate-y-0.5"
              >
                Conheça nossos serviços
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

          </RevealOnScroll>

          <RevealOnScroll delay={400}>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              {trust.map((t) => (
                <div
                  key={t.label}
                  className="flex items-center gap-2.5 rounded-xl bg-hero-subtle backdrop-blur border border-hero-subtle px-4 py-3"
                >
                  <t.icon className="h-5 w-5 text-whatsapp shrink-0" />
                  <span className="text-sm font-medium text-hero-foreground truncate">{t.label}</span>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
