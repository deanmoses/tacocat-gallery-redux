import * as React from 'react';
import * as Site from '@src/components/presentation/site';
import { Album, AlbumThumb } from '@src/models/album';
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
const YearAlbumPage: React.StatelessComponent<AlbumPageProps> = ({ album }) => (
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
export default YearAlbumPage;

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
				<MonthThumbs album={album} />
			</section>
		</div>
	);
};

/**
 * Component properties
 */
interface MonthThumbsProps {
	readonly album: Album;
}
/**
 * Component that displays the thumbnail of each individual week album in the year.
 */
const MonthThumbs: React.StatelessComponent<MonthThumbsProps> = ({ album }) => {
	var months = album.albums.map(function(child: AlbumThumb) {
		// TODO: render by months
		//var months = album.childAlbumsByMonth.map(function(childAlbum:Album) {
		return (
			<Thumb.Nail
				item={child}
				isAlbum={true}
				albumType={child.type}
				key={child.date}
			/>
		);
		//return <MonthThumb month={child} key={child.monthName} />;
	});

	return <div>{months}</div>;
};
