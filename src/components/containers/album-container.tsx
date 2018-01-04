import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '@src/actions/actions';
import { RootState } from '@src/reducers/reducers';
import { Album } from '@src/reducers/album';
import * as albumpages from '@src/components/pages/album-pages';

/**
 * The shape of this component's properties
 */
type AlbumPageProps = {
	readonly albumPath: string;
	readonly album?: Album;
	readonly fetchAlbumIfNeeded?: Function;
};
/**
 * The component itself.
 */
export class AlbumPage extends React.Component<AlbumPageProps> {
	/**
	 * React.js component lifecycle method. Invoked once, immediately after the
	 * initial rendering occurs. At this point in the lifecycle, the component
	 * has a DOM representation which you can access via this.getDOMNode().
	 *
	 * This is the place to trigger async logic, such as Redux actions.
	 */
	componentDidMount() {
		this.props.fetchAlbumIfNeeded(this.props.albumPath);
	}

	/**
	 * React.js component lifecycle method.  Invoked before a mounted component
	 * receives new props.  Note that React may call this method even if the props
	 * have not changed, so make sure to compare the current and next values if you
	 * only want to handle changes. This may occur when the parent component causes
	 * your component to re-render.
	 */
	componentWillReceiveProps(nextProps: AlbumPageProps) {
		// Have we changed which album we're displaying?
		let differentAlbum: boolean = nextProps.albumPath !== this.props.albumPath;
		if (differentAlbum) {
			this.props.fetchAlbumIfNeeded(nextProps.albumPath);
		}
	}

	render() {
		console.log(
			'AlbumPage.render()',
			this.props.albumPath,
			'album:',
			this.props.album
		);

		const album = this.props.album as Album;

		if (album && album.image_size) {
			document.title = album.path;
			return <albumpages.AlbumPage album={album} />;
		} else if (album && album.err) {
			document.title = 'Error loading album';
			return <albumpages.AlbumErrorPage message={album.err} />;
		} else if (!album || (album.isLoading && !album.title)) {
			document.title = 'Loading album...';
			return <albumpages.AlbumLoadingPage />;
		} else {
			document.title = 'Weird state...';
			const message = "I'm in some weird state I didn't expect";
			return <albumpages.AlbumErrorPage message={message} />;
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
function mapStateToProps(state: RootState, ownProps: AlbumPageProps) {
	const albumPath = ownProps.albumPath;
	const album = state.albumsByPath[albumPath];

	return {
		albumPath,
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
 * Instead of exporting the AlbumPage component, export a Redux-wrapped component.
 *
 * We need to wrap the AlbumPage component in a Redux wrapper in order to be
 * notified of changes to global state and map the new global state to this
 * component's properties.
 *
 * The Redux connect() method does the wrapping.
 */
export const ConnectedAlbum = connect<{}, {}, AlbumPageProps>(
	mapStateToProps,
	mapDispatchToProps
)(AlbumPage);
export default ConnectedAlbum;
