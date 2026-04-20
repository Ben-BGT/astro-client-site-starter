// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// https://astro.build/config
// Using `output: 'static'` (default). Individual API routes can opt out with
// `export const prerender = false;` so only those endpoints run on the Node server.
export default defineConfig({
  // TODO (member setup): Set this to the final production URL before deploying.
  // The @astrojs/sitemap integration below uses it to emit sitemap-index.xml and
  // sitemap-0.xml at build time, and the RSS feed uses it for absolute links.
  // Example: site: 'https://yourclient.com'
  // site: 'https://example.com',
  output: 'static',
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), markdoc(), keystatic(), sitemap()],
});
