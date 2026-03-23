export default function HomePage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="max-w-3xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Renovación del sitio institucional
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-slate-950 md:text-6xl">
          Un frontend moderno, claro y escalable para la universidad
        </h1>

        <p className="mt-6 text-lg leading-8 text-slate-600">
          Esta base será el punto de partida para reconstruir el sitio con
          Next.js, TypeScript y una arquitectura limpia, consumiendo contenido
          desde WordPress.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="/oferta-educativa"
            className="rounded-md bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Ver oferta educativa
          </a>

          <a
            href="/contacto"
            className="rounded-md border border-slate-300 px-5 py-3 text-sm font-medium text-slate-800 transition hover:bg-slate-50"
          >
            Contacto
          </a>
        </div>
      </div>
    </section>
  );
}
