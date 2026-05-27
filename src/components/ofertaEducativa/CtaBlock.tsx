import { IconBrandWhatsapp, IconFileText } from "@tabler/icons-react";
import { useContactModal } from "../../context/ContactModalContext";

const whatsappUrl = "https://api.whatsapp.com/send?phone=+2201349213&text=Hola";

export default function CtaBlock() {
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
        <a href={whatsappUrl} target="_blank" rel="noreferrer" className="oferta-button oferta-button--light">
          Solicitar información por WhatsApp <IconBrandWhatsapp size={18} />
        </a>
        <button onClick={openContactModal} className="oferta-button oferta-button--outline-light">
          Ver plan de estudios <IconFileText size={18} />
        </button>
      </div>
    </section>
  );
}
