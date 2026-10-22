// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://lemniworks.com',
  output: 'static',
  trailingSlash: 'never',
  build: { inlineStylesheets: 'always' },
  integrations: [sitemap()],
});
