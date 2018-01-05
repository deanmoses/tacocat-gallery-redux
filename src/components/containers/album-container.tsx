import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '@src/redux/actions/actions';
import { RootState } from '@src/redux/reducers/reducers';
import { Album } from '@src/models/album';
import AlbumPage from '@src/components/pages/album-page';
import AlbumLoadingPage from '@src/components/pages/album-loading-page';
import AlbumErrorPage from '@src/components/pages/album-error-page';

/**
 * The shape of this component's properties
 */
type AlbumContainerProps = {
	readonly path: string;
	readonly album?: Album;
	readonly fetchAlbumIfNeeded?: Function;
};
/**
 * The component itself.
 */
export class AlbumContainer extends React.Component<AlbumContainerProps> {
	/**
	 * React.js component lifecycle method. Invoked once, immediately after the
	 * initial rendering occurs. At this point in the lifecycle, the component
	 * has a DOM representation which you can access via this.getDOMNode().
	 *
	 * This is the place to trigger async logic, such as Redux actions.
	 */
	componentDidMount() {
		this.props.fetchAlbumIfNeeded(this.props.path);
	}

	/**
	 * React.js component lifecycle method.  Invoked before a mounted component
	 * receives new props.  Note that React may call this method even if the props
	 * have not changed, so make sure to compare the current and next values if you
	 * only want to handle changes. This may occur when the parent component causes
	 * your component to re-render.
	 */
	componentWillReceiveProps(nextProps: AlbumContainerProps) {
		// Have we changed which album we're displaying?
		let differentAlbum: boolean = nextProps.path !== this.props.path;
		if (differentAlbum) {
			this.props.fetchAlbumIfNeeded(nextProps.path);
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
function mapStateToProps(state: RootState, ownProps: AlbumContainerProps) {
	const path: string = ownProps.path;
	const album: Album = state.albumsByPath[path];

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
			fetchAlbumIfNeeded: actions.fetchAlbumIfNeeded
		},
		dispatch
	);
}

/**
 * Instead of exporting the AlbumContainer component, export a Redux-wrapped component.
 *
 * We need to wrap the AlbumContainer component in a Redux wrapper in order to be
 * notified of changes to global state and map the new global state to this
 * component's properties.
 *
 * The Redux connect() method does the wrapping.
 */
export const ConnectedAlbum = connect<{}, {}, AlbumContainerProps>(
	mapStateToProps,
	mapDispatchToProps
)(AlbumContainer);
export default ConnectedAlbum;
