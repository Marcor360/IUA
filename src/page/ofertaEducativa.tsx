import { useMemo, useState } from "react";
import { IconArrowRight, IconBrandWhatsapp, IconSearch } from "@tabler/icons-react";
import CareerCard from "../components/ofertaEducativa/CareerCard";
import { ofertaEducativa } from "../data/ofertaEducativa";
import { usePageSeo } from "../utils/seo";
import "../styles/ofertaEducativa.css";

const whatsappUrl = "https://api.whatsapp.com/send?phone=+2201349213&text=Hola";

const levelFilters = ["Todos", "Secundaria", "Bachillerato", "Licenciaturas", "Maestrías", "Doctorado", "En línea"];

function normalizeText(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export default function OfertaEducativa() {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [selectedCampus, setSelectedCampus] = useState("Todos");
  const [search, setSearch] = useState("");

  usePageSeo({
    title: "Oferta Educativa IUA | Licenciaturas, Maestrías, Doctorado y Preparatoria",
    description: "Conoce la amplia oferta educativa de Universidad IUA. Ofrecemos secundaria, preparatoria, licenciaturas, maestrías y doctorado en modalidades escolarizada, ejecutiva (sábados) y en línea.",
    keywords: ["oferta educativa iua", "carreras universitarias", "licenciaturas iua", "estudiar maestria iua", "universidades en chalco y los reyes", "carreras en linea", "licenciaturas ejecutivas", "doctorado en derecho", "bachillerato general", "licenciaturas con rvoe"],
    path: "/oferta",
    image: "/banners/educacion-2-banner-recorte-1920x700.webp"
  });

  const campusOptions = useMemo(() => {
    const campus = new Set(ofertaEducativa.flatMap((program) => program.campus));
    return ["Todos", ...Array.from(campus)];
  }, []);

  const filteredPrograms = useMemo(() => {
    const query = normalizeText(search.trim());

    return ofertaEducativa.filter((program) => {
      const matchesLevel =
        activeFilter === "Todos" ||
        (activeFilter === "Licenciaturas" && program.level === "Licenciatura") ||
        (activeFilter === "Maestrías" && program.level === "Maestría") ||
        (activeFilter === "En línea" && program.modalities.includes("En línea")) ||
        program.level === activeFilter;

      const matchesCampus = selectedCampus === "Todos" || program.campus.includes(selectedCampus);

      const searchable = normalizeText([
        program.title,
        program.level,
        program.shortDescription,
        ...program.modalities,
        ...program.campus
      ].join(" "));

      return matchesLevel && matchesCampus && searchable.includes(query);
    });
  }, [activeFilter, search, selectedCampus]);

  return (
    <main className="oferta-page">
      <section className="oferta-hero">
        <div className="oferta-hero__inner">
          <div>
            <p className="oferta-hero__eyebrow">Universidad IUA</p>
            <h1>Oferta educativa IUA</h1>
            <p>
              Elige el programa que mejor se adapte a tu futuro profesional y estudia en modalidad escolarizada, ejecutiva o en línea, según disponibilidad.
            </p>
            <div className="oferta-hero__actions">
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="oferta-button">
                Solicitar información <IconBrandWhatsapp size={18} />
              </a>
              <a href="#programas" className="oferta-button oferta-button--secondary">
                Ver programas <IconArrowRight size={18} />
              </a>
            </div>
          </div>
          <div className="oferta-hero__stats" aria-label="Resumen de oferta educativa">
            <div><strong>{ofertaEducativa.length}</strong><span>programas</span></div>
            <div><strong>3</strong><span>modalidades</span></div>
            <div><strong>RVOE</strong><span>validez oficial</span></div>
          </div>
        </div>
      </section>

      <section id="programas" className="oferta-main">
        <div className="oferta-main__heading">
          <div>
            <p className="oferta-section-label">Programas académicos</p>
            <h2>Encuentra tu siguiente paso</h2>
          </div>
          <p>{filteredPrograms.length} programa{filteredPrograms.length === 1 ? "" : "s"} encontrado{filteredPrograms.length === 1 ? "" : "s"}</p>
        </div>

        <div className="oferta-tools" aria-label="Filtros de oferta educativa">
          <div className="oferta-filters" role="list" aria-label="Filtrar por nivel académico o modalidad">
            {levelFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={activeFilter === filter ? "is-active" : ""}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="oferta-controls">
            <label className="oferta-search">
              <IconSearch size={19} aria-hidden="true" />
              <span className="sr-only">Buscar programa académico</span>
              <input
                type="search"
                placeholder="Buscar programa académico..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
            <label className="oferta-campus-filter">
              <span>Campus</span>
              <select value={selectedCampus} onChange={(event) => setSelectedCampus(event.target.value)}>
                {campusOptions.map((campus) => (
                  <option key={campus} value={campus}>{campus}</option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {filteredPrograms.length > 0 ? (
          <div className="oferta-grid">
            {filteredPrograms.map((program) => (
              <CareerCard key={program.id} program={program} />
            ))}
          </div>
        ) : (
          <div className="oferta-empty">
            <h2>No encontramos programas con esos filtros</h2>
            <p>Prueba con otro nivel académico, campus, modalidad o término de búsqueda.</p>
            <button type="button" className="oferta-button" onClick={() => { setActiveFilter("Todos"); setSelectedCampus("Todos"); setSearch(""); }}>
              Limpiar filtros
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
