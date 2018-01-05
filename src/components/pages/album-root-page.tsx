import * as React from 'react';
import * as Site from '@src/components/presentation/site';
import { Album, AlbumType } from '@src/models/models';
import Config from '@src/utils/config';
import * as Thumb from '@src/components/presentation/thumb';

/**
 * Component properties
 */
interface ComponentProps {
	readonly album: Album;
}

/**
 * Root album (the one at the "/" URL path) page
 */
const RootAlbumPage: React.StatelessComponent<ComponentProps> = ({ album }) => (
	<Site.Page className="albumpage rootalbumtype">
		<Site.HeaderTitle
			title={Config.siteTitle()}
			shortTitle={Config.siteShortTitle()}
			showTitleLink={false}
			showTitle={false}
			path=""
		/>
		<div className="container-fluid">
			<section className="col-md-3 sidebar latest">
				<h2>Latest Album</h2>
			</section>
			<section className="col-md-9 col-md-offset-3">
				<Thumb.List
					items={album.albums}
					isAlbum={true}
					albumType={AlbumType.ROOT}
				/>
			</section>
		</div>
	</Site.Page>
);
export default RootAlbumPage;
