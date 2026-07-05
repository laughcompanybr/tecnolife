import { useEffect, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import logoAsset from "@/assets/tecnolife-logo.png.asset.json";
import { trackWhatsAppClick } from "@/lib/analytics";


export const WHATSAPP_PHONE = "5533999491504";
export const WHATSAPP_MESSAGE = "Olá, vim pelo site da Tecnolife!";
export const WHATSAPP_FALLBACK_URL = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}`;

export function whatsappUrl(_location: string): string {
  // wa.me só aceita `text` — parâmetros extras (utm_*) fazem o deep link
  // falhar em alguns clientes do WhatsApp. Mantemos a origem via analytics.
  try {
    const params = new URLSearchParams({ text: WHATSAPP_MESSAGE });
    const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&${params.toString()}`;
    // valida a URL final; se algo falhar, cai no fallback
    new URL(url);
    return url;
  } catch {
    return WHATSAPP_FALLBACK_URL;
  }
}

export const INSTAGRAM_HANDLE = "lojas.tecnolife";
export const INSTAGRAM_FALLBACK_URL = "https://instagram.com/lojas.tecnolife";
export function instagramUrl(): string {
  try {
    const url = `https://instagram.com/${encodeURIComponent(INSTAGRAM_HANDLE)}`;
    new URL(url);
    return url;
  } catch {
    return INSTAGRAM_FALLBACK_URL;
  }
}

const WHATSAPP_URL = whatsappUrl("header");

const nav = [
  { href: "#inicio", label: "Início" },
  { href: "#servicos", label: "Serviços" },
  { href: "#sobre", label: "Sobre" },
  { href: "#faq", label: "Perguntas Frequentes" },
  { href: "#contato", label: "Contato" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);


  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-lg shadow-[0_4px_20px_-8px_rgba(0,0,0,0.08)]"
          : "bg-background/60 backdrop-blur-sm"
      }`}
      role="banner"
    >
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-md"
      >
        Pular para o conteúdo
      </a>
      <div
        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-300 ${
          scrolled ? "h-16" : "h-20"
        }`}
      >
        <a href="#inicio" className="flex items-center gap-2 shrink-0" aria-label="Tecnolife Celulares - Ir ao início">
          <img
            src={logoAsset.url}
            alt="Tecnolife Celulares"
            className={`transition-all duration-300 ${scrolled ? "h-10" : "h-12"} w-auto`}
          />
        </a>

        <nav className="hidden lg:flex items-center gap-8" aria-label="Navegação principal">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm font-medium text-foreground/80 hover:text-primary-dark transition-colors relative after:absolute after:bottom-[-6px] after:left-0 after:h-0.5 after:w-0 after:bg-primary hover:after:w-full after:transition-all"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="header-whatsapp-link"
            aria-label="Falar no WhatsApp (abre em nova aba)"
            onClick={() => trackWhatsAppClick("header")}
            className="hidden sm:inline-flex items-center gap-2 btn-whatsapp rounded-full px-5 py-2.5 text-sm font-semibold"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Falar no WhatsApp
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden p-2 rounded-lg hover:bg-secondary transition min-h-11 min-w-11"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>


      {open && (
        <div id="mobile-nav" className="lg:hidden bg-background border-t border-border">
          <nav className="flex flex-col p-4 gap-1" aria-label="Navegação móvel">

            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-lg text-sm font-medium hover:bg-secondary transition"
              >
                {n.label}
              </a>
            ))}
            <a
              href={whatsappUrl("header_mobile")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackWhatsAppClick("header_mobile");
                setOpen(false);
              }}
              className="mt-2 inline-flex items-center justify-center gap-2 btn-whatsapp rounded-full px-5 py-3 text-sm font-semibold sm:hidden"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Falar no WhatsApp
            </a>

          </nav>
        </div>
      )}
    </header>
  );
}

export { WHATSAPP_URL };
