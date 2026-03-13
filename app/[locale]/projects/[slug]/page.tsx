import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { defaultLocale, locales, type Locale } from "@/i18n/config";
import { getProjectBySlug, projects } from "@/content/projects";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function generateStaticParams() {
  return projects.flatMap((project) =>
    locales.map((locale) => ({ locale, slug: project.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const isValidLocale = locales.includes(params.locale as Locale);
  const locale = isValidLocale ? (params.locale as Locale) : defaultLocale;
  const project = getProjectBySlug(params.slug);

  if (!isValidLocale || !project) {
    notFound();
  }

  const title = `${project.title[locale]} — Cristian Portolan`;
  const description = project.summary[locale];
  const url = `${siteUrl}/${locale}/projects/${project.slug}`;

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: `/${locale}/projects/${project.slug}`,
      languages: {
        en: `/en/projects/${project.slug}`,
        es: `/es/projects/${project.slug}`,
      },
    },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      images: [
        {
          url: project.cover.src,
          alt: project.cover.alt[locale],
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [project.cover.src],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <main className="mx-auto w-full max-w-4xl space-y-12 px-6 py-20 sm:px-10">
        <header className="space-y-4">
          <p className="text-xs uppercase tracking-[0.35em] text-[var(--gray-500)]">
            Case Study · {project.year}
          </p>
          <h1 className="text-4xl font-semibold sm:text-5xl">
            {project.title[locale]}
          </h1>
          <p className="text-lg text-[var(--gray-300)]">{project.summary[locale]}</p>
          <div className="flex flex-wrap gap-3 text-xs text-[var(--gray-500)]">
            <span className="rounded-full border border-white/10 px-3 py-1">
              {project.role}
            </span>
            {project.stack.map((item) => (
              <span key={item} className="rounded-full border border-white/10 px-3 py-1">
                {item}
              </span>
            ))}
          </div>
        </header>

        <section className="space-y-6">
          <div className="aspect-[16/9] overflow-hidden rounded-3xl border border-white/10">
            <Image
              src={project.cover.src}
              alt={project.cover.alt[locale]}
              width={1600}
              height={900}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <div className="space-y-4 text-[var(--gray-300)]">
            <p>
              {locale === "es"
                ? "Este es un template de case study listo para expandir con tu narrativa, resultados y aprendizajes."
                : "This is a case study template ready for your narrative, outcomes, and learnings."}
            </p>
            <p>
              {locale === "es"
                ? "Agregá secciones como Reto, Proceso, Stack, Motion System y Resultados."
                : "Add sections such as Challenge, Process, Stack, Motion System, and Outcomes."}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
