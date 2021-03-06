import * as React from 'react';
import { Album, FetchErrorImpl } from '@src/models/models';
import { AlbumPage } from '@src/components/pages/album-page';
import { AlbumLoadingPage } from '@src/components/pages/album-loading-page';
import { AlbumErrorPage } from '@src/components/pages/album-error-page';

/**
 * Component properties
 */
export type ComponentProps = {
	readonly path: string;
	readonly album?: Album;
	readonly fetchIfNeeded?: Function;
};

/**
 * Album container component: manages album loading and error state
 */
export class AlbumContainer extends React.Component<ComponentProps> {
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
		// Have we changed which album we're displaying?
		let differentAlbum: boolean = prevProps.path !== this.props.path;
		if (differentAlbum) {
			this.props.fetchIfNeeded(this.props.path);
		}
	}

	render() {
		const album = this.props.album as Album;

		if (album && album.image_size) {
			//
			// If the album's ready to display... image_size just happens to be a property on all albums
			//
			return <AlbumPage album={album} />;
		} else if (album && album.err) {
			//
			// Else if the album's in an error state
			//
			return <AlbumErrorPage path={album.path} error={album.err} />;
		} else if (!album || (album.isLoading && !album.title)) {
			//
			// Else if the album's in a loading state
			//
			return <AlbumLoadingPage path={this.props.path} />;
		} else {
			//
			// I don't know how it could get into this state
			//
			const error = new FetchErrorImpl(
				"I'm in some weird state I didn't expect"
			);
			return <AlbumErrorPage path={this.props.path} error={error} />;
		}
	}
}
