import { Alb } from '@src/models/album';
import * as DateUtils from '@src/utils/date-utils';

/**
 * Overrides the default album class with  behavior specific to year albums.
 */
export default class DayAlbum extends Alb {
	/**
	 * Friendly title of page
	 */
	get pageTitle(): string {
		return DateUtils.longDate(this.date);
	}
}
