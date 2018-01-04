import DateBasedAlbum from '@src/models/album-datebased';
import * as DateUtils from '@src/utils/date-utils';

/**
 * Overrides the default album class with  behavior specific to year albums.
 */
export default class DayAlbum extends DateBasedAlbum {
	/**
	 * Friendly title of page
	 */
	get pageTitle(): string {
		return DateUtils.longDate(this.date);
	}
}
