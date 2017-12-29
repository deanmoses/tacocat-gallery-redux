/**
 * This file contains React Redux action definitions.
 *
 * A Redux action is essentially an instruction to change
 * the application state such as “Hey Redux Store! I’ve got
 * an instruction for you, please update the state tree with
 * this new piece of information.”
 *
 * A Redux Thunk asynchronous action is an action that can
 * do stuff, like make ajax calls, then fire more actions.
 */

// import { Action, ActionCreator, Dispatch } from 'redux';
// import { ThunkAction } from 'redux-thunk';
// import { State } from '@src/reducers/reducers';

/**
 * The keys for each action in the application
 */
export enum ActionTypeKeys {
	MY_ACTION1,
	UPDATE_USER_AUTHENTICATION_STATUS,
	OTHER_ACTION
}

export type ActionTypes =
	| MyAction1
	| UpdateUserAuthenticationStatus
	| OtherAction;

// /**
//  *  Async Redux-Thunk action
//  */
// export const AsyncThunkAction: ActionCreator<
// 	ThunkAction<Promise<Action>, State, void>
// > = () => {
// 	return async (dispatch: Dispatch<State>): Promise<Action> => {
// 		try {
// 			const text = await Api.call();
// 			return dispatch({
// 				type: ActionTypeKeys.SET_TEXT,
// 				text
// 			});
// 		} catch (e) {}
// 	};
// };

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
