import { defineCollection, reference, z } from "astro:content";

const rootCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string(),
		last_update: z.optional(z.coerce.date()),
	}),
});

const writingCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.object({
			long: z.string(),
			short: z.string(),
		}),
		date: z.coerce.date(),
		tags: z.array(reference("tags")),
		draft: z.literal(true).optional(),
	}),
});

const tagsCollection = defineCollection({
	type: "data",
	schema: z.object({
		name: z.string(),
		icon: z.string().optional(),
		color: z.string().optional(),
		slug: z.string(),
	}),
});

export const collections = {
	root: rootCollection,
	writing: writingCollection,
	tags: tagsCollection,
};
