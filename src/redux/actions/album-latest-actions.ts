import { RootState } from '@src/redux/reducers/root-state';
import Config from '@src/utils/config';
import {
	ActionTypeKeys,
	LatestAlbumRequested,
	LatestAlbumRecieved,
	LatestAlbumErrored
} from '@src/redux/actions/actions';

/**
 * Action Builder: a helper function to create an Action
 */
export function fetchLatestAlbumIfNeeded() {
	console.log('fetchLatestAlbumIfNeeded()');
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
	console.log(`shouldFetchLatestAlbum()?`, shouldFetch);
	return shouldFetch;
}

function fetchLatestAlbum() {
	return (dispatch: Function) => {
		console.log('fetchLatestAlbum()');
		dispatch(requestLatestAlbum());
		return fetch(Config.latestAlbumJsonUrl())
			.then(handleErrors)
			.then(response => response.json())
			.then(json => dispatch(receiveLatestAlbum(json)))
			.catch(error => dispatch(errorLatestAlbum(error.message)));
	};
}

function handleErrors(response: any) {
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
	return {
		type: ActionTypeKeys.LATEST_ALBUM_RECEIVED,
		json: json.album
	};
}

/**
 * Action Builder: a helper function to create an Action
 */
export function errorLatestAlbum(error: any): LatestAlbumErrored {
	return {
		type: ActionTypeKeys.LATEST_ALBUM_ERRORED,
		error: error
	};
}
