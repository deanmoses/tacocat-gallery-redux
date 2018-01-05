/**
 * The React Redux reducers and state for the application
 */

import * as Actions from '@src/redux/actions/actions';
import { AlbumsByPath, Album } from '@src/models/album';

/**
 * The shape of the application's state.
 */
export type RootState = {
	/**
	 * Map of albumName -> album object
	 */
	readonly albumsByPath: AlbumsByPath;

	/**
	 * True: user is authenticated
	 */
	readonly isAuthenticated: boolean;
};

/**
 * Starting state of the application
 */
export const initialRootState: RootState = {
	albumsByPath: {},
	isAuthenticated: false
};

/**
 * The root React Redux reducer.  It combines all the other reducers into a
 * single top-level reducer that the React Redux store calls.
 */
export const allReducers = {
	albumsByPath: albumsByPath,
	isAuthenticated: isAuthenticated
};

/**
 * A reducer function
 */
export function albumsByPath(
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

			// Make copy of existing album, except with status of 'loading'
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

/**
 * A reducer function
 */
export function isAuthenticated(
	state: boolean,
	action: Actions.ActionTypes
): boolean {
	if (!action) {
		return state ? state : false;
	}
	switch (action.type) {
		case Actions.ActionTypeKeys.UPDATE_USER_AUTHENTICATION_STATUS:
			return action.isAuthenticated;
		default:
			return state ? state : false;
	}
}
