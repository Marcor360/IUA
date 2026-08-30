import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import OfferingRvoeList from "./OfferingRvoeList";

describe("OfferingRvoeList", () => {
  it("no renderiza texto RVOE si el programa no tiene un registro confirmado", () => {
    expect(renderToStaticMarkup(<OfferingRvoeList programId="secundaria" />)).not.toContain("RVOE");
  });

  it("renderiza únicamente la etiqueta y el número exacto", () => {
    const html = renderToStaticMarkup(<OfferingRvoeList programId="derecho" />);
    expect(html).toContain("RVOE: 20220259");
    expect(html).toContain("RVOE: 20100134");
    expect(html).toContain("RVOE: 20220839");
    expect(html).not.toContain("Modalidad");
    expect(html).not.toContain("Campus Reyes");
    expect(html).not.toContain("Ofertas con RVOE");
  });
});
