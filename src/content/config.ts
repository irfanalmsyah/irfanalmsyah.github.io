import { defineCollection, z } from "astro:content";

const projectsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    publishedAt: z.date(),
    description: z.string(),
    github: z.string(),
    demo: z.string().optional(),
    wdilwm: z.string().optional(),
    isPublish: z.boolean(),
    isDraft: z.boolean().default(false),
  }),
});

const wdilwmCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    publishedAt: z.date(),
    description: z.string(),
    project: z.string(),
    isPublish: z.boolean(),
    isDraft: z.boolean().default(false),
  }),
});

export const collections = { projects: projectsCollection, wdilwms: wdilwmCollection };
