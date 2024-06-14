export function invariant(
	condition: any,
	message: string | (() => string),
	error: ErrorConstructor = Error,
): asserts condition {
	if (condition) {
		return;
	}

	throw new error(typeof message === "function" ? message() : message);
}
