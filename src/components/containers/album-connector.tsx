//
// This is the React Redux connector for the AlbumContainer component.
//
// Its job is to connect the component to Redux in the following ways:
// 1) Connect the Redux store's state with the component's properties -- see mapStateToProps() below.
// 2) Connect the component's events (like fetchIfNeeded) to the Redux actions -- see mapDispatchToProps() below
//
// This way, the target component is completely unaware of Redux; it's a plain React component.
//

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '@src/redux/actions/album-action-builders';
import { RootState } from '@src/redux/reducers/root-state';
import { Album } from '@src/models/models';
import { getAlbum } from '@src/redux/selectors/selectors';
import {
	AlbumContainer,
	ComponentProps
} from '@src/components/containers/album-container';

/**
 * mapStateToProps() is a standard Redux function to transforms the state of
 * the Redux store into the target component's properties.
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
 * mapDispatchToProps() is a a standard Redux function to map
 * Redux action creator functions to functions on the target component.
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
 * Instead of the rest of the system using the target component, they will use
 * a Redux-wrapped component created with the connect() method below.
 *
 * The connect() wraps the target component in a Redux wrapper in order to:
 * 1) Be notified of changes to the state of the Redux store via mapStateToProps()
 * 2) When the target component invokes a function mapped in mapDispatchToProps(),
 *    the correct Redux action creator function is called.
 *
 * This way, the target component is completely unaware of Redux; it's a plain React component.
 */
export const ConnectedComponent = connect<{}, {}, ComponentProps>(
	mapStateToProps,
	mapDispatchToProps
)(AlbumContainer);
export default ConnectedComponent;
