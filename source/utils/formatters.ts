export const dateFormatter = new Intl.DateTimeFormat(["en-US", "en"], {
	year: "numeric",
	month: "long",
	day: "numeric",
});

export const timeFormatter = new Intl.DateTimeFormat(["en-US", "en"], {
	timeStyle: "short",
});
