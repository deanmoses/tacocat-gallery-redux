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
		alb = Object.create(Alb.prototype);
	} else if (!!json && !!json.path && json.path.indexOf('/') < 0) {
		// no slashes:  it's a year album
		alb = Object.create(YearAlbum.prototype);
	} else {
		alb = Object.create(Alb.prototype);
	}
	return Object.assign(alb, json);
}
