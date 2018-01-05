//
// React Redux state connector for the AlbumContainer component
//

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '@src/redux/actions/album-actions';
import { RootState } from '@src/redux/reducers/reducers';
import { Album } from '@src/models/album';
import AlbumContainer, {
	ComponentProps
} from '@src/components/containers/album-container';
import { getAlbum } from '@src/redux/selectors/selectors';

/**
 * To use React Redux connect(), define a mapStateToProps() function that
 * transforms the state of the Redux store into this component's props.
 *
 * @prop state the current Redux store state
 * @returns set of props for this component
 */
function mapStateToProps(state: RootState, ownProps: ComponentProps) {
	const path: string = ownProps.path;
	const album: Album = getAlbum(state, path);

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
			fetchIfNeeded: actions.fetchAlbumIfNeeded
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
export const ConnectedComponent = connect<{}, {}, ComponentProps>(
	mapStateToProps,
	mapDispatchToProps
)(AlbumContainer);
export default ConnectedComponent;
