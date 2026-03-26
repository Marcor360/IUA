"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { HomeCarouselSlide } from "@/lib/site-data";

type HomeHeroCarouselProps = {
  slides: HomeCarouselSlide[];
  intervalMs?: number;
};

export default function HomeHeroCarousel({
  slides,
  intervalMs = 5000,
}: HomeHeroCarouselProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) {
      return;
    }

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [intervalMs, slides.length]);

  if (!slides.length) {
    return null;
  }

  const prevSlide = () =>
    setIndex((current) => (current - 1 + slides.length) % slides.length);
  const nextSlide = () => setIndex((current) => (current + 1) % slides.length);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[var(--color-gray-200)] shadow-sm lg:rounded-[2rem]">
      <div
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((slide, slideIndex) => (
          <article key={slide.title} className="relative min-w-full">
            <div className="relative aspect-[16/11] sm:aspect-[16/10] md:aspect-[16/9.3] lg:aspect-[16/9]">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={slideIndex === 0}
                sizes="(max-width: 1600px) 100vw, 1500px"
                className="object-cover"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-7 lg:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-secondary)]">
                {slide.label}
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                {slide.title}
              </h2>
              <p className="mt-3 hidden max-w-2xl text-sm leading-7 text-white/90 sm:block sm:text-base lg:max-w-3xl lg:text-lg">
                {slide.description}
              </p>
              <Link
                href={slide.href}
                className="mt-4 inline-flex rounded-md bg-[var(--color-secondary)] px-4 py-2 text-sm font-semibold text-[var(--color-black)] transition hover:brightness-95 sm:mt-5 lg:px-5 lg:py-3 lg:text-base"
              >
                Explorar
              </Link>
            </div>
          </article>
        ))}
      </div>

      {slides.length > 1 ? (
        <>
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Slide anterior"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/55 px-3 py-2 text-sm font-semibold text-white transition hover:bg-black/70 sm:left-4 sm:px-4 sm:py-3"
          >
            {"<"}
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Siguiente slide"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/55 px-3 py-2 text-sm font-semibold text-white transition hover:bg-black/70 sm:right-4 sm:px-4 sm:py-3"
          >
            {">"}
          </button>

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-black/40 px-3 py-2">
            {slides.map((slide, slideIndex) => (
              <button
                key={slide.title}
                type="button"
                aria-label={`Ir a ${slide.title}`}
                onClick={() => setIndex(slideIndex)}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  slideIndex === index
                    ? "bg-[var(--color-secondary)]"
                    : "bg-white/70"
                }`}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
