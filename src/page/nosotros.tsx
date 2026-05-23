import { Link } from "react-router-dom";
import {
  IconArrowRight as ArrowRight,
  IconBook as Book,
  IconBrandWhatsapp as BrandWhatsapp,
  IconBulb as Bulb,
  IconCheck as Check,
  IconCircleCheck as CircleCheck,
  IconHeartHandshake as HeartHandshake,
  IconMapPin as MapPin,
  IconSchool as School,
  IconShieldCheck as ShieldCheck,
  IconTargetArrow as Target,
  IconUsersGroup as UsersGroup
} from "@tabler/icons-react";
import { usePageSeo } from "../utils/seo";

type Pillar = {
  title: string;
  text: string;
};

type Campus = {
  name: string;
  text: string;
  img: string;
};

const whatsappUrl = "https://api.whatsapp.com/send?phone=+2201349213&text=Hola";

const pillars: Pillar[] = [
  { title: "Formación académica", text: "Programas educativos orientados al aprendizaje sólido y estructurado." },
  { title: "Práctica y aplicación", text: "Conocimientos que se conectan con situaciones reales." },
  { title: "Acompañamiento docente", text: "Profesores comprometidos con el desarrollo de cada estudiante." },
  { title: "Valores humanos", text: "Formación basada en respeto, responsabilidad y compromiso." },
  { title: "Pensamiento crítico", text: "Capacidad para analizar, decidir y resolver problemas." },
  { title: "Preparación para el futuro", text: "Herramientas académicas y personales para enfrentar nuevos retos." }
];

const reasons = [
  "Formación académica con enfoque integral.",
  "Docentes comprometidos con tu aprendizaje.",
  "Educación basada en valores.",
  "Acompañamiento durante tu proceso formativo.",
  "Programas pensados para tu desarrollo personal y profesional.",
  "Espacios diseñados para fortalecer tu experiencia educativa.",
  "Una comunidad que cree en tu potencial."
];

const campuses: Campus[] = [
  {
    name: "Campus Chalco",
    text: "Un espacio educativo comprometido con la formación académica y humana de sus estudiantes.",
    img: "/recuadros/chalco-recuadro-recorte-900x900.webp"
  },
  {
    name: "Campus Los Reyes",
    text: "Educación cercana, acompañamiento docente y programas orientados al desarrollo estudiantil.",
    img: "/recuadros/los-reyes-recuadro-recorte-900x900.webp"
  },
  {
    name: "Campus Texcoco",
    text: "Un plantel enfocado en brindar una experiencia educativa integral y de calidad.",
    img: "/recuadros/biblioteca-recuadro-recorte-900x900.webp"
  },
  {
    name: "Conecta IUA - Plantel virtual",
    text: "Una alternativa flexible para quienes buscan continuar sus estudios desde cualquier lugar.",
    img: "/banners-edu/educacion en linea.webp"
  }
];

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-iua-gold">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-black tracking-tight text-neutral-950 md:text-4xl">{title}</h2>
      {text ? <p className="mt-4 text-base leading-7 text-neutral-600">{text}</p> : null}
    </div>
  );
}

