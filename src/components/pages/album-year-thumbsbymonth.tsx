import * as React from 'react';
import { AlbumThumb } from '@src/models/models';
import Thumbnail from '@src/components/containers/thumbnail-connector';
import { getAlbumType } from '@src/utils/path-utils';

/**
 * Component properties
 */
interface ComponentProps {
	readonly albums: AlbumThumb[];
}

/**
 * Component that displays a collection of thumbnails by grouping them into months
 */
export const ThumbsByMonth: React.FunctionComponent<ComponentProps> = ({
	albums
}) => {
	// Get data structure containing albums grouped by month
	const albumsByMonth = childAlbumsByMonth(albums);
	// Build each month
	let thumbsForYear = albumsByMonth.map(month => (
		<ThumbsForMonth month={month} key={month.monthName} />
	));
	return <div>{thumbsForYear}</div>;
};

/**
 * Component properties
 */
interface ThumbsForMonthProps {
	readonly month: ChildAlbumsByMonth;
}
/**
 * Component that displays all the thumbnails for a month within the year
 */
const ThumbsForMonth: React.FunctionComponent<ThumbsForMonthProps> = ({
	month
}) => {
	// Build each thumbnail in month
	var thumbsForMonth = month.albums.map(childAlbum => (
		<Thumbnail
			item={childAlbum}
			isAlbum={true}
			albumType={getAlbumType(childAlbum.path)}
			key={childAlbum.date}
		/>
	));

	return (
		<section className="month">
			<h1>{month.monthName}</h1>
			{thumbsForMonth}
		</section>
	);
};

interface ChildAlbumsByMonth {
	monthName: string;
	albums: AlbumThumb[];
}

/**
 * Groups the child albums by month.
 * Assumes you are passing in an album whose subalbums are all within the same year.
 */
function childAlbumsByMonth(albums: AlbumThumb[]): ChildAlbumsByMonth[] {
	// array to return
	let childAlbumsByMonth: ChildAlbumsByMonth[] = [];

	if (albums) {
		// month names to add to the results, to make rendering even simpler
		const monthNames = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		];

		// iterate over this album's subalbums, putting them into the correct month
		albums.forEach(childAlbum => {
			// create Date object based on album's timestamp
			// multiply by 1000 to turn seconds into milliseconds
			const month: number = new Date(childAlbum.date * 1000).getMonth();
			if (!childAlbumsByMonth[month]) {
				childAlbumsByMonth[month] = {
					monthName: monthNames[month],
					albums: []
				};
			}
			childAlbumsByMonth[month].albums.push(childAlbum);
		});
	}

	return childAlbumsByMonth.reverse();
}
