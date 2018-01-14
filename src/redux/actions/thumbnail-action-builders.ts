//
// These are Redux Action builders: helper functions to create Actions
//
import Config from '@src/utils/config';

// import { RootState } from '@src/redux/reducers/root-state';
import {
	ActionTypeKeys,
	ThumbnailSaving,
	ThumbnailSaved,
	ThumbnailSaveErrored
} from '@src/redux/actions/actions';
import { FetchErrorImpl } from '@src/models/models';
// import { AlbumThumb, FetchErrorImpl } from '@src/models/models';

/**
 * Set the specified thumbnail as the thumbnail for the specified album
 *
 * @param albumPath path of album I'm setting the thumbnail on
 * @param thumbnailLeafPath leaf path of the thumbnail item, like 'felix.jpg'
 */
export function setAlbumThumbnail(
	albumPath: string,
	thumbnailLeafPath: string
) {
	console.log(`setThumbnail(${albumPath}, ${thumbnailLeafPath})`);

	return function(dispatch: Function, getState: Function) {
		console.log('setting thumbnail', getState());

		// Update Redux store state to "Saving..." for this image or album
		dispatch(savingAction(albumPath));

		// Body of HTTP POST
		let jsonPostData: any = {
			eip_context: 'album',
			thumb: thumbnailLeafPath
		};

		console.log(
			'Will save to',
			Config.jsonAlbumSaveUrl(albumPath),
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
		return fetch(Config.jsonAlbumSaveUrl(albumPath), requestConfig)
			.then(checkForErrors)
			.then(response => response.json())
			.then(json => dispatch(successAction(albumPath, json)))
			.catch(error => dispatch(errorAction(albumPath, error)));
	};
}

function savingAction(albumPath: string): ThumbnailSaving {
	console.log('saving action', albumPath);
	return {
		type: ActionTypeKeys.THUMBNAIL_SAVING,
		albumPath: albumPath
	};
}

function checkForErrors(response: Response): Response {
	// TODO: instead of simply checking ok, return a structured FetchError with a NotFound type, etc
	if (!response.ok) {
		throw Error(response.statusText);
	}
	return response;
}

function successAction(albumPath: string, json: any): ThumbnailSaved {
	console.log(
		`Success saving thumbnail for ${albumPath}.  Do something with JSON:`,
		json
	);
	return {
		type: ActionTypeKeys.THUMBNAIL_SAVED,
		albumPath: albumPath
	};
}

export function errorAction(
	albumPath: string,
	error: Error
): ThumbnailSaveErrored {
	console.log(
		`Error saving thumbnail for ${albumPath}.  Do something with error:`,
		error
	);
	window.alert(`Error saving thumbnail for ${albumPath}: ${error.message}`);
	return {
		type: ActionTypeKeys.THUMBNAIL_SAVE_ERRORED,
		albumPath: albumPath,
		error: new FetchErrorImpl(error.message)
	};
}
