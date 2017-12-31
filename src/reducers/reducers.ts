/**
 * The React Redux reducers and state for the application
 */

import { combineReducers } from 'redux';
import * as Actions from '@src/actions/actions';
import { AlbumsByPath } from '@src/reducers/album';

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
export const rootReducer = combineReducers<RootState>({
	albumsByPath: albumsByPath,
	isAuthenticated: isAuthenticated
});

/**
 * A reducer function
 */
function albumsByPath(
	albumsByPath: AlbumsByPath = {},
	action: Actions.ActionTypes
): AlbumsByPath {
	switch (action.type) {
		/**
		 *  In process of fetching album from server
		 */
		case Actions.ActionTypeKeys.ALBUM_REQUESTED:
			console.log(action.type, action.albumPath);
			let newAlbums = { ...albumsByPath };
			// Set album to 'loading'
			newAlbums[action.albumPath] = {
				path: action.albumPath,
				isLoading: true
			};
			return newAlbums;

		/**
		 * Received album from server
		 */
		case Actions.ActionTypeKeys.ALBUM_RECEIVED:
			console.log(action.type, action.albumPath);
			newAlbums = { ...albumsByPath };
			// Add album to store
			newAlbums[action.albumPath] = action.album;
			return newAlbums;

		/**
		 * Received error attempting to fetch album from server
		 */
		case Actions.ActionTypeKeys.ALBUM_ERRORED:
			console.log(action.type, action.albumPath);
			newAlbums = { ...albumsByPath };
			// Set album status to error
			newAlbums[action.albumPath] = {
				path: action.albumPath,
				err: action.error
			};
			return newAlbums;
		default:
			return albumsByPath;
	}
}

/**
 * A reducer function
 */
function isAuthenticated(state: boolean, action: Actions.ActionTypes): boolean {
	switch (action.type) {
		case Actions.ActionTypeKeys.UPDATE_USER_AUTHENTICATION_STATUS:
			return action.isAuthenticated;
		default:
			return state ? state : false;
	}
}
