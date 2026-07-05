import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RevealOnScroll } from "@/components/RevealOnScroll";

const faqs = [
  {
    q: "Os produtos possuem garantia?",
    a: "Sim. Todos os nossos produtos e serviços possuem garantia, que pode chegar a até 6 meses dependendo do item ou reparo realizado.",
  },
  {
    q: "Vocês consertam qualquer modelo de celular?",
    a: "Atendemos as principais marcas do mercado, incluindo Apple, Samsung, Motorola, Xiaomi, LG e muitas outras, tanto Android quanto iPhone.",
  },
  {
    q: "Vocês aceitam troca de aparelhos?",
    a: "Sim! Avaliamos seu aparelho usado como parte do pagamento em um novo, com valores justos e negociação transparente.",
  },
  {
    q: "Quanto tempo demora o conserto?",
    a: "A maioria dos serviços é concluída no mesmo dia. Serviços mais complexos podem levar de 24 a 72 horas — sempre com prazo informado no orçamento.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 bg-secondary">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="text-center">
            <span className="text-sm font-semibold text-primary-dark uppercase tracking-wider">
              FAQ
            </span>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">
              Perguntas frequentes
            </h2>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={100}>
          <Accordion type="single" collapsible className="mt-12 space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="rounded-xl border border-border bg-card px-6 shadow-sm"
              >
                <AccordionTrigger className="text-left text-base font-semibold hover:no-underline py-5">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-5">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </RevealOnScroll>
      </div>
    </section>
  );
}
