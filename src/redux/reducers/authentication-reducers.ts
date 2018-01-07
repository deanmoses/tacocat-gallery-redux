//
// The React Redux reducers for authentication
//

import * as Actions from '@src/redux/actions/actions';

/**
 * A reducer function
 */
export function isAuthenticatedReducer(
	state: boolean,
	action: Actions.ActionTypes
): boolean {
	if (!action) {
		console.log(
			'isAuthenticated reducer: no action detected, setting to false'
		);
		return state ? state : false;
	}
	switch (action.type) {
		case Actions.ActionTypeKeys.UPDATE_USER_AUTHENTICATION_STATUS:
			console.log(
				action.type,
				action.isAuthenticated ? 'authenticated' : 'not authenticated'
			);
			return action.isAuthenticated;
		default:
			return state ? state : false;
	}
}
