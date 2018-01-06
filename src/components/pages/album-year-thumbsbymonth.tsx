import * as React from 'react';
import { AlbumThumb } from '@src/models/models';
import * as Thumb from '@src/components/presentation/thumb';

/**
 * Component properties
 */
interface ThumbsByMonthProps {
	readonly albums: AlbumThumb[];
}

/**
 * Component that displays a collection of thumbnails by grouping them into months
 */
export const ThumbsByMonth: React.StatelessComponent<ThumbsByMonthProps> = ({
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
const ThumbsForMonth: React.StatelessComponent<ThumbsForMonthProps> = ({
	month
}) => {
	// Build each thumbnail in month
	var thumbsForMonth = month.albums.map(childAlbum => (
		<Thumb.Nail
			item={childAlbum}
			isAlbum={true}
			albumType={childAlbum.type}
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
	if (!albums) return null;

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

	// array to return
	let childAlbumsByMonth: ChildAlbumsByMonth[] = [];

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

	return childAlbumsByMonth.reverse();
}
