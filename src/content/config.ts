import { defineCollection, z } from 'astro:content';

const mediaItem = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('image'),
    src: z.string(),
    alt: z.string(),
  }),
  z.object({
    type: z.literal('video'),
    src: z.string(),
    poster: z.string().optional(),
    alt: z.string(),
  }),
]);

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    status: z.enum(['complete', 'in-progress', 'ongoing']),
    role: z.string(),
    tools: z.array(z.string()),
    summary: z.string(),
    media: z.array(mediaItem).default([]),
  }),
});

const research = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    type: z.enum(['lab-work', 'conference', 'paper-reading']),
    summary: z.string(),
    media: z.array(mediaItem).default([]),
  }),
});

export const collections = { projects, research };
