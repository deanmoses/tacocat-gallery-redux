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

/**
 * Retrieve whether the system is in edit mode or not
 */
export function isAuthenticated(state: RootState): boolean {
	// If we're not in production, always say the user is authenticated.
	// This helps with testing in development.
	// The production build process replaces the text 'process.env.NODE_ENV'
	// with the literal string 'production'
	if (process.env.NODE_ENV !== 'production') {
		return true;
	} else {
		return state.isAuthenticated;
	}
}
