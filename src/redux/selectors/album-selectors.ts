//
// Redux selector functions
//
// The job of a selector function is to "select" (aka retrieve) some bit of state
// out of the Redux store.
//
// The Redux store should store plain javascript objects so this is a good place
// to turn that plain object into a specific class.
//

import { RootState } from '@src/redux/reducers/root-state';
import { Album, Image, AlbumThumb } from '@src/models/models';
import createAlbumFromObject from '@src/models/album-creator';

/**
 * Retrieve album with specified path
 */
export function getAlbum(state: RootState, albumPath: string): Album {
	const album = state.albumsByPath[albumPath];
	return album ? createAlbumFromObject(album) : null;
}

/**
 * Retrieve image for the specified imagePath
 */
export function getImage(state: RootState, imagePath: string): Image {
	let album = getAlbumForImage(state, imagePath);
	return album ? album.getImage(imagePath) : null;
}

/**
 * Retrieve parent album for the specified imagePath
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
 * Retrieve the latest album
 */
export function getLatestAlbum(state: RootState): AlbumThumb {
	return state.latestAlbum;
}
