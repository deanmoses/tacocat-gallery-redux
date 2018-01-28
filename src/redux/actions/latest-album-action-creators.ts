//
// These are Redux Action builders: helper functions to create Actions
//

import { RootState } from '@src/redux/reducers/root-state';
import Config from '@src/utils/config';
import {
	ActionTypeKeys,
	LatestAlbumRequested,
	LatestAlbumRecieved,
	LatestAlbumErrored
} from '@src/redux/actions/actions';
import { AlbumThumb, FetchErrorImpl } from '@src/models/models';

/**
 * Fetch the latest album if needed
 */
export function fetchLatestAlbumIfNeeded() {
	return function(dispatch: Function, getState: Function) {
		if (shouldFetchLatestAlbum(getState())) {
			return dispatch(fetchLatestAlbum());
		}
	};
}

function shouldFetchLatestAlbum(state: RootState): boolean {
	const album = state.latestAlbum;
	// always fetch latest album for now
	const shouldFetch = !album || !!album;
	return shouldFetch;
}

function fetchLatestAlbum() {
	return (dispatch: Function) => {
		dispatch(requestLatestAlbum());
		return fetch(Config.latestAlbumUrl())
			.then(handleErrors)
			.then(response => response.json())
			.then(json => dispatch(receiveLatestAlbum(json)))
			.catch(error => dispatch(errorLatestAlbum(error)));
	};
}

function handleErrors(response: Response): Response {
	// TODO: instead of simply checking ok, return a structured FetchError with a NotFound type, etc
	if (!response.ok) {
		throw Error(response.statusText);
	}
	return response;
}

/**
 * Action Builder: a helper function to create an Action
 */
function requestLatestAlbum(): LatestAlbumRequested {
	return {
		type: ActionTypeKeys.LATEST_ALBUM_REQUESTED
	};
}

/**
 * Action Builder: a helper function to create an Action
 */
function receiveLatestAlbum(json: any): LatestAlbumRecieved {
	// TODO: better error handling if we don't get back expected response
	// This will happen for sure if the statistics plugin isn't enabled
	const latestAlbum: AlbumThumb = json.album.stats.album
		.latest[0] as AlbumThumb;

	return {
		type: ActionTypeKeys.LATEST_ALBUM_RECEIVED,
		latestAlbum: latestAlbum
	};
}

/**
 * Action Builder: a helper function to create an Action
 */
export function errorLatestAlbum(error: Error): LatestAlbumErrored {
	return {
		type: ActionTypeKeys.LATEST_ALBUM_ERRORED,
		error: new FetchErrorImpl(error.message)
	};
}
