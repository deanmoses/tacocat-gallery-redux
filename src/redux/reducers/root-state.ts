/**
 * The React Redux reducers and state for the application
 */

import { AlbumsByPath, AlbumNavInfo } from '@src/models/models';

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
	readonly latestAlbum: AlbumNavInfo | {};

	/**
	 * True: user is authenticated
	 */
	readonly isAuthenticated: boolean;
};
