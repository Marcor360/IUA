import { useEffect, type ComponentType } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Link, Route, Routes, useLocation } from "react-router-dom";
import {
  IconArrowRight as ArrowRight,
  IconAward as Award,
  IconBook as BookOpen,
  IconBrain as Brain,
  IconBrandWhatsapp as BrandWhatsapp,
  IconBriefcase as Briefcase,
  IconBuilding as Building2,
  IconCalendarEvent as CalendarDays,
  IconCertificate as Certificate,
  IconChartBar as BarChart3,
  IconCheck as Check,
  IconCircleCheck as CheckCircle2,
  IconClock as Clock,
  IconDeviceLaptop as Laptop,
  IconDiscount2 as Discount,
  IconFileCheck as FileCheck2,
  IconGift as Gift,
  IconMapPin as MapPin,
  IconPalette as Palette,
  IconPhoneCall as PhoneCall,
  IconScale as Scale,
  IconSchool as GraduationCap,
  IconSparkles as Sparkles,
  IconUsersGroup as UsersGroup,
  IconWallet as Wallet
} from "@tabler/icons-react";
import BotonWats from "./components/botonWats";
import CookieConsent from "./components/cookieConsent";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import AvisoDePrivacidad from "./page/avisoDePrivacidad";
import Campus from "./page/campus";
import Comunidad from "./page/comunidad";
import Nosotros from "./page/nosotros";
import OfertaEducativa from "./page/ofertaEducativa";
import AdministracionDeEmpresasPage from "./page/ofertaEducativa/administracion-de-empresas";
import ArquitecturaPage from "./page/ofertaEducativa/arquitectura";
import ArtesCulinariasPage from "./page/ofertaEducativa/artes-culinarias";
import BachilleratoPage from "./page/ofertaEducativa/bachillerato";
import ContaduriaPublicaPage from "./page/ofertaEducativa/contaduria-publica";
import ContactoIua from "./page/ofertaEducativa/contactoiua";
import DerechoPage from "./page/ofertaEducativa/derecho";
import DisenoGraficoPage from "./page/ofertaEducativa/diseno-grafico";
import DoctoradoDerechoPage from "./page/ofertaEducativa/doctorado-derecho";
import IngenieriaEnSistemasComputacionalesPage from "./page/ofertaEducativa/ingenieria-en-sistemas-computacionales";
import LenguasExtranjerasPage from "./page/ofertaEducativa/lenguas-extranjeras";
import MaestriaDerechoPenalPage from "./page/ofertaEducativa/maestria-derecho-penal";
import MaestriaEducacionPage from "./page/ofertaEducativa/maestria-educacion";
import PedagogiaPage from "./page/ofertaEducativa/pedagogia";
import PsicologiaPage from "./page/ofertaEducativa/psicologia";
import SecundariaPage from "./page/ofertaEducativa/secundaria";
import { usePageSeo } from "./utils/seo";
import "./styles.css";

type IconComponent = ComponentType<{ size?: number | string; className?: string }>;

type IconTextItem = {
  icon: IconComponent;
  value?: string;
  title?: string;
  label?: string;
  text?: string;
};

type Modality = {
  title: string;
  text: string;
  points: string[];
};

type Program = {
  icon: IconComponent;
  label: string;
};

type Campus = {
  name: string;
  text: string;
  img: string;
  imgPosition?: string;
};

type PlaceholderPageProps = {
  title: string;
  description: string;
};

const whatsappUrl = "https://api.whatsapp.com/send?phone=+2201349213&text=Hola";
const leadFormUrl = "https://apps.clientify.net/formbuilderembed/simpleembed/#/success/twostepformpopup/171625/45670";

function ScrollToTop() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      window.setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: "instant", block: "start" });
      }, 0);
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [hash, pathname]);

  return null;
}

const imageAssets = {
  heroBanner: "/banners/alumnos-1-banner-recorte-1920x700.webp",
  scholarshipBanner: "/banners/educacion-4-banner-recorte-1920x700.webp"
};

const heroProof: IconTextItem[] = [
  { icon: Discount, value: "Becas", label: "para nuevo ingreso" },
  { icon: Certificate, value: "RVOE", label: "validez oficial" },
  { icon: MapPin, value: "3 campus", label: "cerca de ti" }
];

