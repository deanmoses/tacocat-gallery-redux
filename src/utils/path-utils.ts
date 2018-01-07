const dateBasedPathRegex = /^\/?(\d\d\d\d)\/?(\d\d-\d\d)?(\/[^\/\.]+\.[^\/\.]{3,4})?\/?$/; // finds 2000 or 2000/12-31 or 2000/12-31/someImage.jpg

/**
 * Return the year (like 2001) from a path (like 2001/12-31/myImage.jpg)
 *
 * @param path Path to an image or an album
 * @return numerical year or null if the path can't be parsed into a number
 */
export function getYearFromPath(path: string): number {
	const regexResults = dateBasedPathRegex.exec(path);
	if (regexResults) {
		const year = Number(dateBasedPathRegex.exec(path)[1]);
		return year !== NaN ? year : null;
	} else {
		return null;
	}
}
