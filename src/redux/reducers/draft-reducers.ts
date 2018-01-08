//
// The React Redux reducers for authentication
//

import * as Actions from '@src/redux/actions/actions';
import { DraftsByPath } from '@src/models/models';

/**
 * A reducer function
 */
export function draftsByPathReducer(
	draftsByPath: DraftsByPath = {},
	action: Actions.ActionTypes
): DraftsByPath {
	if (!action) {
		console.log(
			'draftsByPath reducer: no action detected, returning existing state'
		);
		// No action: return existing state unchanged
		return draftsByPath;
	}

	switch (action.type) {
		/**
		 *  Apply new content to existing draft of an album or image
		 */
		case Actions.ActionTypeKeys.DRAFT_UPDATE: {
			console.log(action.type, action.path, action.draftContent);

			if (!action.path) throw new Error('Draft update with no path');

			// Make copy of existing draft or create a new one, and apply new content
			const draftCopy = {
				...draftsByPath[action.path],
				...{ path: action.path }, // in case we're creating a new draft we need to set its path
				...{ content: action.draftContent }
			};

			// Make copy of draftsByPath
			let draftsByPathCopy = { ...draftsByPath };

			// Add copy of draft to copy of draftsByPath
			draftsByPathCopy[action.path] = draftCopy;

			// Return copy of draftsByPath
			return draftsByPathCopy;
		}

		// Default: don't want to handle this action, return existing state unchanged
		default:
			return draftsByPath;
	}
}
