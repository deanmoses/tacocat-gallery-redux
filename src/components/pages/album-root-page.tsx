import * as React from 'react';
import * as Site from '@src/components/presentation/site';
import { Album } from '@src/redux/reducers/album';

interface AlbumPageProps {
	readonly album: Album;
}
/**
 * Root album (the one at the "/" URL path) page
 */
const RootAlbumPage: React.StatelessComponent<AlbumPageProps> = () => (
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
export default RootAlbumPage;
