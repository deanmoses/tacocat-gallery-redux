import { combineReducers } from 'redux';
import { State } from '@src/store/state';
import { isAuthenticated } from '@src/reducers/authentication';
import { myReducer } from '@src/reducers/reducer';

export const rootReducer = combineReducers<State>({
	isAuthenticated: isAuthenticated,
	someOtherProperty: myReducer
});
