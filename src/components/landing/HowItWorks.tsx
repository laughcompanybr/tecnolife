import { MessageSquare, Search, CheckCircle2, PackageCheck } from "lucide-react";
import { RevealOnScroll } from "@/components/RevealOnScroll";

const steps = [
  { icon: MessageSquare, title: "Entre em contato", desc: "Fale conosco pelo WhatsApp e descreva sua necessidade." },
  { icon: Search, title: "Receba uma avaliação", desc: "Analisamos seu aparelho e apresentamos a melhor solução." },
  { icon: CheckCircle2, title: "Aprove o orçamento", desc: "Sem surpresas: você só aprova quando estiver confortável." },
  { icon: PackageCheck, title: "Retire pronto", desc: "Seu aparelho entregue funcionando perfeitamente, com garantia." },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-sm font-semibold text-primary-dark uppercase tracking-wider">
              Como funciona
            </span>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">
              Simples, rápido e transparente
            </h2>
          </div>
        </RevealOnScroll>

        <div className="mt-16 relative">
          <div className="hidden lg:block absolute top-8 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-primary-dark/10 via-primary-dark/40 to-primary-dark/10" />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <RevealOnScroll key={s.title} delay={i * 120}>
                <div className="relative text-center">
                  <div className="mx-auto relative z-10 h-16 w-16 rounded-full bg-primary-dark text-primary grid place-items-center shadow-lg ring-4 ring-primary/30">
                    <s.icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <div className="mt-4 text-xs font-bold text-primary-dark tracking-wider">
                    ETAPA {i + 1}
                  </div>

                  <h3 className="mt-1 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
