import { RootState } from '@src/redux/reducers/reducers';
import { Album, Image } from '@src/models/album';
import createAlbumFromObject from '@src/models/album-creator';

/**
 * Retrieve album for the specified imagePath
 */
export function getImage(state: RootState, imagePath: string): Image {
	let album = getAlbumForImage(state, imagePath);
	return album ? album.getImage(imagePath) : null;
}

/**
 * Retrieve album for the specified imagePath
 */
export function getAlbumForImage(state: RootState, imagePath: string): Album {
	// get album's path from the photo's path
	let pathParts = imagePath.split('/');
	pathParts.pop(); // remove photo filename
	const albumPath = pathParts.join('/');

	// retrieve album from state
	return getAlbum(state, albumPath);
}

/**
 * Retrieve album with specified path
 */
export function getAlbum(state: RootState, albumPath: string): Album {
	const album = state.albumsByPath[albumPath];
	return album ? createAlbumFromObject(album) : null;
}
