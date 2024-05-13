import { AstroError } from "astro/errors";
import type { Element, Root } from "hast";
import { rehype } from "rehype";
import rehypeFormat from "rehype-format";

/**
 * Process tooltip target: validates the HTML and adds `aria-describedby="{id}"` to the element.
 * @param html Inner HTML passed to the `<Tooltip>` component.
 */
export const processTooltip = (
	html: string | undefined,
	id: string,
	content: string,
) => {
	const file = rehype()
		.data("settings", { fragment: true })
		.use(() => {
			return (tree: Root, vfile) => {
				const rootElements = tree.children.filter(
					(item): item is Element => item.type === "element",
				);
				const [rootElement] = rootElements;

				if (!rootElement) {
					throw new TooltipError(
						"The `<Tooltip>` component expects its content to be a single child element but found no child elements.",
					);
				}

				if (rootElements.length > 1) {
					throw new TooltipError(
						`The \`<Tooltip>\` component expects its content to be a single child element but found multiple child elements: ${rootElements
							.map((element: Element) => `\`<${element.tagName}>\``)
							.join(", ")}.`,
						vfile.value.toString(),
					);
				}

				rootElement.properties["aria-describedby"] = id;
				rootElement.properties["data-tooltip"] = content;
			};
		})
		.processSync({ value: html });
	return { html: file.toString() };
};

const prettyPrintProcessor = rehype()
	.data("settings", { fragment: true })
	.use(rehypeFormat);
const prettyPrintHtml = (html: string) =>
	prettyPrintProcessor.processSync({ value: html }).toString();

class TooltipError extends AstroError {
	constructor(message: string, html?: string) {
		const hint =
			typeof html === "string"
				? `Full HTML passed to \`<Tooltip>\`:\n${prettyPrintHtml(html)}`
				: html;

		super(message, hint);
	}
}
