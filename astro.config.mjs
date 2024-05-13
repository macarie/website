import { env } from "node:process";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import { defineConfig, passthroughImageService } from "astro/config";
import rehypePrettyCode from "rehype-pretty-code";
import remarkDirective from "remark-directive";
import remarkDirectiveRehype from "remark-directive-rehype";

// https://astro.build/config
export default defineConfig({
	srcDir: "source",
	site: env.SITE ?? "http://localhost",
	image: {
		service: passthroughImageService(),
	},
	markdown: {
		syntaxHighlight: false,
		remarkPlugins: [remarkDirective, remarkDirectiveRehype],
		rehypePlugins: [
			[
				rehypePrettyCode,
				{
					theme: "vesper",
				},
			],
		],
	},
	integrations: [tailwind(), mdx()],
	vite: {
		ssr: {
			noExternal: ["react-tweet"],
		},
	},
});
