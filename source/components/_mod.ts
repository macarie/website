import Checkbox from "./checkbox.astro";
import Tweet from "./tweet.astro";
import Emphasis from "./typography/emphasis.astro";
import H1 from "./typography/h1.astro";
import H2 from "./typography/h2.astro";
import H3 from "./typography/h3.astro";
import Hr from "./typography/hr.astro";
import Kbd from "./typography/kbd.astro";
import Link from "./typography/link.astro";
import ListItem from "./typography/list-item.astro";
import Paragraph from "./typography/paragraph.astro";
import Small from "./typography/small.astro";
import Strong from "./typography/strong.astro";
import UnorderedList from "./typography/unordered-list.astro";

export const mdxComponents = {
	h1: H1,
	h2: H2,
	h3: H3,
	p: Paragraph,
	a: Link,
	small: Small,
	strong: Strong,
	kbd: Kbd,
	em: Emphasis,
	ul: UnorderedList,
	li: ListItem,
	input: Checkbox,
	hr: Hr,
	// custom components
	tweet: Tweet,
} satisfies Partial<
	Record<keyof HTMLElementTagNameMap | (string & Record<never, never>), any>
>;
