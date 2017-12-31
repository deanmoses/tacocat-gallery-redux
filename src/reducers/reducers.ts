/**
 * The React Redux reducers and state for the application
 */

import { Action, combineReducers } from 'redux';
import * as Actions from '@src/actions/actions';
import { AlbumsByName } from '@src/reducers/Album';

/**
 * The shape of the application's state.
 */
export type RootState = {
	/**
	 * Map of albumName -> album object
	 */
	readonly albumsByPath: AlbumsByName;

	/**
	 * Currently selected album
	 */
	readonly currentAlbumPath: string;

	/**
	 * App is loading some data
	 */
	readonly isLoading: boolean;

	/**
	 * App is in an error state (like there was an error loading data)
	 */
	readonly error: string;

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
	currentAlbumPath: null,
	isLoading: false,
	error: null,
	isAuthenticated: false
};

/**
 * The root React Redux reducer.
 *
 * It combines all the other reducers into a single top-level
 * reducer that the React Redux store calls.
 */
export const rootReducer = combineReducers<RootState>({
	albumsByPath: albumsByPath,
	currentAlbumPath: currentAlbumPath,
	isLoading: isLoading,
	error: error,
	isAuthenticated: isAuthenticated
});

function albumsByPath(state: AlbumsByName = {}, action: Action): AlbumsByName {
	switch (action.type) {
		default:
			return state;
	}
}

function currentAlbumPath(state: string = '', action: Action): string {
	switch (action.type) {
		default:
			return state;
	}
}

/**
 * A reducer function
 */
function isLoading(state: boolean = false, action: Action): boolean {
	switch (action.type) {
		case 'LOAD_COUNT_REQUEST':
			return true;
		case 'LOAD_COUNT_SUCCESS':
		case 'LOAD_COUNT_ERROR':
			return false;
		default:
			return state;
	}
}

/**
 * A reducer function
 */
function error(state: string = '', action: Action): string {
	switch (action.type) {
		case 'LOAD_COUNT_REQUEST':
		case 'SAVE_COUNT_REQUEST':
			return '';
		case 'LOAD_COUNT_ERROR':
		case 'SAVE_COUNT_ERROR':
			return null; // TODO: figure out strongly typed Thunk async actions // action.error.toString();
		default:
			return state;
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
