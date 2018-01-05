import * as React from 'react';
import * as Site from '@src/components/presentation/site';
import { Album, Image } from '@src/models/album';
import Config from '@src/utils/config';

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
	<Site.Page className="imagepage">
		<Site.HeaderTitle
			href={album.href}
			title={image.title}
			showTitle={false}
			showSearch={false}
		/>
		<ImagePageBody album={album} image={image} />
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
		var style: any = {
			maxWidth: image.width,
			maxHeight: image.height
		};
		if (isPortrait) {
			style.height = '100%';
		} else {
			style.width = '100%';
		}

		var desc = (
			<div
				className="caption"
				dangerouslySetInnerHTML={{ __html: image.desc }}
			/>
		);

		return (
			<div className="photo-body container-fluid">
				<section className="col-md-3">
					<h2 className="hidden">Caption</h2>
					{desc}
				</section>
				<section className="col-md-9">
					<h2 className="hidden">Photo</h2>
					<Site.HeaderButtons>
						<Site.PrevButton />
						<Site.UpButton href={album.href} title={album.pageTitle} />
						<Site.NextButton />
					</Site.HeaderButtons>
					<a href={Config.zenphotoImageFullSizeUrl(image.path)} target="zen">
						<img
							src={Config.cdnHost() + image.url_sized}
							style={style}
							className={'thephoto ' + orientation}
						/>
					</a>
				</section>
			</div>
		);
	}
}
