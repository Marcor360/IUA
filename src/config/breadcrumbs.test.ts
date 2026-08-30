import { describe, expect, it } from "vitest";
import { campusBreadcrumbs, programBreadcrumbs, sectionBreadcrumbs } from "./breadcrumbs";
import { breadcrumbSchema } from "../utils/structuredData";

describe("breadcrumbs", () => {
  it("crea jerarquías de programa y campus con rutas reales", () => {
    expect(programBreadcrumbs({ title: "Licenciatura en Derecho", slug: "derecho" }).map(({ name }) => name)).toEqual(["Inicio", "Oferta educativa", "Licenciatura en Derecho"]);
    expect(campusBreadcrumbs({ shortName: "Campus Reyes", slug: "reyes" }).map(({ name }) => name)).toEqual(["Inicio", "Campus", "Campus Reyes"]);
  });

  it("crea las jerarquías simples solicitadas", () => {
    expect(sectionBreadcrumbs("rvoe").map(({ name }) => name)).toEqual(["Inicio", "RVOE"]);
    expect(sectionBreadcrumbs("quiz").map(({ name }) => name)).toEqual(["Inicio", "¿Qué carrera estudiar?"]);
  });

  it("alimenta el schema con el mismo orden, nombre y URL", () => {
    const visible = programBreadcrumbs({ title: "Licenciatura en Derecho", slug: "derecho" });
    const schema = breadcrumbSchema(visible);
    expect(schema.itemListElement.map(({ position, name, item }) => ({ position, name, item }))).toEqual([
      { position: 1, name: "Inicio", item: "https://iua.edu.mx/" },
      { position: 2, name: "Oferta educativa", item: "https://iua.edu.mx/oferta" },
      { position: 3, name: "Licenciatura en Derecho", item: "https://iua.edu.mx/oferta/derecho" }
    ]);
  });
});
