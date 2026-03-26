import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProgramDetailTemplate from "@/components/site/ProgramDetailTemplate";
import {
  getProgramBySlugContent,
  getProgramSlugsContent,
  getProgramsByLevelContent,
} from "@/lib/wordpress/content";

type ProgramPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getProgramSlugsContent();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProgramPageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = await getProgramBySlugContent(slug);

  if (!program) {
    return {
      title: "Programa no encontrado | Universidad IUA",
    };
  }

  return {
    title: `${program.title} | Universidad IUA`,
    description: program.summary,
  };
}

export default async function ProgramPage({ params }: ProgramPageProps) {
  const { slug } = await params;
  const program = await getProgramBySlugContent(slug);

  if (!program) {
    notFound();
  }

  const relatedPrograms = (await getProgramsByLevelContent(program.level))
    .filter((item) => item.slug !== program.slug)
    .slice(0, 3);

  return (
    <ProgramDetailTemplate
      program={program}
      relatedPrograms={relatedPrograms}
    />
  );
}
