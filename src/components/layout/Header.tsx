"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  admissionsFormUrl,
  brandLogoUrl,
  mainNav,
  studyNav,
} from "@/lib/site-data";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-gray-200)] bg-white/95 backdrop-blur">
      <div className="border-b border-[var(--color-gray-100)] bg-[var(--color-black)]">
        <div className="container-page flex items-center justify-between gap-3 py-2 text-xs text-white/90">
          <p className="hidden sm:block">
            Universidad IUA | Institucion privada del centro de Mexico
          </p>
          <p className="sm:hidden">Universidad IUA</p>
          <a
            href={admissionsFormUrl}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-[var(--color-secondary)] underline underline-offset-4"
          >
            Inscripciones en linea
          </a>
        </div>
      </div>

      <div className="container-page py-4">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="group inline-flex items-center gap-3">
            <Image
              src={brandLogoUrl}
              alt="Logo Universidad IUA"
              width={64}
              height={64}
              priority
              className="h-12 w-12 rounded-xl border border-[var(--color-gray-200)] bg-white object-contain p-1"
            />
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-black)] sm:text-sm sm:tracking-[0.14em]">
              Universidad IUA
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setIsOpen((value) => !value)}
            aria-label="Abrir menu"
            className="rounded-md border border-[var(--color-gray-300)] px-3 py-2 text-sm font-semibold text-[var(--color-primary)] md:hidden"
          >
            {isOpen ? "Cerrar" : "Menu"}
          </button>

          <nav className="hidden flex-wrap items-center gap-1 md:flex">
            {mainNav.map((item) => (
              <Link key={item.href} href={item.href} className="nav-link">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-4 hidden flex-wrap gap-2 border-t border-[var(--color-gray-100)] pt-4 md:flex">
          {studyNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] transition hover:-translate-y-[1px]"
              style={{
                borderColor: item.accent,
                color: item.accent,
                background: `${item.accent}12`,
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {isOpen ? (
          <div className="mt-4 border-t border-[var(--color-gray-100)] pt-4 md:hidden">
            <nav className="grid gap-2">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium text-[var(--color-gray-700)] transition hover:bg-[var(--color-primary-soft)] hover:text-[var(--color-primary)]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-4 flex flex-wrap gap-2">
              {studyNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em]"
                  style={{
                    borderColor: item.accent,
                    color: item.accent,
                    background: `${item.accent}12`,
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
