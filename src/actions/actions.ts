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
import { Album } from '@src/reducers/Album';

/**
 * The keys for each action in the application
 */
export enum ActionTypeKeys {
	MY_ACTION1,
	UPDATE_USER_AUTHENTICATION_STATUS,
	REQUEST_ALBUM,
	RECEIVE_ALBUM,
	OTHER_ACTION
}

export type ActionTypes = UpdateUserAuthenticationStatus | OtherAction;

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

function requestAlbum(albumPath: string) {
	return {
		type: ActionTypeKeys.REQUEST_ALBUM,
		albumPath
	};
}

function receiveAlbum(albumPath: string, json: any) {
	return {
		type: ActionTypeKeys.RECEIVE_ALBUM,
		albumPath,
		// This is NOT a cast from json to a real Album object; it simply
		// asserts that the json is the right shape to be an Album.
		// TODO: defensive programming programming if the json isn't the
		// right shape to be used as an Album
		album: <Album>json,
		receivedAt: Date.now()
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
