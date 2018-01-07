import * as React from 'react';
import * as Site from '@src/components/presentation/site';
import { Album, AlbumType, AlbumThumb } from '@src/models/models';
import Config from '@src/utils/config';
import * as Thumb from '@src/components/presentation/thumb';
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
					<LatestAlbumThumb />
					{albums.nonYearAlbums && (
						<div>
							<hr />
							<Thumb.List items={albums.nonYearAlbums} />
						</div>
					)}
				</section>
				<section className="col-md-9 col-md-offset-3">
					<Thumb.List
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
