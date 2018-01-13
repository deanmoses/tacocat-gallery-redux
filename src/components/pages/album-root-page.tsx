import * as React from 'react';
import * as Site from '@src/components/presentation/site';
import { Album, AlbumType, AlbumThumb } from '@src/models/models';
import Config from '@src/utils/config';
import { ThumbnailList } from '@src/components/presentation/thumbnail-list';
import LatestAlbumThumb from '@src/components/containers/latest-album-connector';

/**
 * Component properties
 */
interface ComponentProps {
	readonly album: Album;
}

/**
 * Root album (the one at the "/" URL path) page
 */
export const RootAlbumPage: React.StatelessComponent<ComponentProps> = ({
	album
}) => {
	let albums = separateYearAlbums(album.albums);
	return (
		<Site.Page className="root">
			<Site.Header
				title={Config.siteTitle()}
				shortTitle={Config.siteShortTitle()}
				showSiteTitle={false}
				searchPath=""
			/>
			<div className="container-fluid">
				<section className="col-md-3 sidebar latest">
					<LatestAlbumThumb />
					{!!albums.nonYearAlbums.length && (
						<div>
							<hr />
							<ThumbnailList items={albums.nonYearAlbums} />
						</div>
					)}
				</section>
				<section className="col-md-9 col-md-offset-3">
					<ThumbnailList
						items={albums.yearAlbums}
						isAlbum={true}
						albumType={AlbumType.ROOT}
					/>
				</section>
			</div>
		</Site.Page>
	);
};

/**
 * Split the list of albums into two:
 * 1) "Year" albums whose path are of the format 2000
 * 2) All the other albums
 */
function separateYearAlbums(albums: AlbumThumb[]) {
	let yearAlbums: AlbumThumb[] = [];
	let nonYearAlbums: AlbumThumb[] = [];

	var isYear = /^\d\d\d\d$/; // like 2000
	if (albums) {
		albums.forEach(album => {
			if (isYear.test(album.path)) {
				yearAlbums.push(album);
			} else {
				nonYearAlbums.push(album);
			}
		});
	}

	return { yearAlbums, nonYearAlbums };
}
