import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const homePages = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/home" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
  }),
});

const aboutPages = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/about" }),
  schema: z.object({
    title: z.string(),
    bioImageResource: z.string(),
  }),
});

const metadatum = defineCollection({
  loader: glob({ pattern: "**/[^_]*.yaml", base: "./src/content/metadatum" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional(),
  }),
});

const work = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/work" }),
  schema: z.object({
    company: z.string(),
    role: z.string(),
    dateStart: z.coerce.date(),
    dateEnd: z.union([z.coerce.date(), z.string()]),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional(),
    demoURL: z.string().optional(),
    repoURL: z.string().optional(),
  }),
});

const linkbioPages = defineCollection({
  loader: glob({ pattern: "**/[^_]*.yaml", base: "./src/content/linkbio" }),
  schema: z.object({
    metadata: z.object({
      description: z.string(),
    }),
    bioSection: z.object({
      description: z.string(),
      quote: z.string().optional(),
    }),
  }),
});

const socialLinks = defineCollection({
  loader: glob({ pattern: "**/[^_]*.yaml", base: "./src/content/social-links" }),
  schema: z.object({
    name: z.string(),
    handle: z.string(),
    link: z.string(),
    logoUrl: z.string(),
    icon: z.string().optional(),
  }),
});

const books = defineCollection({
  loader: glob({ pattern: "**/[^_]*.yaml", base: "./src/content/books" }),
  schema: z.object({
    title: z.string(),
    status: z.enum(["reading", "finished"]),
    genres: z.array(z.string()),
    authors: z.array(z.string()),
    finishedDate: z.coerce.date().nullable(),
    progress: z.number(),
    rating: z.number(),
    cover: z.object({
      urlPath: z.string(),
      alt: z.string(),
      width: z.number(),
      height: z.number(),
    }),
  }),
});

const readingPages = defineCollection({
  loader: glob({ pattern: "**/[^_]*.yaml", base: "./src/content/reading" }),
  schema: z.object({
    metadata: z.object({
      title: z.string(),
      description: z.string(),
    }),
  }),
});

export const collections = {
  blog,
  work,
  projects,
  linkbioPages,
  socialLinks,
  books,
  readingPages,
  homePages,
  aboutPages,
  metadatum,
};
