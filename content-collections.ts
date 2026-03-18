import { z } from "zod";
import { defineCollection, defineConfig } from "@content-collections/core";

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

const linkbioPage = defineCollection({
  name: "linkbioPage",
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
  content: [linkbioPage, socialLinks],
});
