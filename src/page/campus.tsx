import { type ComponentType, useState, useEffect } from "react";
import {
  IconArrowRight as ArrowRight,
  IconBuildingCommunity as BuildingCommunity,
  IconCalendarEvent as Calendar,
  IconChevronLeft as ChevronLeft,
  IconChevronRight as ChevronRight,
  IconDeviceLaptop as Laptop,
  IconExternalLink as ExternalLink,
  IconMapPin as MapPin,
  IconSchool as School,
  IconWorld as World,
  IconX as X
} from "@tabler/icons-react";
import { usePageSeo } from "../utils/seo";

type IconComponent = ComponentType<{ size?: number | string; className?: string }>;

type CampusSummary = {
  id: string;
  title: string;
  text: string;
  icon: IconComponent;
};

type CampusDetail = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  text: string[];
  address?: string[];
  highlight?: {
    title: string;
    text: string;
  };
  image: string;
  imageAlt: string;
  visitUrl: string;
  visitLabel?: string;
  mapUrl?: string;
  mapEmbed?: string;
  reverse?: boolean;
  gallery?: string[];
};

const leadFormUrl = "https://apps.clientify.net/formbuilderembed/simpleembed/#/success/twostepformpopup/171625/45670";

const summaries: CampusSummary[] = [
  {
    id: "campus-chalco",
    title: "Campus Chalco",
    text: "Formación escolarizada, espacios académicos y atención cercana para estudiantes.",
    icon: BuildingCommunity
  },
  {
    id: "campus-reyes",
    title: "Campus Reyes",
    text: "Ubicación accesible, acompañamiento institucional y oferta educativa integral.",
    icon: School
  },
  {
    id: "campus-texcoco",
    title: "Plantel Texcoco",
    text: "Sede de Conecta IUA y punto de atención para programas en línea.",
    icon: Laptop
  },
  {
    id: "campus-en-linea",
    title: "Conecta IUA - Plantel virtual",
    text: "Estudia desde cualquier lugar con acompañamiento académico y acceso a programas flexibles.",
    icon: World
  }
];

