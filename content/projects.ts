export type Project = {
  slug: string;
  year: number;
  role: string;
  stack: string[];
  featured: boolean;
  cover: {
    src: string;
    alt: {
      es: string;
      en: string;
    };
  };
  title: {
    es: string;
    en: string;
  };
  summary: {
    es: string;
    en: string;
  };
};

export const projects: Project[] = [
  {
    slug: "hyperline",
    year: 2025,
    role: "Creative Developer",
    stack: ["Next.js", "TypeScript", "GSAP"],
    featured: true,
    cover: {
      src: "/projects/hyperline/cover.jpg",
      alt: {
        es: "Vista previa del proyecto Hyperline",
        en: "Hyperline project preview",
      },
    },
    title: {
      es: "Hyperline",
      en: "Hyperline",
    },
    summary: {
      es: "Landing interactiva con scroll cinematográfico y transiciones fluidas.",
      en: "Interactive landing with cinematic scroll and fluid transitions.",
    },
  },
  {
    slug: "atlas-studio",
    year: 2024,
    role: "Frontend Engineer",
    stack: ["Next.js", "TailwindCSS", "GSAP"],
    featured: true,
    cover: {
      src: "/projects/atlas-studio/cover.jpg",
      alt: {
        es: "Vista previa del proyecto Atlas Studio",
        en: "Atlas Studio project preview",
      },
    },
    title: {
      es: "Atlas Studio",
      en: "Atlas Studio",
    },
    summary: {
      es: "Sitio portfolio con enfoque en composición editorial y motion suave.",
      en: "Portfolio site focused on editorial composition and smooth motion.",
    },
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug) ?? null;
}
