import * as React from 'react';
import { Album, Image } from '@src/models/models';
import ImagePage from '@src/components/pages/image-page';
import ImageLoadingPage from '@src/components/pages/image-loading-page';
import ImageErrorPage from '@src/components/pages/image-error-page';
import ImageNotFoundPage from '@src/components/pages/image-notfound-page';

/**
 * Component properties
 */
export type ComponentProps = {
	readonly path: string;
	readonly image?: Image;
	readonly album?: Album;
	readonly fetchIfNeeded?: Function;
};

/**
 * Image container component: manages image loading and error state
 */
export class ImageContainer extends React.Component<ComponentProps> {
	/**
	 * React.js component lifecycle method. Invoked once, immediately after the
	 * initial rendering occurs. At this point in the lifecycle, the component
	 * has a DOM representation which you can access via this.getDOMNode().
	 *
	 * This is the place to trigger async logic, such as Redux actions.
	 */
	componentDidMount() {
		this.props.fetchIfNeeded(this.props.path);
	}

	/**
	 * React.js component lifecycle method.  Invoked before a mounted component
	 * receives new props.  Note that React may call this method even if the props
	 * have not changed, so make sure to compare the current and next values if you
	 * only want to handle changes. This may occur when the parent component causes
	 * your component to re-render.
	 */
	componentWillReceiveProps(nextProps: ComponentProps) {
		// Have we changed which image we're displaying?
		let differentImage: boolean = nextProps.path !== this.props.path;
		if (differentImage) {
			this.props.fetchIfNeeded(nextProps.path);
		}
	}

	render() {
		const image = this.props.image;
		const album = this.props.album;

		//console.log(`ImageContainer.render(${this.props.path}) album:`, album);

		if (!album || album.isLoading) {
			return <ImageLoadingPage />;
		} else if (album.err) {
			return <ImageErrorPage error={album.err} />;
		} else if (!album.images) {
			return <ImageNotFoundPage album={album} />;
		} else {
			if (!image) {
				//console.log(`No image of path (${imagePath}) in album ${album.path}`);
				return <ImageNotFoundPage album={album} />;
			} else {
				return <ImagePage album={album} image={image} />;
			}
		}
	}
}