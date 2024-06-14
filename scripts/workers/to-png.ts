import sharp from "sharp";
import {
	type ImageConversionMessage,
	imageError,
	imagePathMessageSchema,
} from "../_common.ts";

// biome-ignore lint/style/noVar: we're declaring the "runtime"
declare var self: Worker;

self.onmessage = async (event) => {
	const data = imagePathMessageSchema.parse(event.data);

	const inputFile = await Bun.file(data.path)
		.arrayBuffer()
		.catch(() => {
			self.postMessage({
				type: "error",
				data: {
					code: imageError.read,
					path: data.path,
				},
			} satisfies ImageConversionMessage);
		});

	if (inputFile === undefined) {
		return;
	}

	const imageBuffer = await sharp(inputFile)
		.png()
		.toBuffer()
		.catch(() => {
			self.postMessage({
				type: "error",
				data: {
					code: imageError.conversion,
					path: data.path,
				},
			} satisfies ImageConversionMessage);
		});

	if (imageBuffer === undefined) {
		return;
	}

	await Bun.write(data.path.replace(/\.\w+$/, ".png"), imageBuffer).catch(
		() => {
			self.postMessage({
				type: "error",
				data: {
					code: imageError.write,
					path: data.path,
				},
			} satisfies ImageConversionMessage);
		},
	);

	self.postMessage({
		type: "success",
		data: {
			path: data.path,
		},
	} satisfies ImageConversionMessage);
};
