import { createStore } from 'redux';
import { State } from '@src/store/state';
import { rootReducer } from '@src/reducers/rootReducer';

export function configureStore() {
	return createStore<State>(rootReducer);
}
