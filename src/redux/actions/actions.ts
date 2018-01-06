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

/**
 * The keys for each action in the application
 */
export enum ActionTypeKeys {
	ALBUM_REQUESTED = 'ALBUM_REQUESTED',
	ALBUM_RECEIVED = 'ALBUM_RECEIVED',
	ALBUM_ERRORED = 'ALBUM_ERRORED',
	LATEST_ALBUM_REQUESTED = 'LATEST_ALBUM_REQUESTED',
	LATEST_ALBUM_RECEIVED = 'LATEST_ALBUM_RECEIVED',
	LATEST_ALBUM_ERRORED = 'LATEST_ALBUM_ERRORED',
	UPDATE_USER_AUTHENTICATION_STATUS = 'UPDATE_USER_AUTHENTICATION_STATUS',
	OTHER_ACTION = 'OTHER_ACTION'
}

export type ActionTypes =
	| AlbumRequested
	| AlbumRecieved
	| AlbumErrored
	| LatestAlbumRequested
	| LatestAlbumRecieved
	| LatestAlbumErrored
	| UpdateUserAuthenticationStatus
	| OtherAction;

/**
 * Action type definition
 */
export interface AlbumRequested extends Action {
	type: ActionTypeKeys.ALBUM_REQUESTED;
	albumPath: string;
}

export interface AlbumErrored extends Action {
	type: ActionTypeKeys.ALBUM_ERRORED;
	albumPath: string;
	error: any;
}

/**
 * Action type definition
 */
export interface AlbumRecieved extends Action {
	type: ActionTypeKeys.ALBUM_RECEIVED;
	albumPath: string;
	albumJson: Object;
}

/**
 * Action type definition
 */
export interface LatestAlbumRequested extends Action {
	type: ActionTypeKeys.LATEST_ALBUM_REQUESTED;
}

export interface LatestAlbumErrored extends Action {
	type: ActionTypeKeys.LATEST_ALBUM_ERRORED;
	error: any;
}

/**
 * Action type definition
 */
export interface LatestAlbumRecieved extends Action {
	type: ActionTypeKeys.LATEST_ALBUM_RECEIVED;
	json: Object;
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
