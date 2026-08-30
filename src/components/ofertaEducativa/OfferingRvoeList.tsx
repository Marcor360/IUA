import { rvoeOfferingsForProgram } from "../../data/programOfferings";

export default function OfferingRvoeList({ programId, compact = false }: { programId: string; compact?: boolean }) {
  const offerings = rvoeOfferingsForProgram(programId);
  if (!offerings.length) return null;

  return (
    <div className={`offering-rvoe-list${compact ? " offering-rvoe-list--compact" : ""}`} aria-label="Ofertas con Reconocimiento de Validez Oficial de Estudios">
      {offerings.map(({ offering, rvoe }) => (
        <p className="offering-rvoe" key={offering.id}><strong>RVOE: {rvoe.number}</strong></p>
      ))}
    </div>
  );
}
