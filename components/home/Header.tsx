"use client";

import Link from "next/link";
import { useState } from "react";
import { type Locale } from "@/i18n/config";

const navCopy = {
  es: {
    about: "Sobre Mi",
    experience: "Experiencia",
    projects: "Proyectos",
    contact: "Contacto",
    home: "Inicio",
    services: "Servicios",
  },
  en: {
    about: "About",
    experience: "Experience",
    projects: "Projects",
    contact: "Contact",
    home: "Home",
    services: "Services",
  },
};

export default function Header({ locale }: { locale: Locale }) {
  const [isOpen, setIsOpen] = useState(false);
  const copy = navCopy[locale] ?? navCopy.es;

  const links = [
    { label: copy.home, href: `/${locale}` },
    { label: copy.about, href: `/${locale}#about` },
    { label: copy.services, href: `/${locale}#services` },
    { label: copy.experience, href: `/${locale}#experience` },
    { label: copy.projects, href: `/${locale}#projects` },
  ];

  return (
    <header className="fixed left-0 right-0 top-0 z-40">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 sm:px-10">
        <Link href={`/${locale}`} className="text-xl font-semibold">
          P<span className="text-[var(--primary-500)]">/</span>.
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-[var(--gray-300)] md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative font-medium transition-colors hover:text-white"
            >
              <span className="relative z-10">{link.label}</span>
              <span className="absolute -bottom-2 left-0 h-[2px] w-full origin-left scale-x-0 bg-[var(--primary-500)] transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
          <Link
            href={`/${locale}#contact`}
            className="inline-flex h-10 items-center justify-center rounded-full bg-[var(--primary-500)] px-5 text-xs font-semibold text-black transition hover:translate-y-[-1px]"
          >
            {copy.contact}
          </Link>
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative flex h-10 w-10 flex-col items-center justify-center gap-1 rounded-full border border-white/10 text-white md:hidden"
        >
          <span
            className={`h-[2px] w-5 rounded bg-white transition ${
              isOpen ? "translate-y-[6px] rotate-45" : ""}
            `}
          />
          <span
            className={`h-[2px] w-5 rounded bg-white transition ${
              isOpen ? "opacity-0" : ""}
            `}
          />
          <span
            className={`h-[2px] w-5 rounded bg-white transition ${
              isOpen ? "-translate-y-[6px] -rotate-45" : ""}
            `}
          />
        </button>
      </div>

      <div
        className={`fixed inset-0 z-50 flex flex-col items-start justify-center gap-6 bg-[#111111] px-8 transition duration-300 md:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="mb-6 flex items-center gap-4">
          <div className="h-14 w-14 overflow-hidden rounded-full border border-white/20 bg-white/10" />
          <div>
            <p className="text-sm font-semibold text-white">Cristian Portolan</p>
            <p className="text-xs uppercase tracking-[0.25em] text-white/40">
              Portfolio 2026
            </p>
          </div>
        </div>

        {links.map((link, index) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-4 text-3xl font-semibold uppercase tracking-wide text-white transition hover:translate-x-1 hover:text-[var(--primary-500)]"
          >
            <span className="text-sm text-white/40">{index + 1}.</span>
            <span>{link.label}</span>
            <ChevronIcon className="text-white/40" />
          </Link>
        ))}
        <Link
          href={`/${locale}#contact`}
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-4 text-3xl font-semibold uppercase tracking-wide text-[var(--primary-500)]"
        >
          <span className="text-sm text-white/40">{links.length + 1}.</span>
          <span>{copy.contact}</span>
          <ChevronIcon className="text-white/40" />
        </Link>
      </div>
    </header>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      className={`h-4 w-4 ${className ?? ""}`}
      fill="none"
    >
      <path
        d="M6 6h8v8M6 14L14 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
