"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import Header from "@/components/home/Header";
import { type Locale } from "@/i18n/config";

const copy = {
  es: {
    status: "Open To Work",
    title: "Cristian Portolan",
    subtitle: "Desarrollador Front-End & Diseñador UX/UI",
    primaryCta: "Ver proyectos",
    secondaryCta: "Contacto",
    section: "Proyectos",
  },
  en: {
    status: "Open To Work",
    title: "Cristian Portolan",
    subtitle: "Front-End Developer & UX/UI Designer",
    primaryCta: "View projects",
    secondaryCta: "Contact",
    section: "Projects",
  },
};

export default function HomePage({ locale }: { locale: Locale }) {
  const root = useRef<HTMLDivElement | null>(null);
  const content = copy[locale] ?? copy.es;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReduced) {
        gsap.set("[data-loader]", { display: "none" });
        gsap.set("[data-animate]", { opacity: 1, y: 0 });
        return;
      }

      gsap.set("[data-animate]", { opacity: 0, y: 24 });

      const tl = gsap.timeline();
      tl.to("[data-loader]", {
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
        ease: "power2.out",
      })
        .set("[data-loader]", { display: "none" })
        .to(
          "[data-animate]",
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.08,
          },
          "-=0.1"
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="min-h-screen bg-[#1b1b1b] text-white">
      <div
        data-loader
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#111111]"
      >
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.5em] text-white/50">
            Portfolio 2026
          </p>
          <h1 className="mt-6 text-5xl font-semibold sm:text-7xl">
            Cristian Portolan
          </h1>
        </div>
      </div>

      <Header locale={locale} />

      <main className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center px-6 pb-24 pt-28 sm:px-10">
        <div data-animate className="flex w-full max-w-3xl flex-col items-center text-center">
          <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70">
            <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
            {content.status}
          </span>

          <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-6xl">
            {content.title}
          </h1>
          <p className="mt-4 text-lg text-white/70 sm:text-xl">
            {content.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/${locale}/projects`}
              className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--primary-500)] px-6 text-sm font-semibold text-black"
            >
              {content.primaryCta}
            </Link>
            <Link
              href={`/${locale}#contact`}
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 px-6 text-sm font-semibold text-white/80 transition hover:border-white"
            >
              {content.secondaryCta}
            </Link>
          </div>
        </div>

        <section data-animate className="mt-16">
          <p className="text-xs uppercase tracking-[0.35em] text-white/40">
            {content.section}
          </p>
          <Link
            href={`/${locale}/projects`}
            className="mt-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/60 transition hover:text-white"
          >
            {locale === "es" ? "Ver todos" : "View all"}
            <span aria-hidden className="text-white/40">
              →
            </span>
          </Link>
        </section>
      </main>
    </div>
  );
}
