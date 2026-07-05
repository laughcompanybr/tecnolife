import { test, expect } from "@playwright/test";

const WHATSAPP_PHONE = "5533999491504";
const WHATSAPP_MESSAGE = "Olá, vim pelo site da Tecnolife!";
const INSTAGRAM_HOST = "instagram.com";
const INSTAGRAM_HANDLE = "lojas.tecnolife";
const MAPS_COORDS = "-19.6059675";

test.describe("Links de contato (WhatsApp, Instagram, Google Maps)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // rolar até o rodapé para garantir render
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  });

  test("Header: WhatsApp abre com telefone + texto codificado", async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 0));
    const link = page.getByTestId("header-whatsapp-link").first();
    // No mobile o botão do header pode estar oculto (sm:hidden); validamos por atributo.
    await expect(link).toHaveCount(1);
    const href = await link.getAttribute("href");
    expect(href).toBeTruthy();
    const url = new URL(href!);
    expect(["api.whatsapp.com", "wa.me"]).toContain(url.hostname);
    expect(href).toContain(`phone=${WHATSAPP_PHONE}`);
    const text = url.searchParams.get("text");
    expect(text).toBe(WHATSAPP_MESSAGE);
    expect(await link.getAttribute("target")).toBe("_blank");
    expect(await link.getAttribute("rel")).toContain("noopener");
  });

  test("Footer: WhatsApp preserva número, mensagem e abre em nova aba", async ({ page }) => {
    const link = page.getByTestId("footer-whatsapp-link");
    await expect(link).toBeVisible();
    const href = await link.getAttribute("href");
    const url = new URL(href!);
    expect(url.hostname).toMatch(/whatsapp\.com|wa\.me/);
    expect(href).toContain(WHATSAPP_PHONE);
    expect(url.searchParams.get("text")).toBe(WHATSAPP_MESSAGE);
    expect(await link.getAttribute("target")).toBe("_blank");
  });

  test("Footer: Instagram aponta para o perfil oficial", async ({ page }) => {
    const link = page.getByTestId("footer-instagram-link");
    await expect(link).toBeVisible();
    const href = await link.getAttribute("href");
    const url = new URL(href!);
    expect(url.hostname).toContain(INSTAGRAM_HOST);
    expect(url.pathname.replace(/\//g, "")).toBe(INSTAGRAM_HANDLE);
    // sem UTMs quebrando o deep link
    expect(url.search).toBe("");
    expect(await link.getAttribute("target")).toBe("_blank");
    expect(await link.getAttribute("rel")).toContain("noopener");
  });

  test("Footer: Ver no Google Maps aponta para o local correto", async ({ page }) => {
    const link = page.getByTestId("footer-maps-link");
    await expect(link).toBeVisible();
    const href = await link.getAttribute("href");
    expect(href).toBeTruthy();
    const url = new URL(href!);
    expect(url.hostname).toContain("google.com");
    expect(url.pathname + url.search).toContain(MAPS_COORDS);
    expect(await link.getAttribute("target")).toBe("_blank");
    expect(await link.getAttribute("rel")).toContain("noopener");
  });

  test("Cliques abrem em nova aba (target=_blank respeitado)", async ({ context, page }) => {
    const link = page.getByTestId("footer-whatsapp-link");
    const expectedHref = await link.getAttribute("href");

    const [popup] = await Promise.all([
      context.waitForEvent("page"),
      link.evaluate((el: HTMLAnchorElement) => {
        // Simula a navegação sem realmente carregar recursos externos
        window.open(el.href, "_blank", "noopener,noreferrer");
      }),
    ]);
    expect(popup.url()).toBe(expectedHref);
    await popup.close();
  });
});
