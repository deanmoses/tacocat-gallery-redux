import * as React from 'react';
import { AlbumThumb } from '@src/models/models';
import * as Thumb from '@src/components/presentation/thumb';

/**
 * Component properties
 */
export type ComponentProps = {
	readonly latestAlbum?: AlbumThumb;
	readonly fetchLatestAlbumIfNeeded?: Function;
};

/**
 * Album container component: manages album loading and error state
 */
export default class LatestAlbumContainer extends React.Component<
	ComponentProps
> {
	/**
	 * React.js component lifecycle method. Invoked once, immediately after the
	 * initial rendering occurs. At this point in the lifecycle, the component
	 * has a DOM representation which you can access via this.getDOMNode().
	 *
	 * This is the place to trigger async logic, such as Redux actions.
	 */
	componentDidMount() {
		this.props.fetchLatestAlbumIfNeeded();
	}

	/**
	 * React.js component lifecycle method.  Invoked before a mounted component
	 * receives new props.  React may call this method even if the props haven't
	 * changed, so make sure to compare the current and next values if you only
	 * want to handle changes. This may occur when the parent component causes
	 * your component to re-render.
	 */
	// componentWillReceiveProps(nextProps: ComponentProps) {
	// 	// Have we changed which album we're displaying?
	// 	let differentAlbum: boolean = nextProps.path !== this.props.path;
	// 	if (differentAlbum) {
	// 		this.props.fetchLatestAlbumIfNeeded(nextProps.path);
	// 	}
	// }

	render() {
		const album = this.props.latestAlbum as AlbumThumb;

		if (album && album.url_thumb) {
			return <Thumb.Nail item={album} isAlbum={true} albumType={album.type} />;
		}
		// Don't render anything if we don't have a latest album
		return null;
	}
}
