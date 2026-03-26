import Link from "next/link";
import type { CSSProperties } from "react";
import type { Program } from "@/lib/site-data";

type ProgramCardProps = {
  program: Program;
};

export default function ProgramCard({ program }: ProgramCardProps) {
  const style = {
    borderColor: program.accent,
    background: `linear-gradient(180deg, ${program.soft} 0%, var(--color-white) 38%)`,
  } satisfies CSSProperties;

  return (
    <Link
      href={`/${program.slug}`}
      className="group rounded-3xl border p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
      style={style}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl font-semibold text-[var(--color-black)]">
          {program.shortTitle}
        </h3>
        <span
          className="inline-flex h-8 min-w-8 items-center justify-center rounded-full px-2 text-xs font-semibold uppercase"
          style={{
            background: program.accent,
            color: "var(--color-white)",
          }}
        >
          {program.level}
        </span>
      </div>

      <p className="mt-4 text-sm leading-7 text-[var(--color-gray-700)]">
        {program.summary}
      </p>

      <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] underline underline-offset-4">
        Ver detalle
        <span aria-hidden>→</span>
      </div>
    </Link>
  );
}
