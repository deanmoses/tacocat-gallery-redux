import * as React from 'react';
import { Album } from '@src/models/models';
import AlbumPage from '@src/components/pages/album-page';
import AlbumLoadingPage from '@src/components/pages/album-loading-page';
import AlbumErrorPage from '@src/components/pages/album-error-page';

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
export default class AlbumContainer extends React.Component<ComponentProps> {
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
		// Have we changed which album we're displaying?
		let differentAlbum: boolean = nextProps.path !== this.props.path;
		if (differentAlbum) {
			this.props.fetchIfNeeded(nextProps.path);
		}
	}

	render() {
		const album = this.props.album as Album;

		if (album && album.image_size) {
			document.title = album.path;
			return <AlbumPage album={album} />;
		} else if (album && album.err) {
			document.title = 'Error loading album';
			return <AlbumErrorPage message={album.err} />;
		} else if (!album || (album.isLoading && !album.title)) {
			document.title = 'Loading album...';
			return <AlbumLoadingPage />;
		} else {
			document.title = 'Weird state...';
			const message = "I'm in some weird state I didn't expect";
			return <AlbumErrorPage message={message} />;
		}
	}
}
