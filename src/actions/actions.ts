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
export type ActionTypes = MyAction1 | MyAction2 | OtherAction;

/**
 * Enum of all of the Redux action type keys dispatched in the application
 */
export enum ActionTypeKeys {
	MY_ACTION1 = 'MY_ACTION1',
	MY_ACTION2 = 'MY_ACTION2',
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
 * Sample action type definition
 */
export interface MyAction2 {
	type: ActionTypeKeys.MY_ACTION2;
	myParameter1: string;
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