const trustStats: IconTextItem[] = [
  { icon: GraduationCap, value: "+10", label: "programas académicos" },
  { icon: Building2, value: "3", label: "campus escolarizados" },
  { icon: Award, value: "Becas", label: "y apoyos disponibles" },
  { icon: CalendarDays, value: "2026", label: "inscripciones abiertas" }
];

const benefits: IconTextItem[] = [
  { icon: Wallet, title: "Invierte con apoyo", text: "Pregunta por becas y opciones para iniciar sin frenar tus planes." },
  { icon: Clock, title: "Estudia sin complicarte", text: "Programas pensados para jóvenes y adultos que quieren avanzar." },
  { icon: Briefcase, title: "Enfoque profesional", text: "Carreras orientadas a habilidades útiles para tu siguiente etapa." },
  { icon: UsersGroup, title: "Acompañamiento cercano", text: "Recibe guía durante admisión, inscripción y elección de programa." }
];

const modalities: Modality[] = [
  { title: "Bachillerato", text: "Construye una base sólida para continuar tu proyecto académico.", points: ["Ambiente seguro", "Orientación académica", "Inicio accesible"] },
  { title: "Licenciaturas", text: "Elige una carrera con validez oficial y enfoque práctico.", points: ["Más de 10 opciones", "Becas disponibles", "Campus cercanos"] },
  { title: "Posgrados", text: "Especialízate y fortalece tu perfil profesional.", points: ["Avance profesional", "Acompañamiento", "Proceso simple"] }
];

const programs: Program[] = [
  { icon: Scale, label: "Derecho" },
  { icon: Brain, label: "Psicología" },
  { icon: BarChart3, label: "Administración" },
  { icon: Palette, label: "Diseño Gráfico" },
  { icon: BookOpen, label: "Pedagogía" },
  { icon: Laptop, label: "Ing. en Sistemas" }
];

const campuses: Campus[] = [
  { name: "Campus Chalco", text: "Instalaciones modernas y ambiente seguro.", img: "/recuadros/chalco-recuadro-recorte-900x900.webp", imgPosition: "center" },
  { name: "Campus Reyes", text: "Conéctate, aprende y transforma tu futuro.", img: "/recuadros/los-reyes-recuadro-recorte-900x900.webp", imgPosition: "center" },
  { name: "Campus Texcoco", text: "Educación de calidad cerca de ti.", img: "/recuadros/biblioteca-recuadro-recorte-900x900.webp", imgPosition: "center" }
];

const homeCampusCards: Campus[] = [
  { name: "Campus Chalco", text: "Un espacio educativo comprometido con la formación académica y humana de sus estudiantes.", img: "/recuadros/chalco-recuadro-recorte-900x900.webp", imgPosition: "center" },
  { name: "Campus Los Reyes", text: "Educación cercana, acompañamiento docente y programas orientados al desarrollo estudiantil.", img: "/recuadros/los-reyes-recuadro-recorte-900x900.webp", imgPosition: "center" },
  { name: "Campus Texcoco", text: "Un plantel enfocado en brindar una experiencia educativa integral y de calidad.", img: "/recuadros/biblioteca-recuadro-recorte-900x900.webp", imgPosition: "center" },
  { name: "Educación en línea", text: "Una alternativa flexible para quienes buscan continuar sus estudios desde cualquier lugar.", img: "/banners-edu/educacion en linea.webp", imgPosition: "center" }
];

