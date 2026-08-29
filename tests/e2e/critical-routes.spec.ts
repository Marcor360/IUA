import { expect, test } from "@playwright/test";

for (const [path, heading] of [
  ["/", /Universidad IUA/i], ["/oferta", /Oferta educativa IUA/i], ["/oferta/psicologia", /Psicología/i],
  ["/campus/reyes", /Campus Reyes/i], ["/rvoe", /RVOE/i], ["/que-carrera-estudiar", /Qué carrera estudiar/i], ["/contacto", /listos para orientarte/i]
] as const) {
  test(`${path} renders its primary heading`, async ({ page }) => {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(path === "/" ? "/$" : `${path}$`));
  });
}

test("unknown routes return a real noindex 404", async ({ request, page }) => {
  const response = await request.get("/esta-ruta-no-existe-12345");
  expect(response.status()).toBe(404);
  await page.goto("/esta-ruta-no-existe-12345");
  await expect(page.getByRole("heading", { level: 1, name: /pagina no encontrada/i })).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, follow");
});

test("cookie preferences can be reopened", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /solo necesarias/i }).click();
  await page.getByRole("button", { name: /configurar cookies/i }).click();
  await expect(page.getByRole("dialog", { name: /configuracion de cookies/i })).toBeVisible();
});

test("quiz starts and finishes all questions", async ({ page }) => {
  await page.goto("/que-carrera-estudiar");
  await page.getByRole("button", { name: /comenzar test/i }).click();
  for (let index = 0; index < 20; index += 1) await page.locator(".quiz-options button").first().click();
  await expect(page.getByRole("heading", { name: /resultados vocacionales generales/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /opciones relacionadas disponibles/i })).toBeVisible();
});

test("mobile navigation opens and reaches the offer", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile-only navigation assertion");
  await page.goto("/");
  await page.getByRole("button", { name: /abrir menu/i }).click();
  await page.getByRole("link", { name: /^oferta$/i }).first().click();
  await expect(page).toHaveURL(/\/oferta$/);
});

test("campus programs use an accessible dropdown", async ({ page }) => {
  await page.goto("/campus");
  const dropdown = page.locator("#campus-chalco .campus-programs__dropdown");
  await expect(dropdown).not.toHaveAttribute("open", "");
  await dropdown.locator("summary").click();
  await expect(dropdown).toHaveAttribute("open", "");
  await expect(dropdown.getByRole("link", { name: /licenciatura en psicolog/i })).toBeVisible();
});

test("navbar hides on downward scroll and returns on upward scroll", async ({ page }) => {
  await page.goto("/");
  const header = page.locator(".site-header");
  await page.evaluate(() => window.scrollTo(0, 900));
  await expect(header).toHaveClass(/site-header--hidden/);
  await page.evaluate(() => window.scrollTo(0, 500));
  await expect(header).toHaveClass(/site-header--visible/);
});
