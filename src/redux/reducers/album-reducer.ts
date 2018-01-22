//
// The React Redux reducers for albums
//

import * as Actions from '@src/redux/actions/actions';
import { AlbumsByPath, Album, AlbumThumb, Image } from '@src/models/models';
import { getParentFromPath, isImagePath } from '@src/utils/path-utils';

/**
 * A reducer function
 */
export function albumsByPathReducer(
	albumsByPath: AlbumsByPath = {},
	action: Actions.ActionTypes
): AlbumsByPath {
	if (!action) {
		return {};
	}
	switch (action.type) {
		/**
		 * ALBUM_REQUESTED
		 * In process of fetching album from server
		 */
		case Actions.ActionTypeKeys.ALBUM_REQUESTED: {
			console.log(action.type, action.albumPath);

			// Make copy of existing album and set its status to 'loading'
			return copyAlbumsByPath(albumsByPath, {
				path: action.albumPath,
				isLoading: true,
				err: undefined
			});
		}

		/**
		 * ALBUM_ERRORED
		 * Received error attempting to fetch album from server
		 */
		case Actions.ActionTypeKeys.ALBUM_ERRORED: {
			console.log(action.type, action.albumPath, action.error);

			// Make copy of existing album and set its status to 'error'
			return copyAlbumsByPath(albumsByPath, {
				path: action.albumPath,
				isLoading: false,
				err: action.error
			});
		}

		/**
		 * ALBUM_RECEIVED
		 * Received album from server
		 */
		case Actions.ActionTypeKeys.ALBUM_RECEIVED: {
			console.log(action.type, action.albumPath);

			// Make copy of albumsByPath
			let albumsCopy = { ...albumsByPath };

			// Add album to copy of albumsByPath
			albumsCopy[action.albumPath] = action.album as Album;

			// Return copy of albumsByPath
			return albumsCopy;
		}

		/**
		 * DRAFT_SAVED
		 * Draft successfully saved to server.  Update real album or image in store.
		 */
		case Actions.ActionTypeKeys.DRAFT_SAVED: {
			console.log(action.type, action.path, action.draft.content);
			if (!action.path) throw new Error('Draft with no path');

			// If we're dealing with a draft of an image
			if (isImagePath(action.path)) {
				// Make copy of albumsByPath
				let newAlbumsByPath = { ...albumsByPath };

				// Get album copy whose image we need to update
				const albumPath = getParentFromPath(action.path);
				const album = newAlbumsByPath[albumPath];

				// Get image to update
				let image = !album.images
					? null
					: album.images.find((image: Image) => image.path === action.path);

				if (!image)
					throw new Error(
						`Could not find image [${action.path}] in album [${album.path}]`
					);

				// Apply contents of draft to image
				Object.assign(image, action.draft.content);

				// Return copy of albumsByPath
				return newAlbumsByPath;
			} else {
				// Else we're dealing with a draft of an album
				// Make copy of existing album and update its fields from the draft
				return copyAlbumsByPath2(
					albumsByPath,
					action.path,
					action.draft.content
				);
			}
		}

		/**
		 * THUMBNAIL_SAVED
		 * New album thumbnail saved to server.  Update it in store.
		 */
		case Actions.ActionTypeKeys.THUMBNAIL_SAVED: {
			console.log(action.type, action.albumPath, action.thumbnailUrl);

			// Make copy of Redux store with updated thumbnail
			let newAlbumsByPath = copyAlbumsByPath(albumsByPath, {
				path: action.albumPath,
				url_thumb: action.thumbnailUrl
			});

			// Set the thumb on the parent album, if it's been downloaded
			const parentAlbumPath = getParentFromPath(action.albumPath);
			const parentAlbum = albumsByPath[parentAlbumPath];
			if (!!parentAlbum) {
				if (!!parentAlbum.albums) {
					// find album on parent
					let thumbOnParent: AlbumThumb = parentAlbum.albums.find(
						(childThumb: AlbumThumb) => {
							return childThumb.path === action.albumPath;
						}
					);

					if (!thumbOnParent) {
						// Did not find album within parent album
						// Never expect this to happen, just defensive programming
						throw new Error(
							`Did not find album ${
								action.albumPath
							} in parent album ${parentAlbumPath}`
						);
					} else {
						// Found it.  Set thumb
						thumbOnParent.url_thumb = action.thumbnailUrl;
					}
				}
			}

			// Return copy of Redux store
			return newAlbumsByPath;
		}

		// Default: don't want to handle this action, return existing Redux store unchanged
		default:
			return albumsByPath;
	}
}

/**
 * Return copy of albumsByPath, with the new album put into it.
 *
 * @param oldAlbumsByPath The current copy of albumsByPath in the Redux store.  Will be copied.
 * @param newAlbumFields Album fields that have been updated.  Either apply to an existing album or create new album.
 */
function copyAlbumsByPath(
	oldAlbumsByPath: AlbumsByPath,
	newAlbumFields: Album
): AlbumsByPath {
	return copyAlbumsByPath2(
		oldAlbumsByPath,
		newAlbumFields.path,
		newAlbumFields
	);
}

/**
 * Return copy of albumsByPath, with the new album put into it.
 *
 * @param oldAlbumsByPath The current copy of albumsByPath in the Redux store.  Will be copied.
 * @param albumPath The path of the album to update
 * @param newAlbumFields Album fields that have been updated.  Either apply to an existing album or create new album.
 */
function copyAlbumsByPath2(
	oldAlbumsByPath: AlbumsByPath,
	albumPath: string,
	newAlbumFields: Album
): AlbumsByPath {
	if (!albumPath) throw new Error('Album path is not set');

	// Either create new album, or make copy of existing album and apply new fields
	const newAlbum: Album = {
		...oldAlbumsByPath[albumPath],
		...newAlbumFields
	};

	// Make copy of albumsByPath
	let newAlbumsByPath = { ...oldAlbumsByPath };

	// Add new/copy album to copy of albumsByPath
	newAlbumsByPath[albumPath] = newAlbum;

	// Return copy of albumsByPath
	return newAlbumsByPath;
}
