// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://taiwannwann.co.jp',
  // sitemap integration re-enabled in Day 4 once real locale pages exist.
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
