import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { projects } from "@/content/projects";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const localeEntries = locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: locale === "es" ? 1 : 0.9,
  }));

  const projectEntries = locales.flatMap((locale) =>
    projects.map((project) => ({
      url: `${siteUrl}/${locale}/projects/${project.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }))
  );

  const projectsIndex = locales.map((locale) => ({
    url: `${siteUrl}/${locale}/projects`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...localeEntries, ...projectsIndex, ...projectEntries];
}
