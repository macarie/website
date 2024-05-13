import { z } from "astro:content";

const schema = z.object({
	NAME: z.string(),
	ROLE: z.string(),
	X_USERNAME: z.string().startsWith("@"),
});

export const env = schema.parse(import.meta.env);
