import { type ZodLiteral, z } from "astro/zod";

export const imageError = {
	read: 0b00,
	conversion: 0b01,
	write: 0b10,
} as const;

export const imagePathMessageSchema = z.object({
	path: z.string(),
});

export type ImagePathMessage = z.infer<typeof imagePathMessageSchema>;

const imageErrorMessageSchema = z.object({
	type: z.literal("error"),
	data: z.object({
		code: z.nativeEnum(imageError),
		path: z.string(),
	}),
});

const imageSuccessMessageSchema = z.object({
	type: z.literal("success"),
	data: z.object({
		path: z.string(),
	}),
});

export const imageConversionMessageSchema = z.union([
	imageErrorMessageSchema,
	imageSuccessMessageSchema,
]);

export type ImageConversionMessage = z.infer<
	typeof imageConversionMessageSchema
>;
