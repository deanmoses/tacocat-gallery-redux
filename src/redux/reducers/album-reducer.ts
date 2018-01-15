//
// The React Redux reducers for albums
//

import * as Actions from '@src/redux/actions/actions';
import { AlbumsByPath, Album, AlbumThumb } from '@src/models/models';
import { getParentFromPath } from '@src/utils/path-utils';

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
		 *  In process of fetching album from server
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
		 * Album got new thumbnail
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
	// Either create new album, or make copy of existing album and apply new fields
	const newAlbum: Album = {
		...oldAlbumsByPath[newAlbumFields.path],
		...newAlbumFields
	};

	// Make copy of albumsByPath
	let newAlbumsByPath = { ...oldAlbumsByPath };

	// Add new/copy album to copy of albumsByPath
	newAlbumsByPath[newAlbum.path] = newAlbum;

	// Return copy of albumsByPath
	return newAlbumsByPath;
}
