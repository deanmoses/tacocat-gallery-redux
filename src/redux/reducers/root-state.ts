/**
 * The React Redux reducers and state for the application
 */

import {
	AlbumsByPath,
	AlbumThumb,
	DraftsByPath,
	SearchesBySearchTerms
} from '@src/models/models';

/**
 * The shape of the application's state.
 */
export type RootState = {
	/**
	 * Map of albumName -> album object
	 */
	readonly albumsByPath: AlbumsByPath;

	/**
	 * Map of album or image path  -> draft edits of that album or image
	 */
	readonly draftsByPath: DraftsByPath;

	/**
	 * Map of search terms -> search resutls
	 */
	readonly searchesBySearchTerms: SearchesBySearchTerms;

	/**
	 * The most recently published album in the gallery
	 */
	readonly latestAlbum?: AlbumThumb;

	/**
	 * True: user is authenticated
	 */
	readonly isAuthenticated: boolean;

	/**
	 * True: user is in edit mode
	 */
	readonly editMode: boolean;
};
