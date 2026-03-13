"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const copy = {
  es: {
    title: "No encontramos esta página",
    cta: "Volver al inicio",
  },
  en: {
    title: "We couldn't find this page",
    cta: "Back to home",
  },
};

function resolveLocale(pathname: string) {
  if (pathname.startsWith("/en")) return "en";
  return "es";
}

export default function NotFound() {
  const pathname = usePathname();
  const locale = resolveLocale(pathname);
  const content = copy[locale] ?? copy.es;

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center justify-center gap-6 px-6 text-center">
        <h1 className="text-3xl font-semibold sm:text-4xl">{content.title}</h1>
        <Link
          href={`/${locale}`}
          className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--primary-500)] px-6 text-sm font-semibold text-black"
        >
          {content.cta}
        </Link>
      </main>
    </div>
  );
}
