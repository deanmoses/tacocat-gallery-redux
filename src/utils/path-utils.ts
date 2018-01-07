const dateBasedPathRegex = /^\/?(\d\d\d\d)\/?(\d\d-\d\d)?(\/[^\/\.]+\.[^\/\.]{3,4})?\/?$/; // like 2000 or 2000/12-31 or 2000/12-31/someImage.jpg

/**
 * Return the year (like 2001) from a path (like 2001/12-31/myImage.jpg)
 *
 * @param path Path to an image or an album
 * @return numerical year or NaN if the path can't be parsed into a number
 */
export function getYearFromPath(path: string): number {
	return Number(dateBasedPathRegex.exec(path)[0]);
}
