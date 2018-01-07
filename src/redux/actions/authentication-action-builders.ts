//
// These are Redux Action builders: helper functions to create Actions
//

import Config from '@src/utils/config';
import {
	ActionTypeKeys,
	UpdateUserAuthenticationStatus
} from '@src/redux/actions/actions';

/**
 * Redux Action builder to check with the server to see if the user is authenticated
 */
export function updateAuthenticationStatusFromServer() {
	//console.log('updateAuthenticationStatus()');
	return function(dispatch: Function) {
		return dispatch(fetchAuthStatus());
	};
}

function fetchAuthStatus() {
	return (dispatch: Function) => {
		// Don't really need to build "authentication updating" functionality in the UI
		//dispatch(authenticationStatusUpdating());
		return fetch(Config.checkAuthenticationJsonUrl())
			.then(handleErrors)
			.then(response => response.json())
			.then(json => dispatch(updateStoreFromResponse(json)))
			.catch(error => dispatch(fetchError(error)));
	};
}

/**
 * Figure out if there was an error fetching
 */
function handleErrors(response: Response): Response {
	if (!response.ok) {
		// console.log(
		// 	'Response not OK fetching authentication status: ',
		// 	response.statusText
		// );
		throw Error(response.statusText);
	} else if (response.status === 404) {
		//console.log('404 fetching authentication status: ', response.statusText);
		throw Error(response.statusText);
	} else if (response.status !== 200) {
		// console.log(
		// 	'Non-200 response fetching authentication status: ',
		// 	response.statusText
		// );
		throw Error(response.statusText);
	}
	return response;
}

/**
 * Action Builder: a helper function to create an Action
 */
function updateStoreFromResponse(json: any): UpdateUserAuthenticationStatus {
	// TODO: better error handling if we don't get back expected response
	const authStatus: boolean = !!json.isAdmin;
	return updateUserAuthenticationStatus(authStatus);
}

/**
 * There was an error fetching, update store.
 */
export function fetchError(error: Error): UpdateUserAuthenticationStatus {
	console.log('Error fetching authentication status: ', error.message);
	// when there's an error fetching auth status, set auth status to false
	return updateUserAuthenticationStatus(false);
}

/**
 * Action Builder: a helper function to create an Action
 */
export const updateUserAuthenticationStatus = (
	isAuthenticated: boolean
): UpdateUserAuthenticationStatus => ({
	type: ActionTypeKeys.UPDATE_USER_AUTHENTICATION_STATUS,
	isAuthenticated
});
