import * as React from 'react';
import { Album, AlbumType } from '@src/models/models';
import { DayAlbumPage } from '@src/components/pages/album-day-page';
import { YearAlbumPage } from '@src/components/pages/album-year-page';
import { RootAlbumPage } from '@src/components/pages/album-root-page';
import { GenericAlbumPage } from '@src/components/pages/album-generic-page';

/**
 * Component properties
 */
interface ComponentProps {
	readonly album: Album;
}

/**
 * Album page
 */
export const AlbumPage: React.StatelessComponent<ComponentProps> = ({
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
		default:
			<GenericAlbumPage album={album} />;
	}
	return null;
};
