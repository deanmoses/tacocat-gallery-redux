import * as React from 'react';
import * as Site from '@src/components/presentation/site';
import EditableHtml from '@src/components/containers/editable-html-connector';
import { Album, Image } from '@src/models/models';
import Config from '@src/utils/config';
import ImageEditControls from '@src/components/containers/image-edit-controls-connector';

/**
 * Component properties
 */
interface ComponentProps {
	readonly album: Album;
	readonly image: Image;
}

/**
 * Image page
 */
const ImagePage: React.StatelessComponent<ComponentProps> = ({
	album,
	image
}) => (
	<Site.Page className="photo" year={album.year}>
		<Site.Header
			href={album.href}
			title={image.title}
			editPath={image.path}
			showSiteTitle={false}
		/>
		<ImagePageBody album={album} image={image} />
		<ImageEditControls image={image} />
	</Site.Page>
);
export default ImagePage;

/**
 * Component properties
 */
interface ImagePageBodyProps {
	readonly album: Album;
	readonly image: Image;
}

/**
 * Body of the image page, shows the actual image
 */
class ImagePageBody extends React.Component<ImagePageBodyProps> {
	render() {
		var image = this.props.image;
		var album = this.props.album;

		const isPortrait = true; //TODO: image.isPortrait
		var orientation = isPortrait ? 'portrait' : 'landscape';
		var imgStyle: any = {
			objectFit: 'contain',
			width: '100%',
			height: '100%',
			maxWidth: image.width,
			maxHeight: image.height
		};

		return (
			<div className="photo-body container-fluid">
				<section className="col-md-3">
					<h2 className="hidden">Caption</h2>
					<EditableHtml
						html={image.desc}
						field="desc"
						path={image.path}
						className="caption"
					/>
				</section>
				<section className="col-md-9">
					<h2 className="hidden">Photo</h2>
					<Site.HeaderButtons>
						<Site.PrevButton href={image.prevImageHref} />
						<Site.UpButton href={album.href} title={album.pageTitle} />
						<Site.NextButton href={image.nextImageHref} />
					</Site.HeaderButtons>
					<a href={Config.zenphotoImageFullSizeUrl(image.path)} target="zen">
						<img
							key={Config.cdnHost() + image.url_sized} // When navigating between images quickly, React doesn't destroy the previous image fast enough: you see the old image with the new text.  Adding the key property seems to make this problem go away.
							src={Config.cdnHost() + image.url_sized}
							style={imgStyle}
							className={'thephoto ' + orientation}
						/>
					</a>
				</section>
			</div>
		);
	}
}
