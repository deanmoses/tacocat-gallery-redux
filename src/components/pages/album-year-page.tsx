import * as React from 'react';
import * as Site from '@src/components/presentation/site';
import { Album, AlbumThumb } from '@src/models/models';
import * as Thumb from '@src/components/presentation/thumb';

/**
 * Component properties
 */
interface AlbumPageProps {
	readonly album: Album;
}

/**
 * Year album page (like the one at the "2001" URL path)
 */
export const YearAlbumPage: React.StatelessComponent<AlbumPageProps> = ({
	album
}) => (
	<Site.Page className="albumpage yearalbumtype">
		<Site.HeaderTitle href="#" title={album.pageTitle} path={album.path}>
			<Site.PrevButton
				href={album.nextAlbumHref}
				title={album.nextAlbumTitle}
			/>
			<Site.UpButton href="#" title="All Years" />
			<Site.NextButton
				href={album.prevAlbumHref}
				title={album.prevAlbumTitle}
			/>
		</Site.HeaderTitle>
		<FirstsAndThumbs album={album} />
	</Site.Page>
);

/**
 * Component properties
 */
interface FirstsAndThumbsProps {
	readonly album: Album;
	readonly editMode?: boolean;
}
/**
 * Component that displays the year's firsts and the child albums' thumbnails
 */
const FirstsAndThumbs: React.StatelessComponent<FirstsAndThumbsProps> = ({
	album,
	editMode = false
}) => {
	var desc = editMode ? (
		<div>Edit Mode</div> //<RichTextEditor valueToEdit={album.desc}/>
	) : (
		<div
			className="firsts-text"
			dangerouslySetInnerHTML={{ __html: album.desc }}
		/>
	);

	return (
		<div className="container-fluid">
			<section className="col-md-3 firsts sidebar">
				<h2 className="hidden">Firsts</h2>
				{desc}
				{/*<EditMenu album={album} allowEdit={user.isAdmin} editMode={user.editMode} />*/}
			</section>
			<section className="col-md-9 col-md-offset-3">
				<h2 className="hidden">Thumbnails</h2>
				<ThumbsForYear album={album} />
			</section>
		</div>
	);
};

/**
 * Component properties
 */
interface ThumbsForYearProps {
	readonly album: Album;
}

/**
 * Component that displays all the thumbnails for the year
 */
const ThumbsForYear: React.StatelessComponent<ThumbsForYearProps> = ({
	album
}) => {
	// Get data structure containing albums grouped by month
	const albumsByMonth = childAlbumsByMonth(album);
	// Build each month
	let thumbsForYear = albumsByMonth.map(month => (
		<ThumbsForMonth month={month} key={month.monthName} />
	));
	return <div>{thumbsForYear}</div>;
};

/**
 * Component properties
 */
interface MonthThumbsProps {
	readonly month: ChildAlbumsByMonth;
}
/**
 * Component that displays all the thumbnails for a month within the year
 */
const ThumbsForMonth: React.StatelessComponent<MonthThumbsProps> = ({
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
function childAlbumsByMonth(album: Album): ChildAlbumsByMonth[] {
	if (!album || !album.albums) return null;

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
	album.albums.forEach(childAlbum => {
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
