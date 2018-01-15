//
// The React Redux reducers for handling edit mode
//

import * as Actions from '@src/redux/actions/actions';

/**
 * A reducer function
 */
export function editModeReducer(
	currentEditMode: boolean,
	action: Actions.ActionTypes
): boolean {
	if (!action) {
		console.log('editMode reducer: no action detected, setting to false');
		return currentEditMode ? currentEditMode : false;
	}
	switch (action.type) {
		case Actions.ActionTypeKeys.EDIT_MODE_UPDATE:
			console.log(action.type, action.editMode);
			return action.editMode;
		default:
			return currentEditMode ? currentEditMode : false;
	}
}
