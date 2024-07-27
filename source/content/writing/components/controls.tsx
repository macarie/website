import type { gsap } from "gsap";
import {
	type Component,
	Match,
	type ParentComponent,
	Switch,
	createSignal,
	onCleanup,
	onMount,
} from "solid-js";

const Button: ParentComponent<{
	onClick: () => void;
}> = (props) => (
	<button
		class="rounded bg-neutral-200 px-2 py-1 transition-colors hover:bg-neutral-300 focus-visible:bg-neutral-300"
		type="button"
		onClick={props.onClick}
	>
		{props.children}
	</button>
);

export const Controls: Component<{
	timeline: ReturnType<typeof gsap.timeline> | undefined;
}> = (props) => {
	const [state, setState] = createSignal<"paused" | "playing" | "done">(
		props.timeline?.paused() ?? true ? "paused" : "playing",
	);

	onMount(() => {
		const setIsDone = () => {
			setState("done");
		};

		props.timeline?.call(setIsDone);

		onCleanup(() => {
			props.timeline?.remove(setIsDone);
		});
	});

	return (
		<div class="self-start">
			<Button
				onClick={() => {
					switch (state()) {
						case "paused": {
							setState("playing");
							return props.timeline?.play();
						}
						case "playing": {
							setState("paused");
							return props.timeline?.pause();
						}
						case "done": {
							setState("playing");
							return props.timeline?.restart();
						}
					}
				}}
			>
				<Switch>
					<Match when={state() === "paused"}>Play</Match>
					<Match when={state() === "playing"}>Pause</Match>
					<Match when={state() === "done"}>Restart</Match>
				</Switch>
			</Button>
		</div>
	);
};
