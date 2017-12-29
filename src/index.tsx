import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import * as redux from 'redux';
import thunk from 'redux-thunk';
import { rootReducer, State } from '@src/reducers/reducers';
import { App } from '@src/components/App';
import {
	updateUserAuthenticationStatus,
	createMyAction1
} from '@src/actions/actions';

// create the React Redux store, which stores the application's state
let store = redux.createStore<State>(rootReducer, redux.applyMiddleware(thunk));

console.log(store.getState());

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
const unsubscribe = store.subscribe(() => console.log(store.getState()));

// Dispatch some actions
store.dispatch(updateUserAuthenticationStatus(true));
store.dispatch(updateUserAuthenticationStatus(false));
store.dispatch(updateUserAuthenticationStatus(true));
store.dispatch(createMyAction1('foo'));
store.dispatch(createMyAction1('bar'));
store.dispatch(createMyAction1('baz'));

// Stop listening to state updates
unsubscribe();

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('app')
);
