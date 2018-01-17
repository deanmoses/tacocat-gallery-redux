//
// The React Redux reducers for handling drafts
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

			// Get contents of old draft object, if any
			const oldDraft = draftsByPath[action.path];
			const oldDraftContent = !!oldDraft ? oldDraft.content : undefined;

			// Create new draft object
			const draftCopy: Draft = {
				path: action.path, // in case we're creating a new draft we need to set its path
				state: DraftState.UNSAVED_CHANGES, // set status to having unsaved changes
				content: {
					...oldDraftContent, // add in old content
					...action.newDraftContent // overwrite old content with new content
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
		 * Draft saved to server, update real album or image
		 */
		case Actions.ActionTypeKeys.DRAFT_SAVED: {
			console.log(action.type, action.path);
			if (!action.path) throw new Error('Draft with no path');

			// Set draft to just contain status 'SAVED'
			const draftCopy: Draft = {
				path: action.path,
				state: DraftState.SAVED
			};

			// Make copy of draftsByPath
			let draftsByPathCopy = { ...draftsByPath };

			// Add copy of draft to copy of draftsByPath
			draftsByPathCopy[action.path] = draftCopy;

			// Return copy of draftsByPath
			return draftsByPathCopy;
		}

		/**
		 * DRAFT_SAVED_TIMEOUT
		 * Draft saved message has displayed a while.
		 * Clear out the draft entirely
		 */
		case Actions.ActionTypeKeys.DRAFT_SAVED_TIMEOUT: {
			console.log(action.type, action.path);
			if (!action.path) throw new Error('Draft with no path');
			const oldDraft = draftsByPath[action.path];
			if (!oldDraft || oldDraft.state !== DraftState.SAVED) {
				return draftsByPath;
			} else {
				// Draft exists and is in SAVED state.  Delete it.

				// Make copy of draftsByPath
				let draftsByPathCopy = { ...draftsByPath };

				// Delete the draft entirely
				delete draftsByPathCopy[action.path];

				// Return copy of draftsByPath
				return draftsByPathCopy;
			}
		}

		/**
		 * DRAFT_SAVE_ERRORED
		 * Save to server errored. Set status of draft to errored
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
