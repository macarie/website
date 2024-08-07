import { z } from "astro:content";

const schema = z.object({
	NAME: z.string(),
	ROLE: z.string(),
});

export const env = schema.parse(import.meta.env);
