//
// This is the React Redux connector for the EditableHtml component.
//
// Its job is to connect the target component to Redux in the following ways:
// 1) Connect the Redux store's state with the target component's properties -- see mapStateToProps() below.
// 2) Connect the target component's events (like fetchIfNeeded) to the Redux actions -- see mapDispatchToProps() below
//
// This way, the target component is completely unaware of Redux; it's a plain React component.
//

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RootState } from '@src/redux/reducers/root-state';
import { getAuthentication } from '@src/redux/selectors/authentication-selectors';
import { getEditMode } from '@src/redux/selectors/edit-mode-selectors';
import { updateDraftField } from '@src/redux/actions/draft-action-builders';
import {
	EditableHtml,
	ComponentProps
} from '@src/components/presentation/editable-html';

/**
 * mapStateToProps() is a standard Redux function to transforms the state of
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
		editMode: getAuthentication(state) && getEditMode(state)
	};
}

/**
 * mapDispatchToProps() is a a standard Redux function to map
 * Redux action creator functions to functions on the target component.
 */
function mapDispatchToProps(dispatch: any): Partial<ComponentProps> {
	return bindActionCreators(
		{
			onHtmlChange: updateDraftField
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
const ConnectedComponent = connect<{}, {}, ComponentProps>(
	mapStateToProps,
	mapDispatchToProps
)(EditableHtml);
export default ConnectedComponent;
