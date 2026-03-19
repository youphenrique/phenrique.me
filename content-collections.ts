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
//////////     Linkbio page     //////////
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
    logoUrl: z.url(),
  }),
});

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

export default defineConfig({
  content: [metadatum, homePages, linkbioPages, socialLinks],
});
