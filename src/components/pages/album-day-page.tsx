import * as React from 'react';
import { Album } from '@src/models/models';
import * as Site from '@src/components/presentation/site';
import { EditableHtml } from '@src/components/presentation/editable-html';
import * as Thumb from '@src/components/presentation/thumb';

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
	<Site.Page className="albumpage weekalbumtype">
		<Site.HeaderTitle
			href={'#' + album.parent_album.path}
			title={album.pageTitle}
			path={album.path}
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
		</Site.HeaderTitle>
		<section className="overview">
			<h2 className="hidden">Overview</h2>
			<EditableHtml html={album.desc} className={'caption'} />
		</section>
		<Thumb.List
			items={album.images}
			isAlbum={false}
			// editMode={user.editMode}
			// selectedItem={selectedItem}
			// onSelect={this.onThumbSelect}
		/>
		<div>Edit Menu Goes Here</div>
	</Site.Page>
);
