//
// This is the React Redux connector for the AlbumEditControls component.
//
// Its job is to connect the target component to Redux in the following ways:
// 1) Connect the Redux store's state with the target component's properties -- see mapStateToProps() below.
// 2) Connect the target component's events (like fetchIfNeeded) to the Redux actions -- see mapDispatchToProps() below
//
// This way, the target component is completely unaware of Redux; it's a plain React component.
//

import { connect } from 'react-redux';
import { RootState } from '@src/redux/reducers/root-state';
import { getAuthentication } from '@src/redux/selectors/authentication-selectors';
import { getEditMode } from '@src/redux/selectors/edit-mode-selectors';
import { getDraft } from '@src/redux/selectors/draft-selectors';
import {
	enableEditMode,
	disableEditMode
} from '@src/redux/actions/edit-mode-action-builders';
import { saveDraft } from '@src/redux/actions/draft-save-action-builders';
import {
	ImageEditControls,
	ComponentProps,
	Mode
} from '@src/components/containers/image-edit-controls-container';
import { DraftState } from '@src/models/models';

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
	state: RootState,
	ownProps: ComponentProps
): Partial<ComponentProps> {
	return {
		editMode: getEditMenuMode(state, ownProps)
	};
}

/**
 * Figure out what mode the edit menu should be in based on state and properties
 */
function getEditMenuMode(state: RootState, ownProps: ComponentProps) {
	// if user is not authenticated
	if (!getAuthentication(state)) {
		return Mode.EDIT_MODE_DISALLOWED;
	} else if (!getEditMode(state)) {
		// if we're in not in edit mode
		return Mode.EDIT_MODE_ALLOWED;
	} else {
		// else we're in edit mode...
		const draft = getDraft(state, ownProps.image.path);
		if (draft) {
			switch (draft.state) {
				case DraftState.SAVING:
					return Mode.SAVING;
				case DraftState.ERRORED:
					return Mode.SAVE_ERROR;
			}
		}
		return Mode.EDIT_MODE_ON;
	}
}

/**
 * mapDispatchToProps() is a a standard Redux function to map
 * Redux action creator functions to functions on the target component.
 */
function mapDispatchToProps(
	dispatch: Function,
	ownProps: ComponentProps
): Partial<ComponentProps> {
	return {
		onEdit: () => dispatch(enableEditMode()),
		onCancel: () => dispatch(disableEditMode()),
		onSave: () => dispatch(saveDraft(ownProps.image.path))
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
const ConnectedComponent = connect<{}, {}, ComponentProps>(
	mapStateToProps,
	mapDispatchToProps
)(ImageEditControls);
export default ConnectedComponent;
