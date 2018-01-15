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
import { isImagePath } from '@src/utils/path-utils';

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

		// The body of the form I will be sending to the server
		let formData = new FormData();
		formData.append('eip_context', isImagePath(path) ? 'image' : 'album');
		// Add the content of the draft (the actual album or image fields) to the form body
		const content: any = draft.content;
		for (let fieldName in content) {
			formData.append(fieldName, content[fieldName]);
		}

		// Save draft to server
		var requestConfig: RequestInit = {
			method: 'POST',
			headers: {
				Accept: 'application/json'
			},
			body: formData,
			cache: 'no-store',
			credentials: 'include'
		};
		return fetch(Config.albumSaveUrl(path), requestConfig)
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
	if (!json || !json.success) {
		console.log(
			`Server did not respond with success saving draft for ${path}.  Instead, responded with:`,
			json
		);
		throw new Error(
			'Server did not respond with success.  Instead, responded with: ' + json
		);
	}

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
