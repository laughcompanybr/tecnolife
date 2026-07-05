import { useCallback, useEffect, useId, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Brand = { name: string; domain: string };

const brands: Brand[] = [
  { name: "Apple", domain: "apple.com" },
  { name: "Samsung", domain: "samsung.com" },
  { name: "Motorola", domain: "motorola.com" },
  { name: "Xiaomi", domain: "mi.com" },
  { name: "ASUS", domain: "asus.com" },
  { name: "Dell", domain: "dell.com" },
  { name: "Lenovo", domain: "lenovo.com" },
  { name: "LG", domain: "lg.com" },
  { name: "JBL", domain: "jbl.com" },
];

const LOGO_TOKEN = import.meta.env.VITE_CONNECTOR_LOGO_DEV_API_KEY;

function logoUrl(domain: string) {
  return `https://img.logo.dev/${domain}?token=${LOGO_TOKEN}&size=160&format=png&retina=true`;
}

function BrandLogo({ brand }: { brand: Brand }) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className="group relative flex h-16 w-full items-center justify-center rounded-xl px-3 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.06]"
      title={brand.name}
    >
      {failed ? (
        <span className="text-base font-bold tracking-tight text-foreground/80">
          {brand.name}
        </span>
      ) : (
        <img
          src={logoUrl(brand.domain)}
          alt={`Logo oficial da ${brand.name}`}
          width={144}
          height={56}
          loading="lazy"
          decoding="async"
          draggable={false}
          onError={() => setFailed(true)}
          className="max-h-12 w-auto select-none object-contain drop-shadow-[0_1px_2px_rgba(0,0,0,0.08)] transition-[filter,transform] duration-300 ease-out group-hover:drop-shadow-[0_8px_20px_rgba(0,0,0,0.18)]"
        />
      )}
    </div>
  );
}

function usePerPage() {
  const [perPage, setPerPage] = useState(3);
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w >= 1024) setPerPage(6);
      else if (w >= 768) setPerPage(4);
      else if (w >= 640) setPerPage(3);
      else setPerPage(2);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);
  return perPage;
}

