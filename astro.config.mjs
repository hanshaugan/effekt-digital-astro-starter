import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.effektdigital.no',
  redirects: {
    '/om-oss': '/om-hans',
    '/om-oss/': '/om-hans/',
  },
  integrations: [
    mdx({
      components: {
        VideoEmbed: './src/components/VideoEmbed.astro',
      },
    }),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
