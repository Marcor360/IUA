import { IconBrandWhatsapp, IconFileText } from "@tabler/icons-react";
import { useContactModal } from "../../context/ContactModalContext";
import { whatsappUrl } from "../../config/institution";
import type { ProgramaOferta } from "../../data/ofertaEducativa";

export default function CtaBlock({ program }: { program: ProgramaOferta }) {
  const { openContactModal } = useContactModal();
  return (
    <section className="program-cta">
      <div>
        <p className="program-cta__eyebrow">Inscripciones IUA</p>
        <h2>Da el siguiente paso hacia tu futuro profesional</h2>
        <p>
          Solicita información, conoce nuestras becas disponibles y recibe asesoría para iniciar tu proceso de inscripción en IUA.
        </p>
      </div>
      <div className="program-cta__actions">
        <a href={whatsappUrl(`Hola, quiero recibir información sobre ${program.title}.`)} target="_blank" rel="noreferrer" className="oferta-button oferta-button--light">
          Solicitar información por WhatsApp <IconBrandWhatsapp size={18} />
        </a>
        <button onClick={() => openContactModal({ programId: program.id })} className="oferta-button oferta-button--outline-light">
          Ver plan de estudios <IconFileText size={18} />
        </button>
      </div>
    </section>
  );
}
