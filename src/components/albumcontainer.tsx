import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '@src/actions/actions';
import { RootState } from '@src/reducers/reducers';
import { Album } from '@src/reducers/album';

/**
 * The shape of this React.js component's properties
 */
type AlbumPageProps = {
	readonly albumPath: string;
	readonly album?: Album;
	readonly fetchAlbumIfNeeded?: Function;
};

/**
 * The React.js component itself.
 */

class AlbumPage extends React.Component<AlbumPageProps> {
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
	render() {
		return <h3>Album Page Connected Component {this.props.albumPath}</h3>;
	}
}

//
// Redax redux machinery below this point
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
function mapStateToProps(state: RootState) {
	const { currentAlbumPath, albumsByPath } = state;
	const album = albumsByPath[currentAlbumPath];

	return {
		currentAlbumPath,
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
const ConnectedAlbum = connect<{}, {}, AlbumPageProps>(
	mapStateToProps,
	mapDispatchToProps
)(AlbumPage);
export default ConnectedAlbum;
