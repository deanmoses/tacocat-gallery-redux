import * as React from 'react';
import { Album, AlbumThumb } from '@src/models/models';
import EditableHtml from '@src/components/containers/editable-html-connector';
import { ThumbsByMonth } from '@src/components/pages/album-year-thumbsbymonth';
import { ThumbnailList } from '@src/components/presentation/thumbnail-list';
import AlbumEditControls from '@src/components/containers/album-edit-controls-connector';

/**
 * Component properties
 */
interface ComponentProps {
	readonly album: Album;
}
/**
 * Component that displays the year's firsts and the child albums' thumbnails
 */
export const FirstsAndThumbs: React.FunctionComponent<ComponentProps> = ({
	album
}) => {
	const { nonDayAlbums, dayAlbums } = separateDayAlbums(album.albums);
	const showNonDayAlbums = nonDayAlbums && nonDayAlbums.length > 0;
	return (
		<div className="container-fluid">
			<section className="col-md-3 firsts sidebar">
				{showNonDayAlbums && <ThumbnailList items={nonDayAlbums} />}
				<h2 className="hidden">Firsts</h2>
				<EditableHtml
					html={album.desc}
					field="desc"
					path={album.path}
					className="firsts-text"
				/>
				<AlbumEditControls album={album} />
			</section>
			<section className="col-md-9 col-md-offset-3">
				<h2 className="hidden">Thumbnails</h2>
				<ThumbsByMonth albums={dayAlbums} />
			</section>
		</div>
	);
};

/**
 * Split the list of albums into two:
 * 1) "Day" albums whose path are of the format 2000/12-31
 * 2) All the other albums
 */
function separateDayAlbums(albums: AlbumThumb[]) {
	let dayAlbums: AlbumThumb[] = [];
	let nonDayAlbums: AlbumThumb[] = [];

	var isDay = /^\d\d\d\d\/\d\d-\d\d$/; // like 2000/12-31
	if (albums) {
		albums.forEach(album => {
			if (isDay.test(album.path)) {
				dayAlbums.push(album);
			} else {
				nonDayAlbums.push(album);
			}
		});
	}

	return { dayAlbums, nonDayAlbums };
}
