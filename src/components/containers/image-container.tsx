import * as React from 'react';
import { Album, Image, FetchErrorImpl } from '@src/models/models';
import ImagePage from '@src/components/pages/image-page';
import { ImageLoadingPage } from '@src/components/pages/image-loading-page';
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
	 * React.js component lifecycle method.  Invoked immediately after updating occurs. 
	 * This method is not called for the initial render.
	 */
	componentDidUpdate(prevProps: ComponentProps) {
		// Have we changed which image we're displaying?
		let differentImage: boolean = prevProps.path !== this.props.path;
		if (differentImage) {
			this.props.fetchIfNeeded(prevProps.path);
		}
	}

	render() {
		const image = this.props.image;
		const album = this.props.album;

		//console.log(`ImageContainer.render(${this.props.path}) album:`, album);

		if (album && album.image_size) {
			//
			// If the album's ready to display... image_size just happens to be a property on all albums
			//
			if (!image) {
				//
				// If we have the album but the image isn't in it, it's Not Found
				//
				//console.log(`No image of path (${imagePath}) in album ${album.path}`);
				return <ImageNotFoundPage album={album} />;
			} else {
				//
				// Else display the image
				//
				return <ImagePage album={album} image={image} />;
			}
		} else if (album && album.err) {
			//
			// Else if the album failed to load
			//
			return <ImageErrorPage path={this.props.path} error={album.err} />;
		} else if (!album || (album.isLoading && !album.title)) {
			//
			// Else if the album's loading
			//
			return <ImageLoadingPage path={this.props.path} />;
		} else {
			//
			// I don't know how it could get into this state
			//
			const error = new FetchErrorImpl(
				"I'm in some weird state I didn't expect"
			);
			return <ImageErrorPage path={this.props.path} error={error} />;
		}
	}
}
