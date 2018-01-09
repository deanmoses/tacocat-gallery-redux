//
// This is the React Redux connector for the EditableText component.
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
import { updateDraftField } from '@src/redux/actions/draft-update-action-builders';
import {
	EditableText,
	ComponentProps
} from '@src/components/presentation/editable-text';

/**
 * My properties are different than the component I wrap!
 */
type ConnectedComponentProps = {
	/**
	 * Text to either display read-only or editable
	 */
	readonly text: string;

	/**
	 * Optional CSS class names to add to me
	 */
	readonly className?: string;

	/**
	 * Name of the field being edited.
	 * For example, if this is editing or displaying album.desc, this would be 'desc'.
	 */
	readonly field: string;

	/**
	 * Path of the album or image whose field is being edited
	 */
	readonly path: string;
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
		editMode: !getAuthentication(state) && getEditMode(state)
	};
}

/**
 * mapDispatchToProps() is a a standard Redux function to map
 * Redux action creator functions to functions on the target component.
 */
function mapDispatchToProps(
	dispatch: Function,
	ownProps: ConnectedComponentProps
): Partial<ComponentProps> {
	return {
		onTextChange: newTextValue =>
			dispatch(updateDraftField(ownProps.path, ownProps.field, newTextValue))
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
)(EditableText);
export default ConnectedComponent;
