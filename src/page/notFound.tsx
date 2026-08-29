import { Link } from "react-router-dom";
import {
  IconArrowRight,
  IconHome,
  IconReload
} from "@tabler/icons-react";
import { usePageSeo } from "../utils/seo";

export default function NotFound() {
  usePageSeo({
    title: "Pagina no encontrada | Universidad IUA",
    description: "La página solicitada no existe. Consulta la oferta educativa o vuelve al inicio de Universidad IUA.",
    path: window.location.pathname,
    robots: { index: false, follow: true },
    image: "/banners/alumnos-1-banner-recorte-1920x700.webp"
  });

  return (
    <main className="min-h-screen bg-white text-neutral-950">
      <section className="relative overflow-hidden bg-iua-dark px-5 py-20 text-white md:px-6 md:py-28">
        <img
          src="/banners/alumnos-1-banner-recorte-1920x700.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center opacity-40"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-linear-to-br from-iua-dark/92 via-iua-burgundy/76 to-iua-dark/48" />
        <div className="relative mx-auto flex max-w-5xl flex-col items-start">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white/90 backdrop-blur">
            <IconReload size={16} /> Error 404
          </p>
          <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Pagina no encontrada
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/82 sm:text-lg sm:leading-8">
            La dirección que abriste no existe o ya no está disponible. Puedes volver al inicio o consultar la oferta educativa.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/"
              replace
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-iua-gold px-7 py-4 text-sm font-black text-iua-dark shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#d4a13a]"
            >
              Ir al inicio ahora <IconHome size={18} />
            </Link>
            <Link
              to="/oferta"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 text-sm font-black text-iua-burgundy shadow-xl shadow-black/10 transition hover:-translate-y-0.5 hover:bg-iua-cream"
            >
              Ver oferta educativa <IconArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
