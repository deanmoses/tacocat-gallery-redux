import { Album, Alb } from '@src/models/album';
import YearAlbum from '@src/models/year-album';

/**
 * Create an Album or a subclass of Album
 * @param json JSON or any object
 */
export default function createAlbumFromObject(json: any): Album {
	let alb: Album;
	// no path: it's the root album
	if (!!json && (!json.path || json.path.length <= 0 || json.path === '/')) {
		alb = new Alb(json.path);
	} else if (!!json && !!json.path && json.path.indexOf('/') < 0) {
		// no slashes: it's a year album
		alb = new YearAlbum(json.path);
	} else {
		alb = new Alb(json.path);
	}
	return Object.assign(alb, json);
}
