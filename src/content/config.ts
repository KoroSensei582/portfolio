import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    status: z.enum(['complete', 'in-progress', 'ongoing']),
    role: z.string(),
    tools: z.array(z.string()),
    tags: z.array(z.string()),
    summary: z.string(),
    hero: z.object({
      src: z.string(),
      alt: z.string(),
    }).optional(),
  }),
});

export const collections = { projects };
