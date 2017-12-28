/**
 * A React Redux reducer
 */

import * as Actions from 'actions/actions';

export function counterReducer(s: State, action: Actions.ActionTypes) {
	switch (action.type) {
		case Actions.ActionTypeKeys.MY_ACTION1:
			return { counter: s.counter + action.myParameter1 };
		case Actions.ActionTypeKeys.MY_ACTION2:
			return { counter: s.counter + action.myParameter1 };
		default:
			return s;
	}
}
