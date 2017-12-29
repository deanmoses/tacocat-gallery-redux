/**
 * A React Redux reducer
 *
 * A reducer is a function that accepts two parameters:
 * 1) The state of our application (our internal state tree, which our Store passes to the reducer)
 * 2) The action which was dispatched
 */
import * as Actions from '@src/actions/actions';

export function isAuthenticated(
	state: boolean,
	action: Actions.ActionTypes
): boolean {
	switch (action.type) {
		case Actions.ActionTypeKeys.UPDATE_USER_AUTHENTICATION_STATUS:
			return action.isAuthenticated;
		default:
			return state ? state : false;
	}
}
