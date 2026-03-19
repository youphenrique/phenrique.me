import { z } from "zod";
import { remarkPlugins } from "@prose-ui/core";
import { compileMDX } from "@content-collections/mdx";
import { defineCollection, defineConfig } from "@content-collections/core";

//////////////////////////////////////////
//////////////////////////////////////////
//////////                      //////////
//////////       Metadata       //////////
//////////                      //////////
//////////////////////////////////////////
//////////////////////////////////////////

const metadatum = defineCollection({
  name: "metadatum",
  directory: "content/collections/metadatum",
  include: "**/*.yaml",
  parser: "yaml",
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

//////////////////////////////////////////
//////////////////////////////////////////
//////////                      //////////
//////////       Home page      //////////
//////////                      //////////
//////////////////////////////////////////
//////////////////////////////////////////

const homePages = defineCollection({
  name: "homePages",
  directory: "content/collections/pages/home",
  include: "**/*.mdx",
  schema: z.object({
    content: z.string(),
  }),
  async transform(document, context) {
    const mdx = await compileMDX(context, document, {
      remarkPlugins: remarkPlugins(),
    });

    return {
      ...document,
      mdx,
    };
  },
});

//////////////////////////////////////////
//////////////////////////////////////////
//////////                      //////////
//////////     Social links     //////////
//////////                      //////////
//////////////////////////////////////////
//////////////////////////////////////////

const socialLinks = defineCollection({
  name: "socialLinks",
  directory: "content/collections/social-links",
  include: "**/*.yaml",
  parser: "yaml",
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    link: z.url(),
    icon: z.string().optional(),
    logoUrl: z.url(),
  }),
});

//////////////////////////////////////////
//////////////////////////////////////////
//////////                      //////////
//////////     Linkbio page     //////////
//////////                      //////////
//////////////////////////////////////////
//////////////////////////////////////////

const linkbioPages = defineCollection({
  name: "linkbioPages",
  directory: "content/collections/pages/linkbio",
  include: "**/*.yaml",
  parser: "yaml",
  schema: z.object({
    metadata: z.object({
      description: z.string(),
    }),
    bioSection: z.object({
      description: z.string(),
      quote: z.string().optional(),
    }),
  }),
  transform(document, context) {
    const links = context.documents(socialLinks);
    return {
      ...document,
      socialLinks: links,
    };
  },
});

//////////////////////////////////////////
//////////////////////////////////////////
//////////                      //////////
//////////         Books        //////////
//////////                      //////////
//////////////////////////////////////////
//////////////////////////////////////////

const books = defineCollection({
  name: "books",
  directory: "content/collections/books",
  include: "**/*.yaml",
  parser: "yaml",
  schema: z.object({
    title: z.string(),
    status: z.enum(["reading", "finished"]),
    genres: z.array(z.string()),
    authors: z.array(z.string()),
    finishedDate: z.coerce.date().nullable(),
    progress: z.number(),
    rating: z.number(),
    cover: z.object({
      url: z.string(),
      alt: z.string(),
      width: z.number(),
      height: z.number(),
    }),
  }),
});

//////////////////////////////////////////
//////////////////////////////////////////
//////////                      //////////
//////////     Reading page     //////////
//////////                      //////////
//////////////////////////////////////////
//////////////////////////////////////////

const readingPages = defineCollection({
  name: "readingPages",
  directory: "content/collections/pages/reading",
  include: "**/*.yaml",
  parser: "yaml",
  schema: z.object({
    metadata: z.object({
      title: z.string(),
      description: z.string(),
    }),
  }),
  transform(document, context) {
    const currentlyReads = context.documents(books).filter((book) => book.status === "reading");
    const finishedBooks = context
      .documents(books)
      .filter((book) => book.status === "finished")
      .sort((a, b) => {
        if (a.finishedDate === null || b.finishedDate === null) {
          throw new Error(`Book "${a.title}" or "${b.title}" has no finished date`);
        }
        return b.finishedDate.getTime() - a.finishedDate.getTime();
      });
    return {
      ...document,
      currentlyReads,
      finishedBooks,
    };
  },
});

export default defineConfig({
  content: [metadatum, homePages, linkbioPages, socialLinks, books, readingPages],
});
