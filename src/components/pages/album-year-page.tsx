import * as React from 'react';
import * as Site from '@src/components/presentation/site';
import { Album } from '@src/redux/reducers/album';

interface AlbumPageProps {
	readonly album: Album;
}
/**
 * Year album pages (like the one at the "2001" URL path)
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
		FirstsAndThumbs go here
	</Site.Page>
);
export default YearAlbumPage;
