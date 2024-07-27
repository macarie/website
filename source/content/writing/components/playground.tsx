import { type ParentComponent, createMemo } from "solid-js";

export type PlaygroundProps = {
	width?: "auto" | "content" | "popout" | "full";
};

export const Playground: ParentComponent<PlaygroundProps> = (props) => {
	const width = createMemo(() => {
		switch (props.width) {
			case "content":
				return "col-content";
			case "popout":
				return "col-popout";
			case "full":
				return "col-full";
			default:
				return "col-content w-auto min-w-80 place-self-center";
		}
	});

	return (
		<div class={`rounded-xl bg-neutral-300 p-1 ${width()}`}>
			<div class="flex flex-col items-center rounded-lg p-4 [--size:36px] [background:radial-gradient(closest-corner,transparent,theme(colors.neutral.100)),linear-gradient(90deg,theme(colors.neutral.200)1px,transparent_1px)repeat_center/var(--size),linear-gradient(0deg,theme(colors.neutral.200)1px,transparent_1px)repeat_center/var(--size)var(--size),theme(colors.neutral.100)]">
				{props.children}
			</div>
		</div>
	);
};
