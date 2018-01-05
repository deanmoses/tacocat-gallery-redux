import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '@src/redux/actions/image-actions';
import { RootState } from '@src/redux/reducers/reducers';
import { Album, Image } from '@src/models/album';
import ImagePage from '@src/components/pages/image-page';

/**
 * Component properties
 */
type ComponentProps = {
	readonly path: string;
	readonly album?: Album;
	readonly fetchIfNeeded?: Function;
};

/**
 * Image container component: manages image loading and error state
 */
class ImageContainer extends React.Component<ComponentProps> {
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
		const imagePath = this.props.path;
		const album = this.props.album;

		console.log(`ImageContainer.render(${imagePath}) album ${album.path}`);

		if (!album || album.isLoading) {
			return 'Waiting on album';
		} else if (!album.images) {
			return `No images in album ${album}`;
		} else {
			var image = album.images.find((image: Image) => image.path === imagePath);
			if (!image) {
				return `No image of path (${imagePath}) in album ${album.path}`;
			} else {
				return <ImagePage album={album} image={image} />;
			}
		}
	}
}

//
// Redux redux machinery below this point
//
// The above component is a "pure" component that just knows about its properties
// and what functions it publishes to the outside world.  It doesn't know anything about:
//  - Redux
//  - calling Ajax
//

/**
 * To use React Redux connect(), define a mapStateToProps() function that
 * transforms the state of the Redux store into this component's props.
 *
 * @prop state the current Redux store state
 * @returns set of props for this component
 */
function mapStateToProps(
	state: RootState,
	ownProps: ComponentProps
): ComponentProps {
	const path = ownProps.path;

	// get the album's path from the photo's path
	var pathParts = ownProps.path.split('/');
	pathParts.pop(); // remove photo filename
	var albumPath = pathParts.join('/');

	// retrieve the album from state
	const album = state.albumsByPath[albumPath];

	return {
		path,
		album
	};
}

/**
 * To use React Redux connect(), define a mapDispatchToProps() function that
 * maps a function on this component to a Redux action creator function.
 */
function mapDispatchToProps(dispatch: any) {
	return bindActionCreators(
		{
			fetchIfNeeded: actions.fetchImageIfNeeded
		},
		dispatch
	);
}

/**
 * Instead of exporting the ImageContainer component, export a Redux-wrapped component.
 *
 * We need to wrap the AlbumContainer component in a Redux wrapper in order to be
 * notified of changes to global state and map the new global state to this
 * component's properties.
 *
 * The Redux connect() method does the wrapping.
 */
export const ConnectedComponent = connect<{}, {}, ComponentProps>(
	mapStateToProps,
	mapDispatchToProps
)(ImageContainer);
export default ConnectedComponent;
