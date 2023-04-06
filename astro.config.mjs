import { defineConfig } from 'astro/config';

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [mdx()],
  collections: [
    {
      route: '/:lang/blog/:slug',
      template: './src/pages/[lang]/blog.astro',
      sources: [
        {
          type: 'filesystem',
          options: {
            path: './src/content/blog/{lang}/*.md',
            lang: ['en', 'fr'],
          },
        },
      ],
    },
  ],
});