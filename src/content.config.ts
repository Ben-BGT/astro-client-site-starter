import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders";

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

// `pages` backs Keystatic singletons that have a markdoc body (currently just
// aboutPage). Singletons without a body (homepage, siteSettings) are read via
// the Keystatic reader, not this collection.
const pages = defineCollection({
  loader: glob({ pattern: "**/*.mdoc", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    tagline: z.string().optional(),
  }),
});

export const collections = { posts, services, team, testimonials, caseStudies, pages };