const campusDetails: CampusDetail[] = [
  {
    id: "campus-chalco",
    eyebrow: "Campus escolarizado",
    title: "IUA Campus Chalco",
    text: [
      "IUA Campus Chalco ofrece un entorno académico enfocado en la formación práctica, el acompañamiento estudiantil y el desarrollo profesional. Sus instalaciones están pensadas para facilitar el aprendizaje, la convivencia y el trabajo académico dentro de un ambiente ordenado y accesible.",
      "Este campus es ideal para estudiantes que buscan una experiencia escolarizada con atención cercana, espacios funcionales y una comunidad educativa comprometida con su crecimiento."
    ],
    address: ["Carretera Chalco-Mixquic", "San Mateo Huitzilzingo, Chalco", "Estado de México, C.P. 56625"],
    image: "/banners/chalco-banner-recorte-1920x700.webp",
    imageAlt: "IUA Campus Chalco",
    visitUrl: "https://reuniones.clientify.com/#/iua/chalco",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=IUA%20Campus%20Chalco%20Carretera%20Chalco-Mixquic%20San%20Mateo%20Huitzilzingo%20Chalco%20Estado%20de%20Mexico",
    mapEmbed: "https://www.google.com/maps?q=IUA%20Campus%20Chalco%20Carretera%20Chalco-Mixquic%20San%20Mateo%20Huitzilzingo%20Chalco%20Estado%20de%20Mexico&output=embed",
    gallery: Array.from({ length: 6 }, (_, i) => `/recuadros/iua-chalco-recuadro-${String(i + 1).padStart(2, "0")}.webp`)
  },
  {
    id: "campus-reyes",
    eyebrow: "Campus integral",
    title: "IUA Campus Reyes",
    text: [
      "IUA Campus Reyes es un espacio educativo integral que acompaña a los estudiantes en diferentes etapas de su formación. Su propuesta académica está orientada al desarrollo de habilidades, disciplina, preparación profesional y crecimiento personal.",
      "Este campus destaca por su ubicación, atención institucional y oferta educativa para quienes buscan iniciar, continuar o fortalecer su preparación académica en un entorno cercano y estructurado."
    ],
    address: ["Avenida Texcoco número 51", "Los Reyes, La Paz", "Estado de México, C.P. 56400"],
    image: "/banners/los-reyes-banner-recorte-1920x700.webp",
    imageAlt: "IUA Campus Reyes",
    visitUrl: "https://reuniones.clientify.com/#/iua/reyes",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=IUA%20Campus%20Reyes%20Avenida%20Texcoco%2051%20Los%20Reyes%20La%20Paz%20Estado%20de%20Mexico%2056400",
    mapEmbed: "https://www.google.com/maps?q=IUA%20Campus%20Reyes%20Avenida%20Texcoco%2051%20Los%20Reyes%20La%20Paz%20Estado%20de%20Mexico%2056400&output=embed",
    reverse: true,
    gallery: Array.from({ length: 36 }, (_, i) => `/recuadros/iua-reyes-recuadro-${String(i + 1).padStart(2, "0")}.webp`)
  },
  {
    id: "campus-texcoco",
    eyebrow: "Plantel",
    title: "IUA Texcoco",
    subtitle: "Plantel Texcoco",
    text: [
      "IUA Texcoco funciona como un plantel académico enfocado en brindar atención, orientación y acceso a programas de nivel superior y posgrado. Es un punto clave para estudiantes que buscan opciones flexibles, acompañamiento institucional y continuidad académica.",
      "Además, este centro es sede de Conecta IUA - Plantel virtual, lo que permite acercar la formación profesional a estudiantes que desean avanzar en sus estudios con mayor flexibilidad."
    ],
    highlight: {
      title: "También es sede de Conecta IUA",
      text: "Desde Texcoco se fortalece la atención para estudiantes de programas en línea, brindando acompañamiento académico y orientación institucional."
    },
    image: "/banners/biblioteca-banner-recorte-1920x700.webp",
    imageAlt: "IUA Texcoco Plantel",
    visitUrl: "https://reuniones.clientify.com/#/iua/texcoco",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=IUA%20Texcoco%20Plantel%20Texcoco",
    mapEmbed: "https://www.google.com/maps?q=IUA%20Texcoco%20Plantel%20Texcoco&output=embed"
  },
  {
    id: "campus-en-linea",
    eyebrow: "Modalidad flexible",
    title: "Conecta IUA - Plantel virtual",
    text: [
      "Conecta IUA - Plantel virtual permite continuar tus estudios desde cualquier lugar, con una experiencia flexible pensada para estudiantes que necesitan combinar su formación académica con trabajo, familia u otras actividades.",
      "Esta modalidad ofrece acompañamiento académico, orientación institucional y acceso a programas diseñados para avanzar con mayor libertad, manteniendo el compromiso formativo de Universidad IUA."
    ],
    highlight: {
      title: "Estudia desde donde estés",
      text: "Recibe asesoría para conocer programas disponibles, requisitos, becas y el proceso de inscripción en línea."
    },
    image: "/banners-edu/educacion en linea.webp",
    imageAlt: "Conecta IUA - Plantel virtual",
    visitUrl: leadFormUrl,
    visitLabel: "Solicitar información",
    reverse: true
  }
];

