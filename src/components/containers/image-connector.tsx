//
// React Redux state connector for the AlbumContainer component
//

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '@src/redux/actions/image-actions';
import { RootState } from '@src/redux/reducers/root-state';
import { getImage, getAlbumForImage } from '@src/redux/selectors/selectors';

import ImageContainer, {
	ComponentProps
} from '@src/components/containers/image-container';

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
	const image = getImage(state, ownProps.path);
	const album = getAlbumForImage(state, ownProps.path);
	return {
		path,
		album,
		image
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
