import { RootState } from '@src/redux/reducers/reducers';
import { Album } from '@src/models/album';
import createAlbumFromObject from '@src/models/album-creator';

/**
 * Retrieve album for the specified imagePath
 */
export function getAlbumForImage(state: RootState, imagePath: string): Album {
	// get album's path from the photo's path
	var pathParts = imagePath.split('/');
	pathParts.pop(); // remove photo filename
	var albumPath = pathParts.join('/');

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
