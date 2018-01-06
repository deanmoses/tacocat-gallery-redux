import * as React from 'react';
import * as Site from '@src/components/presentation/site';
import { Album } from '@src/models/models';
import { FirstsAndThumbs } from '@src/components/pages/album-year-firstsandthumbs';

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
