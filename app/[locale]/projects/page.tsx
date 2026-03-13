import Link from "next/link";
import { type Locale } from "@/i18n/config";
import { projects } from "@/content/projects";

const copy = {
    es: {
        heading: "Proyectos",
        intro: "Una selección de trabajos con foco en motion y narrativa visual.",
    },
    en: {
        heading: "Projects",
        intro: "A selection of work focused on motion and visual storytelling.",
    },
};

export default async function ProjectsIndex({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = await params;
    const content = copy[locale] ?? copy.es;

    return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
            <main className="mx-auto w-full max-w-5xl space-y-12 px-6 py-20 sm:px-10">
                <header className="space-y-4">
                    <p className="text-xs uppercase tracking-[0.35em] text-[var(--gray-500)]">
                        {content.heading}
                    </p>
                    <h1 className="text-4xl font-semibold sm:text-5xl">
                        {content.heading}
                    </h1>
                    <p className="max-w-2xl text-lg text-[var(--gray-300)]">
                        {content.intro}
                    </p>
                </header>

                <section className="grid gap-6">
                    {projects.map((project) => (
                        <Link
                            key={project.slug}
                            href={`/${locale}/projects/${project.slug}`}
                            className="group rounded-2xl border border-white/10 p-6 transition hover:border-white/30"
                        >
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-semibold">
                                    {project.title[locale]}
                                </h2>
                                <span className="text-xs uppercase tracking-[0.2em] text-[var(--gray-500)]">
                                    {project.year}
                                </span>
                            </div>
                            <p className="mt-3 text-sm text-[var(--gray-300)]">
                                {project.summary[locale]}
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2 text-xs text-[var(--gray-500)]">
                                {project.stack.map((item) => (
                                    <span
                                        key={item}
                                        className="rounded-full border border-white/10 px-3 py-1"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </Link>
                    ))}
                </section>
            </main>
        </div>
    );
}
