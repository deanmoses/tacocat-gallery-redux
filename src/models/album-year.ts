import { Alb, AlbumNavInfo } from '@src/models/album';
import * as DateUtils from '@src/utils/date-utils';

/**
 * Overrides the default album class with  behavior specific to year albums.
 */
export default class YearAlbum extends Alb {
	/**
	 * Friendly title of page
	 */
	get pageTitle(): string {
		return DateUtils.year(this.date);
	}

	/**
	 * Title of next album
	 * Blank if no next album
	 */
	get nextAlbumTitle(): string {
		return this.albumTitle(this.next);
	}

	/**
	 * Title of previous album
	 * Blank if no previous album
	 */
	get prevAlbumTitle(): string {
		return this.albumTitle(this.prev);
	}

	/**
	 * Return title of another album to navigate to
	 */
	private albumTitle(anotherAlbum: AlbumNavInfo): string {
		if (anotherAlbum) {
			return DateUtils.year(anotherAlbum.date);
		} else {
			return '';
		}
	}
}
