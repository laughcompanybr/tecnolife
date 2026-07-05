import { test, expect } from "@playwright/test";

test.describe("Brands carousel", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator("#marcas").scrollIntoViewIfNeeded();
    await page.waitForSelector("#marcas [role=region][aria-roledescription=carrossel]");
  });

  test("ARIA structure and initial live region", async ({ page }) => {
    const region = page.locator(
      '#marcas [role=region][aria-roledescription=carrossel]',
    );
    await expect(region).toHaveAttribute("aria-labelledby", "marcas-titulo");
    const live = region.locator('[aria-live="polite"]').first();
    await expect(live).toContainText(/Slide 1 de \d+/);
    // Dots tablist
    const dots = page.getByTestId("brands-dots").getByRole("tab");
    expect(await dots.count()).toBeGreaterThan(1);
  });

  test("keyboard navigation on carousel region updates live region", async ({
    page,
  }) => {
    const region = page.locator(
      '#marcas [role=region][aria-roledescription=carrossel]',
    );
    const live = region.locator('[aria-live="polite"]').first();
    await region.focus();
    await region.press("ArrowRight");
    await expect(live).toContainText(/Slide 2 de/);
    await region.press("ArrowLeft");
    await expect(live).toContainText(/Slide 1 de/);
    await region.press("End");
    await expect(live).toContainText(/Slide \d+ de/);
  });

  test("dots: arrow keys move selection and update live region", async ({
    page,
  }) => {
    const live = page
      .locator('#marcas [role=region] [aria-live="polite"]')
      .first();
    const dot0 = page.getByTestId("brands-dot-0");
    await expect(dot0).toHaveAttribute("aria-selected", "true");
    // Let the responsive perPage effect settle before capturing focus.
    await page.waitForTimeout(800);
    await dot0.focus();
    await expect(dot0).toBeFocused();
    await dot0.press("ArrowRight");
    const dot1 = page.getByTestId("brands-dot-1");
    await expect(dot1).toHaveAttribute("aria-selected", "true");
    await expect(live).toContainText(/Slide 2 de/);
    await expect(dot1).toBeFocused();
    await dot1.press("Home");
    await expect(dot0).toHaveAttribute("aria-selected", "true");
    await expect(live).toContainText(/Slide 1 de/);
    await expect(dot0).toBeFocused();
  });

  test("focus-visible ring on prev/next and dots", async ({ page }) => {
    test.skip(
      test.info().project.name === "mobile",
      "prev/next hidden on mobile",
    );
    const prev = page.getByTestId("brands-prev");
    await prev.focus();
    const prevShadow = await prev.evaluate(
      (el) => getComputedStyle(el).boxShadow,
    );
    expect(prevShadow).not.toBe("none");

    const dot0 = page.getByTestId("brands-dot-0");
    await dot0.focus();
    const dotShadow = await dot0.evaluate(
      (el) => getComputedStyle(el).boxShadow,
    );
    expect(dotShadow).not.toBe("none");
  });
});

test.describe("Brands carousel — swipe (mobile)", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile", "mobile only");
    await page.goto("/");
    await page.locator("#marcas").scrollIntoViewIfNeeded();
    await page.waitForSelector("#marcas [role=region][aria-roledescription=carrossel]");
  });

  test("horizontal swipe advances slide", async ({ page }) => {
    const live = page
      .locator('#marcas [role=region] [aria-live="polite"]')
      .first();
    await expect(live).toContainText(/Slide 1 de/);

    const track = page.locator("#marcas .overflow-hidden").first();
    const box = await track.boundingBox();
    if (!box) throw new Error("no track box");
    const y = box.y + box.height / 2;
    const startX = box.x + box.width * 0.8;
    const endX = box.x + box.width * 0.2;

    // Simulate a touch swipe using CDP touch dispatch via page.touchscreen-like API.
    await page.mouse.move(startX, y);
    await page.mouse.down();
    const steps = 12;
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      await page.mouse.move(startX + (endX - startX) * t, y, { steps: 1 });
    }
    await page.mouse.up();
    await page.waitForTimeout(600);
    await expect(live).toContainText(/Slide 2 de/);
  });

  test("vertical drag scrolls page and does not change slide", async ({
    page,
  }) => {
    const live = page
      .locator('#marcas [role=region] [aria-live="polite"]')
      .first();
    await expect(live).toContainText(/Slide 1 de/);

    const before = await page.evaluate(() => window.scrollY);
    await page.evaluate(() => window.scrollBy(0, 300));
    await page.waitForTimeout(200);
    const after = await page.evaluate(() => window.scrollY);
    expect(after).toBeGreaterThan(before);
    await expect(live).toContainText(/Slide 1 de/);
  });
});
