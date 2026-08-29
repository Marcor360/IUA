import { expect, test } from "@playwright/test";

for (const [path, heading] of [
  ["/", /Universidad IUA/i], ["/oferta", /Oferta educativa IUA/i], ["/oferta/psicologia", /Psicología/i],
  ["/campus/reyes", /Campus Reyes/i], ["/rvoe", /RVOE/i], ["/que-carrera-estudiar", /Qué carrera estudiar/i], ["/contacto", /Contacto/i]
] as const) {
  test(`${path} renders its primary heading`, async ({ page }) => {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(path === "/" ? "/$" : `${path}$`));
  });
}

test("unknown routes return a real 404", async ({ request }) => {
  const response = await request.get("/ruta-que-no-existe");
  expect(response.status()).toBe(404);
});

test("cookie preferences can be reopened", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /rechazar/i }).click();
  await page.getByRole("button", { name: /cambiar preferencias de cookies/i }).click();
  await expect(page.getByRole("dialog", { name: /configuracion de cookies/i })).toBeVisible();
});
