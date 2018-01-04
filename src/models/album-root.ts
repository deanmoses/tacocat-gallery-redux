import DateBasedAlbum from '@src/models/album-datebased';

/**
 * Overrides the default album class with  behavior specific to year albums.
 */
export default class RootAlbum extends DateBasedAlbum {
	//
	// TODO: it doesn't seem pageTitle() is used, can I delete this class?
	//

	/**
	 * Friendly title of page
	 */
	get pageTitle(): string {
		return '';
	}
}
