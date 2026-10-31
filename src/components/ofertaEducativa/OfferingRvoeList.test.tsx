import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import OfferingRvoeList from "./OfferingRvoeList";

describe("OfferingRvoeList", () => {
  it("no renderiza texto RVOE si el programa no tiene un registro confirmado", () => {
    expect(renderToStaticMarkup(<OfferingRvoeList programId="secundaria" />)).not.toContain("RVOE");
  });

  it("muestra el número junto con la institución, modalidad y fecha que distinguen cada registro", () => {
    const html = renderToStaticMarkup(<OfferingRvoeList programId="derecho" />);
    expect(html).toContain("RVOE: 20220259");
    expect(html).toContain("RVOE: 20100134");
    expect(html).toContain("RVOE: 20220839");
    expect(html).toContain("Instituto Universitario Anáhuac Plantel los Reyes");
    expect(html).toContain("Escolarizada");
    expect(html).toContain("08/02/2010");
  });
});
