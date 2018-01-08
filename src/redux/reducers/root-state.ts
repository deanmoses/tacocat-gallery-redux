/**
 * The React Redux reducers and state for the application
 */

import { AlbumsByPath, AlbumThumb } from '@src/models/models';

/**
 * The shape of the application's state.
 */
export type RootState = {
	/**
	 * Map of albumName -> album object
	 */
	readonly albumsByPath: AlbumsByPath;

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
