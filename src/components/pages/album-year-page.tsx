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
export const YearAlbumPage: React.FunctionComponent<AlbumPageProps> = ({
	album
}) => (
	<Site.Page year={album.year}>
		<Site.Header href="#" title={album.pageTitle} searchPath={album.path}>
			<Site.PrevButton
				href={album.nextAlbumHref}
				title={album.nextAlbumTitle}
			/>
			<Site.UpButton href="#" title="All Years" />
			<Site.NextButton
				href={album.prevAlbumHref}
				title={album.prevAlbumTitle}
			/>
		</Site.Header>
		<FirstsAndThumbs album={album} />
	</Site.Page>
);
