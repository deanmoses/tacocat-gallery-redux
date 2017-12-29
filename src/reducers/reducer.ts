/**
 * A React Redux reducer
 *
 * A reducer is a function that accepts two parameters:
 * 1) The state of our application (our internal state tree, which our Store passes to the reducer)
 * 2) The action which was dispatched
 */
import * as Actions from '@src/actions/actions';

export function myReducer(state: string, action: Actions.ActionTypes): string {
	switch (action.type) {
		case Actions.ActionTypeKeys.MY_ACTION1:
			return state + ' ' + action.myParameter1;
		default:
			return state ? state : '';
	}
}
