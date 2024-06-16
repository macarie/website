const location = window.location;
const document = window.document;
const url = new URL("/api/event", "https://stats.devminer.xyz");
const website = new URL(import.meta.env.SITE).host;

const shouldIgnore = () => {
	try {
		return (
			/^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(
				location.hostname,
			) ||
			"file:" === location.protocol ||
			"_phantom" in window ||
			"__nightmare" in window ||
			window.navigator.webdriver ||
			"Cypress" in window ||
			window.localStorage.plausible_ignore === "true"
		);
	} catch (t) {}

	return false;
};

function sendEvent(
	event: string,
	extra?: { props: Record<string, unknown>; meta: Record<string, unknown> },
) {
	if (shouldIgnore()) return;

	const body = {
		n: event,
		u: location.href,
		d: website,
		r: document.referrer || null,
		p: extra?.props ?? undefined,
		m: extra?.meta ? JSON.stringify(extra.meta) : undefined,
	};

	fetch(url, {
		method: "POST",
		headers: { "Content-Type": "text/plain" },
		body: JSON.stringify(body),
	}).catch((error) => {
		console.warn("Failed sending event", error);
	});
}

let lastPage: string | null = null;

function onPageChange() {
	if (location.pathname === lastPage) return;

	sendEvent("pageview");

	lastPage = location.pathname;
}

if (history.pushState) {
	const originalPushState = history.pushState;

	history.pushState = function (...args) {
		originalPushState.apply(this, args);
		onPageChange();
	};

	addEventListener("popstate", onPageChange);

	if (
		(document.visibilityState as DocumentVisibilityState | "prerender") ===
		"prerender"
	) {
		document.addEventListener("visibilitychange", () => {
			if (lastPage !== null || document.visibilityState === "visible") return;

			onPageChange();
		});
	} else {
		onPageChange();
	}
}
