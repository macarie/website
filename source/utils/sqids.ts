import Sqids from "sqids";

export const sqids = new Sqids();

export const createRandomId = (values = 4) =>
	sqids.encode(Array.from(crypto.getRandomValues(new Uint8Array(values))));