export function Brands() {
  const perPage = usePerPage();
  const totalPages = Math.max(1, Math.ceil(brands.length / perPage));
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const regionId = useId();
  const liveId = `${regionId}-live`;
  const dotsRef = useRef<Array<HTMLButtonElement | null>>([]);

  // Clamp page when perPage changes
  useEffect(() => {
    setPage((p) => Math.min(p, totalPages - 1));
  }, [totalPages]);

  const go = useCallback(
    (dir: 1 | -1) => setPage((p) => (p + dir + totalPages) % totalPages),
    [totalPages],
  );

  // Autoplay
  useEffect(() => {
    if (paused || totalPages <= 1) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    const id = window.setInterval(() => go(1), 3500);
    return () => window.clearInterval(id);
  }, [paused, totalPages, go]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    } else if (e.key === "Home") {
      e.preventDefault();
      setPage(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setPage(totalPages - 1);
    }
  };

  // Swipe / drag — horizontal only, does not hijack vertical scroll.
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    startX: number;
    startY: number;
    active: boolean;
    locked: boolean;
    pointerId: number | null;
  }>({ startX: 0, startY: 0, active: false, locked: false, pointerId: null });
  const [dragDx, setDragDx] = useState(0);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      active: true,
      locked: false,
      pointerId: e.pointerId,
    };
    setPaused(true);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d.active) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    if (!d.locked) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      // If vertical intent, cancel drag so page can scroll.
      if (Math.abs(dy) > Math.abs(dx)) {
        d.active = false;
        setDragDx(0);
        return;
      }
      d.locked = true;
      try {
        (e.target as Element).setPointerCapture?.(e.pointerId);
      } catch {
        /* noop */
      }
    }
    setDragDx(dx);
  };
  const endDrag = (commit: boolean) => {
    const d = dragRef.current;
    if (!d.active) {
      setPaused(false);
      return;
    }
    const width = trackRef.current?.clientWidth ?? 1;
    const threshold = Math.min(80, width * 0.15);
    if (commit && Math.abs(dragDx) > threshold) {
      go(dragDx < 0 ? 1 : -1);
    }
    dragRef.current = {
      startX: 0,
      startY: 0,
      active: false,
      locked: false,
      pointerId: null,
    };
    setDragDx(0);
    setPaused(false);
  };

  // Split brands into pages
  const pages: Brand[][] = Array.from({ length: totalPages }, (_, i) =>
    brands.slice(i * perPage, i * perPage + perPage),
  );
  const currentBrands = pages[page] ?? [];

  return (
    <section
      id="marcas"
      className="py-16 bg-background border-y border-border overflow-hidden"
      aria-labelledby="marcas-titulo"
    >
      <div
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(e) => {
          // Only unpause when focus leaves the whole subtree
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
            setPaused(false);
          }
        }}
      >
        <p
          id="marcas-titulo"
          className="text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground"
        >
          Marcas que atendemos
        </p>

        <div
          className="mt-10 relative"
          role="region"
          aria-roledescription="carrossel"
          aria-labelledby="marcas-titulo"
          aria-describedby={liveId}
          tabIndex={0}
          onKeyDown={onKeyDown}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          {/* Live region announcing current slide to assistive tech */}
          <div id={liveId} className="sr-only" aria-live="polite" aria-atomic="true">
            Slide {page + 1} de {totalPages}:{" "}
            {currentBrands.map((b) => b.name).join(", ")}
          </div>

          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Marcas anteriores"
            data-testid="brands-prev"
            className="absolute left-0 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 p-2 text-foreground shadow-sm transition hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:flex"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Próximas marcas"
            data-testid="brands-next"
            className="absolute right-0 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 p-2 text-foreground shadow-sm transition hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:flex"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>

          <div
            ref={trackRef}
            className="overflow-hidden sm:px-12"
            style={{ touchAction: "pan-y" }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={() => endDrag(true)}
            onPointerCancel={() => endDrag(false)}
          >
            <div
              className="flex"
              style={{
                width: `${totalPages * 100}%`,
                transform: `translateX(calc(${(-page * 100) / totalPages}% + ${dragDx}px))`,
                transition: dragRef.current.active
                  ? "none"
                  : "transform 500ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
              aria-live="off"
            >
              {pages.map((group, gi) => (
                <div
                  key={gi}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Slide ${gi + 1} de ${totalPages}`}
                  aria-hidden={gi !== page}
                  className="grid shrink-0 items-center gap-6 px-2 sm:gap-10"
                  style={{
                    width: `${100 / totalPages}%`,
                    gridTemplateColumns: `repeat(${perPage}, minmax(0, 1fr))`,
                  }}
                >
                  {group.map((b) => (
                    <BrandLogo key={b.name} brand={b} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dots */}
        {totalPages > 1 && (
          <div
            className="mt-6 flex items-center justify-center gap-2"
            role="tablist"
            aria-label="Selecionar slide de marcas"
            data-testid="brands-dots"
            onKeyDown={(e) => {
              let next = page;
              if (e.key === "ArrowRight") next = (page + 1) % totalPages;
              else if (e.key === "ArrowLeft")
                next = (page - 1 + totalPages) % totalPages;
              else if (e.key === "Home") next = 0;
              else if (e.key === "End") next = totalPages - 1;
              else return;
              e.preventDefault();
              flushSync(() => setPage(next));
              const el = document.querySelector<HTMLButtonElement>(
                `[data-testid="brands-dot-${next}"]`,
              );
              el?.focus();
            }}
          >
            {pages.map((_, i) => {
              const active = i === page;
              return (
                <button
                  key={i}
                  ref={(el) => {
                    dotsRef.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-label={`Ir para o slide ${i + 1} de ${totalPages}`}
                  data-testid={`brands-dot-${i}`}
                  tabIndex={active ? 0 : -1}
                  onClick={() => setPage(i)}
                  className={`h-2.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    active
                      ? "w-6 bg-primary"
                      : "w-2.5 bg-muted-foreground/40 hover:bg-muted-foreground/70"
                  }`}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
