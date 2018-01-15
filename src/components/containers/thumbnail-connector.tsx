//
// This is the React Redux connector for the Thumbnail component.
//
// Its job is to connect the target component to Redux in the following ways:
// 1) Connect the Redux store's state with the target component's properties -- see mapStateToProps() below.
// 2) Connect the target component's events (like fetchIfNeeded) to the Redux actions -- see mapDispatchToProps() below
//
// This way, the target component is completely unaware of Redux; it's a plain React component.
//

import { connect } from 'react-redux';
import { RootState } from '@src/redux/reducers/root-state';
import { isInEditMode } from '@src/redux/selectors/edit-mode-selectors';
import { setAlbumThumbnail } from '@src/redux/actions/thumbnail-set-action-builders';
import { getParentFromPath, getLeafItemOnPath } from '@src/utils/path-utils';
import { AlbumType, Thumbable } from '@src/models/models';
import {
	Thumbnail,
	ComponentProps
} from '@src/components/presentation/thumbnail';

/**
 * My properties are different than the component I wrap!
 */
type ConnectedComponentProps = {
	readonly item: Thumbable;
	readonly isAlbum?: boolean;
	readonly albumType: AlbumType;
	readonly editMode?: boolean;
	readonly useLongDateAsTitle?: boolean;
	readonly useLongDateAsSummary?: boolean;
	readonly selected?: boolean;
};

/**
 * mapStateToProps() is a standard Redux function to transform the state of
 * the Redux store into the target component's properties.
 *
 * This will be invoked any time the component is mounted and there are changes
 * to the state of the Redux store.
 *
 * @prop state the current Redux store state
 * @returns set of props for the target component
 */
function mapStateToProps(
	state: RootState /*, ownProps: ComponentProps*/
): Partial<ComponentProps> {
	return {
		editMode: isInEditMode(state)
	};
}

/**
 * mapDispatchToProps() is a a standard Redux function to map
 * Redux action creator functions to functions on the target component.
 */
function mapDispatchToProps(
	dispatch: Function,
	ownProps: Partial<ComponentProps>
): Partial<ComponentProps> {
	return {
		// onSelect() = on click of the star on the thumbnail
		// On onSelect(), set that item's thumbnail URL (ownProps.item.url_thumb) as the thumbnail URL
		// of the parent album as retrieved with getParentFromPath(ownProps.item.path).
		onSelect: () =>
			dispatch(
				setAlbumThumbnail(
					getParentFromPath(ownProps.item.path),
					getLeafItemOnPath(ownProps.item.path)
				)
			)
	};
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
const ConnectedComponent = connect<{}, {}, ConnectedComponentProps>(
	mapStateToProps,
	mapDispatchToProps
)(Thumbnail);
export default ConnectedComponent;
