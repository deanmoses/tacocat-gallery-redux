import { Alb } from '@src/models/album';
import * as DateUtils from '@src/utils/date-utils';

/**
 * Overrides the default album class with behavior specific to any album that shows titles based
 * on dates and not what the admin typed in.
 */
export default class DateBasedAlbum extends Alb {
	/**
	 * Title of next album
	 * Blank if no next album
	 */
	get nextAlbumTitle(): string {
		return this.next ? DateUtils.shortDate(this.next.date) : '';
	}

	/**
	 * Title of previous album
	 * Blank if no previous album
	 */
	get prevAlbumTitle(): string {
		return this.prev ? DateUtils.shortDate(this.prev.date) : '';
	}
}
