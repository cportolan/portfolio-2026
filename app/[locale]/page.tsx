import Link from "next/link";
import { type Locale } from "@/i18n/config";
import { projects } from "@/content/projects";

const copy = {
  es: {
    heading: "Cristian Portolan",
    subheading: "Desarrollador creativo. Interfaces con ritmo, precisión y motion.",
    cta: "Ver proyectos",
    section: "Proyectos destacados",
  },
  en: {
    heading: "Cristian Portolan",
    subheading: "Creative developer. Interfaces with rhythm, precision, and motion.",
    cta: "View projects",
    section: "Featured projects",
  },
};

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const content = copy[locale] ?? copy.es;
  const featured = projects.filter((project) => project.featured);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-between gap-16 px-6 py-20 sm:px-10">
        <header className="space-y-4">
          <p className="text-xs uppercase tracking-[0.35em] text-[var(--gray-500)]">
            Portfolio 2026
          </p>
          <h1 className="text-4xl font-semibold leading-tight sm:text-6xl">
            {content.heading}
          </h1>
          <p className="max-w-2xl text-lg text-[var(--gray-300)] sm:text-xl">
            {content.subheading}
          </p>
          <Link
            href={`/${locale}/projects`}
            className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--primary-500)] px-6 text-sm font-semibold text-black"
          >
            {content.cta}
          </Link>
        </header>

        <section className="space-y-6">
          <h2 className="text-sm uppercase tracking-[0.3em] text-[var(--gray-500)]">
            {content.section}
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {featured.map((project) => (
              <Link
                key={project.slug}
                href={`/${locale}/projects/${project.slug}`}
                className="group rounded-2xl border border-white/10 p-6 transition hover:border-white/30"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{project.title[locale]}</h3>
                  <span className="text-xs uppercase tracking-[0.2em] text-[var(--gray-500)]">
                    {project.year}
                  </span>
                </div>
                <p className="mt-3 text-sm text-[var(--gray-300)]">
                  {project.summary[locale]}
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-[var(--gray-500)]">
                  {project.stack.map((item) => (
                    <span key={item} className="rounded-full border border-white/10 px-3 py-1">
                      {item}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
