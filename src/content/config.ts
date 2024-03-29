import { defineCollection, z } from "astro:content";

const experience = defineCollection({
  schema: z.object({
    title: z.string(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    logo: z.string().optional(),
  }),
});

export const collections = { experience };
