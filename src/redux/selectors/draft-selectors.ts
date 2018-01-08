//
// Redux selector functions
//
// The job of a selector function is to "select" (aka retrieve) some bit of state
// out of the Redux store.
//
// The Redux store should store plain javascript objects so this is a good place
// to turn that plain object into a specific class.
//

import { RootState } from '@src/redux/reducers/root-state';
import { Draft } from '@src/models/models';

/**
 * Retrieve draft at specified path
 */
export function getDraft(state: RootState, path: string): Draft {
	const draft = state.draftsByPath[path];
	return draft;
}
