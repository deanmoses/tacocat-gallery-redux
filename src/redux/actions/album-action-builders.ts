//
// These are Redux Action builders: helper functions to create Actions
//

import { RootState } from '@src/redux/reducers/root-state';
import Config from '@src/utils/config';
import { Album, FetchErrorImpl } from '@src/models/models';
import {
	ActionTypeKeys,
	AlbumRequested,
	AlbumRecieved,
	AlbumErrored
} from '@src/redux/actions/actions';

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

function shouldFetchAlbum(state: RootState, albumPath: string): boolean {
	const album = state.albumsByPath[albumPath];
	// always fetch album
	const shouldFetch = !album || !!album;
	console.log(`shouldFetchAlbum(${albumPath})?`, shouldFetch);
	return shouldFetch;
}

export function fetchAlbum(albumPath: string) {
	return (dispatch: Function) => {
		console.log('fetchAlbum()', albumPath);
		dispatch(requestAlbum(albumPath));
		return fetch(Config.jsonAlbumUrl(albumPath))
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
 * Action Builder: a helper function to create an Action
 */
function requestAlbum(albumPath: string): AlbumRequested {
	return {
		type: ActionTypeKeys.ALBUM_REQUESTED,
		albumPath
	};
}

/**
 * Action Builder: a helper function to create an Action
 */
function receiveAlbum(albumPath: string, json: any): AlbumRecieved {
	// TODO: better error handling if we don't get back expected response
	const album: Album = json.album as Album;
	return {
		type: ActionTypeKeys.ALBUM_RECEIVED,
		albumPath,
		album: album
	};
}

/**
 * Action Builder: a helper function to create an Action
 */
export function errorAlbum(albumPath: string, error: Error): AlbumErrored {
	return {
		type: ActionTypeKeys.ALBUM_ERRORED,
		albumPath,
		error: new FetchErrorImpl(error.message)
	};
}
