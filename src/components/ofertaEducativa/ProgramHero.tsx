import { IconBrandWhatsapp, IconChecklist, IconClockHour4 } from "@tabler/icons-react";
import type { ProgramaOferta } from "../../data/ofertaEducativa";
import { useContactModal } from "../../context/ContactModalContext";

const whatsappUrl = "https://api.whatsapp.com/send?phone=+2201349213&text=Hola";

export default function ProgramHero({ program }: { program: ProgramaOferta }) {
  const { openContactModal } = useContactModal();
  const Icon = program.icon;

  return (
    <section
      className="program-hero"
      style={
        program.banner
          ? {
              backgroundImage: `linear-gradient(135deg, rgb(78 7 16 / 0.94), rgb(122 14 26 / 0.84)), url("${program.banner}")`
            }
          : undefined
      }
    >
      <div className="program-hero__inner">
        <div>
          <p className="program-hero__eyebrow">{program.level}</p>
          <h1>{program.title}</h1>
          <p className="program-hero__description">{program.heroDescription}</p>
          <div className="program-hero__badges">
            {program.badges.map((badge) => (
              <span key={badge}>{badge}</span>
            ))}
          </div>
          <div className="program-hero__actions">
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="oferta-button oferta-button--light">
              Solicitar información por WhatsApp <IconBrandWhatsapp size={18} />
            </a>
            <button onClick={openContactModal} className="oferta-button oferta-button--outline-light">
              Ver plan de estudios <IconChecklist size={18} />
            </button>
          </div>
        </div>

        <aside className="program-hero__panel" aria-label="Resumen del programa">
          <div className="program-hero__icon"><Icon size={38} /></div>
          <dl>
            <div>
              <dt>Duración</dt>
              <dd>{program.duration}</dd>
            </div>
            <div>
              <dt>Periodo</dt>
              <dd>{program.terms}</dd>
            </div>
            <div>
              <dt>Modalidades</dt>
              <dd>{program.modalities.join(", ")}</dd>
            </div>
          </dl>
          <p className="program-hero__note"><IconClockHour4 size={17} /> Horarios y disponibilidad sujetos a sede.</p>
        </aside>
      </div>
    </section>
  );
}
