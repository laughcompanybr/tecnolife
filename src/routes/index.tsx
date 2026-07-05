import { lazy, Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Hero } from "@/components/landing/Hero";
import { Services } from "@/components/landing/Services";
import { Brands } from "@/components/landing/Brands";
import { Differentials } from "@/components/landing/Differentials";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { About } from "@/components/landing/About";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import heroImg from "@/assets/hero.jpg?url";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";

const Footer = lazy(() =>
  import("@/components/landing/Footer").then((m) => ({ default: m.Footer }))
);
const WhatsAppFAB = lazy(() =>
  import("@/components/landing/WhatsAppFAB").then((m) => ({ default: m.WhatsAppFAB }))
);

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Tecnolife Celulares",
  description:
    "Venda, troca e manutenção de celulares, acessórios, informática e gravação a laser.",
  image: heroImg.url,
  telephone: "+55 33 99949-1504",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Cândido Machado, 34 - Centro",
    addressLocality: "Vargem Alegre",
    addressRegion: "MG",
    postalCode: "35199-000",
    addressCountry: "BR",
  },
  areaServed: "Vargem Alegre, MG",
  priceRange: "$$",
  sameAs: ["https://instagram.com/lojas.tecnolife"],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Os produtos possuem garantia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sim. Todos os produtos e serviços possuem garantia de até 6 meses conforme o item.",
      },
    },
    {
      "@type": "Question",
      name: "Vocês consertam qualquer modelo de celular?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Atendemos as principais marcas: Apple, Samsung, Motorola, Xiaomi, LG e outras.",
      },
    },
    {
      "@type": "Question",
      name: "Vocês aceitam troca de aparelhos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sim, avaliamos seu aparelho usado como parte do pagamento no novo.",
      },
    },
    {
      "@type": "Question",
      name: "Quanto tempo demora o conserto?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A maioria dos serviços é concluída no mesmo dia; casos complexos, 24 a 72 horas.",
      },
    },
  ],
};

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Tecnolife Celulares — Venda, Troca e Manutenção com Garantia" },
      {
        name: "description",
        content:
          "Tecnolife Celulares em Vargem Alegre-MG: venda, troca e manutenção de celulares, acessórios, informática e gravação a laser. Garantia e atendimento rápido.",
      },
      { property: "og:title", content: "Tecnolife Celulares — Tecnologia e Confiança" },
      {
        property: "og:description",
        content:
          "Venda, troca e manutenção de celulares com qualidade, garantia e atendimento rápido. Fale conosco pelo WhatsApp.",
      },
      { property: "og:image", content: heroImg.url },
      { property: "og:image:width", content: "1920" },
      { property: "og:image:height", content: "1280" },
      { property: "og:url", content: "/" },
      { name: "twitter:image", content: heroImg.url },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(localBusiness),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(faqSchema),
      },
      ...(GA_MEASUREMENT_ID
        ? [
            {
              src: `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`,
              async: true,
            },
            {
              children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}');`,
            },
          ]
        : []),
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="conteudo">
        <Hero />
        <Services />
        <Brands />
        <Differentials />
        <HowItWorks />
        <About />
        <FAQ />
        <FinalCTA />
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <Suspense fallback={null}>
        <WhatsAppFAB />
      </Suspense>
    </div>
  );
}
