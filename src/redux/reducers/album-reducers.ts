//
// The React Redux reducers for albums
//

import * as Actions from '@src/redux/actions/actions';
import { AlbumsByPath, Album } from '@src/models/models';

/**
 * A reducer function
 */
export function albumsByPathReducer(
	albumsByPath: AlbumsByPath = {},
	action: Actions.ActionTypes
): AlbumsByPath {
	if (!action) {
		return {};
	}
	switch (action.type) {
		/**
		 *  In process of fetching album from server
		 */
		case Actions.ActionTypeKeys.ALBUM_REQUESTED: {
			console.log(action.type, action.albumPath);

			// Make copy of existing album, except with status of 'loading'
			let albumCopy = Object.assign(
				{ path: action.albumPath, isLoading: true },
				albumsByPath[action.albumPath]
			);

			// Make copy of entire store and return it
			let albumsCopy = { ...albumsByPath };
			albumsCopy[action.albumPath] = albumCopy;
			return albumsCopy;
		}

		/**
		 * Received album from server
		 */
		case Actions.ActionTypeKeys.ALBUM_RECEIVED: {
			console.log(action.type, action.albumPath);
			let newAlbums = { ...albumsByPath };
			// Add album to store
			newAlbums[action.albumPath] = action.albumJson as Album;
			return newAlbums;
		}

		/**
		 * Received error attempting to fetch album from server
		 */
		case Actions.ActionTypeKeys.ALBUM_ERRORED: {
			console.log(action.type, action.albumPath, action.error);

			// Make copy of existing album, except with status of 'error'
			let albumCopy = Object.assign(
				{ path: action.albumPath, err: action.error, isLoading: false },
				albumsByPath[action.albumPath]
			);

			// Make copy of entire store and return it
			let albumsCopy = { ...albumsByPath };
			albumsCopy[action.albumPath] = albumCopy;
			return albumsCopy;
		}

		default:
			return albumsByPath;
	}
}
