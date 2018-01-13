import * as React from 'react';
import { Album } from '@src/models/models';
import * as Site from '@src/components/presentation/site';
import EditableHtml from '@src/components/containers/editable-html-connector';
import { ThumbnailList } from '@src/components/presentation/thumbnail-list';
import AlbumEditControls from '@src/components/containers/album-edit-controls-connector';

/**
 * Component properties
 */
interface ComponentProps {
	readonly album: Album;
}

/**
 * Day/week/leaf album pages (like the one at the "2001/12-31" URL path)
 */
export const DayAlbumPage: React.StatelessComponent<ComponentProps> = ({
	album
}) => (
	<Site.Page className="weekalbumtype" year={album.year}>
		<Site.Header
			href={'#' + album.parent_album.path}
			title={album.pageTitle}
			searchPath={album.path}
		>
			<Site.PrevButton
				href={album.nextAlbumHref}
				title={album.nextAlbumTitle}
			/>
			<Site.UpButton
				href={album.parentAlbumHref}
				title={album.parentAlbumTitle}
			/>
			<Site.NextButton
				href={album.prevAlbumHref}
				title={album.prevAlbumTitle}
			/>
		</Site.Header>
		<section>
			<h2 className="hidden">Overview</h2>
			<EditableHtml
				html={album.desc}
				field="desc"
				path={album.path}
				className={'caption'}
			/>
		</section>
		<ThumbnailList
			items={album.images}
			isAlbum={false}
			selectedItemUrl={album.url_thumb}
		/>
		<AlbumEditControls album={album} />
	</Site.Page>
);