function CampusDetailSection({ campus }: { campus: CampusDetail }) {
  const [showAll, setShowAll] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Close lightbox on escape key and support arrow keys for navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowRight" && lightboxIndex !== null && campus.gallery) {
        setLightboxIndex((prev) => (prev! + 1) % campus.gallery!.length);
      } else if (e.key === "ArrowLeft" && lightboxIndex !== null && campus.gallery) {
        setLightboxIndex((prev) => (prev! - 1 + campus.gallery!.length) % campus.gallery!.length);
      }
    };
    if (lightboxIndex !== null) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, campus.gallery]);

  // Disable page scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  const copy = (
    <div>
      <p className="text-xs font-black uppercase tracking-[0.22em] text-iua-gold">{campus.eyebrow}</p>
      <h2 className={`mt-3 font-black tracking-tight text-neutral-950 ${campus.id === "campus-en-linea" ? "text-3xl md:text-4xl lg:text-5xl" : "text-3xl md:text-5xl"}`}>{campus.title}</h2>
      {campus.subtitle ? <h3 className="mt-2 text-2xl font-black text-iua-burgundy">{campus.subtitle}</h3> : null}
      <div className="mt-5 space-y-4">
        {campus.text.map((paragraph) => (
          <p key={paragraph} className="text-base leading-8 text-neutral-600">{paragraph}</p>
        ))}
      </div>

      {campus.address ? (
        <div className="mt-7 rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
          <h3 className="flex items-center gap-2 text-xl font-black text-neutral-950"><MapPin size={22} className="text-iua-gold" /> Dirección</h3>
          <p className="mt-3 text-sm leading-7 text-neutral-600">
            {campus.address.map((line) => (
              <span key={line}>{line}<br /></span>
            ))}
          </p>
        </div>
      ) : null}

      {campus.highlight ? (
        <div className="mt-7 rounded-2xl border-l-4 border-iua-gold bg-white p-5 shadow-sm ring-1 ring-black/5">
          <h3 className="text-xl font-black text-neutral-950">{campus.highlight.title}</h3>
          <p className="mt-2 text-sm leading-7 text-neutral-600">{campus.highlight.text}</p>
        </div>
      ) : null}

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <a href={campus.visitUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-iua-burgundy px-6 py-3 text-sm font-black text-white shadow-lg shadow-iua-burgundy/20 transition hover:-translate-y-0.5 hover:bg-iua-dark">
          {campus.visitLabel ?? "Agendar visita"} <Calendar size={17} />
        </a>
        {campus.mapUrl ? (
          <a href={campus.mapUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border border-iua-burgundy bg-white px-6 py-3 text-sm font-black text-iua-burgundy transition hover:bg-iua-cream">
            Abrir en Google Maps <ExternalLink size={17} />
          </a>
        ) : null}
      </div>
    </div>
  );

  const media = (
    <div className="overflow-hidden rounded-3xl shadow-2xl shadow-neutral-900/15">
      <img src={campus.image} alt={campus.imageAlt} className="aspect-video h-full w-full object-cover md:aspect-4/3" loading="lazy" decoding="async" />
    </div>
  );

  const hasGallery = campus.gallery && campus.gallery.length > 0;
  const visibleImages = hasGallery
    ? showAll
      ? campus.gallery!
      : campus.gallery!.slice(0, 8)
    : [];

  const gallerySection = hasGallery ? (
    <div className="mt-16 border-t border-black/5 pt-12">
      <div className="max-w-2xl mb-8">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-iua-gold">Recorrido Visual</p>
        <h3 className="mt-2 text-2xl font-black text-neutral-950 md:text-3xl">Conoce las instalaciones</h3>
        <p className="mt-2 text-sm text-neutral-600">Imágenes reales de nuestro {campus.title}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
        {visibleImages.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setLightboxIndex(idx)}
            className="group relative aspect-square overflow-hidden rounded-2xl border border-black/5 bg-neutral-100 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-iua-gold/20"
          >
            <img
              src={img}
              alt={`Instalaciones ${campus.title}`}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/25 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-iua-burgundy shadow-md backdrop-blur-xs">Ampliar</span>
            </div>
          </button>
        ))}
      </div>

      {campus.gallery!.length > 8 && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-iua-burgundy bg-white px-6 py-3 text-sm font-black text-iua-burgundy transition hover:bg-iua-cream"
          >
            {showAll ? "Mostrar menos" : `Mostrar más fotos (+${campus.gallery!.length - 8})`}
          </button>
        </div>
      )}
    </div>
  ) : null;

  const lightboxModal = lightboxIndex !== null && campus.gallery ? (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 p-4 backdrop-blur-md animate-fade-in"
      onClick={() => setLightboxIndex(null)}
    >
      <button
        onClick={() => setLightboxIndex(null)}
        className="absolute right-5 top-5 z-55 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 hover:scale-105"
        aria-label="Cerrar galería"
      >
        <X size={24} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          setLightboxIndex((prev) => (prev! - 1 + campus.gallery!.length) % campus.gallery!.length);
        }}
        className="absolute left-5 z-55 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 hover:scale-105"
        aria-label="Imagen anterior"
      >
        <ChevronLeft size={24} />
      </button>

      <div
        className="relative max-h-[85vh] max-w-[90vw] overflow-hidden rounded-2xl shadow-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={campus.gallery[lightboxIndex].replace("/recuadros/", "/banners/").replace("-recuadro-", "-banner-")}
          alt={`Instalaciones ${campus.title}`}
          className="max-h-[85vh] max-w-[90vw] object-contain animate-rise"
        />
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          setLightboxIndex((prev) => (prev! + 1) % campus.gallery!.length);
        }}
        className="absolute right-5 z-55 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 hover:scale-105"
        aria-label="Imagen siguiente"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-5 text-sm font-bold text-white/80">
        {lightboxIndex + 1} de {campus.gallery.length}
      </div>
    </div>
  ) : null;

  return (
    <section id={campus.id} className={`px-5 py-16 md:px-6 ${campus.reverse ? "bg-white" : "bg-iua-cream"}`}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          {campus.reverse ? media : copy}
          {campus.reverse ? copy : media}
        </div>

        {gallerySection}

        {campus.mapEmbed ? (
          <div className="mt-10 overflow-hidden rounded-3xl border border-black/10 bg-white shadow-xl shadow-neutral-900/10">
            <iframe
              title={`Mapa ${campus.title}`}
              src={campus.mapEmbed}
              width="100%"
              height="420"
              className="block w-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        ) : null}
      </div>
      {lightboxModal}
    </section>
  );
}

export default function Campus() {
  usePageSeo({
    title: "Campus IUA | Chalco, Reyes, Texcoco y en línea",
    description: "Conoce los campus IUA en Chalco, Reyes, Texcoco y la modalidad en línea. Agenda una visita y recibe orientación sobre programas, becas e inscripción.",
    path: "/campus",
    image: "/banners/patio-1-banner-recorte-1920x700.webp"
  });

  return (
    <main className="min-h-screen bg-white text-neutral-950">
      <section className="relative overflow-hidden bg-iua-dark px-5 py-16 text-white md:px-6 md:py-24">
        <img src="/banners/patio-1-banner-recorte-1920x700.webp" alt="" className="absolute inset-0 h-full w-full object-cover object-center opacity-55" fetchPriority="high" />
        <div className="absolute inset-0 bg-linear-to-r from-iua-dark/92 via-iua-burgundy/68 to-iua-dark/40" />
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white/90 backdrop-blur">
              <BuildingCommunity size={16} /> Campus IUA
            </p>
            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl">Conoce nuestros campus IUA</h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-white/86 sm:text-lg sm:leading-8">
              En IUA contamos con espacios académicos diseñados para acompañar tu formación desde distintos niveles educativos. Nuestros campus integran aulas, áreas de aprendizaje, servicios escolares y atención personalizada para que puedas estudiar en un entorno preparado para tu desarrollo académico y profesional.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="#campus-chalco" className="inline-flex items-center justify-center gap-2 rounded-xl bg-iua-gold px-7 py-4 text-sm font-black text-iua-dark shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#d4a13a]">
                Ver campus <ArrowRight size={18} />
              </a>
              <a href="#agenda-visita" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 text-sm font-black text-iua-burgundy shadow-xl shadow-black/10 transition hover:-translate-y-0.5 hover:bg-iua-cream">
                Agendar una visita <Calendar size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-iua-gold">Elige tu sede</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-neutral-950 md:text-4xl">Encuentra el campus más cercano a ti</h2>
            <p className="mt-4 text-base leading-7 text-neutral-600">
              Agenda una visita, conoce nuestras instalaciones y recibe orientación sobre oferta educativa, becas, procesos de inscripción, revalidación y modalidades de estudio.
            </p>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {summaries.map(({ id, title, text, icon: Icon }) => (
              <a key={id} href={`#${id}`} className="group rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-iua-gold/40 hover:shadow-xl hover:shadow-neutral-900/10">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-iua-cream text-iua-burgundy">
                  <Icon size={29} />
                </div>
                <h3 className="text-2xl font-black leading-tight text-neutral-950">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{text}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {campusDetails.map((campus) => (
        <CampusDetailSection key={campus.id} campus={campus} />
      ))}

      <section id="agenda-visita" className="relative overflow-hidden bg-iua-dark px-5 py-16 text-white md:px-6">
        <img src="/banners/alumnos-1-banner-recorte-1920x700.webp" alt="" className="absolute inset-0 h-full w-full object-cover object-center opacity-35" loading="lazy" decoding="async" />
        <div className="absolute inset-0 bg-linear-to-r from-iua-dark/92 via-iua-burgundy/82 to-iua-dark/62" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-iua-gold">Agenda tu visita</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">Conoce el campus que mejor se adapta a ti</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/78">
            Agenda una visita y recibe orientación personalizada sobre programas académicos, requisitos de inscripción, becas, modalidades de estudio y servicios disponibles.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            {campusDetails.map((campus) => (
              <a key={campus.id} href={campus.visitUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 text-sm font-black text-iua-burgundy shadow-xl shadow-black/10 transition hover:-translate-y-0.5 hover:bg-iua-cream">
                {campus.id === "campus-chalco" ? "Chalco" : campus.id === "campus-reyes" ? "Reyes" : campus.id === "campus-texcoco" ? "Texcoco" : "En línea"}
                <ExternalLink size={17} />
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
