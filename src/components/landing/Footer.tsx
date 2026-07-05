import { useEffect, useRef, useState } from "react";
import { MessageCircle, Instagram, MapPin, Phone, ExternalLink } from "lucide-react";
import logoAsset from "@/assets/tecnolife-logo.png.asset.json";
import { whatsappUrl, instagramUrl, INSTAGRAM_FALLBACK_URL } from "@/components/Header";
import { trackWhatsAppClick, trackInstagramClick } from "@/lib/analytics";

// Localização exata da Tecnolife (coordenadas do Google Maps)
const MAPS_LAT = -19.6059675;
const MAPS_LNG = -42.2993804;
const MAPS_FALLBACK_URL = `https://www.google.com/maps?q=${MAPS_LAT},${MAPS_LNG}`;
const MAPS_URL =
  "https://www.google.com/maps/place/Tecnolife+-+Manuten%C3%A7%C3%B5es+e+acess%C3%B3rios/@-19.6059769,-42.2993117,20.25z/data=!4m6!3m5!1s0xbaa17d4236cc67:0x2bda2b3ef18c0643!8m2!3d-19.6059675!4d-42.2993804!16s%2Fg%2F11sx0npn7l";
const MAPS_EMBED_URL = `https://www.google.com/maps?q=${MAPS_LAT},${MAPS_LNG}&z=19&output=embed`;
function safeMapsUrl(): string {
  try {
    new URL(MAPS_URL);
    return MAPS_URL;
  } catch {
    return MAPS_FALLBACK_URL;
  }
}
function safeInstagramUrl(): string {
  try {
    return instagramUrl();
  } catch {
    return INSTAGRAM_FALLBACK_URL;
  }
}
const INSTAGRAM_URL = safeInstagramUrl();
const PHONE_DISPLAY = "(33) 99949-1504";
const PHONE_TEL = "tel:+5533999491504";

export function Footer() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [mapVisible, setMapVisible] = useState(false);

  useEffect(() => {
    const node = mapRef.current;
    if (!node || mapVisible) return;
    if (typeof IntersectionObserver === "undefined") {
      setMapVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setMapVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [mapVisible]);

  return (
    <footer id="contato" className="bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid gap-10 md:grid-cols-3">
        <div>
          <div className="inline-flex items-center rounded-xl border border-border/60 bg-card/80 px-4 py-3 shadow-sm backdrop-blur-sm">
            <img
              src={logoAsset.url}
              alt="Tecnolife Celulares"
              width={200}
              height={64}
              loading="lazy"
              decoding="async"
              className="h-14 w-auto max-w-[220px] object-contain drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]"
            />
          </div>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-sm">
            Tecnologia, confiança e praticidade em um só lugar. Especialistas em celulares,
            informática e gravação a laser.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-foreground uppercase tracking-wider text-sm">
            Onde estamos
          </h3>
          <address className="mt-4 not-italic text-sm text-muted-foreground leading-relaxed">
            Av. Cândido Machado, 34 - Centro
            <br />
            Vargem Alegre - MG, 35199-000
          </address>
          <figure
            className="mt-4"
            aria-labelledby="mapa-titulo"
            aria-describedby="mapa-desc"
          >
            <figcaption id="mapa-titulo" className="sr-only">
              Localização da Tecnolife Celulares no Google Maps
            </figcaption>
            <p id="mapa-desc" className="sr-only">
              Mapa interativo mostrando a Av. Cândido Machado, 34 - Centro,
              Vargem Alegre - MG. Use Tab para focar o mapa e as setas do
              teclado para navegar. Para uma experiência completa, utilize o
              botão "Ver no Google Maps" logo abaixo, que abre o endereço em
              uma nova aba.
            </p>
            <div
              ref={mapRef}
              className="overflow-hidden rounded-xl border border-border shadow-lg bg-muted"
              style={{ minHeight: 220 }}
            >
              {mapVisible ? (
                <iframe
                  title="Mapa da Tecnolife Celulares - Av. Cândido Machado, 34, Vargem Alegre - MG"
                  aria-label="Mapa interativo com a localização da Tecnolife Celulares em Vargem Alegre - MG"
                  src={MAPS_EMBED_URL}
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="flex h-[220px] w-full items-center justify-center text-muted-foreground text-xs"
                >
                  Carregando mapa…
                </div>
              )}
            </div>
          </figure>
          <a
            href={safeMapsUrl()}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="footer-maps-link"
            className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md hover:brightness-110 transition w-fit"
            aria-label="Ver endereço no Google Maps (abre em nova aba)"
          >
            <MapPin className="h-4 w-4" aria-hidden="true" /> Ver no Google Maps
            <ExternalLink className="h-3.5 w-3.5 opacity-80" aria-hidden="true" />
          </a>
        </div>

        <div>
          <h3 className="font-semibold text-foreground uppercase tracking-wider text-sm">
            Fale conosco
          </h3>
          <div className="mt-4 flex flex-col gap-3">
            <a
              href={whatsappUrl("footer")}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="footer-whatsapp-link"
              onClick={() => trackWhatsAppClick("footer")}
              aria-label="Falar no WhatsApp (abre em nova aba)"
              className="inline-flex items-center gap-2 btn-whatsapp rounded-full px-5 py-2.5 text-sm font-semibold w-fit"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp
            </a>

            <a
              href={PHONE_TEL}
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:bg-muted transition w-fit"
              aria-label={`Ligar para ${PHONE_DISPLAY}`}
            >
              <Phone className="h-4 w-4" aria-hidden="true" /> {PHONE_DISPLAY}
            </a>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="footer-instagram-link"
              onClick={() => trackInstagramClick("footer")}
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:bg-muted transition w-fit"
              aria-label="Abrir Instagram @lojas.tecnolife (abre em nova aba)"
            >
              <Instagram className="h-4 w-4" aria-hidden="true" /> @lojas.tecnolife
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-center text-xs text-muted-foreground">
          © 2026 Tecnolife Celulares. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
