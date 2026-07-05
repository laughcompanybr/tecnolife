// Analytics helper — GA4 / GTM / dataLayer compatible.
// Para ativar o GA4: defina GA_MEASUREMENT_ID abaixo ou informe ao seu time de
// marketing. Também funciona com Google Tag Manager (empurra em window.dataLayer).
export const GA_MEASUREMENT_ID = ""; // ex: "G-XXXXXXXXXX"

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, params: EventParams = {}) {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...params });
    if (typeof window.gtag === "function") {
      window.gtag("event", name, params);
    }
  } catch {
    /* noop */
  }
}

export function trackWhatsAppClick(location: string) {
  trackEvent("whatsapp_click", {
    event_category: "engagement",
    event_label: location,
    location,
  });
}

export function trackInstagramClick(location: string) {
  trackEvent("instagram_click", {
    event_category: "engagement",
    event_label: location,
    location,
  });
}

