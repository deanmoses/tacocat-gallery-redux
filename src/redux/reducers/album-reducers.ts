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

			// Make copy of existing album and set its status to 'loading'
			const albumCopy = {
				...albumsByPath[action.albumPath],
				...{ path: action.albumPath, isLoading: true, err: undefined }
			};

			// Make copy of albumsByPath
			let albumsCopy = { ...albumsByPath };

			// Add copy of album to copy of albumsByPath
			albumsCopy[action.albumPath] = albumCopy;

			// Return copy of albumsByPath
			return albumsCopy;
		}

		/**
		 * Received album from server
		 */
		case Actions.ActionTypeKeys.ALBUM_RECEIVED: {
			console.log(action.type, action.albumPath);

			// Make copy of albumsByPath
			let albumsCopy = { ...albumsByPath };

			// Add album to copy of albumsByPath
			albumsCopy[action.albumPath] = action.album as Album;

			// Return copy of albumsByPath
			return albumsCopy;
		}

		/**
		 * Received error attempting to fetch album from server
		 */
		case Actions.ActionTypeKeys.ALBUM_ERRORED: {
			console.log(action.type, action.albumPath, action.error);

			// Make copy of existing album and set its status to 'error'
			const albumCopy = {
				...albumsByPath[action.albumPath],
				...{ path: action.albumPath, err: action.error, isLoading: false }
			};

			// Make copy of albumsByPath
			let albumsCopy = { ...albumsByPath };

			// Add copy of album to copy of albumsByPath
			albumsCopy[action.albumPath] = albumCopy;

			// Return copy of albumsByPath
			return albumsCopy;
		}

		default:
			return albumsByPath;
	}
}
