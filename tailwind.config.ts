import type { Config } from "tailwindcss";

export default {
	content: ["./source/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {},
	},
	plugins: [],
} satisfies Config;
