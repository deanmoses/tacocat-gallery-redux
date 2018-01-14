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
import { isAuthenticated } from '@src/redux/selectors/authentication-selectors';

/**
 * Retrieve whether the system is in edit mode or not.
 * Also checks to see if the user is authenticated.
 */
export function isInEditMode(rootState: RootState): boolean {
	return isAuthenticated(rootState) && rootState.editMode;
}
