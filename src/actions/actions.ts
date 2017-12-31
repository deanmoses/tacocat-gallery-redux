/**
 * This file contains React Redux action definitions.
 *
 * A Redux action is essentially an instruction to change
 * the application state such as “Hey Redux Store! I’ve got
 * an instruction for you, please update the state tree with
 * this new piece of information.”
 *
 * A Redux Thunk asynchronous action is an action that can
 * do stuff, like make ajax calls, then fire more actions.
 */
import { Action } from 'redux';
// import { Action, ActionCreator, Dispatch } from 'redux';
// import { ThunkAction } from 'redux-thunk';
import { RootState } from '@src/reducers/reducers';
import { FullAlbum } from '@src/reducers/album';

/**
 * The keys for each action in the application
 */
export enum ActionTypeKeys {
	UPDATE_USER_AUTHENTICATION_STATUS = 'UPDATE_USER_AUTHENTICATION_STATUS',
	REQUEST_ALBUM = 'REQUEST_ALBUM',
	RECEIVE_ALBUM = 'RECEIVE_ALBUM',
	OTHER_ACTION = 'OTHER_ACTION'
}

export type ActionTypes =
	| ReceiveAlbum
	| RequestAlbum
	| UpdateUserAuthenticationStatus
	| OtherAction;

/**
 * Action Builder: a helper function to create an Action
 */
export function fetchAlbumIfNeeded(albumPath: string) {
	return function(dispatch: Function, getState: Function) {
		if (shouldFetchAlbum(getState(), albumPath)) {
			return dispatch(fetchAlbum(albumPath));
		}
	};
}

function shouldFetchAlbum(state: RootState, albumPath: string) {
	const album = state.albumsByPath[albumPath];
	return !album || !album.isLoading;
}

function fetchAlbum(albumPath: string) {
	return (dispatch: Function) => {
		dispatch(requestAlbum(albumPath));
		return fetch(`https://tacocat.com/zenphoto/${albumPath}/?api`)
			.then(response => response.json())
			.then(json => dispatch(receiveAlbum(albumPath, json)));
	};
}

/**
 * Action type definition
 */
export interface RequestAlbum extends Action {
	type: ActionTypeKeys.REQUEST_ALBUM;
	albumPath: string;
}
function requestAlbum(albumPath: string): RequestAlbum {
	return {
		type: ActionTypeKeys.REQUEST_ALBUM,
		albumPath
	};
}

/**
 * Action type definition
 */
export interface ReceiveAlbum extends Action {
	type: ActionTypeKeys.RECEIVE_ALBUM;
	album: FullAlbum;
	albumPath: string;
}
function receiveAlbum(albumPath: string, json: any): ReceiveAlbum {
	return {
		type: ActionTypeKeys.RECEIVE_ALBUM,
		albumPath,
		// This is NOT a cast from json to a real Album object; it simply
		// asserts that the json is the right shape to be an Album.
		// TODO: defensive programming programming if the json isn't the
		// right shape to be used as an Album
		album: <FullAlbum>json
	};
}

/**
 * Action type definition
 */
export interface UpdateUserAuthenticationStatus extends Action {
	type: ActionTypeKeys.UPDATE_USER_AUTHENTICATION_STATUS;
	isAuthenticated: boolean;
}

/**
 * The set of actions we explicitly handle in our reducers is almost never
 * the complete set of actions flowing through Redux: third-party plugins and
 * Redux built-in actions happen as well. Our reducers need to handle them
 * appropriately.
 *
 * It’d be nice to get help from TypeScript so that we don’t forget.
 *
 * We handle this case by defining an OtherAction type (which we never dispatch)
 * that lives in our ActionTypes, so TypeScript will warn us if it’s not handled.
 */
export interface OtherAction extends Action {
	type: ActionTypeKeys.OTHER_ACTION;
}

/**
 * Action Builder: a helper function to create an Action
 */
export const updateUserAuthenticationStatus = (
	isAuthenticated: boolean
): UpdateUserAuthenticationStatus => ({
	type: ActionTypeKeys.UPDATE_USER_AUTHENTICATION_STATUS,
	isAuthenticated
});
