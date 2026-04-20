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
  // TODO (member setup): Change this to your client's production URL.
  // Used by @astrojs/sitemap to emit sitemap-index.xml + sitemap-0.xml and by
  // the RSS feed for absolute links.
  site: 'https://astro-client-site-starter.vercel.app',
  output: 'static',
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), markdoc(), keystatic(), sitemap()],
});
