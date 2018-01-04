/**
 * React.js components that render the album pages
 */

import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import * as Site from '@src/components/site';
import WaitingSpinner from '@src/components/waiting-spinner';
import { Album } from '@src/reducers/album';

/**
 * Page that displays a "loading..." spinner
 */
export const AlbumLoadingPage: React.StatelessComponent = () => (
	<Site.Page className="albumpage loading">
		<Site.HeaderTitle showTitle={false} />
		<Site.FullPageMessage>
			<WaitingSpinner />
		</Site.FullPageMessage>
	</Site.Page>
);

/**
 * Page that displays an error
 */
interface AlbumErrorPageProps {
	readonly message: string;
}
export const AlbumErrorPage: React.StatelessComponent<AlbumErrorPageProps> = ({
	message = null
}) => (
	<Site.Page className="albumpage loading">
		<Site.HeaderTitle showTitle={false} />
		<Site.FullPageMessage>Error: {message}</Site.FullPageMessage>
	</Site.Page>
);

/**
 * Page that displays an album.  A real album, not an error or loading.
 */
interface AlbumPageProps {
	readonly album: Album;
}
export const AlbumPage: React.StatelessComponent<AlbumPageProps> = ({
	album = null
}) => (
	<Site.Page className="albumpage">
		<Site.HeaderTitle title={album.title} />
		<Site.FullPageMessage>Got Album: {album.path}</Site.FullPageMessage>
	</Site.Page>
);

/**
 * Top level album page
 */
export const RootAlbumPage: React.StatelessComponent = () => (
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
 * Year album pages
 */
export const YearAlbumPage: React.StatelessComponent<
	RouteComponentProps<any>
> = () => (
	<Site.Page className="albumpage yearalbumtype">
		<Site.HeaderTitle>Buttons Go Here</Site.HeaderTitle>
		Firsts And Thumbs Go Here
	</Site.Page>
);

/**
 * React.js component that renders week/day/leaf album pages
 */
export const WeekAlbumPage: React.StatelessComponent<
	RouteComponentProps<any>
> = () => (
	<Site.Page className="albumpage weekalbumtype">
		<Site.HeaderTitle>Buttons Go Here</Site.HeaderTitle>
		<section className="overview">
			<h2 className="hidden">Overview</h2>
			Description Goes Here
		</section>
		Thumbs Go Here
		<div>Edit Menu Goes Here</div>
	</Site.Page>
);
