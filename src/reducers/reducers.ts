/**
 * The React Redux reducers and state for the application
 */

import { Action, combineReducers } from 'redux';
import * as Actions from '@src/actions/actions';

/**
 * The shape of the application's state.
 *
 * TODO: change 'interface' to 'type' here.  We don't want anything extending State.
 */
export interface State {
	/**
	 * True: user is authenticated
	 */
	readonly isAuthenticated: boolean;

	/**
	 * Some example state
	 */
	readonly someOtherProperty: string;

	/**
	 * App is loading some data
	 */
	isLoading: boolean;

	/**
	 * App is in an error state (like there was an error loading data)
	 */
	error: string;
}

/**
 * The root React Redux reducer.
 *
 * It combines all the other reducers into a single top-level
 * reducer that the React Redux store calls.
 */
export const rootReducer = combineReducers<State>({
	isLoading: isLoading,
	error: error,
	isAuthenticated: isAuthenticated,
	someOtherProperty: someOtherProperty
});

/**
 * A reducer function
 */
function isLoading(state: boolean = false, action: Action): boolean {
	switch (action.type) {
		case 'LOAD_COUNT_REQUEST':
			return true;
		case 'LOAD_COUNT_SUCCESS':
		case 'LOAD_COUNT_ERROR':
			return false;
		default:
			return state;
	}
}

/**
 * A reducer function
 */
function error(state: string = '', action: Action): string {
	switch (action.type) {
		case 'LOAD_COUNT_REQUEST':
		case 'SAVE_COUNT_REQUEST':
			return '';
		case 'LOAD_COUNT_ERROR':
		case 'SAVE_COUNT_ERROR':
			return null; // TODO: figure out strongly typed Thunk async actions // action.error.toString();
		default:
			return state;
	}
}

/**
 * A reducer function
 */
function isAuthenticated(state: boolean, action: Actions.ActionTypes): boolean {
	switch (action.type) {
		case Actions.ActionTypeKeys.UPDATE_USER_AUTHENTICATION_STATUS:
			return action.isAuthenticated;
		default:
			return state ? state : false;
	}
}

/**
 * A reducer function
 */
export function someOtherProperty(
	state: string,
	action: Actions.ActionTypes
): string {
	switch (action.type) {
		case Actions.ActionTypeKeys.MY_ACTION1:
			return state + ' ' + action.myParameter1;
		default:
			return state ? state : '';
	}
}
