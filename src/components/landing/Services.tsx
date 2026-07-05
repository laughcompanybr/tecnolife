import {
  Wrench,
  Smartphone,
  Repeat,
  Headphones,
  Monitor,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { RevealOnScroll } from "@/components/RevealOnScroll";

const services: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Wrench,
    title: "Manutenção de Celulares",
    desc: "Conserto rápido e confiável para Android e iPhone com peças de qualidade e garantia de até 6 meses.",
  },
  {
    icon: Smartphone,
    title: "Venda de Celulares",
    desc: "Aparelhos novos e seminovos revisados, testados e com garantia de procedência.",
  },
  {
    icon: Repeat,
    title: "Troca de Celulares",
    desc: "Avaliamos seu aparelho usado como parte do pagamento no novo, de forma justa e transparente.",
  },
  {
    icon: Headphones,
    title: "Acessórios",
    desc: "Capinhas, películas, carregadores, cabos, fones e diversos acessórios das melhores marcas.",
  },
  {
    icon: Monitor,
    title: "Produtos de Informática",
    desc: "Produtos selecionados de informática com qualidade garantida e ótimos preços.",
  },
  {
    icon: Sparkles,
    title: "Gravação a Laser",
    desc: "Personalização a laser para presentes, brindes exclusivos e itens corporativos.",
  },
];

export function Services() {
  return (
    <section id="servicos" className="py-24 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-sm font-semibold text-primary-dark uppercase tracking-wider">
              Nossos Serviços
            </span>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-foreground">
              Soluções completas em tecnologia
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Do reparo à personalização, cuidamos de tudo com qualidade e agilidade.
            </p>
          </div>
        </RevealOnScroll>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <RevealOnScroll key={s.title} delay={i * 80}>
              <div className="group h-full rounded-2xl bg-card border border-border p-8 shadow-[0_4px_20px_-8px_rgba(15,23,42,0.06)] hover:shadow-[0_20px_50px_-20px_rgba(15,15,15,0.25)] hover:-translate-y-1 hover:border-primary/30 transition-all duration-300">
                <div className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-primary-dark text-primary shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  <s.icon className="h-7 w-7" aria-hidden="true" />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-foreground">{s.title}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
