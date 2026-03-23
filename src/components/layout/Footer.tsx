export default function Footer() {
  return (
    <footer className="border-t bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold">Universidad</h3>
            <p className="mt-3 text-sm text-slate-300">
              Sitio institucional renovado con enfoque en claridad, rendimiento y
              accesibilidad.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-200">
              Enlaces
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li>Oferta Educativa</li>
              <li>Admisiones</li>
              <li>Noticias</li>
              <li>Contacto</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-200">
              Contacto
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li>Tel: (000) 000 0000</li>
              <li>Email: contacto@universidad.edu</li>
              <li>Dirección institucional</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-800 pt-6 text-sm text-slate-400">
          © 2026 Universidad. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
