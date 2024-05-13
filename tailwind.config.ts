import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const gap = "clamp(1rem, 6vw, 2rem)";

const breakouts = {
	full: {
		name: "full",
		size: `minmax(${gap}, 1fr)`,
	},
	popout: {
		name: "popout",
		size: "minmax(0, 6rem)",
	},
	content: {
		name: "content",
		size: `min(100% - ${gap} * 2, 60ch)`,
	},
};

const createColumn = (
	{ name, size }: { name: string; size: string },
	content?: string,
) =>
	`[${name}-start] ${size} ${
		content ? `${content} ${size}` : ""
	} [${name}-end]`;

export default {
	content: ["./source/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		colors: {
			neutral: {
				100: "oklch(99.94% 0.003 106.45)",
				200: "oklch(97.26% 0.003 106.45)",
				300: "oklch(95.1% 0.003 106.45)",
				400: "oklch(93.65% 0.003 106.45)",
				500: "#fff",
				600: "oklch(51.61% 0.003 106.45)",
				700: "oklch(31.61% 0.003 106.45)",
				800: "oklch(22.1% 0.003 106.45)",
				900: "#fff",
			},
			highlight: "oklch(95.07% 0.188 118.056)",
			transparent: "oklch(none none none / 0)",
		},
		letterSpacing: {
			none: "0rem",
			base: "-0.0109598em",
			lg: "-0.0143007em",
		},
		transitionDuration: {
			DEFAULT: "230ms",
		},
		transitionTimingFunction: {
			DEFAULT: "cubic-bezier(0.65, 0.05, 0.36, 1)",
			linear: "linear",
		},
		gridColumn: {
			content: breakouts.content.name,
			popout: breakouts.popout.name,
			full: breakouts.full.name,
		},
		gridTemplateColumns: {
			breakouts: createColumn(
				breakouts.full,
				createColumn(breakouts.popout, createColumn(breakouts.content)),
			),
		},
		extend: {
			fontFamily: {
				sans: ["var(--inter)", ...defaultTheme.fontFamily.sans],
				mono: ["var(--berkeley-mono)", ...defaultTheme.fontFamily.mono],
				cursive: ["var(--lore)", "cursive"],
				iosevka: ["var(--iosevka)"],
			},
			backgroundImage: {
				radar:
					"radial-gradient(transparent 35%, oklch(76.86% 0.157 143.87) 100%)",
				"eased-gradient": `linear-gradient(
					to bottom,
					color-mix(in oklch, var(--tw-gradient-from), var(--tw-gradient-to) 0%) 0%,
					color-mix(in oklch, var(--tw-gradient-from), var(--tw-gradient-to) 1.3%) 8.1%,
					color-mix(in oklch, var(--tw-gradient-from), var(--tw-gradient-to) 4.9%) 15.5%,
					color-mix(in oklch, var(--tw-gradient-from), var(--tw-gradient-to) 10.4%) 22.5%,
					color-mix(in oklch, var(--tw-gradient-from), var(--tw-gradient-to) 17.5%) 29%,
					color-mix(in oklch, var(--tw-gradient-from), var(--tw-gradient-to) 25.9%) 35.3%,
					color-mix(in oklch, var(--tw-gradient-from), var(--tw-gradient-to) 35.2%) 41.2%,
					color-mix(in oklch, var(--tw-gradient-from), var(--tw-gradient-to) 45%) 47.1%,
					color-mix(in oklch, var(--tw-gradient-from), var(--tw-gradient-to) 55%) 52.9%,
					color-mix(in oklch, var(--tw-gradient-from), var(--tw-gradient-to) 64.8%) 58.8%,
					color-mix(in oklch, var(--tw-gradient-from), var(--tw-gradient-to) 74.1%) 64.7%,
					color-mix(in oklch, var(--tw-gradient-from), var(--tw-gradient-to) 82.5%) 71%,
					color-mix(in oklch, var(--tw-gradient-from), var(--tw-gradient-to) 89.6%) 77.5%,
					color-mix(in oklch, var(--tw-gradient-from), var(--tw-gradient-to) 95.1%) 84.5%,
					color-mix(in oklch, var(--tw-gradient-from), var(--tw-gradient-to) 98.7%) 91.9%,
					color-mix(in oklch, var(--tw-gradient-from), var(--tw-gradient-to) 100%) 100%
				)`,
			},
		},
	},
	plugins: [],
} satisfies Config;
