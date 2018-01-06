//
// The React Redux reducers for getting the latest album
//

import * as Actions from '@src/redux/actions/actions';
import { AlbumThumb } from '@src/models/models';

/**
 * A reducer function
 */
export function latestAlbumReducer(
	latestAlbum: AlbumThumb = null,
	action: Actions.ActionTypes
): AlbumThumb {
	if (!action) {
		return latestAlbum;
	}
	switch (action.type) {
		/**
		 *  In process of fetching from server
		 */
		case Actions.ActionTypeKeys.LATEST_ALBUM_REQUESTED: {
			console.log(action.type);

			// Make copy of existing item, except with status of 'loading'
			let copy = Object.assign({ isLoading: true }, latestAlbum);
			return copy;
		}

		/**
		 * Received from server
		 */
		case Actions.ActionTypeKeys.LATEST_ALBUM_RECEIVED: {
			console.log(action.type, action.latestAlbum);
			return action.latestAlbum;
		}

		/**
		 * Received error attempting to fetch from server
		 */
		case Actions.ActionTypeKeys.LATEST_ALBUM_ERRORED: {
			console.log(action.type, action.error);

			// Make copy of existing item, except with status of 'error'
			let copy = Object.assign(
				{ err: action.error, isLoading: false },
				latestAlbum
			);
			return copy;
		}

		default:
			return latestAlbum;
	}
}
