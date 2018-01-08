//
// These are Redux Action builders: helper functions to create Actions
//

import { ActionTypeKeys, EditModeUpdate } from '@src/redux/actions/actions';

/**
 * Update edit mode in the Redux store
 */
export function setEditMode(editMode: boolean) {
	console.log('setEditMode()', editMode);
	return function(dispatch: Function) {
		return dispatch(editModeUpdateAction(editMode));
	};
}

/**
 * Send Redux Action to update edit mode
 */
export const editModeUpdateAction = (editMode: boolean): EditModeUpdate => ({
	type: ActionTypeKeys.EDIT_MODE_UPDATE,
	editMode
});
