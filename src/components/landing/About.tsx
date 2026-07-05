import { RevealOnScroll } from "@/components/RevealOnScroll";
import { CheckCircle2 } from "lucide-react";

const bullets = [
  "Aparelhos rigorosamente testados",
  "Preços justos e transparentes",
  "Atendimento humanizado",
  "Serviços com garantia",
];

export function About() {
  return (
    <section id="sobre" className="py-24 bg-background">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll delay={150}>
          <div>
            <span className="text-sm font-semibold text-primary-dark uppercase tracking-wider">
              Sobre nós
            </span>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">
              Sobre a Tecnolife
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                A Tecnolife Celulares é especializada em soluções completas em tecnologia,
                atuando na venda de celulares novos e seminovos, troca de aparelhos,
                assistência técnica especializada, acessórios e produtos de informática.
              </p>
              <p>
                Todos os aparelhos passam por rigorosos testes de funcionamento, garantindo
                qualidade, procedência e segurança.
              </p>
              <p>
                Nosso compromisso é oferecer atendimento transparente, preços justos e
                serviços com garantia, proporcionando a melhor experiência para nossos
                clientes.
              </p>
            </div>
            <ul className="mt-8 grid sm:grid-cols-2 gap-3">
              {bullets.map((b) => (
                <li key={b} className="flex items-center gap-2 text-foreground">
                  <CheckCircle2 className="h-5 w-5 text-primary-dark shrink-0" />
                  <span className="font-medium">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
