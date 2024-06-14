import { resolve } from "node:path";
import { Glob } from "bun";
import PQueue from "p-queue";
import {
	type ImagePathMessage,
	imageConversionMessageSchema,
	imageError,
} from "./_common";

const ogImages = [
	...new Glob("**").scanSync({
		cwd: resolve(import.meta.dir, "../public/og"),
		absolute: true,
		dot: false,
		onlyFiles: true,
	}),
];

const concurrency = Math.min(ogImages.length, navigator.hardwareConcurrency);

console.log(
	`🦦 Converting ${ogImages.length} OG images using ${concurrency} workers out of ${navigator.hardwareConcurrency} available`,
);

const queue = new PQueue({ concurrency });

const workers = Array.from({ length: concurrency }).map(
	() => new Worker(resolve(import.meta.dir, "./workers/to-png.ts")),
);

const freeWorkers = new WeakSet(workers);

const tryConversion = (imagePath: string, retriesLeft: number) => {
	const worker = workers.find((worker) => freeWorkers.has(worker));

	if (worker === undefined) {
		throw new Error("No worker available");
	}

	freeWorkers.delete(worker);

	return new Promise<void>((resolve) => {
		console.log(`⏳ Converting ${imagePath}`);

		worker.postMessage({ path: imagePath } satisfies ImagePathMessage);

		worker.addEventListener("message", (event) => {
			const data = imageConversionMessageSchema.parse(event.data);

			freeWorkers.add(worker);

			if (data.type === "error") {
				console.log(
					`🆘 Failed to convert ${imagePath}, reason: ${
						Object.entries(imageError)
							.find(([key, value]) => (data.data.code ^ value) === 0)
							?.at(0) ?? "unknown"
					}. Retries left: ${retriesLeft}`,
				);

				if (retriesLeft > 0) {
					resolve(queue.add(() => tryConversion(imagePath, retriesLeft - 1)));

					return;
				}

				throw new Error(`Failed to convert ${imagePath}`);
			}

			console.log(`✅ Successfully converted ${imagePath}`);

			resolve();
		});
	});
};

await Promise.all(
	ogImages.map((imagePath) => queue.add(() => tryConversion(imagePath, 3))),
);

for (const worker of workers) {
	worker.terminate();
}
