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
		case Actions.ActionTypeKeys.REQUEST_ALBUM:
			console.log('REQUEST_ALBUM');
			// Set album status to "loading"
			let album = albumsByPath[action.albumPath];
			if (!album) {
				album = {
					path: action.albumPath,
					isLoading: true
				};
			} else {
				album.isLoading = true;
			}
			action.albumPath;
			albumsByPath[action.albumPath] = album;
			// Return a copy of the object.  Otherwise, Redux won't recognize it as
			// having changed and won't broadcast any updates.
			// TODO: figure out polyfill that allows the more performant ECMAscript 6 (works on Edge but not IE): return Object.assign({}, albumsByPath);
			return Object.create(albumsByPath);

		/**
		 * Received album from server
		 */
		case Actions.ActionTypeKeys.RECEIVE_ALBUM:
			console.log('RECEIVE_ALBUM');
			//Add album to store
			albumsByPath[action.albumPath] = action.album;
			// Return a copy of the object.  Otherwise, Redux won't recognize it as
			// having changed and won't broadcast any updates.
			// TODO: figure out polyfill that allows the more performant ECMAscript 6 (works on Edge but not IE): return Object.assign({}, albumsByPath);
			return Object.create(albumsByPath);
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
