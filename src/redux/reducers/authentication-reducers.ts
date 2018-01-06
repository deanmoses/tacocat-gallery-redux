//
// The React Redux reducers for authentication
//

import * as Actions from '@src/redux/actions/actions';

/**
 * A reducer function
 */
export function isAuthenticated(
	state: boolean,
	action: Actions.ActionTypes
): boolean {
	if (!action) {
		return state ? state : false;
	}
	switch (action.type) {
		case Actions.ActionTypeKeys.UPDATE_USER_AUTHENTICATION_STATUS:
			return action.isAuthenticated;
		default:
			return state ? state : false;
	}
}
