//
// Redux Action creator: helper functions to create Redux Action
//
import Config from '@src/utils/config';

import {
	ActionTypeKeys,
	ThumbnailSaving,
	ThumbnailSaved,
	ThumbnailSaveErrored
} from '@src/redux/actions/actions';
import { FetchErrorImpl } from '@src/models/models';

/**
 * Set specified thumbnail as specified album's thumbnail
 *
 * @param albumPath path of album I'm setting the thumbnail on
 * @param thumbnailLeafPath leaf path of the thumbnail item, like 'felix.jpg'
 */
export function setAlbumThumbnail(
	albumPath: string,
	thumbnailLeafPath: string
) {
	console.log(`setThumbnail(album:${albumPath}, thumb:${thumbnailLeafPath})`);

	return function(dispatch: Function, getState: Function) {
		console.log('setting thumbnail', getState());

		// Update Redux store state to "Saving..." for this image or album
		dispatch(savingAction(albumPath));

		// The body of the form I will be sending to the server
		let formData = new FormData();
		formData.append('eip_context', 'album');
		formData.append('thumb', thumbnailLeafPath);

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
		return fetch(Config.saveUrl(albumPath), requestConfig)
			.then(checkForErrors)
			.then(response => response.json())
			.then(json => dispatch(successAction(albumPath, thumbnailLeafPath, json)))
			.catch(error =>
				dispatch(errorAction(albumPath, thumbnailLeafPath, error))
			);
	};
}

/**
 * Return an action object to be sent to Redux
 *
 * @param albumPath path of album whose thumbnail will be changing
 */
function savingAction(albumPath: string): ThumbnailSaving {
	console.log('saving action', albumPath);
	return {
		type: ActionTypeKeys.THUMBNAIL_SAVING,
		albumPath: albumPath
	};
}

/**
 * Check for errors in response and throw exception if found
 */
function checkForErrors(response: Response): Response {
	// TODO: instead of simply checking ok, return a structured FetchError with a NotFound type, etc
	if (!response.ok) {
		throw Error(response.statusText);
	}
	return response;
}

/**
 * Return an action object to be sent to Redux
 *
 * @param albumPath path of album whose thumbnail has changed
 * @param thumbnailLeafPath leaf path of the thumbnail item, like 'felix.jpg'
 * @param json response from server
 */
function successAction(
	albumPath: string,
	thumbnailLeafPath: string,
	json: any
): ThumbnailSaved {
	if (!json || !json.success) {
		console.log(
			`Server did not respond with success saving thumbnail ${thumbnailLeafPath} for album ${albumPath}.  Instead, responded with:`,
			json
		);
		throw new Error(
			`Server did not respond with success saving thumbnail ${thumbnailLeafPath} for album ${albumPath}.  Instead, responded with: ` +
				json
		);
	}
	const thumbnailUrl = json.urlThumb;
	if (!thumbnailUrl) {
		console.log(
			`Did not get thumbnail URL back from server for ${thumbnailLeafPath} for album ${albumPath}.  Instead, responded with:`,
			thumbnailUrl
		);
		throw new Error(
			`Did not get thumbnail URL back from server for ${thumbnailLeafPath} for album ${albumPath}.  Instead, responded with: ` +
				thumbnailUrl
		);
	}
	return {
		type: ActionTypeKeys.THUMBNAIL_SAVED,
		albumPath: albumPath,
		thumbnailUrl: thumbnailUrl
	};
}

/**
 * Return an action object to be sent to Redux
 *
 * @param albumPath path of album whose thumbnail has changed
 * @param thumbnailLeafPath leaf path of the thumbnail item, like 'felix.jpg'
 * @param error error that occurred somewhere while attempting to set thumbnail to server
 */
export function errorAction(
	albumPath: string,
	thumbnailLeafPath: string,
	error: Error
): ThumbnailSaveErrored {
	console.log(
		`Error saving thumbnail '${thumbnailLeafPath}' on album '${albumPath}'.  Error:`,
		error
	);
	window.alert(`Error saving thumbnail: ${error.message}`);
	return {
		type: ActionTypeKeys.THUMBNAIL_SAVE_ERRORED,
		albumPath: albumPath,
		error: new FetchErrorImpl(error.message)
	};
}
