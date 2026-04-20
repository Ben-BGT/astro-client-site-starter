import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config';

// Shared reader for all Keystatic content. Use this in Astro pages and components
// to pull singleton content (siteSettings, homepage, aboutPage).
//
// Collections are still queried via Astro's getCollection() — using one system for
// both keeps types and frontmatter predictable.
export const reader = createReader(process.cwd(), keystaticConfig);
