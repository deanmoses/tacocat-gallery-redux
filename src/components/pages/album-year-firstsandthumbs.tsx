import * as React from 'react';
import { Album } from '@src/models/models';
import { EditableHtml } from '@src/components/presentation/editable-html';
import { ThumbsByMonth } from '@src/components/pages/album-year-thumbsbymonth';

/**
 * Component properties
 */
interface FirstsAndThumbsProps {
	readonly album: Album;
}
/**
 * Component that displays the year's firsts and the child albums' thumbnails
 */
export const FirstsAndThumbs: React.StatelessComponent<
	FirstsAndThumbsProps
> = ({ album }) => {
	return (
		<div className="container-fluid">
			<section className="col-md-3 firsts sidebar">
				<h2 className="hidden">Firsts</h2>
				<EditableHtml html={album.desc} className="firsts-text" />
				{/* TODO: <EditMenu album={album} allowEdit={user.isAdmin} editMode={user.editMode} />*/}
			</section>
			<section className="col-md-9 col-md-offset-3">
				<h2 className="hidden">Thumbnails</h2>
				<ThumbsByMonth albums={album.albums} />
			</section>
		</div>
	);
};
