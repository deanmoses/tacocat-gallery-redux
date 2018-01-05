import { RootState } from '@src/redux/reducers/reducers';
import { fetchAlbum } from '@src/redux/actions/album-actions';

/**
 * Action Builder: a helper function to create an Image
 */
export function fetchImageIfNeeded(imagePath: string) {
	console.log(`fetchImageIfNeeded(${imagePath})`);

	// get the album's path from the photo's path
	var pathParts = imagePath.split('/');
	pathParts.pop(); // remove photo filename
	var albumPath = pathParts.join('/');

	return function(dispatch: Function, getState: Function) {
		if (shouldFetch(getState(), albumPath)) {
			return dispatch(fetchAlbum(albumPath));
		}
	};
}

/**
 * Return true if we need to fetch album containing the image
 *
 * @param albumPath path to the album the image is in
 * @returns true if we need to fetch the album containing the image
 */
function shouldFetch(state: RootState, albumPath: string): boolean {
	// retrieve the album from state
	const album = state.albumsByPath[albumPath];

	// if the album exists, no matter how old, don't fetch it again
	// TODO: implement some sort of age-based system to re-fetch older albums
	const shouldFetchAlbum = !album;
	console.log(`shouldFetchAlbum(${albumPath})?`, shouldFetchAlbum);
	return shouldFetchAlbum;
}
