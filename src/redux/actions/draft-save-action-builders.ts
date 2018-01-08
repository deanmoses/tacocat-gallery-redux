//
// These are Redux Action builders: helper functions to create Actions
//

import Config from '@src/utils/config';
import {
	ActionTypeKeys,
	DraftSaving,
	DraftSaved,
	DraftSaveErrored
} from '@src/redux/actions/actions';
import { getDraft } from '@src/redux/selectors/draft-selectors';
import { FetchErrorImpl } from '@src/models/models';

/**
 * Save the draft at the specified path
 *
 * @param path path of album or image whose draft I should save
 */
export function saveDraft(path: string) {
	return (dispatch: Function, getState: Function) => {
		console.log('saveDraft()');

		// Update Redux store state to "Saving..." for this image or album
		dispatch(savingAction(path));

		// Get draft from the Redux store
		const draft = getDraft(getState(), path);

		// Make copy of draft, so I can add stuff to it without modifying store
		let jsonPostData: any = { ...draft };

		// Add fields needed by Zenphoto
		// TODO: set this based on whether the path is for an image or an album
		jsonPostData.eip_context = 'album';

		console.log(
			'Will save to',
			Config.jsonAlbumSaveUrl(path),
			'draft content:',
			jsonPostData
		);

		// Save draft to server
		var requestConfig: RequestInit = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(jsonPostData),
			cache: 'no-store',
			credentials: 'include'
		};
		return fetch(Config.jsonAlbumSaveUrl(path), requestConfig)
			.then(checkForErrors)
			.then(response => response.json())
			.then(json => dispatch(successAction(path, json)))
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

function successAction(path: string, json: any): DraftSaved {
	console.log('success.  do something with json: ', json);
	return {
		type: ActionTypeKeys.DRAFT_SAVED,
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
