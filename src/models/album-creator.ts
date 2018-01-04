import { Album, Alb, AlbumType } from '@src/models/album';
import RootAlbum from '@src/models/album-year';
import YearAlbum from '@src/models/album-year';
import DayAlbum from '@src/models/album-day';

/**
 * Create an Album or a subclass of Album
 * @param json JSON or any Object
 */
export default function createAlbumFromObject(json: any): Album {
	let alb: Album = getAlbum(json);
	return Object.assign(alb, json);
}

function getAlbum(json: any): Album {
	if (!json || !json.path)
		throw new Error('JSON must have a "path" field to be an album');
	const type = Alb.type(json.path);

	switch (type) {
		case AlbumType.ROOT: {
			return new RootAlbum(json.path);
		}
		case AlbumType.YEAR: {
			return new YearAlbum(json.path);
		}
		case AlbumType.DAY: {
			return new DayAlbum(json.path);
		}
		default:
			throw new Error('Unexpected type');
	}
}
