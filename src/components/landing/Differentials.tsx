import {
  ShieldCheck,
  Zap,
  Cog,
  Users,
  ClipboardCheck,
  BadgePercent,
  Eye,
  type LucideIcon,
} from "lucide-react";
import { RevealOnScroll } from "@/components/RevealOnScroll";

const items: { icon: LucideIcon; title: string }[] = [
  { icon: ShieldCheck, title: "Garantia de até 6 meses" },
  { icon: Zap, title: "Atendimento rápido" },
  { icon: Cog, title: "Peças de qualidade" },
  { icon: Users, title: "Profissionais especializados" },
  { icon: ClipboardCheck, title: "Produtos revisados" },
  { icon: BadgePercent, title: "Excelente custo-benefício" },
  { icon: Eye, title: "Atendimento transparente" },
];

export function Differentials() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-sm font-semibold text-primary-dark uppercase tracking-wider">
              Diferenciais
            </span>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">
              Por que escolher a Tecnolife
            </h2>
          </div>
        </RevealOnScroll>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <RevealOnScroll key={it.title} delay={i * 60}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-[0_10px_30px_-15px_rgba(15,15,15,0.2)] transition-all">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary-dark text-primary">
                  <it.icon className="h-6 w-6" />
                </div>
                <p className="mt-4 font-semibold text-foreground">{it.title}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
