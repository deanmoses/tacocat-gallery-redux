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
import { RootState } from '@src/redux/reducers/reducers';
import { Album, Alb } from '@src/redux/reducers/album';

/**
 * The keys for each action in the application
 */
export enum ActionTypeKeys {
	ALBUM_REQUESTED = 'ALBUM_REQUESTED',
	ALBUM_RECEIVED = 'ALBUM_RECEIVED',
	ALBUM_ERRORED = 'ALBUM_ERRORED',
	UPDATE_USER_AUTHENTICATION_STATUS = 'UPDATE_USER_AUTHENTICATION_STATUS',
	OTHER_ACTION = 'OTHER_ACTION'
}

export type ActionTypes =
	| AlbumRequested
	| AlbumRecieved
	| AlbumErrored
	| UpdateUserAuthenticationStatus
	| OtherAction;

/**
 * Action Builder: a helper function to create an Action
 */
export function fetchAlbumIfNeeded(albumPath: string) {
	console.log('fetchAlbumIfNeeded()', albumPath);
	return function(dispatch: Function, getState: Function) {
		if (shouldFetchAlbum(getState(), albumPath)) {
			return dispatch(fetchAlbum(albumPath));
		}
	};
}

function shouldFetchAlbum(state: RootState, albumPath: string) {
	console.log('shouldFetchAlbum() state:', state);
	const album = state.albumsByPath[albumPath];
	return !album || !album.isLoading;
}

function fetchAlbum(albumPath: string) {
	return (dispatch: Function) => {
		console.log('fetchAlbum()', albumPath);
		dispatch(requestAlbum(albumPath));
		return fetch(`https://tacocat.com/zenphoto/${albumPath}/?api`)
			.then(handleErrors)
			.then(response => response.json())
			.then(json => dispatch(receiveAlbum(albumPath, json)))
			.catch(error => dispatch(errorAlbum(albumPath, error.message)));
	};
}

function handleErrors(response: any) {
	if (!response.ok) {
		throw Error(response.statusText);
	}
	return response;
}

/**
 * Action type definition
 */
export interface AlbumRequested extends Action {
	type: ActionTypeKeys.ALBUM_REQUESTED;
	albumPath: string;
}
function requestAlbum(albumPath: string): AlbumRequested {
	return {
		type: ActionTypeKeys.ALBUM_REQUESTED,
		albumPath
	};
}

/**
 * Action type definition
 */
export interface AlbumRecieved extends Action {
	type: ActionTypeKeys.ALBUM_RECEIVED;
	albumPath: string;
	album: Album;
}
function receiveAlbum(albumPath: string, json: any): AlbumRecieved {
	return {
		type: ActionTypeKeys.ALBUM_RECEIVED,
		albumPath,
		album: Alb.fromObject(json)
	};
}

export interface AlbumErrored extends Action {
	type: ActionTypeKeys.ALBUM_ERRORED;
	albumPath: string;
	error: any;
}
export function errorAlbum(albumPath: string, error: any): AlbumErrored {
	return {
		type: ActionTypeKeys.ALBUM_ERRORED,
		albumPath,
		error: error
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
