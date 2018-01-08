//
// These are Redux Action builders: helper functions to create Actions
//

import { ActionTypeKeys, DraftUpdate } from '@src/redux/actions/actions';
import { DraftContent } from '@src/models/models';

/**
 * Update the named field with the specified new value
 *
 * @param field Name of a field on an album or image, like 'desc'
 * @param newValue New value of field
 * @param path  Path to album or image
 */
export function updateDraftField(
	path: string,
	field: string,
	newValue: string
) {
	// I would like to declare draftContent as type of DraftContent, but I can't
	// because I'm setting the field's value via array index syntax like this:
	// draftContent[field] = newValue
	let newDraftContent: any = {};
	newDraftContent[field] = newValue;
	return updateDraftContent(path, newDraftContent as DraftContent);
}

/**
 * Update the content of an unsaved draft of an album or image in the Redux store
 */
function updateDraftContent(path: string, newDraftContent: DraftContent) {
	return function(dispatch: Function) {
		return dispatch(draftUpdateAction(path, newDraftContent));
	};
}

/**
 * Send Redux Action to update edit mode
 */
const draftUpdateAction = (
	path: string,
	draftContent: DraftContent
): DraftUpdate => ({
	type: ActionTypeKeys.DRAFT_UPDATE,
	path: path,
	newDraftContent: draftContent
});
