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
	DRAFT_SAVING = 'DRAFT_SAVING',
	DRAFT_SAVED = 'DRAFT_SAVED',
	DRAFT_SAVE_ERRORED = 'DRAFT_SAVE_ERRORED',
	THUMBNAIL_UPDATE = 'THUMBNAIL_UPDATE',
	THUMBNAIL_SAVING = 'THUMBNAIL_SAVING',
	THUMBNAIL_SAVED = 'THUMBNAIL_SAVED',
	THUMBNAIL_SAVE_ERRORED = 'THUMBNAIL_SAVE_ERRORED',
	LATEST_ALBUM_REQUESTED = 'LATEST_ALBUM_REQUESTED',
	LATEST_ALBUM_RECEIVED = 'LATEST_ALBUM_RECEIVED',
	LATEST_ALBUM_ERRORED = 'LATEST_ALBUM_ERRORED',
	SEARCHING = 'SEARCHING',
	SEARCH_RESULTS_RECEIVED = 'SEARCH_RESULTS_RECEIVED',
	SEARCH_ERRORED = 'SEARCH_ERRORED',
	AUTHENTICATION_STATUS_UPDATE = 'AUTHENTICATION_STATUS_UPDATE',
	EDIT_MODE_UPDATE = 'EDIT_MODE_UPDATE',
	OTHER_ACTION = 'OTHER_ACTION'
}

export type ActionTypes =
	| AlbumRequested
	| AlbumRecieved
	| AlbumErrored
	| DraftUpdate
	| DraftSaving
	| DraftSaved
	| DraftSaveErrored
	| ThumbnailSaving
	| ThumbnailSaved
	| ThumbnailSaveErrored
	| LatestAlbumRequested
	| LatestAlbumRecieved
	| LatestAlbumErrored
	| Searching
	| SearchResultsReceived
	| SearchErrored
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
	newDraftContent: DraftContent;
}

/**
 * Draft is being saved to the server
 */
export interface DraftSaving extends Action {
	type: ActionTypeKeys.DRAFT_SAVING;
	/**
	 * Path of album or image being updated
	 */
	path: string;
}

/**
 * Draft was saved successfully to the server
 */
export interface DraftSaved extends Action {
	type: ActionTypeKeys.DRAFT_SAVED;
	/**
	 * Path of album or image being updated
	 */
	path: string;
}

/**
 * Draft save errored
 */
export interface DraftSaveErrored extends Action {
	type: ActionTypeKeys.DRAFT_SAVE_ERRORED;
	/**
	 * Path of album or image being updated
	 */
	path: string;
	error: FetchError;
}

/**
 * New thumbnail for album is being saved to the server
 */
export interface ThumbnailSaving extends Action {
	type: ActionTypeKeys.THUMBNAIL_SAVING;
	/**
	 * Path of album whose thumbnail is being saved
	 */
	albumPath: string;
}

/**
 * New thumbnail for album was saved successfully to the server
 */
export interface ThumbnailSaved extends Action {
	type: ActionTypeKeys.THUMBNAIL_SAVED;
	/**
	 * Path of album whose thumbnail is being saved
	 */
	albumPath: string;
	/**
	 * URL to new thumbnail image for album
	 */
	thumbnailUrl: string;
}

/**
 * There was an error trying to save a new thumbnail for album
 */
export interface ThumbnailSaveErrored extends Action {
	type: ActionTypeKeys.THUMBNAIL_SAVE_ERRORED;
	/**
	 * Path of album whose thumbnail was being saved
	 */
	albumPath: string;
	error: FetchError;
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
 * Search results are being fetched (but not yet received) from the server
 */
export interface Searching extends Action {
	type: ActionTypeKeys.SEARCHING;
	searchTerms: string;
}

/**
 * Search results have been received from server
 */
export interface SearchResultsReceived extends Action {
	type: ActionTypeKeys.SEARCH_RESULTS_RECEIVED;
	searchTerms: string;
	searchResults: any;
}

/**
 * The search has errored attempting to retrieve from server
 */
export interface SearchErrored extends Action {
	type: ActionTypeKeys.SEARCH_ERRORED;
	searchTerms: string;
	error: FetchError;
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
