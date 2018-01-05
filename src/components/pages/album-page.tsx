import * as React from 'react';
import * as Site from '@src/components/presentation/site';
import { Album, AlbumType } from '@src/models/album';
import DayAlbumPage from '@src/components/pages/album-day-page';
import YearAlbumPage from '@src/components/pages/album-year-page';
import RootAlbumPage from '@src/components/pages/album-root-page';

interface AlbumPageProps {
	readonly album: Album;
}

/**
 * Album page.
 */
const AlbumPage: React.StatelessComponent<AlbumPageProps> = ({ album }) => {
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
export default AlbumPage;
