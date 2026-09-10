import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const homePages = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/home" }),
  schema: z.object({
    title: z.string(),
  }),
});

const aboutPages = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/about" }),
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

const writing = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/writing" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string(),
    locale: z.enum(["en", "pt"]),
    date: z.coerce.date(),
    draft: z.boolean().optional(),
  }),
});

/**
 * One professional role. The body is the markdown bullet list of what the role
 * involved, rendered through the `.prose` layer.
 *
 * `dateEnd` is nullable rather than the string "Current": the label for an
 * ongoing role is copy, and copy belongs in a dictionary the page can localise.
 * `arrangement` is a key for the same reason — the YAML says `hybrid`, the
 * dictionary decides whether that reads "Hybrid" or "Híbrido".
 */
const work = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/work" }),
  schema: z.object({
    company: z.string(),
    companyURL: z.string().optional(),
    role: z.string(),
    location: z.string().optional(),
    arrangement: z.enum(["on-site", "hybrid", "remote"]),
    dateStart: z.coerce.date(),
    dateEnd: z.coerce.date().nullable(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    /** Short line for the project card; `description` is the longer page/RSS one. */
    tagline: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional(),
    demoURL: z.string().optional(),
    repoURL: z.string().optional(),
    /**
     * Typographic mark for the card's logo well: the name split into a tinted
     * head and a neutral tail (`br` + `utils`). Optional — a project without one
     * falls back to its title set in the same face.
     */
    wordmark: z
      .object({
        accent: z.string(),
        rest: z.string(),
      })
      .optional(),
  }),
});

const linkbioPages = defineCollection({
  loader: glob({ pattern: "**/[^_]*.yaml", base: "./src/content/linkbio" }),
  schema: z.object({
    metadata: z.object({
      description: z.string(),
    }),
    bio_section: z.object({
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
    logo_url: z.string(),
    icon: z.string().optional(),
  }),
});

const books = defineCollection({
  loader: glob({ pattern: "**/[^_]*.yaml", base: "./src/content/books" }),
  schema: z.object({
    title: z.string(),
    description: z.string().nullable(),
    status: z.enum(["reading", "finished"]),
    genres: z.array(z.string()),
    authors: z.array(z.string()),
    finished_date: z.coerce.date().nullable(),
    last_update: z.coerce.date().nullable(),
    progress: z.number(),
    rating: z.number(),
    cover: z.object({
      url_path: z.string(),
      alt: z.string(),
      width: z.number(),
      height: z.number(),
    }),
  }),
});

/**
 * Everything on /work that is a list of fields rather than prose: the
 * highlights grid, the stack table, education and languages. The markdown body
 * is the page's opening summary, which is the one part that reads as writing.
 *
 * Kept as one file per locale rather than a collection per section — these are
 * facets of a single page, and splitting them would mean four collections that
 * are only ever read together.
 */
const workPages = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/work-page" }),
  schema: z.object({
    metadata: z.object({
      title: z.string(),
      description: z.string(),
    }),
    resumeURL: z.string(),
    highlights: z.array(
      z.object({
        // Key into the glyph set in `work-icon.astro`, not an asset path.
        icon: z.enum(["code", "layers", "lightbulb", "graduation", "heart", "users"]),
        title: z.string(),
        description: z.string(),
      }),
    ),
    stack: z.array(
      z.object({
        label: z.string(),
        items: z.array(z.string()),
      }),
    ),
    education: z.array(
      z.object({
        degree: z.string(),
        institution: z.string(),
        location: z.string(),
        period: z.string(),
      }),
    ),
    languages: z.array(
      z.object({
        name: z.string(),
        level: z.string(),
      }),
    ),
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
  writing,
  work,
  projects,
  linkbioPages,
  socialLinks,
  books,
  readingPages,
  workPages,
  homePages,
  aboutPages,
  metadatum,
};
