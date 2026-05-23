import { Link } from "react-router-dom";
import { IconArrowRight } from "@tabler/icons-react";
import type { ProgramaOferta } from "../../data/ofertaEducativa";

export default function CareerCard({ program }: { program: ProgramaOferta }) {
  const Icon = program.icon;

  return (
    <article className="oferta-card group overflow-hidden">
      {program.recuadro && (
        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-neutral-100 mb-4">
          <img
            src={program.recuadro}
            alt={program.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      )}
      <div className="oferta-card__icon">
        <Icon size={30} />
      </div>
      <p className="oferta-card__level">{program.level}</p>
      <h2 className="oferta-card__title">{program.title}</h2>
      <p className="oferta-card__description">{program.shortDescription}</p>

      <div className="oferta-card__group" aria-label={`Modalidades de ${program.title}`}>
        <span className="oferta-card__label">Modalidades</span>
        <div className="oferta-chip-list">
          {program.modalities.map((modality) => (
            <span key={modality} className="oferta-chip">{modality}</span>
          ))}
        </div>
      </div>

      <div className="oferta-card__group" aria-label={`Campus de ${program.title}`}>
        <span className="oferta-card__label">Campus</span>
        <div className="oferta-chip-list">
          {program.campus.map((campus) => (
            <span key={campus} className="oferta-chip oferta-chip--muted">{campus}</span>
          ))}
        </div>
      </div>

      <div className="oferta-card__footer">
        <Link to={`/oferta/${program.slug}`} className="oferta-card__button" aria-label={`Ver programa ${program.title}`}>
          Ver programa <IconArrowRight size={17} />
        </Link>
      </div>
    </article>
  );
}
