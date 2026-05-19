import { IconBrandWhatsapp, IconFileText } from "@tabler/icons-react";

const whatsappUrl = "https://api.whatsapp.com/send?phone=+2201349213&text=Hola";
const leadFormUrl = "https://apps.clientify.net/formbuilderembed/simpleembed/#/success/twostepformpopup/171625/45670";

export default function CtaBlock() {
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
        <a href={leadFormUrl} target="_blank" rel="noreferrer" className="oferta-button oferta-button--outline-light">
          Ver plan de estudios <IconFileText size={18} />
        </a>
      </div>
    </section>
  );
}
