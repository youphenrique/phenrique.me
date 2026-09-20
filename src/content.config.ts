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

const colophonPages = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/colophon" }),
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
    /**
     * Shared by the two files of one article, one per locale. Slugs are
     * translated too, so this is the only thing tying a pair together — see
     * `postAlternates` in `src/utils/content.ts`. A post with no translation
     * leaves it unset.
     */
    translationKey: z.string().optional(),
    /**
     * Social card for this post, as a site-absolute path. Falls back to the
     * site-wide card in `head.astro` when unset.
     */
    image: z.string().optional(),
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
const workExperience = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/work-experience" }),
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
    /** Typographic mark for the card's logo well, split into coloured segments. */
    wordmark: z
      .object({
        segments: z.array(
          z.object({
            text: z.string(),
            color: z.enum(["blue", "green", "yellow"]),
          }),
        ),
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
const work = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/work" }),
  schema: z.object({
    metadata: z.object({
      title: z.string(),
      description: z.string(),
    }),
    resumeURL: z.string(),
    highlights: z.array(
      z.object({
        // Key into the glyph set in `work-icon.astro`, not an asset path.
        icon: z.enum(["code", "layers", "lightbulb", "graduation", "heart", "users", "package"]),
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
  workExperience,
  projects,
  linkbioPages,
  socialLinks,
  books,
  readingPages,
  work,
  homePages,
  aboutPages,
  colophonPages,
};
