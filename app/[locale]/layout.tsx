import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { defaultLocale, locales, type Locale } from "@/i18n/config";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const metadataByLocale: Record<Locale, { title: string; description: string; keywords: string[] }> = {
  es: {
    title: "Cristian Portolan — Desarrollador Creativo y Diseñador",
    description:
      "Portfolio bilingüe de Cristian Portolan con experiencias web interactivas, ingeniería frontend y diseño con motion.",
    keywords: [
      "portfolio",
      "desarrollador frontend",
      "desarrollador creativo",
      "diseñador web",
      "experiencias interactivas",
      "Next.js",
      "TypeScript",
      "GSAP",
    ],
  },
  en: {
    title: "Cristian Portolan — Creative Developer & Designer",
    description:
      "Bilingual portfolio of Cristian Portolan showcasing interactive web experiences, frontend engineering, and motion-driven design.",
    keywords: [
      "portfolio",
      "frontend developer",
      "creative developer",
      "web designer",
      "interactive experiences",
      "Next.js",
      "TypeScript",
      "GSAP",
    ],
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const isValidLocale = locales.includes(rawLocale as Locale);
  const locale = isValidLocale ? (rawLocale as Locale) : defaultLocale;

  if (!isValidLocale) {
    notFound();
  }

  const content = metadataByLocale[locale];
  const url = new URL(`/${locale}`, siteUrl);

  return {
    metadataBase: new URL(siteUrl),
    title: content.title,
    description: content.description,
    keywords: content.keywords,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        es: "/es",
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_ES" : "en_US",
      url: url.toString(),
      siteName: "Cristian Portolan",
      title: content.title,
      description: content.description,
    },
    twitter: {
      card: "summary",
      title: content.title,
      description: content.description,
    },
    formatDetection: {
      telephone: false,
      address: false,
      email: false,
    },
  };
}

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
