//
// This file contains React Redux action definitions.
//
// A Redux action is essentially an instruction to change
// the application state such as “Hey Redux Store! I’ve got
// an instruction for you, please update the state tree with
// this new piece of information.”
//

import { Action } from 'redux';
import {
	Album,
	AlbumThumb,
	DraftContent,
	FetchError
} from '@src/models/models';

/**
 * The keys for each action in the application
 */
export enum ActionTypeKeys {
	ALBUM_REQUESTED = 'ALBUM_REQUESTED',
	ALBUM_RECEIVED = 'ALBUM_RECEIVED',
	ALBUM_ERRORED = 'ALBUM_ERRORED',
	DRAFT_UPDATE = 'DRAFT_UPDATE',
	LATEST_ALBUM_REQUESTED = 'LATEST_ALBUM_REQUESTED',
	LATEST_ALBUM_RECEIVED = 'LATEST_ALBUM_RECEIVED',
	LATEST_ALBUM_ERRORED = 'LATEST_ALBUM_ERRORED',
	AUTHENTICATION_STATUS_UPDATE = 'AUTHENTICATION_STATUS_UPDATE',
	EDIT_MODE_UPDATE = 'EDIT_MODE_UPDATE',
	OTHER_ACTION = 'OTHER_ACTION'
}

export type ActionTypes =
	| AlbumRequested
	| AlbumRecieved
	| AlbumErrored
	| DraftUpdate
	| LatestAlbumRequested
	| LatestAlbumRecieved
	| LatestAlbumErrored
	| AuthenticationStatusUpdate
	| EditModeUpdate
	| OtherAction;

/**
 * Album has been requested (but not yet received) from the server
 */
export interface AlbumRequested extends Action {
	type: ActionTypeKeys.ALBUM_REQUESTED;
	albumPath: string;
}

/**
 * Album has errored attempting to retrieve from the server
 */
export interface AlbumErrored extends Action {
	type: ActionTypeKeys.ALBUM_ERRORED;
	albumPath: string;
	error: FetchError;
}

/**
 * Album has been received from the server
 */
export interface AlbumRecieved extends Action {
	type: ActionTypeKeys.ALBUM_RECEIVED;
	albumPath: string;
	album: Album;
}

/**
 * Draft edit of an album or image is being created or updated
 */
export interface DraftUpdate extends Action {
	type: ActionTypeKeys.DRAFT_UPDATE;
	/**
	 * Path of album or image being updated
	 */
	path: string;
	draftContent: DraftContent;
}

/**
 * Latest album has been requested (but not yet received) from server
 */
export interface LatestAlbumRequested extends Action {
	type: ActionTypeKeys.LATEST_ALBUM_REQUESTED;
}

/**
 * Latest album has errored attempting to retrieve from server
 */
export interface LatestAlbumErrored extends Action {
	type: ActionTypeKeys.LATEST_ALBUM_ERRORED;
	error: FetchError;
}

/**
 * Latest album has been received from server
 */
export interface LatestAlbumRecieved extends Action {
	type: ActionTypeKeys.LATEST_ALBUM_RECEIVED;
	latestAlbum: AlbumThumb;
}

/**
 * Update authentication status
 */
export interface AuthenticationStatusUpdate extends Action {
	type: ActionTypeKeys.AUTHENTICATION_STATUS_UPDATE;
	isAuthenticated: boolean;
}

/**
 * Update edit mode
 */
export interface EditModeUpdate extends Action {
	type: ActionTypeKeys.EDIT_MODE_UPDATE;
	editMode: boolean;
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
