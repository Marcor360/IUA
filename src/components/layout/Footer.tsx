import Image from "next/image";
import Link from "next/link";
import { getCampusesContent } from "@/lib/wordpress/content";
import {
  admissionsFormUrl,
  brandLogoUrl,
  mainNav,
  scheduleVisitUrl,
} from "@/lib/site-data";

export default async function Footer() {
  const campuses = await getCampusesContent();

  return (
    <footer className="border-t border-[var(--color-gray-200)] bg-[var(--color-black)] text-white">
      <div className="container-page py-14">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr_1fr]">
          <div>
            <Image
              src={brandLogoUrl}
              alt="Logo Universidad IUA"
              width={88}
              height={88}
              className="h-14 w-14 rounded-xl border border-white/20 bg-white object-contain p-1"
            />
            <h3 className="mt-3 text-xl font-semibold">Universidad IUA</h3>
            <p className="mt-4 text-sm leading-7 text-white/75">
              Sitio institucional modernizado sobre Next.js, con estructura
              escalable por nivel academico y paginas separadas por carrera.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={admissionsFormUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-md bg-[var(--color-secondary)] px-4 py-2 text-sm font-semibold text-[var(--color-black)] transition hover:brightness-95"
              >
                Inscribirme
              </a>
              <a
                href={scheduleVisitUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Agendar visita
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-secondary)]">
              Navegacion
            </h4>
            <ul className="mt-4 grid gap-2 text-sm text-white/80">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition hover:text-[var(--color-secondary)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-secondary)]">
              Contacto por campus
            </h4>
            <ul className="mt-4 grid gap-5 text-sm text-white/80">
              {campuses.map((campus) => (
                <li key={campus.id}>
                  <p className="font-semibold text-white">{campus.title}</p>
                  <p className="mt-1">{campus.phones.join(" | ")}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-white/65">
          © 2026 Universidad IUA. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
