import { describe, expect, it } from "vitest";
import { ofertaEducativa } from "../data/ofertaEducativa";
import { breadcrumbSchema, educationalProgramSchema, organizationSchema } from "./structuredData";

describe("structured data", () => {
  it("uses a stable institutional entity id", () => {
    expect(organizationSchema()["@id"]).toBe("https://iua.edu.mx/#organization");
  });

  it("generates ordered breadcrumbs", () => {
    const schema = breadcrumbSchema([{ name: "Inicio", path: "/" }, { name: "Oferta", path: "/oferta" }]);
    expect(schema.itemListElement.map((item) => item.position)).toEqual([1, 2]);
  });

  it("does not invent RVOE properties in program schema", () => {
    const schema = educationalProgramSchema(ofertaEducativa[0]);
    expect(schema["@type"]).toBe("EducationalOccupationalProgram");
    expect(JSON.stringify(schema)).not.toMatch(/rvoe|recognition/i);
  });
});
