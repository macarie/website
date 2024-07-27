import { gsap } from "gsap";
import { type Component, createSignal, onMount } from "solid-js";
import { Controls } from "../controls.tsx";
import { Playground, type PlaygroundProps } from "../playground.tsx";

const className = "rounded bg-neutral-400 px-4 py-2 font-mono";
const shake = {
	keyframes: {
		"0%": { x: 0 },
		"6.5%": { x: -6, rotateY: "-9deg" },
		"18.5%": { x: 5, rotateY: "7deg" },
		"31.5%": { x: -3, rotateY: "-5deg" },
		"43.5%": { x: 2, rotateY: "3deg" },
		"50%": { x: 0, rotateY: 0 },
	},
	duration: 1,
	animationTimingFunction: "ease-in-out",
};
const lowerOpacity = {
	opacity: 0.5,
	duration: 0.25,
	animationTimingFunction: "ease-in-out",
};
const restoreOpacity = {
	opacity: 1,
	duration: 0.25,
	animationTimingFunction: "ease-in-out",
};

export const Pipe: Component<PlaygroundProps> = (props) => {
	const [timeline, setTimeline] =
		createSignal<ReturnType<typeof gsap.timeline>>();

	onMount(() => {
		setTimeline(
			gsap
				.timeline({ repeat: 0, delay: 0.5, paused: true })
				.to("#data", { x: "-50%" })
				.to("#fn-a", lowerOpacity, ">")
				.to("#fn-a", shake, ">")
				.to("#data", { scaleX: 1.4 }, "<")
				.to("#fn-a", restoreOpacity, ">")
				.to("#data", { y: "440%" }, ">")
				.to("#fn-b", lowerOpacity, ">")
				.to("#fn-b", shake, ">")
				.to("#data", { rotate: 90 }, "<")
				.to("#fn-b", restoreOpacity, ">")
				.to("#data", { y: "820%" }, ">")
				.to("#fn-c", lowerOpacity, ">")
				.to("#fn-c", shake, ">")
				.to("#data", { backgroundColor: "oklch(89.59% 0.182 101.22)" }, "<")
				.to("#fn-c", restoreOpacity, ">")
				.to("#data", { x: "-200%" }, ">"),
		);
	});

	return (
		<Playground width={props.width}>
			<div class="mb-4 flex">
				<div
					class="-translate-x-[200%] absolute size-5 translate-y-[60%] bg-neutral-600"
					id="data"
				/>
				<div class="z-10 flex flex-col gap-8 text-center">
					<div class={className} id="fn-a">
						Stretch
					</div>
					<div class={className} id="fn-b">
						Rotate
					</div>
					<div class={className} id="fn-c">
						Paint
					</div>
				</div>
			</div>
			<Controls timeline={timeline()} />
		</Playground>
	);
};
