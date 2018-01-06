//
// These are Redux Action builders: helper functions to create Actions
//

import {
	ActionTypeKeys,
	UpdateUserAuthenticationStatus
} from '@src/redux/actions/actions';

/**
 * Action Builder: a helper function to create an Action
 */
export const updateUserAuthenticationStatus = (
	isAuthenticated: boolean
): UpdateUserAuthenticationStatus => ({
	type: ActionTypeKeys.UPDATE_USER_AUTHENTICATION_STATUS,
	isAuthenticated
});
