import * as React from 'react';
import * as Site from '@src/components/presentation/site';
import { Album } from '@src/models/models';
import * as Thumb from '@src/components/presentation/thumb';

/**
 * Component properties
 */
interface ComponentProps {
	readonly album: Album;
}

/**
 * Generic album page, should be able to render any type of album
 */
export const GenericAlbumPage: React.StatelessComponent<ComponentProps> = ({
	album
}) => (
	<Site.Page className="albumpage dayalbumtype">
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
			GENERIC
			<div
				className="caption"
				dangerouslySetInnerHTML={{ __html: album.desc }}
			/>
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