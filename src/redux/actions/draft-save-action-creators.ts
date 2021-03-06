//
// These are Redux Action builders: helper functions to create Actions
//

import Config from '@src/utils/config';
import {
	ActionTypeKeys,
	DraftSaving,
	DraftSaved,
	DraftSavedTimeout,
	DraftSaveErrored
} from '@src/redux/actions/actions';
import { getDraft } from '@src/redux/selectors/draft-selectors';
import { Draft, FetchErrorImpl, AlbumType } from '@src/models/models';
import {
	isImagePath,
	isAlbumPath,
	getAlbumType,
	getParentFromPath
} from '@src/utils/path-utils';
import { updateAlbumServerCache } from '@src/redux/actions/update-server-album-cache';

/**
 * Save the draft at the specified path
 *
 * @param path path of album or image whose draft I should save
 */
export function saveDraft(path: string) {
	return (dispatch: Function, getState: Function) => {
		// Update Redux store state to "Saving..." for this image or album
		dispatch(savingAction(path));

		// Get draft from the Redux store
		const draft = getDraft(getState(), path);

		// The body of the form I will be sending to the server
		let formData = new FormData();
		formData.append('eip_context', isImagePath(path) ? 'image' : 'album');
		// Add the content of the draft (the actual album or image fields) to the form body
		const content: any = draft.content;
		for (let fieldName in content) {
			formData.append(fieldName, content[fieldName]);
		}

		// Save draft to server
		let requestConfig: RequestInit = {
			method: 'POST',
			headers: {
				Accept: 'application/json'
			},
			body: formData,
			cache: 'no-store',
			credentials: 'include'
		};
		return fetch(Config.saveUrl(path), requestConfig)
			.then(checkForErrors)
			.then(response => response.json())
			.then(json => handleSuccess(dispatch, path, draft, json))
			.catch(error => dispatch(errorAction(path, error)));
	};
}

function savingAction(path: string): DraftSaving {
	return {
		type: ActionTypeKeys.DRAFT_SAVING,
		path: path
	};
}

function checkForErrors(response: Response): Response {
	// TODO: instead of simply checking ok, return a structured FetchError with a NotFound type, etc
	if (!response.ok) {
		throw Error(response.statusText);
	}
	return response;
}

function handleSuccess(
	dispatch: Function,
	path: string,
	draft: Draft,
	json: any
) {
	if (!json || !json.success) {
		console.log(
			`Server did not respond with success saving draft for ${path}.  Instead, responded with:`,
			json,
			'Draft:',
			draft
		);
		throw new Error(
			'Server did not respond with success.  Instead, responded with: ' + json
		);
	}

	// Tell system the draft save was successful
	dispatch(successAction(path, draft));
	// Tell system to stop showing that the draft save was successful
	setTimeout(() => {
		dispatch(successTimeoutAction(path));
	}, 2000);

	// For some types of albums, update the cache of the album on the server
	if (isAlbumPath(path)) {
		const albumType = getAlbumType(path);
		// If it's a year album, update its cache
		if (albumType === AlbumType.YEAR) {
			updateAlbumServerCache(path);
		} else if (albumType === AlbumType.DAY) {
			// If it's a day album, update parent year album
			updateAlbumServerCache(getParentFromPath(path));
		}
	}
}

function successAction(path: string, draft: Draft): DraftSaved {
	return {
		type: ActionTypeKeys.DRAFT_SAVED,
		path: path,
		draft: draft
	};
}

function successTimeoutAction(path: string): DraftSavedTimeout {
	return {
		type: ActionTypeKeys.DRAFT_SAVED_TIMEOUT,
		path: path
	};
}

export function errorAction(path: string, error: Error): DraftSaveErrored {
	return {
		type: ActionTypeKeys.DRAFT_SAVE_ERRORED,
		path: path,
		error: new FetchErrorImpl(error.message)
	};
}
