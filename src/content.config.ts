import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.mdoc", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string().optional(),
    cover: z.string().optional(),
  }),
});

const services = defineCollection({
  loader: glob({ pattern: "**/*.mdoc", base: "./src/content/services" }),
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
    icon: z.string().optional(),
    order: z.number().default(10),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/team" }),
  schema: z.object({
    name: z.string(),
    role: z.string().optional(),
    bio: z.string().optional(),
    photo: z.string().nullable().optional(),
    links: z
      .array(
        z.object({
          label: z.string(),
          url: z.string(),
        })
      )
      .default([]),
    order: z.number().default(10),
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/testimonials" }),
  schema: z.object({
    author: z.string(),
    quote: z.string(),
    role: z.string().optional(),
    company: z.string().optional(),
    photo: z.string().nullable().optional(),
    featured: z.boolean().default(false),
  }),
});

const caseStudies = defineCollection({
  loader: glob({ pattern: "**/*.mdoc", base: "./src/content/caseStudies" }),
  schema: z.object({
    title: z.string(),
    client: z.string().optional(),
    summary: z.string().optional(),
    metrics: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
        })
      )
      .default([]),
    cover: z.string().nullable().optional(),
  }),
});

// Page blocks are unvalidated here: Keystatic owns the schema, and the
// BlockRenderer dispatches on `discriminant`. Anything Keystatic saves is
// rendered; missing or unknown kinds are simply skipped.
const blockSchema = z.array(
  z.object({
    discriminant: z.string(),
    value: z.record(z.string(), z.any()).default({}),
  })
);

const landingPages = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/landingPages" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    showChrome: z.boolean().default(true),
    blocks: blockSchema.default([]),
  }),
});

export const collections = {
  posts,
  services,
  team,
  testimonials,
  caseStudies,
  landingPages,
};
