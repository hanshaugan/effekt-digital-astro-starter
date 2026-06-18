import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({
    pattern: ['**/*.{md,mdx}', '!**/_*.{md,mdx}'],
    base: './src/content/blog',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    category: z.string().default('Innsikt'),
    author: z.string().optional(),
    /** Valgfritt forsidebilde på /blogg/ – sti fra public/, f.eks. /images/blog/slug/bilde.jpg */
    image: z.string().optional(),
  }),
});

export const collections = { blog };
