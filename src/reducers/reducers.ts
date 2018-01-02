/**
 * The React Redux reducers and state for the application
 */

import * as Actions from '@src/actions/actions';
import { AlbumsByPath, Alb } from '@src/reducers/album';

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

			// Set album to 'loading'
			let updatedAlbum = Object.assign(
				new Alb(action.albumPath),
				albumsByPath[action.albumPath]
			);
			updatedAlbum.isLoading = true;
			let newAlbums = { ...albumsByPath };
			newAlbums[action.albumPath] = updatedAlbum;
			return newAlbums;
		}

		/**
		 * Received album from server
		 */
		case Actions.ActionTypeKeys.ALBUM_RECEIVED: {
			console.log(action.type, action.albumPath);
			let newAlbums = { ...albumsByPath };
			// Add album to store
			newAlbums[action.albumPath] = action.album;
			return newAlbums;
		}

		/**
		 * Received error attempting to fetch album from server
		 */
		case Actions.ActionTypeKeys.ALBUM_ERRORED: {
			console.log(action.type, action.albumPath);
			// Set album status to error
			let updatedAlbum = Object.assign(
				new Alb(action.albumPath),
				albumsByPath[action.albumPath]
			);
			updatedAlbum.isLoading = false;
			updatedAlbum.err = action.error;
			let newAlbums = { ...albumsByPath };
			newAlbums[action.albumPath] = updatedAlbum;
			return newAlbums;
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
