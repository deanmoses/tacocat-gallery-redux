/**
 * This file contains React Redux action definitions.
 *
 * A Redux action is essentially an instruction to change
 * the application state such as “Hey Redux Store! I’ve got
 * an instruction for you, please update the state tree with
 * this new piece of information.”
 */

/**
 * A type representing all Redux actions in the app
 */
export type ActionTypes =
	| MyAction1
	| UpdateUserAuthenticationStatus
	| OtherAction;

/**
 * The keys for each action in the application
 */
export enum ActionTypeKeys {
	MY_ACTION1 = 'MY_ACTION1',
	UPDATE_USER_AUTHENTICATION_STATUS = 'UPDATE_USER_AUTHENTICATION_STATUS',
	OTHER_ACTION = '__any_other_action_type__'
}

/**
 * Sample action type definition
 */
export interface MyAction1 {
	type: ActionTypeKeys.MY_ACTION1;
	myParameter1: string;
}

/**
 * Action type definition
 */
export interface UpdateUserAuthenticationStatus {
	type: ActionTypeKeys.UPDATE_USER_AUTHENTICATION_STATUS;

	/**
	 * True: user is authenticated
	 */
	isAuthenticated: boolean;
}

/**
 * The list of actions we handle in our reducers is almost never
 * the complete list of actions flowing through Redux. Third-party
 * plugins and Redux built-in actions happen as well, and our
 * reducers need to handle them appropriately.
 *
 * It’d be nice to get help from TypeScript so that we don’t forget.
 *
 * Our preferred approach for this is to define an OtherAction type
 * (which we never dispatch) that lives in our ActionTypes, so
 * TypeScript will warn us if it’s not handled.
 */
export interface OtherAction {
	type: ActionTypeKeys.OTHER_ACTION;
}

/**
 * Action Builder: a helper function to create an Action
 */
export const createMyAction1 = (myParameter1: string): MyAction1 => ({
	type: ActionTypeKeys.MY_ACTION1,
	myParameter1
});

/**
 * Action Builder: a helper function to create an Action
 */
export const updateUserAuthenticationStatus = (
	isAuthenticated: boolean
): UpdateUserAuthenticationStatus => ({
	type: ActionTypeKeys.UPDATE_USER_AUTHENTICATION_STATUS,
	isAuthenticated
});
