import { defineCollection, z } from "astro:content";

export const projectsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    publishedAt: z.date(),
    description: z.string(),
    github: z.string(),
    demo: z.string().optional(),
    paper: z.string().optional(),
    wdilwm: z.string().optional(),
    isPublish: z.boolean(),
    isDraft: z.boolean().default(false),
  }),
});

export const wdilwmCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    publishedAt: z.date(),
    description: z.string(),
    project: z.string().optional(),
    github: z.string().optional(),
    demo: z.string().optional(),
    paper: z.string().optional(),
    isPublish: z.boolean(),
    isDraft: z.boolean().default(false),
  }),
});

export const experienceCollection = defineCollection({
  type: "content",
  schema: z.object({
    company: z.string(),
    role: z.string(),
    dateStart: z.coerce.date(),
    dateEnd: z.union([z.coerce.date(), z.string()]).optional(),
  }),
});