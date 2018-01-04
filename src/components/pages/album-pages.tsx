/**
 * React.js components that render the album pages
 */

import * as React from 'react';
import * as Site from '@src/components/presentation/site';
import WaitingSpinner from '@src/components/presentation/waiting-spinner';
import { Album, AlbumType } from '@src/redux/reducers/album';

/**
 * Album page that displays a "loading..." spinner
 */
export const AlbumLoadingPage: React.StatelessComponent = () => (
	<Site.Page className="albumpage loading">
		<Site.HeaderTitle showTitle={false}>
			<Site.PrevButton />
			<Site.UpButton />
			<Site.NextButton />
		</Site.HeaderTitle>
		<Site.FullPageMessage>
			<WaitingSpinner />
		</Site.FullPageMessage>
	</Site.Page>
);

/**
 * Album page that displays an error
 */
interface AlbumErrorPageProps {
	readonly message: string;
}
export const AlbumErrorPage: React.StatelessComponent<AlbumErrorPageProps> = ({
	message
}) => (
	<Site.Page className="albumpage loading">
		<Site.HeaderTitle showTitle={false} />
		<Site.FullPageMessage>Error: {message}</Site.FullPageMessage>
	</Site.Page>
);

/**
 * Album page that displays a real album, not an error or loading.
 */
interface AlbumPageProps {
	readonly album: Album;
}
export const AlbumPage: React.StatelessComponent<AlbumPageProps> = ({
	album
}) => {
	switch (album.type) {
		case AlbumType.DAY: {
			return <DayAlbumPage album={album} />;
		}
		case AlbumType.YEAR: {
			return <YearAlbumPage album={album} />;
		}
		case AlbumType.ROOT: {
			return <RootAlbumPage album={album} />;
		}
		default: {
			return (
				<Site.Page className="albumpage">
					<Site.HeaderTitle title={album.title} />
					<Site.FullPageMessage>
						Unknown type of album: {album.path}
					</Site.FullPageMessage>
				</Site.Page>
			);
		}
	}
};

// <Site.Page className="albumpage">
// 	<Site.HeaderTitle title={album.title} />
// 	<Site.FullPageMessage>Got Album: {album.path}</Site.FullPageMessage>
// </Site.Page>

/**
 * Root album (the one at the "/" URL path) page
 */
export const RootAlbumPage: React.StatelessComponent<AlbumPageProps> = () => (
	<Site.Page className="albumpage rootalbumtype">
		<Site.HeaderTitle />
		<div className="container-fluid">
			<section className="col-md-3 sidebar latest">
				<h2>Latest Album</h2>
			</section>
			<section className="col-md-9 col-md-offset-3">Thumbnails</section>
		</div>
	</Site.Page>
);

/**
 * Year album pages (like the one at the "2001" URL path)
 */
export const YearAlbumPage: React.StatelessComponent<AlbumPageProps> = () => (
	<Site.Page className="albumpage yearalbumtype">
		<Site.HeaderTitle>Buttons Go Here</Site.HeaderTitle>
		Firsts And Thumbs Go Here
	</Site.Page>
);

/**
 * Day/week/leaf album pages (like the one at the "2001/12-31" URL path)
 */
export const DayAlbumPage: React.StatelessComponent<AlbumPageProps> = ({
	album
}) => (
	<Site.Page className="albumpage weekalbumtype">
		<Site.HeaderTitle title={album.title}>
			<Site.PrevButton
				href={album.nextAlbumHref}
				title={album.nextAlbumTitle}
			/>
			<Site.UpButton
				href={album.parentAlbumHref}
				title={album.parentAlbumTitle}
			/>
			<Site.NextButton
				href={album.prevAlbumHref}
				title={album.prevAlbumTitle}
			/>
		</Site.HeaderTitle>
		<section className="overview">
			<h2 className="hidden">Overview</h2>
			{album.description}
		</section>
		Thumbs Go Here
		<div>Edit Menu Goes Here</div>
	</Site.Page>
);
