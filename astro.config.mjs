// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
// Note: @astrojs/sitemap@3.x requires Astro 5 (uses `astro:routes:resolved` hook).
// We're on Astro 4, so sitemap.xml is maintained manually in public/sitemap.xml.
// Revisit when upgrading to Astro 5.
export default defineConfig({
  site: 'https://taiwannwann.co.jp',
  integrations: [],
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'zh'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  build: {
    inlineStylesheets: 'auto',
  },
  // image: defaults to sharp; configured automatically
});