export default function Nosotros() {
  usePageSeo({
    title: "Nosotros | Universidad IUA",
    description: "Conoce Universidad IUA, su misión, visión, modelo educativo, docentes, campus y compromiso con la formación académica y humana.",
    path: "/nosotros",
    image: "/banners/plantel-calco1-banner-recorte-1920x700.webp"
  });

  return (
    <main className="min-h-screen bg-white text-neutral-950">
      <section className="relative overflow-hidden bg-iua-dark px-5 py-16 text-white md:px-6 md:py-20">
        <img
          src="/banners/plantel-calco1-banner-recorte-1920x700.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center opacity-55"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-linear-to-r from-iua-dark/88 via-iua-burgundy/58 to-iua-dark/30" />
        <div className="relative mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.95fr_1.05fr] md:items-center">
          <div className="animate-fade-in">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white/90 backdrop-blur">
              <School size={16} /> Somos IUA
            </p>
            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl">
              Educación con propósito, formación con futuro
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/86 sm:text-lg sm:leading-8">
              En IUA creemos que la educación transforma vidas cuando combina conocimiento, valores, acompañamiento y visión profesional.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link to="/oferta" className="inline-flex items-center justify-center gap-2 rounded-xl bg-iua-gold px-7 py-4 text-sm font-black text-iua-dark shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#d4a13a]">
                Conoce nuestra oferta <ArrowRight size={18} />
              </Link>
              <a href={whatsappUrl} className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 text-sm font-black text-iua-burgundy shadow-xl shadow-black/10 transition hover:-translate-y-0.5 hover:bg-iua-cream">
                Inicia tu inscripción <BrandWhatsapp size={18} />
              </a>
            </div>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/12 p-5 backdrop-blur md:p-7">
            <h2 className="text-2xl font-black">Somos IUA</h2>
            <p className="mt-3 text-sm leading-7 text-white/82">
              Somos una institución comprometida con la formación académica, humana y profesional de nuestros estudiantes, impulsando su crecimiento con valores, acompañamiento docente y programas educativos orientados al futuro.
            </p>
            <p className="mt-3 text-sm leading-7 text-white/82">
              Nuestro propósito es formar estudiantes capaces de pensar, decidir y actuar con responsabilidad. Estudiar en IUA es prepararte para avanzar con propósito.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-6">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div>
            <SectionHeading
              eyebrow="Quiénes somos"
              title="Una institución enfocada en formar estudiantes preparados para la vida"
              text="En IUA trabajamos para ofrecer una educación integral, cercana y orientada al desarrollo de cada estudiante."
            />
            <p className="mt-5 text-base leading-8 text-neutral-600">
              Nuestro modelo educativo busca que el aprendizaje no se quede solo en la teoría, sino que también se refleje en la práctica, en la toma de decisiones y en la capacidad de resolver problemas reales.
            </p>
            <p className="mt-4 text-base leading-8 text-neutral-600">
              Formamos estudiantes con bases académicas sólidas, pensamiento crítico, responsabilidad social y valores humanos.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl shadow-xl shadow-neutral-900/10">
            <img
              src="/banners/educacion-2-banner-recorte-1920x700.webp"
              alt="Comunidad estudiantil IUA"
              className="aspect-video w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      <section className="bg-iua-cream px-5 py-16 md:px-6">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">
          <article className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-black/5">
            <Target size={38} className="text-iua-gold" />
            <h2 className="mt-4 text-2xl font-black text-iua-burgundy">Misión</h2>
            <p className="mt-3 text-base leading-8 text-neutral-600">
              Formar profesionistas y estudiantes críticos de su entorno social, capaces de desarrollarse con responsabilidad, ética y compromiso. En IUA impulsamos una educación humanista, académica y práctica que contribuya al crecimiento personal, profesional y social de nuestra comunidad estudiantil.
            </p>
          </article>
          <article className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-black/5">
            <Bulb size={38} className="text-iua-gold" />
            <h2 className="mt-4 text-2xl font-black text-iua-burgundy">Visión</h2>
            <p className="mt-3 text-base leading-8 text-neutral-600">
              Consolidarnos como una institución educativa reconocida por su calidad académica, formación en valores, innovación educativa y compromiso con el desarrollo de nuestros estudiantes. Buscamos ser una opción confiable para quienes desean prepararse, crecer y alcanzar nuevas oportunidades.
            </p>
          </article>
        </div>
      </section>

      <section className="px-5 py-16 md:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Modelo educativo"
            title="Aprender, practicar y crecer"
            text="Nuestro modelo educativo está diseñado para acompañar al estudiante durante su formación académica y fortalecer sus capacidades personales y profesionales."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((pillar) => (
              <article key={pillar.title} className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-iua-gold/40 hover:shadow-xl hover:shadow-neutral-900/10">
                <CircleCheck size={24} className="text-iua-gold" />
                <h3 className="mt-4 text-lg font-black text-neutral-950">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{pillar.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 px-5 py-16 md:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
          <article className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-black/5">
            <UsersGroup size={38} className="text-iua-gold" />
            <h2 className="mt-4 text-3xl font-black tracking-tight text-neutral-950">Docentes comprometidos con la formación de nuestros estudiantes</h2>
            <p className="mt-4 text-base leading-8 text-neutral-600">
              En IUA contamos con docentes preparados, responsables y comprometidos con la enseñanza. Nuestro personal académico acompaña a los estudiantes en su proceso de aprendizaje, impulsando la participación, el análisis y la aplicación de los conocimientos.
            </p>
          </article>
          <article className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
            <img
              src="/banners/salon-1-banner-recorte-1920x700.webp"
              alt="Salón de clases IUA"
              className="aspect-video w-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="p-7">
              <h2 className="text-3xl font-black tracking-tight text-neutral-950">Espacios pensados para aprender mejor</h2>
              <p className="mt-4 text-base leading-8 text-neutral-600">
                Nuestras instalaciones están diseñadas para brindar un entorno adecuado para el aprendizaje, la convivencia y el desarrollo académico.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="px-5 py-16 md:px-6">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-start">
          <div>
            <SectionHeading
              eyebrow="Por qué elegir IUA"
              title="Una educación cercana, humana y orientada al futuro"
              text="Elegir IUA es formar parte de una comunidad educativa que acompaña tu crecimiento y te impulsa a avanzar."
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {reasons.map((reason) => (
              <div key={reason} className="flex gap-3 rounded-xl border border-black/5 bg-white p-4 shadow-sm">
                <Check size={20} className="mt-0.5 shrink-0 text-iua-gold" />
                <p className="text-sm font-semibold leading-6 text-neutral-700">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-iua-cream px-5 py-16 md:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Campus IUA"
              title="Cerca de ti, cerca de tu futuro"
              text="Cada campus representa nuestro compromiso con la formación académica, el crecimiento personal y el desarrollo de nuevas oportunidades."
            />
            <Link to="/campus" className="inline-flex items-center justify-center gap-2 rounded-xl bg-iua-burgundy px-6 py-3 text-sm font-black text-white shadow-lg shadow-iua-burgundy/20 transition hover:-translate-y-0.5 hover:bg-iua-dark">
              Ver campus <MapPin size={17} />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {campuses.map((campus) => (
              <article key={campus.name} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-neutral-900/10">
                <img
                  src={campus.img}
                  alt={campus.name}
                  className="aspect-video w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="p-5">
                  <h3 className="text-xl font-black text-neutral-950">{campus.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">{campus.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-6">
        <div className="relative mx-auto overflow-hidden rounded-3xl bg-iua-dark p-7 text-white shadow-2xl shadow-iua-burgundy/20 md:max-w-7xl md:p-10">
          <img
            src="/banners/sala-banner-recorte-1920x700.webp"
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center opacity-35"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-linear-to-r from-iua-dark/90 via-iua-burgundy/72 to-iua-dark/50" />
          <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-iua-gold text-iua-dark">
                <HeartHandshake size={30} />
              </div>
              <h2 className="text-3xl font-black tracking-tight md:text-4xl">Da el siguiente paso en tu formación</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/78">
                Tu futuro comienza con una decisión. En IUA te acompañamos para que puedas prepararte, crecer y alcanzar tus metas académicas y profesionales.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <Link to="/oferta" className="inline-flex items-center justify-center gap-2 rounded-xl bg-iua-gold px-7 py-4 text-sm font-black text-iua-dark shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#d4a13a]">
                Ver oferta educativa <Book size={18} />
              </Link>
              <a href={whatsappUrl} className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 text-sm font-black text-iua-burgundy shadow-xl shadow-black/10 transition hover:-translate-y-0.5 hover:bg-iua-cream">
                Hablar con un asesor <BrandWhatsapp size={18} />
              </a>
              <a href={whatsappUrl} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 px-7 py-4 text-sm font-black text-white transition hover:bg-white/10">
                Iniciar inscripción <ShieldCheck size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
