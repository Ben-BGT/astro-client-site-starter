// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

// https://astro.build/config
// Using `output: 'static'` (default). Individual API routes can opt out with
// `export const prerender = false;` so only those endpoints run on the Node server.
export default defineConfig({
  // Set this to the final production URL before deploying. Used by the sitemap
  // and RSS feed. Example: site: 'https://yourclient.com'
  // site: 'https://example.com',
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), markdoc(), keystatic(), sitemap()],
});
