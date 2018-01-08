//
// The React Redux reducers for authentication
//

import * as Actions from '@src/redux/actions/actions';
import { DraftsByPath, Draft, DraftState } from '@src/models/models';

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
		 * DRAFT_UPDATE
		 * Apply new content to existing draft of an album or image
		 */
		case Actions.ActionTypeKeys.DRAFT_UPDATE: {
			console.log(action.type, action.path, action.newDraftContent);
			if (!action.path) throw new Error('Draft with no path');

			// Make copy of existing draft or create a new one, and apply new content
			const draftCopy: Draft = {
				...draftsByPath[action.path],
				...{
					path: action.path, // in case we're creating a new draft we need to set its path
					state: DraftState.UNSAVED_CHANGES, // set status to having unsaved changes
					content: action.newDraftContent // the new content to apply
				}
			};

			// Make copy of draftsByPath
			let draftsByPathCopy = { ...draftsByPath };

			// Add copy of draft to copy of draftsByPath
			draftsByPathCopy[action.path] = draftCopy;

			// Return copy of draftsByPath
			return draftsByPathCopy;
		}

		/**
		 * DRAFT_SAVING
		 * Set status of draft to saving
		 */
		case Actions.ActionTypeKeys.DRAFT_SAVING: {
			console.log(action.type, action.path);
			if (!action.path) throw new Error('Draft with no path');

			// Make copy of existing draft or create a new one, and apply new content
			const draftCopy: Draft = {
				...draftsByPath[action.path],
				...{
					path: action.path, // in case we're creating a new draft we need to set its path
					state: DraftState.SAVING // set status to saving
				}
			};

			// Make copy of draftsByPath
			let draftsByPathCopy = { ...draftsByPath };

			// Add copy of draft to copy of draftsByPath
			draftsByPathCopy[action.path] = draftCopy;

			// Return copy of draftsByPath
			return draftsByPathCopy;
		}

		/**
		 * DRAFT_SAVED
		 * Set status of draft to saving
		 */
		case Actions.ActionTypeKeys.DRAFT_SAVED: {
			console.log(action.type, action.path);
			if (!action.path) throw new Error('Draft with no path');

			// Make copy of existing draft or create a new one, and apply new content
			const draftCopy: Draft = {
				...draftsByPath[action.path],
				...{
					path: action.path, // in case we're creating a new draft we need to set its path
					state: DraftState.SAVED // set status to saved
				}
			};

			// Make copy of draftsByPath
			let draftsByPathCopy = { ...draftsByPath };

			// Add copy of draft to copy of draftsByPath
			draftsByPathCopy[action.path] = draftCopy;

			// Return copy of draftsByPath
			return draftsByPathCopy;
		}

		/**
		 * DRAFT_SAVE_ERRORED
		 * Set status of draft to errored
		 */
		case Actions.ActionTypeKeys.DRAFT_SAVE_ERRORED: {
			console.log(action.type, action.path);
			if (!action.path) throw new Error('Draft with no path');

			// Make copy of existing draft or create a new one, and apply new content
			const draftCopy: Draft = {
				...draftsByPath[action.path],
				...{
					path: action.path, // in case we're creating a new draft we need to set its path
					state: DraftState.ERRORED, // set status to saved
					errorMessage: action.error.message
				}
			};

			// Make copy of draftsByPath
			let draftsByPathCopy = { ...draftsByPath };

			// Add copy of draft to copy of draftsByPath
			draftsByPathCopy[action.path] = draftCopy;

			// Return copy of draftsByPath
			return draftsByPathCopy;
		}

		/**
		 * Default: don't want to handle this action, return existing state unchanged
		 */
		default:
			return draftsByPath;
	}
}