function LeadForm() {
  return (
    <div id="formulario" className="animate-rise rounded-2xl bg-white p-5 shadow-2xl shadow-iua-dark/25 ring-1 ring-black/5 md:p-6">
      <div className="rounded-2xl bg-iua-cream p-4">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-black uppercase tracking-wide text-iua-burgundy shadow-sm">
          <Sparkles size={15} /> Nuevo ingreso
        </div>
        <h3 className="text-2xl font-black tracking-tight text-iua-burgundy">Recibe tu plan de inscripcion</h3>
        <p className="mt-1 text-sm leading-6 text-neutral-600">Un asesor te contacta para becas, campus y programa ideal.</p>
      </div>
      <a
        href={leadFormUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-iua-burgundy px-5 py-4 text-sm font-black text-white shadow-lg shadow-iua-burgundy/20 transition hover:-translate-y-0.5 hover:bg-iua-dark focus:outline-none focus:ring-4 focus:ring-iua-gold/20"
      >
        Quiero que me contacten <ArrowRight size={18} />
      </a>
    </div>
  );
}
function HeroProofCards() {
  return (
    <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-1">
      {heroProof.map(({ icon: Icon, value, label }) => (
        <div key={value} className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-3 text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/15 md:bg-white md:text-neutral-950 md:shadow-lg md:shadow-iua-dark/10 md:ring-1 md:ring-black/5 md:hover:bg-white">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-iua-gold md:bg-iua-cream md:text-iua-burgundy"><Icon size={23} /></div>
          <div>
            <p className="text-base font-black md:text-iua-burgundy">{value}</p>
            <p className="mt-0.5 text-xs font-semibold text-white/70 md:text-neutral-500">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-iua-dark">
      <div className="absolute inset-0 bg-iua-dark">
        <img
          src={imageAssets.heroBanner}
          alt=""
          className="h-full w-full object-cover object-center"
          fetchPriority="high"
        />
      </div>
      <div className="absolute inset-0 bg-linear-to-br from-iua-dark/78 via-iua-burgundy/62 to-iua-dark/38" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-10 md:min-h-160 md:grid-cols-[0.88fr_1.02fr] md:px-6 md:py-16 lg:gap-12">
        <div className="animate-fade-in text-white">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white/90 backdrop-blur">
            <Award size={16} /> Becas disponibles para nuevo ingreso
          </div>
          <h1 className="max-w-3xl text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl lg:text-5xl xl:text-6xl">
            Estudia en IUA y empieza tu futuro hoy
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/82 sm:text-lg sm:leading-8">
            Bachillerato, licenciaturas y posgrados con validez oficial, campus cercanos y un proceso de inscripción claro desde el primer contacto.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a href={leadFormUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-iua-gold px-7 py-4 text-sm font-black text-iua-dark shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#d4a13a]">
              Solicitar información <ArrowRight size={18} />
            </a>
            <a href={whatsappUrl} className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 text-sm font-black text-iua-burgundy shadow-xl shadow-black/10 transition hover:-translate-y-0.5 hover:bg-iua-cream">
              <BrandWhatsapp size={18} /> Hablar por WhatsApp
            </a>
          </div>

          <div className="mt-7 md:hidden"><HeroProofCards /></div>
        </div>

        <div className="relative">
          <div className="mb-4 hidden items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-3 text-white backdrop-blur md:flex">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-iua-gold text-iua-dark"><PhoneCall size={23} /></div>
            <div>
              <p className="text-sm font-black">Respuesta rápida</p>
              <p className="text-xs text-white/70">Te orientamos sobre beca, campus y requisitos.</p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-[0.52fr_1fr] md:items-start">
            <div className="hidden md:block md:pt-10"><HeroProofCards /></div>
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBand() {
  return (
    <section className="relative z-10 bg-white px-5 py-8 md:px-6 md:py-10">
      <div className="mx-auto grid max-w-7xl grid-cols-2 overflow-hidden rounded-2xl bg-white shadow-xl shadow-neutral-900/8 ring-1 ring-black/5 md:grid-cols-4">
        {trustStats.map(({ icon: Icon, value, label }) => (
          <div key={value} className="flex items-center gap-3 border-black/10 px-4 py-5 transition hover:bg-iua-cream/65 sm:px-6 md:border-l first:md:border-l-0">
            <Icon size={28} className="shrink-0 text-iua-gold" />
            <div>
              <p className="text-lg font-black text-iua-burgundy">{value}</p>
              <p className="text-sm leading-5 text-neutral-600">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function BenefitsSection() {
  return (
    <section className="bg-white px-5 py-16 md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-iua-gold">Por qué elegir IUA</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-neutral-950 md:text-4xl">Una decisión fácil de tomar y fácil de empezar</h2>
          </div>
          <p className="text-base leading-7 text-neutral-600">Primero confianza, luego beneficios concretos, después programa y finalmente contacto. La experiencia guia al usuario hacia admisiones sin sentirse forzada.</p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-iua-gold/40 hover:shadow-xl hover:shadow-neutral-900/10">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-iua-cream text-iua-burgundy"><Icon size={25} /></div>
              <h3 className="font-black text-neutral-950">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ModalitiesSection() {
  return (
    <section id="oferta" className="bg-iua-cream px-5 py-16 md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-iua-gold">Oferta académica</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-neutral-950 md:text-4xl">Elige cómo quieres avanzar</h2>
          </div>
          <a href={leadFormUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-iua-burgundy px-6 py-3 text-sm font-black text-white shadow-lg shadow-iua-burgundy/20 transition hover:-translate-y-0.5 hover:bg-iua-dark">
            Pedir plan de estudios <ArrowRight size={17} />
          </a>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {modalities.map((item) => (
            <article key={item.title} className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-neutral-900/10">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-iua-burgundy text-white transition group-hover:scale-105"><GraduationCap size={29} /></div>
              <h3 className="text-2xl font-black text-neutral-950">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600">{item.text}</p>
              <ul className="mt-5 space-y-3">
                {item.points.map((point) => (
                  <li key={point} className="flex items-center gap-2 text-sm font-semibold text-neutral-700"><CheckCircle2 size={18} className="text-iua-gold" /> {point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-6">
          {programs.map(({ icon: Icon, label }) => (
            <button key={label} className="flex min-h-14 items-center justify-center gap-2 rounded-xl border border-black/5 bg-white px-3 py-4 text-center text-sm font-bold text-neutral-700 shadow-sm transition hover:-translate-y-0.5 hover:border-iua-gold/60 hover:text-iua-burgundy hover:shadow-md sm:px-4">
              <Icon size={18} className="shrink-0 text-iua-gold" /> <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScholarshipCTA() {
  return (
    <section className="bg-white px-5 py-14 md:px-6">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-iua-dark text-white shadow-2xl shadow-iua-burgundy/20">
        <img
          src={imageAssets.scholarshipBanner}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center opacity-45"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-linear-to-br from-iua-burgundy/78 via-[#650B15]/66 to-iua-dark/48" />
        <div className="relative grid gap-8 p-6 md:grid-cols-[0.9fr_1.1fr] md:p-10">
          <div>
            <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-iua-gold text-iua-dark"><Gift size={30} /></div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">Pregunta por tu beca antes de inscribirte</h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-white/75">El usuario deja sus datos porque puede recibir una oportunidad concreta, no solo más información.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {["Beca de nuevo ingreso", "Orientación por WhatsApp", "Proceso sin compromiso"].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <Check size={22} className="mb-3 text-iua-gold" />
                <p className="text-sm font-black leading-6">{item}</p>
              </div>
            ))}
            <a href={leadFormUrl} target="_blank" rel="noreferrer" className="sm:col-span-3 mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-iua-gold px-7 py-4 text-sm font-black text-iua-dark shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#d4a13a]">
              Solicitar mi beca <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function CampusTeaser() {
  return (
    <section className="bg-iua-cream px-5 py-16 md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-iua-gold">Campus IUA</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-neutral-950 md:text-4xl">Cerca de ti, cerca de tu futuro</h2>
            <p className="mt-4 text-base leading-7 text-neutral-600">
              Cada campus representa nuestro compromiso con la formación académica, el crecimiento personal y el desarrollo de nuevas oportunidades.
            </p>
          </div>
          <Link to="/campus" className="inline-flex items-center justify-center gap-2 rounded-xl bg-iua-burgundy px-6 py-3 text-sm font-black text-white shadow-lg shadow-iua-burgundy/20 transition hover:-translate-y-0.5 hover:bg-iua-dark">
            Ver campus <MapPin size={17} />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {homeCampusCards.map((campus) => (
            <article key={campus.name} className="group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-neutral-900/10">
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={campus.img}
                  alt={campus.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  style={{ objectPosition: campus.imgPosition ?? "center" }}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-black text-neutral-950">{campus.name}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{campus.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="px-5 pb-24 pt-4 md:px-6 md:pb-28 md:pt-6">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 rounded-2xl bg-iua-cream p-8 shadow-sm ring-1 ring-black/5 sm:p-10 md:flex-row md:items-center md:p-12">
        <div className="flex items-center gap-6">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-iua-burgundy text-white"><FileCheck2 size={32} /></div>
          <div>
            <h2 className="text-2xl font-black tracking-tight text-neutral-950 sm:text-3xl">Da el primer paso hoy</h2>
            <p className="mt-2 text-neutral-600">Un asesor puede ayudarte a elegir programa, campus y beca.</p>
          </div>
        </div>
        <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
          <a href={leadFormUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-iua-burgundy px-7 py-4 text-sm font-black text-white shadow-lg shadow-iua-burgundy/20 transition hover:bg-iua-dark">Pedir información <ArrowRight size={17} /></a>
          <a href={whatsappUrl} className="inline-flex items-center justify-center gap-2 rounded-xl border border-iua-burgundy bg-white px-7 py-4 text-sm font-black text-iua-burgundy transition hover:bg-white/70"><BrandWhatsapp size={17} /> WhatsApp</a>
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  usePageSeo({
    title: "Universidad IUA | Inscripciones abiertas",
    description: "Estudia en Universidad IUA. Secundaria, bachillerato, licenciaturas, maestrías y doctorado con becas disponibles, campus cercanos y modalidad en línea.",
    path: "/",
    image: "/banners/alumnos-1-banner-recorte-1920x700.webp"
  });

  return <main className="min-h-screen bg-white font-sans text-neutral-950"><Hero /><TrustBand /><BenefitsSection /><ModalitiesSection /><ScholarshipCTA /><CampusTeaser /><FinalCTA /></main>;
}

function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return <main className="min-h-[70vh] bg-white px-5 py-16 md:px-6 md:py-20"><div className="mx-auto max-w-4xl rounded-2xl bg-iua-cream p-7 ring-1 ring-black/5 sm:p-10"><h1 className="text-3xl font-black text-iua-burgundy sm:text-4xl">{title}</h1><p className="mt-4 text-base leading-7 text-neutral-600 sm:text-lg sm:leading-8">{description}</p><Link to="/" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-iua-burgundy px-6 py-3 text-sm font-black text-white">Volver al home <ArrowRight size={16} /></Link></div></main>;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/oferta" element={<OfertaEducativa />} />
        <Route path="/oferta/secundaria" element={<SecundariaPage />} />
        <Route path="/oferta/bachillerato" element={<BachilleratoPage />} />
        <Route path="/oferta/derecho" element={<DerechoPage />} />
        <Route path="/oferta/psicologia" element={<PsicologiaPage />} />
        <Route path="/oferta/pedagogia" element={<PedagogiaPage />} />
        <Route path="/oferta/arquitectura" element={<ArquitecturaPage />} />
        <Route path="/oferta/artes-culinarias" element={<ArtesCulinariasPage />} />
        <Route path="/oferta/contaduria-publica" element={<ContaduriaPublicaPage />} />
        <Route path="/oferta/administracion-de-empresas" element={<AdministracionDeEmpresasPage />} />
        <Route path="/oferta/diseno-grafico" element={<DisenoGraficoPage />} />
        <Route path="/oferta/lenguas-extranjeras" element={<LenguasExtranjerasPage />} />
        <Route path="/oferta/ingenieria-en-sistemas-computacionales" element={<IngenieriaEnSistemasComputacionalesPage />} />
        <Route path="/oferta/maestria-derecho-penal" element={<MaestriaDerechoPenalPage />} />
        <Route path="/oferta/maestria-educacion" element={<MaestriaEducacionPage />} />
        <Route path="/oferta/doctorado-derecho" element={<DoctoradoDerechoPage />} />
        <Route path="/campus" element={<Campus />} />
        <Route path="/comunidad" element={<Comunidad />} />
        <Route path="/contacto" element={<ContactoIua />} />
        <Route path="/aviso-de-privacidad" element={<AvisoDePrivacidad />} />
      </Routes>
      <Footer />
      <BotonWats />
      <CookieConsent />
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
